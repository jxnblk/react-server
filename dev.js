const path = require('path')
const Koa = require('koa')
const koaWebpack = require('koa-webpack')
const webpack = require('webpack')
const StartServerPlugin = require('start-server-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const app = new Koa()

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: 'babel-loader'
  }
]

const config = {
  client: {
    mode: 'development',
    entry: [
      path.resolve('src/client.js')
    ],
    output: {
      path: path.resolve('dist'),
      filename: 'main.js',
      publicPath: 'http://localhost:3001/'
    },
    module: {
      rules
    }
  }
}
config.server = Object.assign({}, config.client, {
  target: 'node',
  externals: [
    nodeExternals()
  ],
  entry: [
    path.resolve('src/server.js')
  ],
  output: {
    libraryTarget: 'umd',
    path: path.resolve('dist'),
    filename: 'server.js',
    publicPath: '/'
  },
  plugins: [
    new StartServerPlugin({
      name: 'server.js'
    })
  ]
})

const compiler = webpack(config.client)
const serverCompiler = webpack(config.server)

compiler.plugin('done', () => {
  serverCompiler.watch({}, stats => {
  })
})

const start = async () => {
  const middleware = await koaWebpack({
    compiler,
    hotClient: {
      // port: 3000
    }
  })
  app.use(middleware)
  const server = app.listen(3001)
}

start()
