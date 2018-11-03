import { NuxtCookies } from "./index";

// augment typings of Vue.js
import "./vue";

declare module "vue/types/vue" {
  interface Vue {
    $cookies: NuxtCookies;
  }
}
