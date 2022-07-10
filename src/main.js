import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/router.js'
import i18n from './locales/i18n'
// import axiosConfig from './api/instance'
import Vuex from 'vuex'
import store from './store/index.js'


Vue.use(Vuex)
Vue.use(VueRouter)
Vue.config.productionTip = false
import GmapVue from 'gmap-vue'

Vue.use(GmapVue, {
  load: {
    key: 'AIzaSyC9f8svoIwJPtQuwYHEkXlF-dyxm9aKDqQ',
    libraries: 'places',
  },
  // autoBindAllEvents: false,
  installComponents: true,
  // dynamicLoad: false,
})

new Vue({
  i18n,
  render: h => h(App),
  router,
  store
}).$mount('#app')
