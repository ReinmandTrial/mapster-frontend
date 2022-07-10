import VueRouter from 'vue-router'
import ExcursionsHome from '../components/pages/services/excursions/Home'
import ExcursionsCountry from '../components/pages/services/excursions/Country'
import ExcursionsTown from '../components/pages/services/excursions/Town'
import ExcursionPage from '../components/pages/services/excursions/Excursion'
import BookingData from '../components/pages/services/excursions/booking/BookingData'
import PaymentExcursion from '../components/pages/services/excursions/booking/PaymentExcursion'
import ThankYou from '../components/pages/services/excursions/booking/ThankYou'
import PopupNewPass from '../components/ui/popups/PopupNewPass'
import GuideLayout from '../components/pages/services/excursions/guide/GuideLayout'
import GuideRegistration from '../components/pages/services/excursions/guide/GuideRegistration'
import GuideMyExcursions from '../components/pages/services/excursions/guide/GuideMyExcursions'
import GuideAddExcursion from '../components/pages/services/excursions/guide/GuideAddExcursion'
import GuideEditExcursion from '../components/pages/services/excursions/guide/GuideEditExcursion'
import GuideProfile from '../components/pages/services/excursions/guide/GuideProfile';
import GuideProfileEdit from '../components/pages/services/excursions/guide/GuideProfileEdit';
import GuideOrders from '../components/pages/services/excursions/guide/GuideOrders';
import GuideBalance from '../components/pages/services/excursions/guide/GuideBalance';
import GuidePreviewExcursion from '../components/pages/services/excursions/guide/GuidePreviewExcursion';

export default new VueRouter({
   mode: 'history',
   routes: [
      {
         path: '/',
         component: ExcursionsHome,
         children: [
            {
               path: '',
               name: 'ExcursionsHome',
            },
            {
               path: 'pass_recovery',
               name: 'PassRecovery',
               component: PopupNewPass,
               props: (route) => ({ token: route.query.token })
            }
         ]
      },
      {
         path: '/guide',
         component: GuideLayout,
         children: [
            {
               path: '',
               name: 'GuideMyExcursions',
               component: GuideMyExcursions,
               beforeEnter: (to, from, next) => {
                  const userData = localStorage.getItem('user')
                  const parseUser = JSON.parse(userData)

                  if (!userData || parseUser.privilegies.id == 4) {
                     next({ name: 'GuideRegistration' })
                  } else {
                     next()
                  }
               }
            },
            {
               path: 'home',
               name: 'GuideRegistration',
               component: GuideRegistration,
               props: true,
               beforeEnter: (to, from, next) => {
                  const userData = localStorage.getItem('user')
                  const parseUser = JSON.parse(userData)

                  if (userData && parseUser.privilegies.id != 4) {
                     next({ name: 'GuideMyExcursions' })
                  } else {
                     next()
                  }
               }

            },
            {
               path: 'new',
               name: 'GuideAddExcursion',
               component: GuideAddExcursion,
               props: true,
               beforeEnter: (to, from, next) => {
                  const userData = localStorage.getItem('user')
                  const parseUser = JSON.parse(userData)

                  if (!userData || parseUser.privilegies.id == 4) {
                     next({ name: 'GuideRegistration' })
                  } else {
                     next()
                  }
               }
            },
            {
               path: 'new/preview',
               name: 'GuidePreviewExcursion',
               component: GuidePreviewExcursion,
               props: true,
               beforeEnter: (to, from, next) => {
                  const userData = localStorage.getItem('user')
                  const parseUser = JSON.parse(userData)

                  if (!userData || parseUser.privilegies.id == 4) {
                     next({ name: 'GuideRegistration' })
                  } else {
                     next()
                  }
               }
            },
            {
               path: 'edit/:id',
               name: 'GuideEditExcursion',
               component: GuideEditExcursion,
               props: true,
               beforeEnter: (to, from, next) => {
                  const userData = localStorage.getItem('user')
                  const parseUser = JSON.parse(userData)

                  if (!userData || parseUser.privilegies.id == 4) {
                     next({ name: 'GuideRegistration' })
                  } else {
                     next()
                  }
               }
            },
            {
               path: 'profile',
               name: 'GuideProfile',
               component: GuideProfile,
               props: true,
               beforeEnter: (to, from, next) => {
                  const userData = localStorage.getItem('user');
                  const parseUser = JSON.parse(userData);

                  if (!userData || parseUser.privilegies.id == 4) {
                     next({ name: 'GuideRegistration' });
                  } else {
                     next();
                  }
               },
            },
            {
               path: 'profile/edit',
               name: 'GuideProfileEdit',
               component: GuideProfileEdit,
               props: true,
               beforeEnter: (to, from, next) => {
                  const userData = localStorage.getItem('user');
                  const parseUser = JSON.parse(userData);

                  if (!userData || parseUser.privilegies.id == 4) {
                     next({ name: 'GuideRegistration' });
                  } else {
                     next();
                  }
               },
            },
            {
               path: 'profile/orders',
               name: 'GuideOrders',
               component: GuideOrders,
               props: true,
               beforeEnter: (to, from, next) => {
                  const userData = localStorage.getItem('user');
                  const parseUser = JSON.parse(userData);

                  if (!userData || parseUser.privilegies.id == 4) {
                     next({ name: 'GuideRegistration' });
                  } else {
                     next();
                  }
               },
            },
            {
               path: 'profile/balance',
               name: 'GuideBalance',
               component: GuideBalance,
               props: true,
               beforeEnter: (to, from, next) => {
                  const userData = localStorage.getItem('user');
                  const parseUser = JSON.parse(userData);

                  if (!userData || parseUser.privilegies.id == 4) {
                     next({ name: 'GuideRegistration' });
                  } else {
                     next();
                  }
               },
            },
         ]
      },
      {
         path: '/country/:country_name',
         name: 'ExcursionsCountry',
         component: ExcursionsCountry,
      },
      {
         path: '/country/:country_name/:city_name',
         name: 'ExcursionsTown',
         component: ExcursionsTown
      },
      {
         path: '/excursion/:id',
         name: 'ExcursionPage',
         component: ExcursionPage,
         props: true

      },
      {
         path: '/excursion/:id/booking/:date/:week_day',
         name: 'BookingData',
         component: BookingData,
         props: true
      },
      {
         path: '/payment',
         name: 'PaymentExcursion',
         component: PaymentExcursion,
         props: true
      },
      {
         path: '/thank_you/:order_id/:payment_id',
         name: 'ThankYou',
         component: ThankYou,
         props: true
      },



   ],
   scrollBehavior() {
      window.scrollTo(0, 0)

      return { top: 0 }
   }
})