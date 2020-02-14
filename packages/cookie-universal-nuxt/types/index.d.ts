import { CookieSerializeOptions } from "cookie";

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

export interface NuxtCookies {
  set: (
    name: string,
    value: CookieValue,
    opts?: CookieSerializeOptions
  ) => void;
  setAll: (cookieArray: SetParams[]) => void;
  get: (name: string, opts?: GetOptions) => CookieValue;
  getAll: (opts?: GetOptions) => CookieValue[];
  remove: (name: string, opts?: CookieSerializeOptions) => void;
  removeAll: () => void;
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
}
