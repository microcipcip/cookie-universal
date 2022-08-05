import { CookieParseOptions, CookieSerializeOptions } from "cookie";

// augment typings of Vue.js
import "./vue";

type CookieValue = any;

interface GetOptions {
  fromRes?: boolean;
  parseJSON?: boolean;
}

interface SetParams {
  name: string;
  value: CookieValue;
  opts?: CookieSerializeOptions;
}

interface NodeCookie {
  parse(str: string, options?: CookieParseOptions): Record<string, string>;
  serialize(name: string, value: string, options?: CookieSerializeOptions): string;
}

export interface NuxtCookies {
  set: (
    name: string,
    value: CookieValue,
    opts?: CookieSerializeOptions
  ) => void;
  setAll: (cookieArray: SetParams[]) => void;
  get: <T = CookieValue>(name: string, opts?: GetOptions) => T;
  getAll: <T = CookieValue[]>(opts?: GetOptions) => T;
  remove: (name: string, opts?: CookieSerializeOptions) => void;
  removeAll: () => void;
  nodeCookie: NodeCookie;
}

declare module "@nuxt/vue-app" {
  interface NuxtAppOptions {
    $cookies: NuxtCookies;
  }
}
// Nuxt 2.9+
declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $cookies: NuxtCookies;
  }

  interface Context {
    $cookies: NuxtCookies;
  }
}
