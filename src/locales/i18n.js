import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
const messages = {
   'ru-RU': {
      header: {
         menu: {
            tours: 'ТУРЫ',
            air: 'АВИАБИЛЕТЫ',
            apartments: 'ЖИЛЬЕ',
            excursions: 'ЭКСКУРСИИ',
            transfer: 'ТРАНСФЕР',
         },
         lang: 'РУС',
      },
      footer: {
         company: 'КОМПАНИЯ',
         services: 'СЕРВИСЫ',
         privacy_policy: 'Политика конфиденциальности',
         info_company: 'Информация о компании',
         login: 'Войти / зарегистрироваться',
         app: 'Мобильное приложение',
         adress: 'Батуми, ул Кобаладзе 6',
      },
      excursions: {
         client: {
            header: {
               logo_descr: 'Новый способ путешествовать!',
               profile: {
                  history: 'История бронирований',
                  edit: 'Редактировать профиль',
                  exit: 'Выход'
               }
            },
            home: {
               banner: '11'
            }
         }
      }
   },
   'en-US': {
      header: {
         menu: {
            tours: 'ТУРЫ',
            air: 'АВИАБИЛЕТЫ',
            apartments: 'ЖИЛЬЕ',
            excursions: 'ЭКСКУРСИИ',
            transfer: 'ТРАНСФЕР',
         },
         lang: 'РУС',
      },
      footer: {
         company: 'КОМПАНИЯ',
         services: 'СЕРВИСЫ',
         privacy_policy: 'Политика конфиденциальности',
         info_company: 'Информация о компании',
         login: 'Войти / зарегистрироваться',
         app: 'Мобильное приложение',
         adress: 'Батуми, ул Кобаладзе 6',
      },
      excursions: {
         client: {
            header: {
               logo_descr: 'Новый способ путешествовать!',
               profile: {
                  history: 'История бронирований',
                  edit: 'Редактировать профиль',
                  exit: 'Выход'
               }
            },
            home: {
               banner: '11'
            }
         }
      }
   },
}


const i18n = new VueI18n({
   locale: 'ru',
   messages,
})
export default i18n