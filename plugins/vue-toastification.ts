import { defineNuxtPlugin } from '#app'
import Toast, { type PluginOptions, type POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import ProductToast from '@/components/ProductToast.vue'

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    position: 'top-right' as POSITION,
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: false,
    rtl: false
  }

  nuxtApp.vueApp.use(Toast, options)
  nuxtApp.vueApp.component('ProductToast', ProductToast)
}) 