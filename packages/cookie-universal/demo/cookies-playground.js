const cookies = Cookie()

const $console = document.querySelector('.cookie-console')
const $inputName = document.querySelector('.cookie-input__name')
const $inputValue = document.querySelector('.cookie-input__value')

const $btnSet = document.querySelector('#cookie-set')
const $btnSetall = document.querySelector('#cookie-setall')

const $btnGet = document.querySelector('#cookie-get')
const $btnGetall = document.querySelector('#cookie-getall')

const $btnRemove = document.querySelector('#cookie-remove')
const $btnRemoveall = document.querySelector('#cookie-removeall')

const setConsole = (msg) => {
  const result = $console.innerHTML
  $console.innerHTML = `<p>${msg}</p>${result}`
}

const notExpiredCookie = {
  path: '/',
  maxAge: 60 * 60 * 24 * 7 // 1 week
}

const getName = () => $inputName.value
const getValue = () => $inputValue.value

$btnSet.addEventListener('click', function (e) {
  e.preventDefault()
  cookies.set(getName(), getValue(), notExpiredCookie)
  setConsole(`<strong>Setting cookie</strong>:<br> <pre>{ ${getName()}: ${cookies.get(getName())} }</pre>`)
})

$btnSetall.addEventListener('click', (e) => {
  e.preventDefault()
  const rand = Math.random()
  const cookieList = [
    { name: `${rand}1`, value: 'value1' },
    { name: `${rand}2`, value: 'value2' },
    { name: `${rand}3`, value: 'value3' },
    { name: `${rand}4`, value: 'value4' },
    { name: `${rand}5`, value: 'value5' },
    { name: `${rand}6`, value: 'value6' }
  ]
  cookies.setAll(cookieList)
  setConsole(`<strong>Setting multiple cookie</strong>:<br> <pre>${JSON.stringify(cookieList, null, 2)}</pre>`)
})

$btnGet.addEventListener('click', (e) => {
  e.preventDefault()
  setConsole(`<strong>Getting cookie</strong>:<br> <pre>{ ${getName()}: ${cookies.get(getName())} }</pre>`)
})

$btnGetall.addEventListener('click', (e) => {
  e.preventDefault()
  setConsole(`<strong>Getting all cookies</strong>:<br> <pre>${JSON.stringify(cookies.getAll(), null, 2)}</pre>`)
})

$btnRemove.addEventListener('click', (e) => {
  e.preventDefault()
  setConsole(`<strong>Removing cookie</strong>:<br> <pre>{ ${getName()}: ${cookies.get(getName())} }</pre>`)
  cookies.remove(getName())
})

$btnRemoveall.addEventListener('click', (e) => {
  e.preventDefault()
  setConsole(`<strong>Removing cookies</strong>:<br> <pre>${JSON.stringify(cookies.getAll(getName()), null, 2)}</pre>`)
  cookies.removeAll()
})
