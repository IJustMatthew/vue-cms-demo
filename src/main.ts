import AppLayout from '@/layouts/AppLayout.vue'
import { createApp, markRaw } from 'vue'
import App from './App.vue'
import router from './router/router'

// Pinia store
import { createPinia } from 'pinia'

// Vee-validate
import * as validators from './plugins/vee-validators'
console.log(validators)

// Vue meta
import { createMetaManager, defaultConfig } from 'vue-meta'

// Select component
import vSelect from 'vue-select'

// Pagination component
import VueAwesomePaginate from 'vue-awesome-paginate'
import 'vue-awesome-paginate/dist/style.css'

// Toast component
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// AnimXYZ library
import '@animxyz/core'
import VueAnimXyz from '@animxyz/vue3'

// Include index.css
import '@/assets/scss/style.scss'

const app = createApp(App)
const pinia = createPinia()
const metaManager = createMetaManager(!!import.meta.env.SSR, {
  ...defaultConfig,
  ...{
    'applicable-device': {
      tag: 'meta',
      keyAttribute: 'name',
      valueAttribute: 'content',
    },
  },
})

app.use(
  pinia.use(({ store }) => {
    store.router = markRaw(router)
  })
)

app.use(pinia)
app.use(VueAnimXyz)
app.use(router)
app.use(metaManager)
app.use(VueAwesomePaginate)
app.use(Vue3Toastify, {
  autoClose: 2000,
  pauseOnHover: false,
} as ToastContainerOptions)
app.component('v-select', vSelect)
app.component('AppLayout', AppLayout)
app.mount('#app')
