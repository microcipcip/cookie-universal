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

## Api

<details><summary><code>set(name, value, opts)</code></summary><p>

The options are the same of the [cookie node module](https://github.com/jshttp/cookie) 

- `name` (string): Cookie name to set
- `value` (string|object): Cookie value
- `opts` (object): Same as the [cookie node module](https://github.com/jshttp/cookie) 

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

The options are the same of the [cookie node module](https://github.com/jshttp/cookie) 

- cookieArray (array)
  - `name` (string): Cookie name to set
  - `value` (string|object): Cookie value
  - `opts` (object): Same as the [cookie node module](https://github.com/jshttp/cookie) 

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
const cookies = Cookie()
cookies.setAll(cookieList)
```
</p></details>

---

<details><summary><code>get(name, fromRes)</code></summary><p>

- `name` (string): Cookie name to get
- `fromRes` (boolean): Get cookies from res instead of req 
 
```js
// server
app.get('/', (req, res) => {
  const cookies = require('cookie-universal')(req, res)
  const cookieRes = cookies.get('cookie-name') 
  const cookieRes = cookies.get('cookie-name', true) // get from res instead of req 
  // returns the cookie value or undefined
})

// client
const cookies = Cookie()
const cookieRes = cookies.get('cookie-name') 
// returns the cookie value or undefined
```
</p></details>

---

<details><summary><code>getAll(fromRes)</code></summary><p>

- `fromRes` (boolean): Get cookies from res instead of req 

```js
// server
app.get('/', (req, res) => {
  const cookies = require('cookie-universal')(req, res)
  const cookiesRes = cookies.getAll() 
  const cookiesRes = cookies.getAll(true) // get from res instead of req 
  // returns all cookies or []
  [
    {
      "name": "cookie-1",
      "value": "value1"
    },
    {
      "name": "cookie-2",
      "value": "value2"
    }
  ]
})

// client
const cookies = Cookie()
const cookiesRes = cookies.getAll() 
// returns all cookies or []
[
  {
    "name": "cookie-1",
    "value": "value1"
  },
  {
    "name": "cookie-2",
    "value": "value2"
  }
]
```
</p></details>

---

<details><summary><code>remove(name, opts)</code></summary><p>

- `name` (string): Cookie name to remove
- `opts` (object): Set the path to remove the cookie from a specific location
  
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
const cookies = Cookie()
cookies.removeAll() 
```
</p></details>

---

<details><summary>Options</summary><p>

The options are the same of the [cookie node module](https://github.com/jshttp/cookie) 

- ### Get options
  - `decode` (function): Specifies a function that will be used to decode a cookie's value.

- ### Set options
  - `path` (string): Specifies the value for the Path Set-Cookie attribute. By default, the path is considered the "default path".
  - `expires` (date): Specifies the Date object to be the value for the Expires Set-Cookie attribute. 
  - `maxAge` (number): Specifies the number (in milliseconds) to be the value for the Max-Age Set-Cookie attribute.
  - `httpOnly` (boolean): Specifies the boolean value for the [HttpOnly Set-Cookie attribute][rfc-6265-5.2.6].
  - `domain` (string): specifies the value for the Domain Set-Cookie attribute. 
  - `encode` (function): Specifies a function that will be used to encode a cookie's value.  
  - `sameSite` (boolean|string): Specifies the value for the Path Set-Cookie attribute. By default, the path is considered the "default path". 
  - `secure` (boolean): Specifies the boolean value for the Secure Set-Cookie attribute. 
</p></details>

## License

[MIT License](./LICENSE)

Copyright (c) Salvatore Tedde <microcipcip@gmail.com>

