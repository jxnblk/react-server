const path = require('path')
const Koa = require('koa')
const koaWebpack = require('koa-webpack')
const cors = require('@koa/cors')
const webpack = require('webpack')
const StartServerPlugin = require('start-server-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const chalk = require('chalk')

const app = new Koa()

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: 'babel-loader'
  }
]

const progress = new ProgressBarPlugin({
  width: '24',
  complete: '█',
  incomplete: chalk.gray('░'),
  format: [
    chalk.magenta('[hello] :bar'),
    chalk.magenta(':percent'),
    chalk.gray(':elapseds :msg'),
  ].join(' '),
  summary: false,
  customSummary: () => {},
})

const config = {
  client: {
    stats: 'errors-only',
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
    },
    plugins: [
      progress
    ]
  }
}
config.server = Object.assign({}, config.client, {
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: [
        'webpack/hot/poll?300'
      ]
    })
  ],
  entry: [
    'webpack/hot/poll?300',
    path.resolve('src/index.js')
  ],
  output: {
    libraryTarget: 'umd',
    path: path.resolve('dist'),
    filename: 'server.js',
    publicPath: '/'
  },
  plugins: [
    progress,
    new webpack.HotModuleReplacementPlugin(),
    new StartServerPlugin({
      name: 'server.js'
    })
  ]
})

const compiler = webpack(config.client)
const serverCompiler = webpack(config.server)

compiler.hooks.done.tap('dev-server', () => {
  serverCompiler.watch({}, stats => {})
})

const start = async () => {
  const middleware = await koaWebpack({
    compiler,
    hotClient: {
      logLevel: 'error'
    },
    devMiddleware: {
      logLevel: 'error',
      stats: 'errors-only',
    }
  })
  app.use(cors())
  app.use(middleware)
  const server = app.listen(3001)
}

start()
