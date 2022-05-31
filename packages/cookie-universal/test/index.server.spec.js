/* eslint no-unused-expressions: "off" */
/* eslint handle-callback-err: "off" */

const chai = require('chai')
const expect = chai.expect
const NodeCookie = require('cookie')
const Cookie = require('../index')
const dateFns = require('date-fns')
chai.use(require('chai-http'))

const appBuilder = routes => {
  const express = require('express')
  const app = express()
  const port = 8000

  routes.forEach(route => {
    app.get(route.path || '/', (req, res) => route.cb(req, res))
  })

  return app.listen(port)
}

const getCookies = res => {
  const cookieArr = res.headers['set-cookie']
  if (Array.isArray(cookieArr)) {
    return cookieArr.map(cookie => NodeCookie.parse(cookie))
  } else {
    return false
  }
}

const getCookieValue = (cookies, i) => {
  const filterKey = Object.keys(cookies[i])[0]
  return cookies[i][filterKey]
}

let server, agent, rand, cookieList
let oneWeek = 60 * 60 * 24 * 7
const cookieName = `test-cookie`
const cookieContent = `thisIsATestCookie`

const buildAll = routes => {
  server = appBuilder(routes)
  agent = chai.request.agent(server)
}

describe(`Server`, () => {
  beforeEach(() => {
    rand = Math.random()
    cookieList = [
      { name: `${rand}1`, value: 'value1' },
      { name: `${rand}2`, value: 'value2' },
      { name: `${rand}3`, value: 'value3' },
      { name: `${rand}4`, value: 'value4' },
      { name: `${rand}5`, value: 'value5' },
      { name: `${rand}6`, value: 'value6' },
    ]
  })
  afterEach(() => {
    if (server) server.close()
  })

  describe(`Set cookie`, () => {
    it(`should set a cookie when no options are passed`, done => {
      buildAll([
        {
          cb(req, res) {
            let cookies = Cookie(req, res)
            cookies.set(cookieName, cookieContent)
            res.end()
          },
        },
      ])

      agent.get('/').end((err, res) => {
        expect(res).to.have.cookie(cookieName, cookieContent)
        done()
      })
    })

    it(`should set a cookie with positive maxAge`, done => {
      buildAll([
        {
          cb(req, res) {
            let cookies = Cookie(req, res)
            cookies.set(cookieName, cookieContent, {
              path: '/',
              maxAge: oneWeek,
            })
            res.end()
          },
        },
      ])

      agent.get('/').end((err, res) => {
        const cookie = getCookies(res)[0]
        expect(res).to.have.cookie(cookieName)
        expect(Number(cookie['Max-Age']) > -1).to.be.true
        done()
      })
    })

    it(`should not set a cookie with negative maxAge`, done => {
      buildAll([
        {
          cb(req, res) {
            let cookies = Cookie(req, res)
            cookies.set(cookieName, cookieContent, {
              path: '/',
              maxAge: -1,
            })
            res.end()
          },
        },
      ])

      agent.get('/').end((err, res) => {
        // the cookie is available here but the
        // browser will not actually set it
        // if it is negative
        const cookie = getCookies(res)[0]
        expect(Number(cookie['Max-Age']) === -1).to.be.true
        done()
      })
    })

    it(`should set a cookie with positive expires`, done => {
      buildAll([
        {
          cb(req, res) {
            let cookies = Cookie(req, res)
            cookies.set(cookieName, cookieContent, {
              path: '/',
              expires: dateFns.addWeeks(new Date(), 1),
            })
            res.end()
          },
        },
      ])

      agent.get('/').end((err, res) => {
        const cookie = getCookies(res)[0]
        expect(res).to.have.cookie(cookieName)
        expect(dateFns.isFuture(cookie['Expires'])).to.be.true
        done()
      })
    })

    it(`should not set a cookie with negative expires`, done => {
      buildAll([
        {
          cb(req, res) {
            let cookies = Cookie(req, res)
            cookies.set(cookieName, cookieContent, {
              path: '/',
              expires: dateFns.subSeconds(new Date(), 10),
            })
            res.end()
          },
        },
      ])

      agent.get('/').end((err, res) => {
        const cookie = getCookies(res)[0]
        // the cookie is available here but the
        // browser will not actually set it
        // if the date is negative
        expect(dateFns.isPast(cookie['Expires'])).to.be.true
        done()
      })
    })
  })

  describe(`Set all cookies`, done => {
    it(`should set multiple cookies`, done => {
      buildAll([
        {
          cb(req, res) {
            let cookies = Cookie(req, res)
            cookies.setAll(cookieList)
            res.end()
          },
        },
      ])

      agent.get('/').end((err, res) => {
        let cookies = getCookies(res)
        cookieList.forEach((cookie, i) => {
          const filterValue = getCookieValue(cookies, i)
          expect(filterValue).to.have.string(cookie.value)
          expect(filterValue).to.not.have.string(cookie.value + 1)
        })
        done()
      })
    })
  })

  describe(`Get cookie`, () => {
    it(`should get a cookie with same name`, done => {
      buildAll([
        {
          cb(req, res) {
            let cookies = Cookie(req, res)
            cookies.set(cookieName, cookieContent)
            res.end(cookies.get(cookieName, { fromRes: true }))
          },
        },
      ])

      agent.get('/').end((err, res) => {
        expect(res.text).to.have.string(cookieContent)
        done()
      })
    })

    it(`should not get a cookie with different name`, done => {
      buildAll([
        {
          cb(req, res) {
            let cookies = Cookie(req, res)
            cookies.set(cookieName, cookieContent)
            res.end(cookies.get(cookieName, { fromRes: true }))
          },
        },
      ])

      agent.get('/').end((err, res) => {
        expect(res.text).to.not.have.string(cookieContent + 1)
        done()
      })
    })

    it(`should not get a cookie with different path`, done => {
      buildAll([
        {
          cb(req, res) {
            let cookies = Cookie(req, res)
            cookies.set(cookieName, cookieContent, {
              path: '/hello',
            })
            res.end(cookies.get(cookieName, { fromRes: true }))
          },
        },
      ])

      agent.get('/').end((err, res) => {
        let cookies = getCookies(res)[0]
        expect(cookies['Path']).to.not.equal('/')
        done()
      })
    })
  })

  describe(`Get all cookies`, done => {
    it(`should get all cookies`, done => {
      buildAll([
        {
          cb(req, res) {
            let cookies = Cookie(req, res)
            cookies.setAll(cookieList)
            res.end()
          },
        },
      ])

      agent.get('/').end((err, res) => {
        let cookies = getCookies(res)
        cookieList.forEach((cookie, i) => {
          const filterValue = getCookieValue(cookies, i)
          expect(filterValue).to.have.string(cookie.value)
          expect(filterValue).to.not.have.string(cookie.value + 1)
        })
        done()
      })
    })
  })

  describe(`Remove cookie`, () => {
    it(`should remove a cookie`, done => {
      buildAll([
        {
          cb(req, res) {
            let cookies = Cookie(req, res)
            cookies.set(cookieName, cookieContent)
            res.end()
          },
        },
        {
          path: '/get',
          cb(req, res) {
            let cookies = Cookie(req, res)
            cookies.remove(cookieName)
            res.end()
          },
        },
      ])

      agent.get('/').then(res => {
        expect(res).to.have.cookie(cookieName)
        return agent.get('/get').then(res => {
          let cookies = getCookies(res)[0]
          // the cookie is available here but the
          // browser will not actually set it
          // if the date is negative
          expect(dateFns.isPast(cookies['Expires'])).to.be.true
          done()
        })
      })
    })

    it(`should remove a cookie removed in the same response`, done => {
      buildAll([
        {
          cb(req, res) {
            let cookies = Cookie(req, res)
            cookies.set(cookieName, cookieContent)
            cookies.remove(cookieName)
            res.end()
          },
        },
      ])

      agent.get('/').then(res => {
        let cookies = getCookies(res)[0]
        expect(res).not.to.have.cookie(cookieName)
        done()
      })
    })

    it(`should remove a cookie even if it is a falsy value`, done => {
      buildAll([
        {
          cb(req, res) {
            let cookies = Cookie(req, res)
            cookies.set(cookieName, 0)
            res.end()
          },
        },
        {
          path: '/get',
          cb(req, res) {
            let cookies = Cookie(req, res)
            cookies.remove(cookieName)
            res.end()
          },
        },
      ])

      agent.get('/').then(res => {
        expect(res).to.have.cookie(cookieName)
        return agent.get('/get').then(res => {
          let cookies = getCookies(res)[0]
          expect(dateFns.isPast(cookies['Expires'])).to.be.true
          done()
        })
      })
    })
  })

  describe(`Remove all cookies`, () => {
    it(`should remove all cookies`, done => {
      buildAll([
        {
          cb(req, res) {
            let cookies = Cookie(req, res)
            cookies.setAll(cookieList)
            res.end()
          },
        },
        {
          path: '/get',
          cb(req, res) {
            let cookies = Cookie(req, res)
            cookies.removeAll()
            res.end()
          },
        },
      ])

      agent.get('/').then(res => {
        let cookies = getCookies(res)
        cookieList.forEach((cookie, i) => {
          const filterValue = getCookieValue(cookies, i)
          expect(filterValue).to.have.string(cookie.value)
        })
        return agent.get('/get').then(res => {
          let cookies = getCookies(res)
          // the cookies are available here but the
          // browser will not actually set them
          // if the date is negative
          cookieList.forEach((cookie, i) => {
            const filterExpires = cookies[i].Expires
            expect(dateFns.isPast(filterExpires)).to.be.true
          })
          done()
        })
      })
    })
  })
})
