import cookieUniversal from 'cookie-universal'

export default ({ req, res }, inject) => {
  const options = <%= JSON.stringify(options, null, 2) %>
  inject(options.alias, cookieUniversal(req, res, options.parseJSON))
}
