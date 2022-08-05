import { CookieParseOptions, CookieSerializeOptions } from 'cookie'

type CookieValue = any

interface ICookieGetOpts {
  fromRes?: boolean
  parseJSON?: boolean
}

interface ICookieSetOpts {
  name: string
  value: CookieValue
  opts?: CookieSerializeOptions
}

interface NodeCookie {
  parse(str: string, options?: CookieParseOptions): Record<string, string>
  serialize(name: string, value: string, options?: CookieSerializeOptions): string
}

export interface ICookie {
  get: (name: string, opts?: ICookieGetOpts) => any
  getAll: (opts?: ICookieGetOpts) => object
  set: (
    name: string,
    value: CookieValue,
    opts?: CookieSerializeOptions
  ) => void
  setAll: (cookieArray: ICookieSetOpts[]) => void
  remove: (name: string, opts?: CookieSerializeOptions) => void
  removeAll: () => void
  nodeCookie: NodeCookie
}

export default function (req?: object, res?: object, opts?: boolean): ICookie
