import '@babel/polyfill'
import 'mutationobserver-shim'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPen, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'

library.add([faPen, faTrash, faUpload])

import "vue-toastification/dist/index.css";
import store from './store'

import { createApp } from 'vue'
import App from './App.vue'

import Toast from "vue-toastification";
import router from './router'
import 'bulma-accordion/dist/js/bulma-accordion.min.js'
let app;

store.dispatch("profile/onAuthChange", () => {
  if(!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .use(Toast)
      .component("fai", FontAwesomeIcon)
      .mount('#app')
  }
})