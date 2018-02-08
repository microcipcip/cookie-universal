const express = require('express')
const app = express()
const port = 8080
const Cookie = require('../index')

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

app.use((req, res, next) => {
  const fileType = req.url.split('.')[1]
  if (fileType === 'html') testCookies(req, res)
  next()
})
app.use(express.static('./'))

app.listen(port, () => {
  console.log(`You can access the demo from http://localhost:${port}/demo/index.html`)
})
