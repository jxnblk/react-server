process.env.NODE_ENV = 'development'

const path = require('path')
const express = require('express')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const app = express()

const config = require('./webpack.config')

config.client.mode = 'development'
config.server.mode = 'development'

config.client.entry.unshift(
  'webpack-hot-middleware/client?name=client'
)

config.client.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  // new BundleAnalyzerPlugin()
)

config.server.entry = path.resolve('src/server.js')

const compiler = webpack([ config.client, config.server ])

let routes = () => {}

app.use(devMiddleware(compiler, {
  stats: 'errors-only',
  logLevel: 'error',
  noInfo: true,
  publicPath: '/',
  writeToDisk: filename => /server/.test(filename)
}))

app.use(hotMiddleware(compiler, {
  name: 'client'
}))

app.use((...args) => routes(...args))

compiler.hooks.done.tap('dev-server', () => {
  delete require.cache[require.resolve('./dist/server')]
  routes = require('./dist/server').default
})

const server = app.listen(3000, () => {
  console.log('dev server 3000')
})

