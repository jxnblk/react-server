const path = require('path')
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const chalk = require('chalk')

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: 'babel-loader'
  }
]

const client = {
  name: 'client',
  mode: 'production',
  entry: [
    path.resolve('src/client.js')
  ],
  output: {
    path: path.resolve('dist/public'),
    filename: 'main.js',
    publicPath: '/'
  },
  module: {
    rules
  },
  plugins: [
    new ProgressBarPlugin({
      width: '24',
      complete: '█',
      incomplete: chalk.gray('░'),
      format: [
        chalk.cyan('[client] :bar'),
        chalk.cyan(':percent'),
        chalk.gray(':elapseds :msg'),
      ].join(' '),
      summary: false,
      customSummary: () => {},
    }),
  ]
}

const server = Object.assign({}, client, {
  name: 'server',
  target: 'node',
  externals: [
    nodeExternals()
  ],
  entry: path.resolve('src/index.js'),
  output: {
    libraryTarget: 'umd',
    path: path.resolve('dist'),
    filename: 'server.js',
    publicPath: '/'
  },
  plugins: [
    new ProgressBarPlugin({
      width: '24',
      complete: '█',
      incomplete: chalk.gray('░'),
      format: [
        chalk.magenta('[server] :bar'),
        chalk.magenta(':percent'),
        chalk.gray(':elapseds :msg'),
      ].join(' '),
      summary: false,
      customSummary: () => {},
    })
  ]
})

module.exports = [ client, server ]
module.exports.client = client
module.exports.server = server
