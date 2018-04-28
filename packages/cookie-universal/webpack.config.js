const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const createConfig = (target, name) => {
  return {
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `${name}.js`,
      libraryTarget: target,
      library: 'Cookie'
    },
    module: {
      rules: [
        {
          test: [/\.js$/],
          exclude: [/node_modules/],
          loader: 'babel-loader',
          options: {
            presets: [['env']]
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([ 'dist' ]),
      new UglifyJSPlugin()
    ]
  }
}

module.exports = [
  createConfig('var', 'cookie-universal'),
  createConfig('commonjs2', 'cookie-universal-common')
]
