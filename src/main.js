import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/router.js'
import i18n from './locales/i18n'
import axiosConfig from './api/instance'


Vue.use(VueRouter)
Vue.config.productionTip = false


new Vue({
  i18n,
  axiosConfig,
  render: h => h(App),
  router,
}).$mount('#app')
