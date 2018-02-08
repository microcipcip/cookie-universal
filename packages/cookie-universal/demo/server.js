const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const port = 8080
const Cookie = require('../index')

const mimeTypes = {
  'html': 'text/html',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'png': 'image/png',
  'js': 'text/javascript',
  'css': 'text/css'
}

const testCookies = (req, res) => {
  const cookies = Cookie(req, res)

  // set cookie
  cookies.set('node', 'setting cookie', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })

  cookies.set('node-again', 'setting cookie again', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })

  // cookies.remove('node-again')

  const rand = Math.random()
  const cookieList = [
    { name: `${rand}1`, value: 'value1' },
    { name: `${rand}2`, value: 'value2' },
    { name: `${rand}3`, value: 'value3' },
    { name: `${rand}4`, value: 'value4' },
    { name: `${rand}5`, value: 'value5' },
    { name: `${rand}6`, value: 'value6', opts: { path: '/', httpOnly: true } }
  ]
  cookies.setAll(cookieList)
}

http.createServer((req, res) => {
  const uri = url.parse(req.url).pathname
  const filename = path.join(process.cwd(), uri)
  fs.exists(filename, (exists) => {
    if(!exists) {
      res.writeHead(200, {'Content-Type': 'text/plain'})
      res.write('404 Not Found\n')
      res.end()
      return
    }
    const mimeType = mimeTypes[path.extname(filename).split('.')[1]]

    // run only on html
    if (mimeType === 'text/html') testCookies(req, res)

    res.writeHead(200, { 'Content-Type': mimeType })

    const fileStream = fs.createReadStream(filename)
    fileStream.pipe(res)
  })
}).listen(port, () => {
  console.log(`You can access the demo from http://localhost:${port}/demo/index.html`)
})
