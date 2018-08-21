const path = require('path')
const nodeExternals = require('webpack-node-externals')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const base = require('./webpack.config')

module.exports = Object.assign({}, base, {
  name: 'server',
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
