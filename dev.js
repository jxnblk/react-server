process.env.NODE_ENV = 'development'

const path = require('path')
// const fs = require('fs-extra')
const express = require('express')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')

const app = express()

const config = {
  client: require('./webpack.config'),
  server: require('./webpack.server.config')
}

config.client.mode = 'development'
config.server.mode = 'development'

config.client.entry.unshift(
  'webpack-hot-middleware/client?name=client'
)

config.client.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.WatchIgnorePlugin([
    path.resolve('webpack-assets.json')
  ]),
)

const compiler = webpack([ config.client, config.server ])

let routes = () => {}

const start = async () => {
  // fs.removeSync('./webpack-assets.json')

  app.use(devMiddleware(compiler, {
    stats: 'errors-only',
    noInfo: true,
    publicPath: '/',
    writeToDisk: filename => /server/.test(filename)
  }))

  app.use(hotMiddleware(compiler))

  app.use((...args) => routes(...args))

  compiler.hooks.done.tap('dev-server', () => {
    delete require.cache[require.resolve('./dist/server')]
    routes = require('./dist/server').default
  })

  const server = app.listen(3000, () => {
    console.log('dev server 3000')
  })
}

start()
