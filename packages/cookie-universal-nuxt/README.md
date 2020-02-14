# cookie-universal-nuxt
[![npm (scoped with tag)](https://img.shields.io/npm/v/cookie-universal-nuxt/latest.svg?style=flat-square)](https://npmjs.com/package/cookie-universal-nuxt)
[![npm](https://img.shields.io/npm/dt/cookie-universal-nuxt.svg?style=flat-square)](https://npmjs.com/package/cookie-universal-nuxt)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

> Universal cookie plugin for Nuxt, perfect for SSR

You can use `cookie-universal-nuxt` to set, get and remove cookies in both client and server side nuxt apps.
`cookie-universal-nuxt` parse cookies with the popular [cookie node module](https://github.com/jshttp/cookie).

## Install
- yarn: `yarn add cookie-universal-nuxt`
- npm: `npm i --save cookie-universal-nuxt`

Add `cookie-universal-nuxt` to `nuxt.config.js`:

```js
{
  modules: [
    // Simple usage
    'cookie-universal-nuxt',

    // With options
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
 ]
}
```

## ParseJSON

By default cookie-universal will try to parse to JSON, however you can disable this
functionality in several ways:

---

<details><summary>Disable globally</summary><p>

- Disable from the plugin options:

```
{
  modules: [
    ['cookie-universal-nuxt', { parseJSON: false }],
 ]
}
```
</p></details>

---

<details><summary>Disable globally on the fly</summary><p>

```js
// nuxt middleware
export default ({ app }) => {
  app.$cookies.parseJSON = false
}

// client
this.$cookies.parseJSON = false
```
</p></details>

---

<details><summary>Disable on a specific get request</summary><p>

```js
// nuxt middleware
export default ({ app }) => {
  app.$cookies.get('cookie-name', { parseJSON: false })
}

// client
this.$cookies.get('cookie-name', { parseJSON: false })
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

// nuxt middleware
export default ({ app }) => {
  app.$cookies.set('cookie-name', 'cookie-value', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
  app.$cookies.set('cookie-name', cookieValObject, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
}

// client
this.$cookies.set('cookie-name', 'cookie-value', {
  path: '/',
  maxAge: 60 * 60 * 24 * 7
})
this.$cookies.set('cookie-name', cookieValObject, {
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
  - `opts` (object): Same as the [cookie node module](https://github.com/jshttp/cookie)
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

// nuxt middleware
export default ({ app }) => {
  app.$cookies.setAll(cookieList)
}

// client
this.$cookies.setAll(cookieList)
```
</p></details>

---

<details><summary><code>get(name, opts)</code></summary><p>

- `name` (string): Cookie name to get.
- `opts`
  - `fromRes` (boolean): Get cookies from res instead of req.
  - `parseJSON` (boolean): Parse json, true by default unless overridden globally or locally.

```js
// nuxt middleware
export default ({ app }) => {
  const cookieRes = app.$cookies.get('cookie-name')
  const cookieRes = app.$cookies.get('cookie-name', { fromRes: true }) // get from res instead of req
  // returns the cookie value or undefined
}

// client
const cookieRes = this.$cookies.get('cookie-name')
// returns the cookie value or undefined
```
</p></details>

---

<details><summary><code>getAll(opts)</code></summary><p>

- `opts`
  - `fromRes` (boolean): Get cookies from res instead of req.
  - `parseJSON` (boolean): Parse json, true by default unless overridden globally or locally.

```js
// nuxt middleware
export default ({ app }) => {
  const cookiesRes = app.$cookies.getAll()
  const cookiesRes = app.$cookies.getAll({ fromRes: true }) // get from res instead of req
  // returns all cookies or {}
  //{
  //  "cookie-1": "value1",
  //  "cookie-2": "value2",
  //}
}

// client
const cookiesRes = this.$cookies.getAll()
// returns all cookies or {}
//{
//  "cookie-1": "value1",
//  "cookie-2": "value2",
//}
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
// nuxt middleware
export default ({ app }) => {
  app.$cookies.remove('cookie-name')
  app.$cookies.remove('cookie-name', {
    // this will allow you to remove a cookie
    // from a different path
    path: '/my-path'
  })
}

// client
this.$cookies.remove('cookie-name')
```
</p></details>

---

<details><summary><code>removeAll()</code></summary><p>

```js
// note that removeAll does not currently allow you
// to remove cookies that have a
// path different from '/'

// nuxt middleware
export default ({ app }) => {
  app.$cookies.removeAll()
}

// client
this.$cookies.removeAll()
```
</p></details>

---

<details><summary><code>nodeCookie</code></summary><p>

This property will expose the [cookie node module](https://github.com/jshttp/cookie) so you don't have to include it yourself.

```js

// nuxt middleware
export default ({ app }) => {
  const cookieRes = app.$cookies.nodeCookie.parse('cookie-name', 'cookie-value')
  cookieRes['cookie-name'] // returns 'cookie-value'
}

// client
const cookieRes = this.$cookies.nodeCookie.parse('cookie-name', 'cookie-value')
cookieRes['cookie-name'] // returns 'cookie-value'
```
</p></details>

---

<details><summary>Plugin options</summary><p>

- `alias` (string): Specifies the plugin alias to use.
- `parseJSON` (boolean): Disable JSON parsing.

```js
{
  modules: [
    ['cookie-universal-nuxt', { alias: 'cookiz', parseJSON: false }],
 ]
}


// usage
this.$cookiz.set('cookie-name', 'cookie-value')
```
</p></details>

## License

[MIT License](./LICENSE)

Copyright (c) Salvatore Tedde <microcipcip@gmail.com>
