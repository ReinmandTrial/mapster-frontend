import VueRouter from 'vue-router'
import ExcursionsHome from '../components/pages/services/excursions/Home.vue'
import ExcursionsCountry from '../components/pages/services/excursions/Country.vue'
import ExcursionsTown from '../components/pages/services/excursions/Town.vue'
import ExcursionPage from '../components/pages/services/excursions/Excursion.vue'

export default new VueRouter({
   mode: 'history',
   routes: [
      {
         path: '/',
         name: 'ExcursionsHome',
         component: ExcursionsHome
      },
      {
         path: '/country/:country_name',
         name: 'ExcursionsCountry',
         component: ExcursionsCountry,
      },
      {
         path: '/country/:country_name/city/:city_name',
         name: 'ExcursionsTown',
         component: ExcursionsTown
      },
      {
         path: '/excursion/:id',
         name: 'ExcursionPage',
         component: ExcursionPage
      }


   ],
   scrollBehavior() {
      window.scrollTo(0, 0)

      return { top: 0 }
   }
})