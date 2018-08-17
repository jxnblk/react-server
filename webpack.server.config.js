const path = require('path')
const nodeExternals = require('webpack-node-externals')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const base = require('./webpack.config')

const isDev = process.env.NODE_ENV === 'development'

module.exports = Object.assign({}, base, {
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: [
        'webpack/hot/poll?300'
      ]
    })
  ],
  entry: [
    isDev ? 'webpack/hot/poll?300' : null,
    path.resolve('src/index.js')
  ].filter(Boolean),
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
