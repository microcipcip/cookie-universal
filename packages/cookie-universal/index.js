const Cookie = require('cookie')

module.exports = (req, res, parseJSON = true) => {
  let isClient = typeof document === 'object' && typeof document.cookie === 'string'
  let isServer = (
    typeof req === 'object' &&
    typeof res === 'object' &&
    typeof module !== 'undefined'
  )
  let isNeither = (
    (!isClient && !isServer) ||
    (isClient && isServer)
  )

  const getHeaders = (fromRes) => {
    if (isServer) {
      let h = req.headers.cookie || ''
      if (fromRes) {
        h = res.getHeaders()
        h = h['set-cookie'] ? h['set-cookie'].map((c) => c.split(';')[0]).join(';') : ''
      }
      return h
    }
    if (isClient) return document.cookie || ''
  }

  const getResponseCookies = () => {
    let cookies = res.getHeader('Set-Cookie')
    cookies = typeof cookies === 'string' ? [cookies] : cookies
    return cookies || []
  }
  const setResponseCookie = (cookieList) => res.setHeader('Set-Cookie', cookieList)

  const parseToJSON = (val, enableParsing) => {
    if (!enableParsing) return val
    try {
      return JSON.parse(val)
    } catch (err) {
      return val
    }
  }

  // public api
  const state = {
    parseJSON,

    set(name = '', value = '', opts = { path: '/' }) {
      if (isNeither) return
      value = typeof value === 'object' ? JSON.stringify(value) : value

      if (isServer) {
        const cookies = getResponseCookies()
        cookies.push(Cookie.serialize(name, value, opts))
        setResponseCookie(cookies)
      } else {
        document.cookie = Cookie.serialize(name, value, opts)
      }
    },

    setAll(cookieList = []) {
      if (isNeither) return
      if (!Array.isArray(cookieList)) return
      cookieList.forEach((cookie) => {
        const { name = '', value = '', opts = { path: '/' } } = cookie
        state.set(name, value, opts)
      })
    },

    get(name = '', opts = { fromRes: false, parseJSON: state.parseJSON }) {
      if (isNeither) return ''
      const cookies = Cookie.parse(getHeaders(opts.fromRes))
      const cookie = cookies[name]
      return parseToJSON(cookie, opts.parseJSON)
    },

    getAll(opts = { fromRes: false, parseJSON: state.parseJSON }) {
      if (isNeither) return {}
      const cookies = Cookie.parse(getHeaders(opts.fromRes))
      for (const cookie in cookies) {
        cookies[cookie] = parseToJSON(cookies[cookie], opts.parseJSON)
      }
      return cookies
    },

    remove(name = '', opts = { path: '/' }) {
      if (isNeither) return
      const cookie = state.get(name)
      opts.expires = new Date(0)
      if (cookie) state.set(name, '', opts)
    },

    removeAll() {
      if (isNeither) return
      const cookies = Cookie.parse(getHeaders())
      for (const cookie in cookies) {
        state.remove(cookie)
      }
    },

    // expose cookie library
    nodeCookie: Cookie
  }

  return state
}
