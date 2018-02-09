/* eslint no-unused-expressions: "off" */

const dateFns = require('date-fns')
const fs = require('fs')
const expect = require('chai').expect
const { JSDOM } = require('jsdom')
const Cookie = fs.readFileSync('dist/cookie-universal.js', { encoding: 'utf-8' })

let window, cookies, rand, cookieList
let oneWeek = 60 * 60 * 24 * 7

describe(`Browser`, () => {
  beforeEach(() => {
    window = (new JSDOM(``, { runScripts: 'dangerously' })).window
    const scriptEl = window.document.createElement('script')
    scriptEl.textContent = Cookie
    window.document.body.appendChild(scriptEl)
    cookies = window.Cookie()

    rand = Math.random()
    cookieList = [
      { name: `${rand}1`, value: 'value1' },
      { name: `${rand}2`, value: 'value2' },
      { name: `${rand}3`, value: 'value3' },
      { name: `${rand}4`, value: 'value4' },
      { name: `${rand}5`, value: 'value5' },
      { name: `${rand}6`, value: 'value6' }
    ]
  })

  describe(`Set cookie`, () => {
    it(`should set a cookie when no options are passed`, () => {
      const cookieName = `test-cookie`
      const cookieContent = `this is a test cookie`
      cookies.set(cookieName, cookieContent)
      expect(cookies.get(cookieName)).to.have.string(cookieContent)
    })

    it(`should set a cookie object and parse it`, () => {
      const cookieName = `test-cookie`
      const cookieContent = { param1: 'value1', param2: 'value2' }
      cookies.set(cookieName, cookieContent)

      const cookie = cookies.get(cookieName)
      expect(cookie).to.deep.equal(cookieContent)
      expect(cookie.param1).to.have.string(cookieContent.param1)
    })

    it(`should set a cookie with positive maxAge`, () => {
      const cookieName = `test-cookie`
      const cookieContent = `this is a test cookie`
      cookies.set(cookieName, cookieContent, {
        path: '/',
        maxAge: oneWeek
      })
      expect(cookies.get(cookieName)).to.have.string(cookieContent)
    })

    it(`should not set a cookie with negative maxAge`, () => {
      const cookieName = 'test-cookie'
      const cookieContent = 'this is a test cookie'
      cookies.set(cookieName, cookieContent, {
        path: '/',
        maxAge: -1
      })
      expect(cookies.get(cookieName)).to.be.undefined
    })

    it(`should set a cookie with positive expires`, () => {
      const cookieName = `test-cookie`
      const cookieContent = `this is a test cookie`
      cookies.set(cookieName, cookieContent, {
        path: '/',
        expires: dateFns.addWeeks(new Date(), 1)
      })
      expect(cookies.get(cookieName)).to.have.string(cookieContent)
    })

    it(`should not set a cookie with negative expires`, () => {
      const cookieName = 'test-cookie'
      const cookieContent = 'this is a test cookie'
      cookies.set(cookieName, cookieContent, {
        path: '/',
        expires: dateFns.subSeconds(new Date(), 30)
      })
      expect(cookies.get(cookieName)).to.be.undefined
    })
  })

  describe(`Set all cookies`, () => {
    it(`should set multiple cookies`, () => {
      cookies.setAll(cookieList)
      cookieList.forEach((cookie) => {
        expect(cookies.get(cookie.name)).to.have.string(cookie.value)
        expect(cookies.get(cookie.name)).to.not.have.string(cookie.value + 1)
      })
    })
  })

  describe(`Get cookie`, () => {
    it(`should get a cookie with same name`, () => {
      const cookieName = `test-cookie`
      const cookieContent = `this is a test cookie`
      cookies.set(cookieName, cookieContent, {
        path: '/',
        maxAge: oneWeek
      })
      expect(cookies.get(cookieName)).to.have.string(cookieContent)
    })

    it(`should not get a cookie with different name`, () => {
      const cookieName = `test-cookie`
      const cookieContent = `this is a test cookie`
      cookies.set(cookieName, cookieContent, {
        path: '/',
        maxAge: oneWeek
      })
      expect(cookies.get(cookieName + 1)).to.be.undefined
    })

    it(`should not get a cookie with different path`, () => {
      const cookieName = `test-cookie`
      const cookieContent = `this is a test cookie`
      cookies.set(cookieName, cookieContent, {
        path: '/custom/path',
        maxAge: oneWeek
      })
      expect(cookies.get(cookieName)).to.be.undefined
    })

    it(`should get a cookie with value set as an object`, () => {
      const cookieName = `test-cookie`
      const cookieContent = { param1: 'value1', param2: 'value2' }
      cookies.set(cookieName, cookieContent)
      const cookie = cookies.get(cookieName)
      expect(cookie.param1).to.have.string(cookieContent.param1)
    })
  })

  describe(`Get all cookies`, () => {
    it(`should get all cookies`, () => {
      cookies.setAll(cookieList)

      for (let cookieName in cookies.getAll()) {
        const cookieExists = cookieList.some((cookie) => cookie.name === cookieName)
        expect(cookieExists).to.be.true
      }
      expect(cookies.get('random')).to.be.undefined
    })
  })

  describe(`Remove cookie`, () => {
    it(`should remove a cookie`, () => {
      const cookieName = `test-cookie`
      const cookieContent = `this is a test cookie`
      cookies.set(cookieName, cookieContent, {
        path: '/',
        maxAge: oneWeek
      })

      cookies.remove(cookieName)
      expect(cookies.get(cookieName)).to.be.undefined
    })
  })

  describe(`Remove all cookies`, () => {
    it(`should remove all cookies`, () => {
      cookies.setAll(cookieList)
      cookies.removeAll()
      for (let cookieName in cookies.getAll()) {
        const cookieExists = cookieList.some((cookie) => cookie.name === cookieName)
        expect(cookieExists).to.be.false
      }
    })
  })
})
