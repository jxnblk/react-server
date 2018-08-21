const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const chalk = require('chalk')

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
    progress,
    new AssetsPlugin()
  ]
}
