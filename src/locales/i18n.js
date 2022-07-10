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
         menu_guide: {
            my_excursions: 'МОИ ЭКСКУРСИИ',
            orders: 'ЗАКАЗЫ',
            balance: 'БАЛАНС',
         },
         lang: 'РУС',
         login: 'Войти'
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
      popups: {
         sing_in: {
            title: 'Войти',
            input_login: {
               title: 'Электронная почта ',
               placeholder: 'Введите ваш E-mail',
            },
            input_pass: {
               title: 'Пароль',
               placeholder: 'Введите пароль',
            },
            btn: 'ВОЙТИ',
            info: {
               text1: 'Регистрируясь, вы принимаете условия сервиса',
               text2: 'Впервые у нас?',
               reg: 'Зарегистрируйтесь.'
            },
            remember_me: 'Запомнить меня',
            forget_pass: 'Забыли Ваш пароль?'
         },
         pass_recovery: {
            title: 'ВОССТАНОВЛЕНИЕ ПАРОЛЯ',
            input_email: {
               title: 'Электронная почта',
               placeholder: 'Введите ваш E-mail',
            },
            btn: 'СБРОСИТЬ ПАРОЛЬ',
            info: {
               text1: 'Если вы уже регистрировались, ',
               login: 'то вам сюда.'
            },
         },
         change_pass: {
            title: 'Смена пароля',
            old_pass: {
               title: 'Старый пароль',
               placeholder: 'Введите старый пароль'
            }
         },
         new_pass: {
            title: 'ВВЕДИТЕ НОВЫЙ ПАРОЛЬ',
            input_login: {
               title: 'Пароль',
               placeholder: 'Придумайте пароль',
            },
            input_pass: {
               title: 'Повторите пароль',
               placeholder: 'Придумайте пароль',
            },
            btn: 'СОХРАНИТЬ',
         },
         code_waiting: {
            title: 'оЖИДАЙТЕ ссылку НА ВАШ E-MAIL',
            info1: 'На указанную вами почту был выслана ссылка для сброса пароля',
            info2: 'Обычно сообщение приходит в течении 3 минут',
            btn: 'OK'
         },
         reg: {
            title: 'РЕГИСТРАЦИЯ',
            input_name: {
               title: 'Имя',
               placeholder: 'Введите ваше имя',
            },
            input_email: {
               title: 'Электронная почта ',
               placeholder: 'Введите ваш E-mail',
            },
            input_pass: {
               title: 'Пароль',
               placeholder: 'Придумайте пароль',
            },
            btn: 'зарегистрироваться',
            info: {
               text1: 'Регистрируясь, вы принимаете условия сервиса',
               text2: 'Если вы уже регистрировались,',
               login: 'то вам сюда'
            },
         },
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
         info: {
            free: 'Свободен',
            busy: 'Занят'

         }

      },
      excursions: {
         client: {
            header: {
               logo_descr: 'Новый способ путешествовать!',
               profile: {
                  history: 'История бронирований',
                  edit: 'Профиль',
                  to_guide: 'Профиль гида',
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
            excursion_page: {
               guide_function: {
                  once: 'Гид экскурсовод'
               },
               title: 'Что вас ожидает',
               title_group: 'Групповая экскурсия',
               table: {
                  duration: 'Длительность',
                  amount: 'Размер группы',
                  to: 'до',
                  children: {
                     title: 'Дети',
                     true: 'Можно с детьми',
                     false: 'Нельзя с детьми'
                  },
                  move: {
                     title: 'Как проходит',
                     car: 'На машине',
                     onfoot: 'Пешком'
                  },
                  length: {
                     term: 'Общая длина экскурсии:',
                     km: 'км'
                  },
                  duration2: 'Продолжительность: ',

               },
               route: {
                  title: 'Маршрут экскурсии',
                  next: 'До следующей точки ехать ',
                  wait: 'Стоянка '
               },
               organization: {
                  title: 'Организационные детали',
                  price: 'Стоимость тура на 1 человека – ',
                  meeting_point: 'Место встречи',
                  book_now: 'Забронировать экскурсию',
                  book_now_text: 'Это индивидуальная экскурсия на {langs}, гид проведет ее для вас и вашей компании.'
               },
               calendar: {
                  info: 'Для бронирования экскурсии выберите желаемую дату и нажмите кнопку “выбрать”',
                  btn: 'Выбрать'
               }
            },
            card_excursion: {
               cost_type: {
                  person: 'за человека',
                  excursion: 'за экскурсию'
               }
            },
            booking: {
               guide_function: 'Гид экскурсовод',
               date_title: 'Дата экскурсии',
               time_title: 'Время экскурсии',
               ticket: {
                  title: 'Сколько вас будет?',
                  category: 'Категория билета',
                  price: 'Цена {for}',
                  default_ticket: 'Стандартный билет',
                  child_ticket: 'Дети до 16 лет'

               },
               input_name: {
                  title: 'Как вас зовут',
                  placeholder: 'Укажите имя'
               },
               input_email: {
                  title: 'Ваш e-mail',
                  placeholder: 'Укажите e-mail'
               },
               input_phone: {
                  title: 'Ваш телефон',
                  placeholder: 'Укажите телефон'
               },
               input_textarea: {
                  title: 'Вопросы и комментарии (не обязательно)',
               },
               submit: 'ЗАБРОНИРОВАТЬ'
            },
            card_order: {
               route: 'Маршрут',
               date: 'Дата',
               duration: 'Продолжительность',
               customer: 'Заказчик',
               amount: 'Кол-во человек'
            },
            payment: {
               title: 'Информация о заказе № ',
               to_pay: 'К оплате',
               pay: 'ОПЛАТИТЬ',
               info_card: 'Данные вашей карты в безопасности. Мы используем технологии соответствующие стандартам безопасности платежных систем Visa, MasterCard',
               policy: 'Нажимая на кнопку, я принимаю пользовательское соглашение Оформляя и оплачивая заказ, я подтверждаю, что ознакомлен, согласен и принимаю условия договора. Договор будет выслан на ваш E-mail после оплаты'
            },
            thanks: {
               title: 'Спасибо за бронирование!',
               descr: 'Информация о бронировании выслана вам на почту',
               order_num: 'Заказ № ',
               paid: 'Оплачено',
               to_main: 'на главную'
            }
         },
         guide: {
            header: {
               logo_descr: 'Лучшие экскурсии',
               profile: {
                  to_client: 'Забронировать экскурсию',
                  add: 'Добавить экскурсию',
                  my: 'Мои экскурсии',
                  orders: 'Заказы',
                  balance: 'Баланс'
               }
            },
            home: {
               banner: {
                  title: 'Зарегистрируйте в качестве Гида',
                  descr: 'Регистрация займет всего 15 минут - начните прямо сейчас',
                  list: {
                     item1: 'Бесплатная регистрация',
                     item2: 'Поддержка по телефону и e-mail',
                  },
                  add_excursion: 'Стать гидом',
                  create_acc: 'Создайте аккаунт, чтобы начать'
               },
               benefit: {
                  title: 'УДОБНО И ВЫГОДНО',
                  card1: {
                     title: 'УДОБНАЯ РЕГИСТРАЦИЯ',
                     descr: 'Зарегистрируйте экскурсии, добавте информацию о себе, и получайте заказы.'
                  },
                  card2: {
                     title: 'КОНТРОЛИруйте ЗАКАЗЫ',
                     descr: 'Наблюдайте все рабочие процессы, заявки и фининсы '
                  },
               },
               how_start: {
                  title: 'Как начать работу?',
                  item1: 'ПРОЙДИТЕ РЕГИСТРАЦИЮ',
                  item2: 'Мы позвоним вам, И уточниМ детали',
                  item3: 'ПОЛУЧАЙТЕ ЗАКАЗЫ'
               },
               mobile_app: {
                  banner_title: '<span>THE</span> MAPSTER GUIDES',
                  title: 'Получите еще больше возможностей с мобильным приложением <span>Mapster GUIDES</span>',
                  descr: ` Загружайте мобильное приложение
                  <span>Mapster Guides</span>
                  для загрузки экскурсий и контроля поступления заказов. Мобильное
                  приложение
                  <span>Mapster Guides</span>
                  дает вам доступ к скрытым функциям и специальным предложениям.`,
                  download_title: 'Приложение доступно на платформах'
               }
            },
            my_excursions: {
               title: 'мои экскурсии',
               descr: 'Здесь представлены все ваши экскурсии, которые вы можете редактировать',
               empty: 'У вас пока нет экскурсий',
               add: "Добавить экскурсию"
            },
            add_excursion: {
               title: 'Добавление экскурсии',
               notif: 'Поля помеченные * обязательны к запонению',
               info: `Расскажите о своей экскурсии, прогулке или мастер-классе. Обязательно прочитайте <a href="#">наши советы по оформлению</a>. Если у вас будут вопросы — <a href="#">напишите нам</a>, мы поможем!`,
               topic: {
                  title: 'Тема экскурсии  *',
                  placeholder: 'Заголовок экскурсии - короткое оригинальное название',
                  info: 'В одну строчку напишите, чему посвящена ваша экскурсия, чтобы все сразу все поняли.'
               },
               subtitle: {
                  title: 'Подзаголовок *',
                  placeholder: 'Напишите подзаголовок',
                  info: 'Напишите подзаголовок или цитату, характеризующую вашу экскурсию'
               },
               descr: {
                  title: 'Описание экскурсии *',
                  placeholder: 'Что вы узнаете из экскурсии',
                  info: 'Напишите коротко о чем экскурсия, как вы ее собираетесь проводить'
               },
               tags: {
                  title: 'Теги *',
                  placeholder: 'Добавьте теги ',
                  info: 'Добавьте теги - напирмер, Мцхета, винный тур, старый Тбилиси и тп. до 8 тегов',
                  popup: {
                     title: 'ДОБАВИТЬ ТЕГ',
                     cancel: 'отменить',
                     add: 'добавить тег',
                  }
               },
               content: {
                  title: 'Содержание *',
                  info1: `Напишите: В чем заключается ваш подход? Что именно вы хотите рассказать на экскурсии? Какие места вы выбрали и почему?
                  И самое главное, напишите, что лично вас вдохновляет в теме экскурсии. Вдохновите этим других людей!`,
                  info2: `Загрузите качественные и яркие фото с пейзажами, архитектурными, природными и другими любопытными объектами по маршруту. Также хорошо подойдут фото с людьми на вашей экскурсии, чтобы прочувствовать атмосферу, которую вы создаете.
                  <br><br>
                  <p style="font-size: 12px;">
                  Загружая фотографии, вы подтверждаете право их использования на Мапстере: изображения сделаны вами, взяты с согласия автора или из легальных источников, а также не нарушают прав третьих лиц.
                  </p>`,
               },
               photo: {
                  add: 'ДОБАВИТЬ ФОТОГРАФИю',
                  change: 'ИЗМЕНИТЬ ФОТОГРАФИю',
                  descr: 'горизонтальные фотографий шириной не менее 1500 пикселей',
                  placeholder: 'Добавьте подпись под фотографию'
               },
               main_photo: {
                  title: 'Главное фото *',
               },
               points: {
                  num: ' пункт экскурсии',
                  title: 'Заголовок  *',
                  title_placeholder: 'Напишите заголовок',
                  descr_placeholder: 'Описание места которое посещаете',
                  time_to_place: 'Время поездки до места',
                  parking_dur: 'Продолжительность  стоянки',
                  min: 'мин',
                  add: 'Добавить еще пункт',
                  add_info: 'Добавьте нужное количество шагов из которых состоит ваша экскурсия'
               },
               organization: {
                  title: 'Организационные детали *',
                  placeholder: 'Как пройдет экскурсия',
                  info: `Напишите, о чем стоит знать путешественникам перед экскурсией. Например, о дополнительных расходах,
                  деталях трансфера, о том, что взять с собой, и других важных моментах. Либо укажите, что таких важных моментов нет.`
               },
               terms: {
                  title: 'Условия *',
                  country: {
                     title: 'Страна',
                     placeholder: 'Укажите страну'
                  },
                  town: {
                     title: 'Город',
                     placeholder: 'Укажите город'
                  },
                  langs: {
                     title: 'Выберите языки',
                     placeholder: 'Добавить',
                     descr: `Выберите языки, на которых вы можете провести экскурсию.
                     Описание экскурсии пока можно написать только на русском и
                     английском`
                  },
                  duration: {
                     title: 'Продолжительность',
                     placeholder: '10 часов',
                     options: [
                        { name: 'Полчаса', value: '30' },
                        { name: '1 час', value: '60' },
                        { name: '1,5 часа', value: '90' },
                        { name: '2 часа', value: '120' },
                        { name: '2,5 часа', value: '150' },
                        { name: '3 часа', value: '180' },
                        { name: '3,5 часа', value: '210' },
                        { name: '4 часа', value: '240' },
                        { name: '5 часов', value: '300' },
                        { name: '6 часов', value: '360' },
                        { name: '7 часов', value: '420' },
                        { name: '8 часов', value: '480' },
                        { name: '9 часов', value: '540' },
                        { name: '10 часов', value: '600' },
                        { name: '11 часов', value: '660' },
                        { name: '12 часов', value: '720' },
                     ]
                  },
                  length: {
                     title: 'Общая длина экскурсии',
                     placeholder: '00',
                     unit: 'км'
                  },
                  amount: {
                     title: 'Количество участников',
                     placeholder: '10',
                     children: 'Можно с детьми'
                  },
                  move: {
                     title: 'Передвижения',
                     placeholder: 'Выбрать',
                     options: [
                        {
                           name: 'Пешком',
                           value: 'onfoot'
                        },
                        {
                           name: 'На машине',
                           value: 'car'
                        },
                     ]
                  },
               },
               schedule: {
                  title: 'Расписание и время начала *',
                  type: {
                     title: 'Тип экскурсии',
                     type1: `<span>Индивидуальная</span>. Заказать экскурсию можно на дни недели, которые вы указали в расписании.`,
                     type1_value: 'individual',
                     type2: `<span>Групповая по еженедельному расписанию</span>. Вы составляете повторяющееся расписание экскурсии, участники записываются на доступные даты независимо друг от друга. Бронирования подтверждаются автоматически.`,
                     type2_value: 'groups',
                  },
                  days: {
                     title: 'Расписание и время начала',
                     names: [
                        'Пн',
                        'Вт',
                        'Ср',
                        'Чт',
                        'Пт',
                        'Сб',
                        'Вс',
                     ],
                     add_new_time: 'добавить время',
                     info: 'Укажите возможное время начала экскурсии и дни недели, по которым она может проводиться',
                  },
                  expire: {
                     title: 'Публиковать расписание на',
                     placeholder: '6 месяцев',
                     options: [
                        { name: '3 месяца', value: '3' },
                        { name: '4 месяца', value: '4' },
                        { name: '5 месяцев', value: '5' },
                        { name: '6 месяцев', value: '6' },
                     ]
                  }
               },
               place: {
                  title: 'Место начала экскурсии *',
                  checkbox: {
                     title: 'Место встречи',
                     text: ' У экскурсии есть обычное место начала'
                  },
                  approximate: {
                     title: 'Примерное место встречи',
                     descr: 'Напишите, где примерно начинается экскурсия. Это будет показано на странице экскурсии, чтоб путешественники могли сориентироваться до бронирования.',
                     placeholder: 'Например, в районе метро Октябрьская'
                  },
                  exact: {
                     title: 'Точное место встречи',
                     descr: 'Опишите место встречи так, чтобы любой участник мог без лишних вопросов найти его. Эта информация будет отображаться в билете на экскурсию.',
                     placeholder: 'Пример: «Экскурсия начинается на выходе из странци метро Октябрьская-Кольцевая. Встречаемся у кофейного магазина справа от выхода. Я буду с желтой сумкой справа от витрины.»'
                  },
                  map: {
                     btn: 'Указать на карте',
                     title: 'Объект на карте',
                     address: {
                        title: 'Адрес',
                        placeholder: ''
                     },
                     y: {
                        title: 'Широта',
                        placeholder: ''
                     },
                     x: {
                        title: 'Долгота',
                        placeholder: ''
                     }
                  }
               },
               price: {
                  title: 'Стоимость *',
                  info: `Вы ничего не платите за размещение экскурсии на Мапстере. Вместо этого мы берем процент от стоимости каждого заказа: 20%. Таким образом, мы заинтересованы, чтобы вы зарабатывали, и только в этом случае зарабатываем сами. Узнайте, <a href="#">как выбрать оптимальную стоимость</a>, это важно!`,
                  type: {
                     title: 'Тип стоимости',
                     excursion: 'За экскурсию',
                     person: 'За человека'
                  },
                  variant: {
                     title: 'Вариант цены',
                     single: 'Единая цена',
                     by_types: 'Цены по типам билетов'
                  },
                  tickets: {
                     title: 'Стоимость',
                     category_title: 'Категория билета',
                     per_person_title: 'Цена за человека',
                     per_excursion_title: 'Цена за экскурсию',
                     default: {
                        title: 'Стандартный билет',
                        descr: 'Это основная цена, она будет видна в списке экскурсий'
                     },
                     children: {
                        title: 'Дети до 16 лет',

                     },
                     info: `При покупке 1 билета за €20,
                     путешественники заплатят на сайте
                     €4 (20% Mapster), а €16 вам на месте`
                  },
                  min: {
                     title: `Минимальная стоимость <br> (необязательно)`,
                     info1: '€8 (20% Mapster) путешественники заплатят на сайте, а €32 вам на месте',
                     info2: `€40 за 1-2 человек или
                     €20 за человека, если вас больше
                     За вычетом 20% Мапстеру путешественники заплатят вам €32 за 1-2 человек или
                     €16 за человека, если участников больше`,
                  }
               },
               calendar: {
                  title: 'Управление ценой на даты',
                  info: 'Вы можете повышать и понижать цены на выбранные даты. Выбирайте диапазоны дат с зажатой клавишей Shift. Не забудьте сохранить изменения, нажав на “Сохранить” внизу страницы.',
                  changes: {
                     title: 'Чтобы внести изменения, выберите дни в календаре',
                     selected: 'Выбрано дней: {amount}',
                     remove: 'сбросить выделение',
                     options_placeholder: 'Выберите опцию',
                     options: [
                        { name: 'Уменьшить', value: 'decrease' },
                        { name: 'Увеличить', value: 'increase' },
                     ],
                     text_change_on: 'стоимость на ',
                     size_placeholder: 'Значение',
                     size: [
                        { name: 'нет', value: '1' },
                        { name: '10 %', value: '0.9' },
                        { name: '15 %', value: '0.85' },
                        { name: '20 %', value: '0.80' },
                        { name: '25 %', value: '0.75' },
                        { name: '30 %', value: '0.70' },
                        { name: '35 %', value: '0.65' },
                        { name: '40 %', value: '0.60' },
                        { name: '45 %', value: '0.55' },
                        { name: '50 %', value: '0.50' },
                        { name: '55 %', value: '0.45' },
                        { name: '60 %', value: '0.40' },
                        { name: '65 %', value: '0.35' },
                        { name: '70 %', value: '0.30' },
                        { name: '75 %', value: '0.25' },
                        { name: '80 %', value: '0.20' },
                        { name: '85 %', value: '0.15' },
                        { name: '90 %', value: '0.10' },
                        { name: '95 %', value: '0.05' },
                        { name: '100 %', value: '0' },
                     ],
                     confirm: 'ПРИМЕНИТЬ'
                  }
               },
               about: {
                  title: 'О гиде',
                  subtitle: 'Напишите о себе',
                  placeholder: '',
                  info: 'Расскажите путешественникам о себе, как о гиде. Напишите, чем вы увлекаетесь, как давно живете вгороде, почему решили проводить экскурсии и встречаться с путешественниками, в каких темах выхорошо разбираетесь и какими стараетесь сделать свои экскурсии. Не пишите длинно, постарайтесьчетко и понятно изложить самую суть.'
               },
               save: 'СОХРАНИТЬ',
               wait: 'Подождите',
               watch: 'Посмотрите, как будет выглядеть ваше предложение для путешественников'
            },
            edit_excursion: {
               title: 'РЕДАКТИРОВАТЬ экскурсиЮ'
            },
            profile: {
               unset: 'Не указано',
               title: 'Профиль',
               sub_title: 'О себе',
               name: 'Имя и Фамилия',
               birthday: 'Дата рождения',
               gender: 'Пол',
               city: 'Гражданство',
               phone: 'Телефон',
               email: 'E-mail',
               account_number: 'Номер счета',
               edit_table: 'Редактировать профиль',
            },
            profile_edit: {
               title: 'Профиль',
               edit_photo: 'Изменить фото',
               add_photo: 'Добавить фото',
               input_label: {
                  name: 'Имя',
                  sur_name: 'Фамилия',
                  date: 'Дата рождения',
                  gender: {
                     label: 'Пол',
                     prompt: 'Укажите ваш пол',
                     male: 'Мужской',
                     female: 'Женский',
                  },
                  citizenship: 'Гражданство',
                  phone: 'Телефон',
                  password: 'Пароль',
                  change_pass: 'Сменить пароль',
                  bank_account: 'Привязать банковский счёт',
                  about_me: 'О себе',
               },
               save_btn: 'СОХРАНИТЬ',
            },
            orders: {
               title: 'мои заказы',
               sub_title: 'Здесь представлены ваши заказы',
               date: 'Дата',
               with: 'c',
               to: 'до',
               empty: 'Заказов нет',
               sorting: {
                  all: 'Все',
                  current: 'Текущие',
                  canceled: 'Отмененые',
                  completed: 'Завершеные',
               },
               top_line: {
                  route: 'Маршрут',
                  date: 'Дата',
                  customer: 'Заказчик',
                  number_of_persons: 'Кол-во чел',
                  contacts: 'Контакты',
                  status: 'Статус',
               },
               item: {
                  status: 'Осталось дней: {amount}',
                  completed: 'Завершено',
                  sum: 'Сумма',
                  adults: 'вз',
                  children: 'дет',
               },
               item_mob: {
                  order_label: 'Заказ',
                  sum: 'Сумма',
                  date: 'Дата',
                  start: 'Начало',
                  status_label: 'Статус',
                  status: 'Осталось 10 дней',
                  client_label: 'Заказчик',
                  number_of_persons: 'Кол-во чел',
                  adults: 'вз',
                  children: 'дет',
                  contacts: 'Контакты',
               },
            },
            balance: {
               title: 'Баланс',
               on_account_title: 'У вас на счету',
               earl_title: 'Заработано за месяц',
               date: 'Дата',
               with: 'c',
               to: 'до',
               mob_prompt: {
                  in_process: 'В процессе',
                  paid: 'Выплачен',
               },
               top_line: {
                  tour: 'Экскурсия',
                  date: 'Дата',
                  time: 'Время',
                  amount: 'Кол-во чел',
                  price_for_one: 'Цена за 1 чел',
                  sum: 'Сумма',
                  commission: 'Комисия 20%',
                  earned: 'Заработано',
                  status: 'Статус',
               },
               item: {
                  adults: 'вз',
                  children: 'дет',
                  in_process: 'В процессе',
                  paid: 'Выплачено',
                  canceled: 'Отменено',
               },
            },
         }
      },
      errors: {
         unauthorized: 'Пожалуйтса, авторизуйтесь',
         unknown_request: 'Ошибка, попробуйте позже',
         unknown_request2: 'Ой, вы где-то ошиблись',
         required: 'Это поле обязательно',
         max_length: 'Максимальное количество символов: {num}',
         photo: 'Не получилось загрузить фото, попробуйте позже',
         all: 'Заполните поля',
         new_pass: {
            null: 'Заполните поля',
            not_match: 'Пароли не совпадают'
         },
         login: {
            name: 'Пожалуйста, введите имя',
            password: 'Пожалуйста, введите пароль'
         },
         date: {
            null: 'Укажите дату начала экскурсии',
            wrong: 'Неправильно указанная дата'
         },
         time: {
            null: 'Укажите время начала экскурсии',
         },
         ticket: {
            null: 'Выберите билет/билеты',
         },
         inputs: {
            name: {
               null: 'Введите имя',
            },
            email: {
               null: 'Укажите email',
               wrong: 'Некорректный email',
            },
            phone: {
               null: 'Введите номер телефона',
            },
         },
         schedule: {
            select_time: 'Выберите время'
         }
      },
      success: {
         change_password: 'Успех!',
         reg: 'Регистрация прошла успешно!',
         new_excursion: 'Экскурсия создана успешно!'
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
         menu_guide: {
            my_excursions: 'MY EXCURSIONS',
            orders: 'ORDERS',
            balance: 'BALANCE',
         },
         lang: 'ENG',

         login: 'Login'
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
      popups: {
         sing_in: {
            title: 'Sing In',
            input_login: {
               title: 'Email',
               placeholder: 'Enter your E-mail',

            },
            input_pass: {
               title: 'Password',
               placeholder: 'enter password',
            },
            btn: 'Sing In',
            info: {
               text1: 'By registering, you accept the terms of service',
               text2: 'First time with us?',
               reg: 'Sign up.'
            },
            remember_me: 'To remember me',
            forget_pass: 'Forgot your password?'
         },
         pass_recovery: {
            title: 'PASSWORD RECOVERY',
            input_email: {
               title: 'Email',
               placeholder: 'Enter your E-mail',
            },
            btn: 'RESET THE PASSWORD',
            info: {
               text1: 'If you have already registered, ',
               login: 'then you here.'
            },
         },
         change_pass: {
            title: 'Password change',
            old_pass: {
               title: 'Eld password',
               placeholder: 'Enter the old password'
            }
         },
         new_pass: {
            title: 'ENTER A NEW PASSWORD',
            input_login: {
               title: 'Password',
               placeholder: 'Create a password',
            },
            input_pass: {
               title: 'Repeat password',
               placeholder: 'Create a password',
            },
            btn: 'SAVE',
         },
         code_waiting: {
            title: 'EXPECT the link ON YOUR E-MAIL',
            info1: 'A link to reset your password has been sent to your email address.',
            info2: 'Usually the message arrives within 3 minutes',
            btn: 'OK'
         },
         reg: {
            title: 'REGISTRATION',
            input_name: {
               title: 'Name',
               placeholder: 'Enter your name',
            },
            input_email: {
               title: 'Email',
               placeholder: 'Enter your E-mail',
            },
            input_pass: {
               title: 'Password',
               placeholder: 'Create a password',
            },
            btn: 'register',
            info: {
               text1: 'By registering, you accept the terms of service',
               text2: 'If you have already registered,',
               login: 'then you here'
            },
         },
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
         info: {
            free: 'Free',
            busy: 'Busy'

         }


      },
      excursions: {
         client: {
            header: {
               logo_descr: 'A new way to travel!',
               profile: {
                  history: 'Booking history',
                  edit: 'Profile',
                  to_guide: 'Guide profile',
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
            excursion_page: {
               guide_function: {
                  once: 'Tour guide'
               },
               title: 'What awaits you',
               title_group: 'Group tour',
               table: {
                  duration: 'Duration',
                  amount: 'Group size',
                  to: 'up to',
                  children: {
                     title: 'Children',
                     true: 'Possible with children',
                     false: 'Not allowed with children'
                  },
                  move: {
                     title: 'How is it going',
                     car: 'By car',
                     onfoot: 'On foot'
                  },
                  length: {
                     term: 'Total length of the tour:',
                     km: 'km'
                  },
                  duration2: 'Duration all: ',

               },
               route: {
                  title: 'Excursion route',
                  next: 'Drive to the next point ',
                  wait: 'Parking '
               },
               organization: {
                  title: 'Organizational details',
                  price: 'The cost of the tour for 1 person - ',
                  meeting_point: 'Meeting point',
                  book_now: 'Book an excursion',
                  book_now_text: 'This is an individual tour in {langs}, the guide will conduct it for you and your company.'
               },
               calendar: {
                  info: 'To book an excursion, select the desired date and click the "choose" button',
                  btn: 'Choose'
               }
            },
            card_excursion: {
               cost_type: {
                  person: 'per person',
                  excursion: 'for the tour'
               }
            },
            booking: {
               guide_function: 'tour guide',
               date_title: 'Tour date',
               time_title: 'Tour time',
               ticket: {
                  title: 'How many of you will be?',
                  category: 'Ticket category',
                  price: 'Price {for}',
                  default_ticket: 'Standard ticket',
                  child_ticket: 'Children under 16'
               },
               input_name: {
                  title: 'What is your name',
                  placeholder: 'Enter a name'
               },
               input_email: {
                  title: 'Your e-mail',
                  placeholder: 'Enter e-mail'
               },
               input_phone: {
                  title: 'Your phone number',
                  placeholder: 'Specify phone'
               },
               input_textarea: {
                  title: 'Questions and comments (optional)',
               },
               submit: 'BOOK NOW'
            },
            card_order: {
               route: 'Route',
               date: 'Date',
               duration: 'Duration',
               customer: 'Customer',
               amount: 'Number of people'
            },
            payment: {
               title: 'Order Information No. ',
               to_pay: 'To pay',
               pay: 'pay',
               info_card: 'Your card details are safe. We use technologies that meet the security standards of Visa, MasterCard payment systems',
               policy: 'By clicking on the button, I accept the user agreement By placing and paying for the order, I confirm that I have read, agree and accept the terms of the agreement. The contract will be sent to your E-mail after payment'

            },
            thanks: {
               title: 'Thanks for booking!',
               descr: 'Your booking information has been sent to your email.',
               order_num: 'Order No. ',
               paid: 'Paid',
               to_main: 'To main'
            }
         },
         guide: {
            header: {
               logo_descr: 'Best excursions',
               profile: {
                  to_client: 'Book an excursion',
                  add: 'Add a tour',
                  my: 'My excursions',
                  orders: 'Orders',
                  balance: 'Balance'

               }
            },
            home: {
               banner: {
                  title: 'Register as a guide',
                  descr: 'Registration only takes 15 minutes - start now',
                  list: {
                     item1: 'Free registration',
                     item2: 'Phone and email support',
                  },
                  add_excursion: 'Become a guide',
                  create_acc: 'Create an account to get started'
               },
               benefit: {
                  title: 'CONVENIENT AND PROFITABLE',
                  card1: {
                     title: 'CONVENIENT REGISTRATION',
                     descr: 'Register excursions, add information about yourself, and receive orders.'
                  },
                  card2: {
                     title: 'CONTROL ORDERS',
                     descr: 'Monitor all workflows, requests and finances'
                  },
               },
               how_start: {
                  title: 'How to get started?',
                  item1: 'REGISTER',
                  item2: 'We will call you and clarify the details',
                  item3: 'GET ORDERS'
               },
               mobile_app: {
                  banner_title: '<span>THE</span> MAPSTER GUIDES',
                  title: 'Get even more with the <span>Mapster GUIDES</span> mobile app',
                  descr: 'Download the <span>Mapster Guides</span> mobile app to download tours and track bookings. The <span>Mapster Guides</span> mobile app gives you access to hidden features and special offers.',
                  download_title: 'The app is available on platforms'
               }
            },
            my_excursions: {
               title: 'my excursions',
               descr: 'Here are all your excursions that you can edit',
               empty: "You don't have excursions yet",
               add: "Add excursion"
            },
            add_excursion: {
               title: 'Adding a tour',
               notif: 'Fields marked with * are mandatory',
               info: `Tell us about your excursion, walk or master class. Be sure to read <a href="#">our styling tips</a>. If you have any questions - <a href="#">write to us</a>, we will help!`,
               topic: {
                  title: 'Excursion topic *',
                  placeholder: 'Excursion title - short original title',
                  info: 'In one line, write what your tour is about so that everyone understands everything at once.'
               },
               subtitle: {
                  title: 'Subtitle *',
                  placeholder: 'Write a subtitle',
                  info: 'Write a subtitle or quote describing your tour'
               },
               descr: {
                  title: 'Description of the tour *',
                  placeholder: 'What will you learn from the tour',
                  info: 'Write briefly about what the tour is about, how you are going to conduct it'
               },
               tags: {
                  title: 'Tags *',
                  placeholder: 'Add tags',
                  info: 'Add tags - for example, Mtskheta, wine tour, old Tbilisi, etc. up to 8 tags',
                  popup: {
                     title: 'Add tag',
                     cancel: 'cancel',
                     add: 'Add tag',
                  }
               },
               content: {
                  title: 'Content *',
                  info1: `Write: What is your approach? What exactly do you want to tell on the tour? What places did you choose and why?
                  And most importantly, write what inspires you personally in the topic of the tour. Inspire other people with this!`,
                  info2: `Upload high-quality and bright photos with landscapes, architectural, natural and other interesting objects along the route. Photos with people on your tour are also good to get a feel for the atmosphere you create.
                  <br><br>
                  <p style="font-size: 12px;">
                  By uploading photos, you confirm the right to use them on Mapster: images are made by you, taken with the consent of the author or from legal sources, and do not violate the rights of third parties.
                  </p>`,
               },
               photo: {
                  add: 'ADD A PHOTO',
                  change: 'EDIT PHOTO',
                  descr: 'horizontal photos at least 1500 pixels wide',
                  placeholder: 'Добавьте подпись под фотографию'
               },
               main_photo: {
                  title: 'Main photo *',
               },
               points: {
                  num: ' excursion point',
                  title: 'Title *',
                  title_placeholder: 'Write a title',
                  descr_placeholder: 'Description of the place you are visiting',
                  time_to_place: 'Travel time to place',
                  parking_dur: 'Parking duration',
                  min: 'min',
                  add: 'Add another item',
                  add_info: 'Add the required number of steps that your tour consists of'
               },
               organization: {
                  title: 'Organizational details *',
                  placeholder: 'How will the tour go',
                  info: `Write about what travelers should know before the tour. For example, additional costs
                  transfer details, what to bring with you, and other important points. Or indicate that there are no such important points.`
               },
               terms: {
                  title: 'Terms *',
                  country: {
                     title: 'Country',
                     placeholder: 'Specify the country'
                  },
                  town: {
                     title: 'City',
                     placeholder: 'Specify the city'
                  },
                  langs: {
                     title: 'Select languages',
                     placeholder: 'Add',
                     descr: `Select the languages in which you can conduct the tour.
                     The description of the tour can only be written in Russian and
                     English`
                  },
                  duration: {
                     title: 'Duration',
                     placeholder: '10 hours',
                     options: [
                        { name: 'Half an hour', value: '30' },
                        { name: '1 hour', value: '60' },
                        { name: '1.5 hours', value: '90' },
                        { name: '2 hours', value: '120' },
                        { name: '2,5 hours', value: '150' },
                        { name: '3 hours', value: '180' },
                        { name: '3,5 hours', value: '210' },
                        { name: '4 hours', value: '240' },
                        { name: '5 hours', value: '300' },
                        { name: '6 hours', value: '360' },
                        { name: '7 hours', value: '420' },
                        { name: '8 hours', value: '480' },
                        { name: '9 hours', value: '540' },
                        { name: '10 hours', value: '600' },
                        { name: '11 hours', value: '660' },
                        { name: '12 hours', value: '720' },
                     ]
                  },
                  length: {
                     title: 'Total length of the tour',
                     placeholder: '00',
                     unit: 'km'

                  },
                  amount: {
                     title: 'Number of participants',
                     placeholder: '10',
                     children: 'Possible with children'
                  },
                  move: {
                     title: 'Movement',
                     placeholder: 'Select',
                     options: [
                        {
                           name: 'On foot',
                           value: 'onfoot'
                        },
                        {
                           name: 'By car',
                           value: 'car'
                        },
                     ]
                  },
               },
               schedule: {
                  title: 'Schedule and start time *',
                  type: {
                     title: 'Tour type',
                     type1: `<span>Individual</span>. You can order a tour for the days of the week that you indicated in the schedule.`,
                     type1_value: 'individual',
                     type2: '<span>Group on a weekly schedule</span>. You make a recurring tour schedule, participants sign up for available dates independently of each other. Reservations are automatically confirmed.',
                     type2_value: 'groups',
                  },
                  days: {
                     title: 'Schedule and start time',
                     names: [
                        'Mo',
                        'Tu',
                        'We',
                        'Th',
                        'Fr',
                        'Sa',
                        'Su',
                     ],
                     add_new_time: 'add time',
                     info: 'Indicate the possible start time of the tour and the days of the week on which it can be conducted',
                  },
                  expire: {
                     title: 'Publish schedule for',
                     placeholder: '6 months',
                     options: [
                        { name: '3 months', value: 3 },
                        { name: '4 months', value: 4 },
                        { name: '5 months', value: 5 },
                        { name: '6 months', value: 6 },
                     ]
                  }
               },
               place: {
                  title: 'Starting point of the tour *',
                  checkbox: {
                     title: 'Meeting point',
                     text: 'The tour has a regular starting point'
                  },
                  approximate: {
                     title: 'Approximate location meetings',
                     descr: 'Write about where the tour starts. This will be shown on the tour page so travelers can get their bearings before booking.',
                     placeholder: 'For example, in the Oktyabrskaya metro area'
                  },
                  exact: {
                     title: 'Exact meeting point',
                     descr: 'Describe the meeting place so that any participant can find it without further questions. This information will be displayed on the tour ticket.',
                     placeholder: ''
                  },
                  map: {
                     btn: 'Specify on the map',
                     title: 'Object on the map',
                     address: {
                        title: 'Address',
                        placeholder: ''
                     },
                     x: {
                        title: 'Latitude',
                        placeholder: ''
                     },
                     y: {
                        title: 'Longitude',
                        placeholder: ''
                     }
                  }

               },
               price: {
                  title: 'Price *',
                  info: `You do not pay anything for hosting a tour on Mapster. Instead, we take a percentage of the value of each order: 20%. Thus, we are interested in you earning, and only in this case we earn ourselves. Find out <a href="#">how to choose the best cost</a> matters!`,
                  type: {
                     title: 'Cost type',
                     excursion: 'For the excursion',
                     person: 'Per person'
                  },
                  variant: {
                     title: 'Price option',
                     single: 'Single price',
                     by_types: 'Prices by ticket type'
                  },
                  tickets: {
                     title: 'Price',
                     category_title: 'Ticket category',
                     per_person_title: 'Price per person',
                     per_excursion_title: 'The price for the tour',
                     default: {
                        title: 'Standard ticket',
                        descr: 'This is the main price, it will be visible in the list of excursions'
                     },
                     children: {
                        title: 'Children under 16',

                     },
                     info: `When buying 1 ticket for €20,
                     travelers will pay on site
                     €4 (20% Mapster) and €16 for you on the spot`
                  },
                  min: {
                     title: `Minimum cost <br> (optional)`,
                     info1: '€8 (20% Mapster) travelers will pay on the site and €32 on the spot',
                     info2: `€40 for 1-2 persons or
                     €20 per person if there are more of you
                     Less 20% Mapster, travelers will pay you €32 for 1-2 people or
                     €16 per person if there are more participants`,
                  }
               },
               calendar: {
                  title: 'Date price management',
                  info: `You can raise or lower prices on selected dates. Select date ranges with the Shift key pressed. Don't forget to save your changes by clicking "Save" at the bottom of the page.`,
                  changes: {
                     title: 'To make changes, select the days in the calendar',
                     selected: 'Selected days: {amount}',
                     remove: 'reset selection',
                     options_placeholder: 'Select option',
                     options: [
                        { name: 'Increase', value: 'increase' },
                        { name: 'Decrease', value: 'decrease' },
                     ],
                     text_change_on: 'cost per',
                     size_placeholder: 'Value',
                     size: [
                        { name: 'no', value: 1 },
                        { name: '10 %', value: 0.9 },
                        { name: '15 %', value: 0.85 },
                        { name: '20 %', value: 0.80 },
                        { name: '25 %', value: 0.75 },
                        { name: '30 %', value: 0.70 },
                        { name: '35 %', value: 0.65 },
                        { name: '40 %', value: 0.60 },
                        { name: '45 %', value: 0.55 },
                        { name: '50 %', value: 0.50 },
                        { name: '55 %', value: 0.45 },
                        { name: '60 %', value: 0.40 },
                        { name: '65 %', value: 0.35 },
                        { name: '70 %', value: 0.30 },
                        { name: '75 %', value: 0.25 },
                        { name: '80 %', value: 0.20 },
                        { name: '85 %', value: 0.15 },
                        { name: '90 %', value: 0.10 },
                        { name: '95 %', value: 0.05 },
                        { name: '100 %', value: 0 },
                     ],
                     confirm: 'APPLY'
                  }
               },
               about: {
                  title: 'About guide',
                  subtitle: 'Write about yourself',
                  placeholder: '',
                  info: 'Tell travelers about yourself as a guide. Write what you are fond of, how long you have been living in the city, why you decided to conduct excursions and meet travelers, what topics you are well versed in and how you try to make your excursions. Do not write long, try to clearly and clearly state the essence.'
               },
               save: 'Save',
               wait: 'Wait',
               watch: 'See what your offer for travelers will look like'
            },
            edit_excursion: {
               title: 'Edit a tour'
            },
            profile: {
               title: 'Profile',
               sub_title: 'About myself',
               name: 'Name and surname',
               birthday: 'Birthday',
               gender: 'Gender',
               city: 'Citizenship',
               phone: 'Phone',
               phone_unset: 'Not pointed',
               email: 'E-mail',
               account_number: 'Account number',
               edit_table: 'Edit profile',
            },
            profile_edit: {
               title: 'Profile',
               edit_photo: 'Change the photo',
               add_photo: 'Add photo',
               input_label: {
                  name: 'Name',
                  sur_name: 'Surname',
                  date: 'Birthday',
                  gender: {
                     label: 'Gender',
                     prompt: 'Indicate your gender',
                     male: 'Male',
                     female: 'Female',
                  },
                  citizenship: 'Citizenship',
                  phone: 'Phone',
                  password: 'Password',
                  change_pass: 'Change password',
                  bank_account: 'Bind a bank account',
                  about_me: 'About myself',
               },
               save_btn: 'SAVE',
            },
            orders: {
               title: 'My orders',
               sub_title: 'Your orders are presented here',
               date: 'Date',
               with: 'with',
               to: 'to',
               empty: 'There are no orders',
               sorting: {
                  all: 'All',
                  current: 'Current',
                  canceled: 'Canceled',
                  completed: 'Completed',
               },
               top_line: {
                  route: 'Route',
                  date: 'Date',
                  customer: 'Customer',
                  number_of_persons: 'Number of persons',
                  contacts: 'Contacts',
                  status: 'Status',
               },
               item: {
                  status: 'days left: {amount}',
                  completed: 'Completed',
                  sum: 'Sum',
                  adults: 'adu',
                  children: 'chi',
               },
               item_mob: {
                  order_label: 'Order',
                  sum: 'Sum',
                  date: 'Date',
                  start: 'Start',
                  status_label: 'Status',
                  status: '10 days left',
                  client_label: 'Customer',
                  number_of_persons: 'Number of persons',
                  adults: 'adu',
                  children: 'chi',
                  contacts: 'Contacts',
               },
            },
            balance: {
               title: 'Balance',
               on_account_title: 'You have',
               earl_title: 'Earned in a month',
               date: 'Date',
               with: 'c',
               to: 'to',
               mob_prompt: {
                  in_process: 'In the process',
                  paid: 'Paid',
               },
               top_line: {
                  tour: 'Excursion',
                  date: 'Date',
                  time: 'Time',
                  amount: 'The number of people',
                  price_for_one: 'Price for 1 person',
                  sum: 'Sum',
                  commission: 'Committee 20%',
                  earned: 'Earned',
                  status: 'Status',
               },
               item: {
                  adults: 'ad',
                  children: 'chi',
                  in_process: 'In the process',
                  paid: 'Paid',
                  canceled: 'Abolished',
               },
            },
         }

      },
      errors: {
         unauthorized: 'Please login',
         unknown_request: 'Error, please try again later',
         unknown_request2: 'Oops, you made a mistake somewhere',
         required: 'This field is required',
         photo: "I didn't work out the photo, try it later",
         all: 'Fill in the fields',

         new_pass: {
            null: 'Fill in the fields',
            not_match: 'Passwords do not match'
         },
         login: {
            name: 'Please enter a name',
            password: 'Please enter a password'
         },
         date: {
            null: 'Specify the start date of the tour',
            wrong: 'Wrong date'
         },
         time: {
            null: 'Specify the start time of the tour',
         },
         ticket: {
            null: 'Select ticket(s)',
         },
         inputs: {
            name: {
               null: 'Enter your name',
            },
            email: {
               null: 'Enter your email',
               wrong: 'Incorrect email',
            },
            phone: {
               null: 'Enter phone number',
            },
         },
         schedule: {
            select_time: 'Choose time'
         }
      },
      success: {
         change_password: 'Success!',
         reg: 'Registration completed successfully!',
         new_excursion: 'The tour was created successfully!'
      }

   },
}


const i18n = new VueI18n({
   locale: localStorage.getItem('lang'),
   fallbackLocale: 'en',
   messages,
})



export default i18n