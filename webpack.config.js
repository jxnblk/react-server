const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

const isDev = process.env.NODE_ENV === 'development'

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
    chalk.blue('[client] :bar'),
    chalk.blue(':percent'),
    chalk.gray(':elapseds :msg'),
  ].join(' '),
  summary: false,
  customSummary: () => {},
})

module.exports = {
  stats: 'errors-only',
  mode: isDev ? 'development' : 'production',
  entry: [
    path.resolve('src/client.js')
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'main.js',
    publicPath: isDev ? 'http://localhost:3001/' : '/'
  },
  module: {
    rules
  },
  plugins: [
    progress
  ]
}
