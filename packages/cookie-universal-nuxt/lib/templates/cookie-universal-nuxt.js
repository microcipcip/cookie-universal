import cookieUniversal from 'cookie-universal'


export default ({ req, res }, inject) => {
  inject(options.alias, cookieUniversal(req, res))
}
