import { NuxtCookies } from "./index";

// augment typings of Vue.js
import "./vue";

declare module "vue/types/vue" {
  interface Vue {
    $cookies: NuxtCookies;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $cookies: NuxtCookies
  }
}
