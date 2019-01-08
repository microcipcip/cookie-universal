# cookie-universal
[![npm (scoped with tag)](https://img.shields.io/npm/v/cookie-universal/latest.svg?style=flat-square)](https://npmjs.com/package/cookie-universal)
[![npm](https://img.shields.io/npm/dt/cookie-universal.svg?style=flat-square)](https://npmjs.com/package/cookie-universal)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

> Universal cookie plugin, perfect for SSR

You can use `cookie-universal` to set, get and remove cookies in the browser, node, connect and express apps.
`cookie-universal` parse cookies with the popular [cookie node module](https://github.com/jshttp/cookie).

## Install
- yarn: `yarn add cookie-universal`
- npm: `npm i --save cookie-universal`

## Usage

```js
// server
app.get('/', (req, res) => {
  const cookies = require('cookie-universal')(req, res)
  cookies.set('cookie-name', 'cookie-value')
})

// browser, from import
import Cookie from 'cookie-universal'
const cookies = Cookie()
cookies.set('cookie-name', 'cookie-value')

// browser, from dist
// note: include dist/cookie-universal.js
const cookies = Cookie()
cookies.set('cookie-name', 'cookie-value')
```

## ParseJSON

By default cookie-universal will try to parse to JSON, however you can disable this
functionality in several ways:

---

<details><summary>Disable globally</summary><p>

```js
// server
const parseJSON = false
app.get('/', (req, res) => {
  const cookies = require('cookie-universal')(req, res, parseJSON)
})

// browser, from import
import Cookie from 'cookie-universal'
const parseJSON = false
const cookies = Cookie(false, false, parseJSON)
```
</p></details>

---

<details><summary>Disable globally on the fly</summary><p>

```js
// server
app.get('/', (req, res) => {
  const cookies = require('cookie-universal')(req, res)
  cookies.parseJSON = false
})

// browser, from import
import Cookie from 'cookie-universal'
const cookies = Cookie(false, false)
cookies.parseJSON = false
```
</p></details>

---

<details><summary>Disable on a specific get request</summary><p>

```js
// server
app.get('/', (req, res) => {
  const cookies = require('cookie-universal')(req, res)
  cookies.set('cookie-name', 'cookie-value')
  cookies.get('cookie-name', { parseJSON: false })
})

// browser, from import
import Cookie from 'cookie-universal'
const cookies = Cookie(false, false)
cookies.set('cookie-name', 'cookie-value')
cookies.get('cookie-name', { parseJSON: false })
```
</p></details>

## Api

<details><summary><code>set(name, value, opts)</code></summary><p>

- `name` (string): Cookie name to set.
- `value` (string|object): Cookie value.
- `opts` (object): Same as the [cookie node module](https://github.com/jshttp/cookie).
  - `path` (string): Specifies the value for the Path Set-Cookie attribute. By default, the path is considered the "default path".
  - `expires` (date): Specifies the Date object to be the value for the Expires Set-Cookie attribute.
  - `maxAge` (number): Specifies the number (in seconds) to be the value for the Max-Age Set-Cookie attribute.
  - `httpOnly` (boolean): Specifies the boolean value for the [HttpOnly Set-Cookie attribute][rfc-6265-5.2.6].
  - `domain` (string): specifies the value for the Domain Set-Cookie attribute.
  - `encode` (function): Specifies a function that will be used to encode a cookie's value.
  - `sameSite` (boolean|string): Specifies the value for the Path Set-Cookie attribute. By default, the path is considered the "default path".
  - `secure` (boolean): Specifies the boolean value for the Secure Set-Cookie attribute.

```js
const cookieValObject = { param1: 'value1', param2: 'value2' }

// server
app.get('/', (req, res) => {
  const cookies = require('cookie-universal')(req, res)
  cookies.set('cookie-name', 'cookie-value', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
  cookies.set('cookie-name', cookieValObject, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
})

// client
import Cookie from 'cookie-universal'
const cookies = Cookie()
cookies.set('cookie-name', 'cookie-value', {
  path: '/',
  maxAge: 60 * 60 * 24 * 7
})
cookies.set('cookie-name', cookieValObject, {
  path: '/',
  maxAge: 60 * 60 * 24 * 7
})
```
</p></details>

---

<details><summary><code>setAll(cookieArray)</code></summary><p>

- cookieArray (array)
  - `name` (string): Cookie name to set.
  - `value` (string|object): Cookie value.
  - `opts` (object): Same as the [cookie node module](https://github.com/jshttp/cookie).
    - `path` (string): Specifies the value for the Path Set-Cookie attribute. By default, the path is considered the "default path".
    - `expires` (date): Specifies the Date object to be the value for the Expires Set-Cookie attribute.
    - `maxAge` (number): Specifies the number (in seconds) to be the value for the Max-Age Set-Cookie attribute.
    - `httpOnly` (boolean): Specifies the boolean value for the [HttpOnly Set-Cookie attribute][rfc-6265-5.2.6].
    - `domain` (string): specifies the value for the Domain Set-Cookie attribute.
    - `encode` (function): Specifies a function that will be used to encode a cookie's value.
    - `sameSite` (boolean|string): Specifies the value for the Path Set-Cookie attribute. By default, the path is considered the "default path".
    - `secure` (boolean): Specifies the boolean value for the Secure Set-Cookie attribute.

```js
const options = {
  path: '/',
  maxAge: 60 * 60 * 24 * 7
}
const cookieList = [
  { name: 'cookie-name1', value: 'value1', opts: options },
  { name: 'cookie-name2', value: 'value2', opts: options },
  { name: 'cookie-name3', value: 'value3', opts: options },
  { name: 'cookie-name4', value: 'value4', opts: options }
]

// server
app.get('/', (req, res) => {
  const cookies = require('cookie-universal')(req, res)
  cookies.setAll(cookieList)
})

// client
import Cookie from 'cookie-universal'
const cookies = Cookie()
cookies.setAll(cookieList)
```
</p></details>

---

<details><summary><code>get(name, opts)</code></summary><p>

- `name` (string): Cookie name to get.
- `opts`
  - `fromRes` (boolean): Get cookies from res instead of req.
  - `parseJSON` (boolean): Parse json, true by default unless overridden globally or locally.

```js
// server
app.get('/', (req, res) => {
  const cookies = require('cookie-universal')(req, res)
  const cookieRes = cookies.get('cookie-name')
  const cookieRes = cookies.get('cookie-name', { fromRes: true }) // get from res instead of req
  // returns the cookie value or undefined
})

// client
import Cookie from 'cookie-universal'
const cookies = Cookie()
const cookieRes = cookies.get('cookie-name')
// returns the cookie value or undefined
```
</p></details>

---

<details><summary><code>getAll(opts)</code></summary><p>

- `opts`
  - `fromRes` (boolean): Get cookies from res instead of req.
  - `parseJSON` (boolean): Parse json, true by default unless overridden globally or locally.

```js
// server
app.get('/', (req, res) => {
  const cookies = require('cookie-universal')(req, res)
  const cookiesRes = cookies.getAll()
  const cookiesRes = cookies.getAll({ fromRes: true }) // get from res instead of req
  // returns all cookies or {}
  {
    "cookie-1": "value1",
    "cookie-2": "value2",
  }
})

// client
import Cookie from 'cookie-universal'
const cookies = Cookie()
const cookiesRes = cookies.getAll()
// returns all cookies or {}
{
  "cookie-1": "value1",
  "cookie-2": "value2",
}
```
</p></details>

---

<details><summary><code>remove(name, opts)</code></summary><p>

- `name` (string): Cookie name to remove.
- `opts`
  - `path` (string): Specifies the value for the Path Set-Cookie attribute. By default, the path is considered the "default path".
  - `expires` (date): Specifies the Date object to be the value for the Expires Set-Cookie attribute.
  - `maxAge` (number): Specifies the number (in seconds) to be the value for the Max-Age Set-Cookie attribute.
  - `httpOnly` (boolean): Specifies the boolean value for the [HttpOnly Set-Cookie attribute][rfc-6265-5.2.6].
  - `domain` (string): specifies the value for the Domain Set-Cookie attribute.
  - `encode` (function): Specifies a function that will be used to encode a cookie's value.
  - `sameSite` (boolean|string): Specifies the value for the Path Set-Cookie attribute. By default, the path is considered the "default path".
  - `secure` (boolean): Specifies the boolean value for the Secure Set-Cookie attribute.

```js
// server
app.get('/', (req, res) => {
  const cookies = require('cookie-universal')(req, res)
  cookies.remove('cookie-name')
  cookies.remove('cookie-name', {
    // this will allow you to remove a cookie
    // from a different path
    path: '/my-path'
  })
})

// client
import Cookie from 'cookie-universal'
const cookies = Cookie()
cookies.remove('cookie-name')
```
</p></details>

---

<details><summary><code>removeAll()</code></summary><p>

```js
// note that removeAll does not currently allow you
// to remove cookies that have a
// path different from '/'

// server
app.get('/', (req, res) => {
  const cookies = require('cookie-universal')(req, res)
  cookies.removeAll()
})

// client
import Cookie from 'cookie-universal'
const cookies = Cookie()
cookies.removeAll()
```
</p></details>

---

<details><summary><code>nodeCookie</code></summary><p>

This property will expose the [cookie node module](https://github.com/jshttp/cookie) so you don't have to include it yourself.

```js

// server
app.get('/', (req, res) => {
  const cookies = require('cookie-universal')(req, res)
  const cookieRes = cookies.nodeCookie.parse('cookie-name', 'cookie-value')
  cookieRes['cookie-name'] // returns 'cookie-value'
})

// client
import Cookie from 'cookie-universal'
const cookies = Cookie()
const cookieRes = cookies.nodeCookie.parse('cookie-name', 'cookie-value')
cookieRes['cookie-name'] // returns 'cookie-value'
```
</p></details>


## License

[MIT License](./LICENSE)

Copyright (c) Salvatore Tedde <microcipcip@gmail.com>

