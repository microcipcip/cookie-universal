const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'cookie-universal.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'Cookie'
  },
  module: {
    rules: [
      {
        test: [/\.js$/],
        exclude: [/node_modules/],
        loader: 'babel-loader',
        options: { presets: ['es2015'] }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([ 'dist' ]),
    new UglifyJSPlugin()
  ]
}
