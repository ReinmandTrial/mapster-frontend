import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/router.js'
import i18n from './locales/i18n'



Vue.use(VueRouter)
Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  router,
  i18n
}).$mount('#app')
