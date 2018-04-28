const { resolve } = require('path')

module.exports = async function module (moduleOptions) {
  const defaults = {
    alias: 'cookies',
    parseJSON: true
  }
  const options = Object.assign({}, defaults, moduleOptions)

  this.addPlugin({
    src: resolve(__dirname, './templates/cookie-universal-nuxt.js'),
    fileName: 'cookie-universal-nuxt.js',
    options
  })
}

module.exports.meta = require('../package.json')
