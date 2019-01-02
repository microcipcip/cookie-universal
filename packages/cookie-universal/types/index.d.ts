import { CookieSerializeOptions } from 'cookie'

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

interface ICookieRemoveOpts {
    path: string
}

interface ICookieSetOpts {
    name: string
    value: CookieValue
    opts?: object
}

interface ICookie {
    (req?: object, res?: object, opts?: boolean): {
        get: (name: string, opts?: ICookieGetOpts) => any
        getAll: (opts?: ICookieGetOpts) => object
        set: (name: string, value: CookieValue, opts?: CookieSerializeOptions) => void
        setAll: (cookieArray: ICookieSetOpts[]) => void
        remove: (name: string, opts?: ICookieRemoveOpts) => void
        removeAll: () => void
    }
}

const Cookie: ICookie

export default Cookie
