const Cookie = require('cookie')

module.exports = (req, res) => {
  const errorEnvMsg = 'Cannot detect env, something went wrong!'
  const isClient = typeof document === 'object' && typeof document.cookie === 'string'
  const isServer = (() => {
    if (
      (typeof req === 'object' && typeof res === 'object' && typeof module !== 'undefined') ||
      (process && process.env && process.env.VUE_ENV === 'server')
    ) return true
  })()

  // throw error if env cannot be detected
  if (
    (!isClient && !isServer) ||
    (isClient && isServer)
  ) throw errorEnvMsg

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

  // public api
  const state = {
    set(name = '', value = '', opts = { path: '/' }) {
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
      if (!Array.isArray(cookieList)) return
      cookieList.forEach((cookie) => {
        const { name = '', value = '', opts = { path: '/' } } = cookie
        state.set(name, value, opts)
      })
    },

    get(name = '', fromRes) {
      const cookies = Cookie.parse(getHeaders(fromRes))
      const cookie = cookies[name]
      try {
        return JSON.parse(cookie)
      } catch(err) {
        return cookie
      }
    },

    getAll(fromRes) {
      return Cookie.parse(getHeaders(fromRes))
    },

    remove(name = '', opts = { path: '/' }) {
      const cookie = state.get(name)
      opts.expires = new Date(0)
      if (cookie) state.set(name, '', opts)
    },

    removeAll() {
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
