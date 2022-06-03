import VueRouter from 'vue-router'
import ExcursionsHome from '../components/pages/services/excursions/Home.vue'
import ExcursionsCountry from '../components/pages/services/excursions/Country.vue'
import ExcursionsTown from '../components/pages/services/excursions/Town.vue'

export default new VueRouter({
   mode: 'history',
   routes: [
      {
         path: '/home',
         name: 'ExcursionsHome',
         component: ExcursionsHome
      },
      {
         path: '/',
         name: 'ExcursionsCountry',
         component: ExcursionsCountry
      },
      {
         path: '/town',
         name: 'ExcursionsTown',
         component: ExcursionsTown
      }
   ]
})