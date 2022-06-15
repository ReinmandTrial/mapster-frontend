import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
const messages = {
   'ru': {
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
      calendar: {
         // the locale of formatting and parsing function
         formatLocale: {
            // MMMM
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            // MMM
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            // dddd
            weekdays: ['Понедельник', 'Вторник', 'Среда', 'Черверг', 'Пятница', 'Суббота', 'Воскресенье'],
            // ddd
            weekdaysShort: ['Пнд', 'Втр', 'Сре', 'Чтв', 'Птн', 'Суб', 'Вск'],
            // dd
            weekdaysMin: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            // first day of week
            firstDayOfWeek: 0,
            // first week contains January 1st.
            firstWeekContainsDate: 1,
         },

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
            search: {
               placeholder: 'Где вы планируете путешествовать?',
               btn: 'НАЙТИ',
               amount: '',
               empty: 'Ничего не найдено'
            },
            amount_excursions: {
               one: ' экскурсия',
               two_to_four: ' экскурсии',
               another: ' экскурсий'
            },
            amount_towns: {
               one: ' городе',
               two_to_four: ' городах',
               another: ' городах'
            },
            home: {
               banner: {
                  title: 'Экскурсии ',
                  descr: 'экскурсии в {count} городах мира'
               },
               popular_towns: 'Популярные города',
               watch_articles: 'СТАТЬИ',
               show_more: {
                  desktop: 'ЗАГРУЗИТЬ БОЛЬШЕ',
                  mobile: 'Еще...'
               }
            },
            country: {
               banner: {
                  title: 'Экскурсии в {country}',
                  descr: ' в '
               },
               popular_towns: 'Популярные города',
               popular_excursions: 'Популярные экскурсии в {country}',
               show_more: {
                  desktop: 'ЗАГРУЗИТЬ БОЛЬШЕ',
                  mobile: 'Еще...'
               }
            },
            city: {
               banner: {
                  title: 'экскурсии в {city}',
                  descr: 'Необычные экскурсии на русском языке. Цены на экскурсии по городу от {min_price}'
               },
               subtitle: 'экскурсии по {city}',
               tags: {
                  all: 'Все',
                  more: 'Еще ...'
               },
               filter: {
                  date: 'Дата',
                  people: {
                     title: 'Человек',
                     subtitle: 'Кол-во человек'
                  },
                  price: {
                     title: 'Цена',
                     subtitle: 'Цена',
                     from: 'от ',
                     to: 'до '
                  },
                  move: {
                     title: 'Способ передвижения',
                     title_mobile: 'Передвижения',
                     subtitle: 'Передвижение',
                     any: 'Любое',
                     onfoot: 'Пешком',
                     car: 'На машине'
                  }
               },
               sort: {
                  popular: 'Популярные',
                  by_price: 'По цене'
               },
               not_found: 'Ничего не найдено',
            },
            card_excursion: {
               cost_type: {
                  person: 'за человека',
                  excousion: 'за экскурсию'
               }
            }
         }
      }
   },
   'en': {
      header: {
         menu: {
            tours: 'TOURS',
            air: 'AIR TICKETS',
            apartments: 'APARTAMENTS',
            excursions: 'EXCURSIONS',
            transfer: 'TRANSFER',
         },
         lang: 'ENG',
      },
      footer: {
         company: 'COMPANY',
         services: 'SERVICES',
         privacy_policy: 'Privacy Policy',
         info_company: 'Information about the company',
         login: 'Login / register',
         app: 'Mobile app',
         adress: 'Batumi, Kobaladze street 6',
      },
      calendar: {
         // the locale of formatting and parsing function
         formatLocale: {
            // MMMM
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            // MMM
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            // dddd
            weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            // ddd
            weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            // dd
            weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            // first day of week
            firstDayOfWeek: 0,
            // first week contains January 1st.
            firstWeekContainsDate: 1,


         },

      },
      excursions: {
         client: {
            header: {
               logo_descr: 'A new way to travel!',
               profile: {
                  history: 'Booking history',
                  edit: 'Edit profile',
                  exit: 'Exit'
               }
            },
            search: {
               placeholder: 'Where are you planning to travel?',
               btn: 'FIND',
               amount: '',
               empty: 'Nothing found'
            },
            amount_excursions: {
               one: ' excursion',
               two_to_four: ' excursions',
               another: ' excursions'
            },
            amount_towns: {
               one: ' town',
               two_to_four: ' towns',
               another: ' towns'
            },
            home: {
               banner: {
                  title: 'Excursions',
                  descr: 'excursions in {count} cities of the world'
               },
               popular_towns: 'Popular cities',
               watch_articles: 'ARTICLES',
               show_more: {
                  desktop: 'LOAD MORE',
                  mobile: 'More...'
               }
            },
            country: {
               banner: {
                  title: 'Excursions in {country}',
                  descr: ' in '
               },
               popular_towns: 'Popular cities',
               popular_excursions: 'Popular excursions in {country}',
               show_more: {
                  desktop: 'LOAD MORE',
                  mobile: 'More...'
               }
            },
            city: {
               banner: {
                  title: 'excursions in {city}',
                  descr: 'Unusual excursions to English language. Prices for city tours from {min_price}'
               },
               subtitle: 'excursions in {city}',
               tags: {
                  all: 'All',
                  more: 'More ...'
               },
               filter: {
                  date: 'Date',
                  people: {
                     title: 'Peoples',
                     subtitle: 'Number of people'
                  },
                  price: {
                     title: 'Price',
                     subtitle: 'Price',
                     from: 'from ',
                     to: 'to '
                  },
                  move: {
                     title: 'Way to travel',
                     title_mobile: 'Way to travel',
                     subtitle: 'Movement',
                     any: 'Any',
                     onfoot: 'On foot',
                     car: 'By car'
                  }
               },
               not_found: 'Nothing found',
               sort: {
                  popular: 'Popular',
                  by_price: 'By price'
               }
            },
            card_excursion: {
               cost_type: {
                  person: 'per person',
                  excousion: 'for the tour'
               }
            }
         }
      }
   },
}


const i18n = new VueI18n({
   locale: localStorage.getItem('lang'),
   fallbackLocale: 'en',
   messages,
})



export default i18n