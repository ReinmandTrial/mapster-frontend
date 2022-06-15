<template>
  <div class="excursion">
    <div class="excursion__banner excursion-banner">
      <div class="excursion-banner__image-bg">
        <img
          v-if="excursion_images"
          :src="'data:image/jpg;base64,' + excursion_images[0].data"
          alt=""
        />
      </div>
      <div class="container-xl">
        <div class="excursion-banner__content">
          <div class="excursion-banner__text-block">
            <h1 class="excursion-banner__title">
              {{ excursion.subject }}
            </h1>
            <p class="excursion-banner__descr">
              {{ excursion.subtitle }}
            </p>
          </div>
          <div class="excursion-banner__guide" v-if="guide">
            <div class="excursion-banner__guide-photo">
              <img
                :src="'data:image/jpg;base64,' + guide.photo[0].data"
                alt=""
              />
            </div>
            <div class="excursion-banner__guide-text">
              <p class="excursion-banner__guide-name">
                {{
                  guide.first_name +
                  ' ' +
                  guide.middle_name +
                  ' ' +
                  guide.last_name
                }}
              </p>
              <p class="excursion-banner__guide-function">Гид экскурсовод</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="excursion__main">
      <div class="container-m">
        <div class="excursion__descr">
          <span class="excursion__descr-qoutes icon icon-quotes"></span>
          <p class="excursion__descr-text">
            {{ excursion.description }}
          </p>
        </div>
        <div class="excursion__content">
          <h2 class="excursion__title">Что вас ожидает</h2>
          <div class="excursion__content-wrap">
            <div class="excursion__group">
              <h4 class="excursion__group-title">Групповая экскурсия</h4>
              <div class="excursion__group-container">
                <div class="excursion__group-mark">
                  <img src="@/assets/images/point-path-curve.svg" alt="" />
                </div>
                <table class="excursion__table">
                  <tbody class="excursion__table-body">
                    <tr class="excursion__table-row">
                      <td class="excursion__table-item">Длительность</td>
                      <td class="excursion__table-item">10 часов</td>
                    </tr>
                    <tr class="excursion__table-row">
                      <td class="excursion__table-item">Размер группы</td>
                      <td class="excursion__table-item">до {{ calcPeople }}</td>
                    </tr>
                    <tr class="excursion__table-row">
                      <td class="excursion__table-item">Дети</td>
                      <td class="excursion__table-item">
                        {{
                          excursion.children_allowed == true
                            ? 'Можно с детьми'
                            : 'Нельзя с детьми'
                        }}
                      </td>
                    </tr>
                    <tr class="excursion__table-row">
                      <td class="excursion__table-item">Как проходит</td>
                      <td class="excursion__table-item">
                        {{ excursion.moves == 'car' ? 'На машине' : 'Пешком' }}
                      </td>
                    </tr>
                    <tr class="excursion__table-row excursion__table-row--bold">
                      <td class="excursion__table-item">
                        Общая длина экскурсии:
                      </td>
                      <td class="excursion__table-item">17 км</td>
                    </tr>
                    <tr class="excursion__table-row excursion__table-row--bold">
                      <td class="excursion__table-item">Продолжительность:</td>
                      <td class="excursion__table-item">9 часов</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="excursion__route">
              <h3 class="excursion__route-title">Маршрут экскурсии</h3>
              <div
                class="excursion__route-container"
                v-if="excursion.guideplan[0].id"
              >
                <div
                  class="excursion__route-block"
                  v-for="(route, index) in excursion.guideplan"
                  :key="index"
                >
                  <span class="excursion__route-mark">
                    <span></span>
                    <img src="@/assets/images/mark-with-dot.svg" alt="" />
                  </span>
                  <div class="excursion__route-text">
                    <h4 class="excursion__route-subtitle">
                      {{ index + 1 + '. ' + route.subject }}
                    </h4>
                    <p class="excursion__route-info" v-if="route.stoptime">
                      {{ 'Стоянка ' + calcMinutes(route.stoptime) }}
                    </p>
                    <div class="excursion__route-image">
                      <img src="" alt="" />
                    </div>
                    <p class="excursion__route-descr">
                      {{ route.description }}
                    </p>
                    <p class="excursion__route-info" v-if="route.roadtime">
                      {{
                        'До следующей точки ехать ' +
                        calcMinutes(route.roadtime)
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="excursion__organization">
              <h3 class="excursion__organization-title">
                Организационные детали
              </h3>
              <div class="excursion__organization-block">
                <h4
                  class="excursion__organization-subtitle excursion__organization-subtitle--price"
                >
                  {{ 'Стоимость тура на 1 человека – ' + min_price + ' €' }}
                </h4>
                <p class="excursion__organization-text">
                  {{ excursion.details }}
                </p>
              </div>
              <div class="excursion__organization-block">
                <h4 class="excursion__organization-subtitle">Место встречи</h4>
                <p class="excursion__organization-text">
                  {{ excursion.expect_point }}
                </p>
              </div>
              <div class="excursion__organization-block">
                <h4 class="excursion__organization-subtitle">
                  Забронировать экскурсию
                </h4>
                <p class="excursion__organization-text">
                  {{
                    'Это индивидуальная экскурсия на ' +
                    calcLanguages(excursion.lang) +
                    ', гид проведет ее для вас и вашей компании.'
                  }}
                </p>
              </div>
            </div>
            <div class="excursion__calendar excursion-calendar">
              <!-- <date-picker
                class="excursion-calendar"
                v-model="datepicker"
                :editable="false"
                :clearable="false"
                :append-to-body="false"
                :popup-style="{ position: 'static', width: 'fit-content' }"
                :popup-class="['datepicker']"
                :input-class="['datepicker__input']"
                :open="true"
                :lang="langDatepicker"
                :title-format="'DD-MM-YYYY'"
                :multiple="true"
                :range="true"
              ></date-picker> -->
              <date-picker v-if="sdd"></date-picker>
              <calendar-panel
                v-model="value"
                :calendar="calendar1"
                @update:calendar="handleUpdateCalendar1"
                @select="handleSelect"
                :not-before="value ? value : new Date()"
              ></calendar-panel>
              <calendar-panel
                v-model="value"
                :calendar="calendar2"
                @update:calendar="handleUpdateCalendar2"
                @select="handleSelect"
                :not-before="value ? value : new Date()"
              ></calendar-panel>
            </div>
            <help-info
              class="excursion__info"
              :color_style="'green'"
              :text="text"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosConfig from '../../../../api/instance'
import ClickOutside from 'vue-click-outside'
import 'vue-slider-component/theme/antd.css'
import 'vue2-datepicker/index.css'
import DatePicker from 'vue2-datepicker'
import { addMonths, subMonths } from 'date-fns'
import 'vue2-datepicker/index.css'
import HelpInfo from '../../../ui/HelpInfo.vue'

const { CalendarPanel } = DatePicker

export default {
  name: 'ExcursionPage',
  components: {
    DatePicker,
    CalendarPanel,
    HelpInfo,
  },
  directives: {
    ClickOutside,
  },
  data() {
    return {
      text:
        'Для бронирования экскурсии выберите желаемую дату и нажмите кнопку “выбрать”',
      sdd: false,
      current_id: null,
      excursion: {
        id: null,
        subject: null,
        subtitle: null,
        description: null,
        details: null,
        country: null,
        city: null,
        lang: '',
        duration: null,
        number: 0,
        children_allowed: null,
        moves: null,
        type: null,
        expire: null,
        has_common_point: null,
        expect_point: null,
        exact_point: null,
        cost_type: null,
        price_type: null,
        min_price: null,
        currency: null,
        discount: null,
        discount_expire: null,
        conductor_type: null,
        conductor_description: null,
        active: null,
        moderate: null,
        hide: null,
        owner: null,
        tags: [
          {
            id: null,
            tag: null,
            owner: null,
          },
        ],
        guideplan: [
          {
            id: null,
            subject: null,
            description: null,
            roadtime: null,
            stoptime: null,
            owner: null,
          },
          {
            id: null,
            subject: null,
            description: null,
            roadtime: null,
            stoptime: null,
            owner: null,
          },
        ],
        guideschedule: [
          {
            id: null,
            day: null,
            start: null,
            end: null,
            owner: null,
          },
        ],
        guideprices: [
          {
            id: null,
            type: null,
            name: null,
            price: null,
            currency: null,
            owner: null,
          },
        ],
        guidediscountcalendar: [
          {
            id: null,
            discount: null,
            start: null,
            finish: null,
            owner: null,
          },
        ],
      },
      min_price: '?',
      guide: null,
      excursion_images: null,
      datepicker: null,
      datepicker_ru: {
        // the locale of formatting and parsing function
        formatLocale: {
          // MMMM
          months: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
          ],
          // MMM
          monthsShort: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июнь',
            'Июль',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
          ],
          // dddd
          weekdays: [
            'Понедельник',
            'Вторник',
            'Среда',
            'Черверг',
            'Пятница',
            'Суббота',
            'Воскресенье',
          ],
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
      datepicker_en: {
        formatLocale: {
          // MMMM
          months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          // MMM
          monthsShort: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          // dddd
          weekdays: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
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
      value: [new Date()],
      startValue: null,
      endValue: null,
      calendar1: new Date(),
      calendar2: new Date(),
    }
  },
  methods: {
    handleUpdateCalendar1(date) {
      this.calendar1 = date
      this.calendar2 = addMonths(date, 1)
    },
    handleUpdateCalendar2(date) {
      this.calendar2 = date
      this.calendar1 = subMonths(date, 1)
    },
    handleSelect(date) {
      this.value = [date]
      console.log(this.value1)
    },
    calcMinutes(num) {
      var lastNum = num.toString().slice(-1),
        lastTwoNums = num.toString().slice(-2)
      if (lastTwoNums != 11 && lastNum == 1) {
        return num + ' минута'
      } else if (
        (lastNum == 2 || lastNum == 3 || lastNum == 4) &&
        lastTwoNums != 12 &&
        lastTwoNums != 13 &&
        lastTwoNums != 14
      ) {
        return num + ' минуты'
      } else {
        return num + ' минут'
      }
    },
    calcLanguages(list) {
      const listArray = list.split(';')

      var listString = ''
      listArray.forEach((lang, index) => {
        if (listArray.length == index + 1) {
          listString += ','
        }
        if (lang == 'Русский') {
          listString += ' русском'
        } else if (lang == 'Украинский') {
          listString += ' украинском'
        } else if (lang == 'Матерный') {
          listString += ' матерном'
        }
      })

      var lastNum = list.toString().slice(-1),
        lastTwoNums = list.toString().slice(-2)
      if (lastTwoNums != 11 && lastNum == 1) {
        return listString + ' языке'
      } else if (
        (lastNum == 2 || lastNum == 3 || lastNum == 4) &&
        lastTwoNums != 12 &&
        lastTwoNums != 13 &&
        lastTwoNums != 14
      ) {
        return listString + ' языках'
      } else {
        return listString + ' языках'
      }
    },
    checkPrice() {
      const prices = this.excursion.guideprices
      prices.forEach((el) => {
        if (el.type == 'default') {
          this.min_price = el.price.toFixed(0)
        }
      })
    },
  },
  computed: {
    langDatepicker() {
      if (this.$i18n.locale == 'ru') {
        return this.datepicker_ru
      } else {
        return this.datepicker_en
      }
    },
    calcPeople: function () {
      var lastNum = this.excursion.number.toString().slice(-1),
        lastTwoNums = this.excursion.number.toString().slice(-2)
      if (lastTwoNums != 11 && lastNum == 1) {
        return this.excursion.number + ' человек'
      } else if (
        (lastNum == 2 || lastNum == 3 || lastNum == 4) &&
        lastTwoNums != 12 &&
        lastTwoNums != 13 &&
        lastTwoNums != 14
      ) {
        return this.excursion.number + ' человека'
      } else {
        return this.excursion.number + ' человек'
      }
    },
  },
  created() {
    const excursion = this.$route.params.id
    if (excursion) {
      this.current_id = excursion
    }
  },
  async mounted() {
    await axiosConfig
      .get(`/guide/${this.current_id}`)
      .then((response) => {
        this.excursion = response.data.data[0]
        console.log(this.excursion)
      })
      .catch(function (error) {
        console.log(error)
      })
    this.checkPrice()
    await axiosConfig
      .get(`/user/${this.excursion.owner}`)
      .then((response) => {
        this.guide = response.data.data[0]
      })
      .catch(function (error) {
        console.log(error)
      })
    await axiosConfig
      .get(`/guide/media/${this.current_id}`)
      .then((response) => {
        this.excursion_images = response.data.data
        console.log(this.excursion_images)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
}
</script>

<style lang="scss">
.excursion-banner {
  position: relative;
  margin-top: -136px;
  padding: 175px 0 45px;
  @media (max-width: 767.98px) {
    background: #023047;
    margin-top: 0;
    padding: 30px 0 10px;
  }
  &__image-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @media (max-width: 767.98px) {
      bottom: 67px;
      height: auto;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    position: relative;
    z-index: 5;
    display: flex;
    justify-content: space-between;
    color: var(--white);
    @media (max-width: 767.98px) {
      padding: 0 10px;
      flex-direction: column;
      row-gap: 40px;
    }
  }

  &__text-block {
    max-width: 450px;
    padding-top: 10px;
    @media (max-width: 575.98px) {
      padding-top: unset;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    text-transform: uppercase;
    margin-bottom: 10px;
    @media (max-width: 575.98px) {
      font-size: 18px;
    }
  }

  &__descr {
    letter-spacing: 0.4px;
    @media (max-width: 575.98px) {
      font-size: 14px;
      font-weight: 600;
    }
  }

  &__guide {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    @media (max-width: 767.98px) {
      align-self: flex-end;
      flex-direction: row-reverse;
      column-gap: 16px;
      text-align: right;
      align-items: flex-end;
    }
  }

  &__guide-text {
  }

  &__guide-photo {
    width: 139px;
    height: 139px;
    overflow: hidden;
    border-radius: 50%;
    margin-bottom: 20px;
    @media (max-width: 767.98px) {
      margin-bottom: unset;
      width: 100px;
      height: 100px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__guide-name {
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 24px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    margin-bottom: 5px;
    @media (max-width: 767.98px) {
      font-size: 16px;
    }
  }

  &__guide-function {
    font-family: 'Inter';
    font-size: 18px;
    @media (max-width: 767.98px) {
      font-size: 14px;
    }
  }
}
.excursion {
  background: var(--light-gray);
  padding-bottom: 67px;
  @media (max-width: 575.98px) {
    padding-bottom: 45px;
  }
  &__main {
    padding-top: 37px;
    @media (max-width: 575.98px) {
      padding-top: 20px;
    }
    @media (max-width: 389.98px) {
      .container-m {
        padding: 0 15px;
      }
    }
  }

  &__descr {
    margin-bottom: 45px;
    display: flex;
    column-gap: 13px;
    @media (max-width: 575.98px) {
      margin-bottom: 22px;
    }
  }

  &__descr-qoutes {
    font-size: 27px;
    color: var(--light-green);
  }

  &__descr-text {
    font-style: italic;
    max-width: 610px;
  }

  &__content {
    @media (min-width: 768px) {
      padding: 10px 20px 40px 13px;
      background: var(--white);
      border: 0.5px solid var(--gray);
      border-radius: 8px;
    }
  }

  &__title {
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    letter-spacing: 0.15px;
    margin-bottom: 18px;
    padding-left: 7px;
    @media (max-width: 575.98px) {
      font-size: 20px;
    }
  }

  &__content-wrap {
  }

  &__group {
  }

  &__group-title {
    font-family: 'Inter';
    font-style: normal;
    font-size: 18px;
    text-transform: uppercase;
    padding-left: 81px;
    margin-bottom: 10px;
    @media (max-width: 767.98px) {
      padding-top: 20px;
      padding-left: 45px;
    }
    @media (max-width: 575.98px) {
      font-weight: 400;
    }
  }
  &__group-container {
    display: flex;
    column-gap: 17px;
    @media (max-width: 767.98px) {
      flex-direction: column;
      row-gap: 11px;
    }
  }

  &__group-mark {
    padding-top: 6px;
    width: 50px;
    flex: none;
    @media (max-width: 767.98px) {
      margin-top: -63px;
      width: 35px;
    }
    img {
      width: 100%;
    }
  }

  &__table {
    flex: 1 1 auto;
    row-gap: 4px;
    border-spacing: 6px 4px;
    margin-bottom: 25px;
    @media (max-width: 575.98px) {
      border-spacing: 0px 4px;
      margin-bottom: 20px;
    }
  }

  &__table-body {
  }

  &__table-row {
    &:nth-child(odd) {
      .excursion__table-item {
        background: #e5e5e5;
      }
    }
    &:nth-child(even) {
      .excursion__table-item {
        background: rgba(33, 158, 188, 0.15);
      }
    }
    &--bold {
      font-weight: 600;
      font-family: 'Open Sans';
    }
  }

  &__table-item {
    padding: 0;
    font-family: 'Inter';
    @media (max-width: 575.98px) {
      font-size: 14px;
    }
    &:first-child {
      padding: 5px 18px;
      @media (max-width: 575.98px) {
        padding: 5px 5px 5px 10px;
      }
    }
    &:last-child {
      padding: 5px 10px 5px 30px;
      @media (max-width: 575.98px) {
        padding: 5px 10px 5px 5px;
      }
    }
  }

  &__route {
    margin-bottom: 30px;
  }

  &__route-title {
    font-weight: 600;
    font-size: 18px;
    padding-left: 67px;
    @media (max-width: 767.98px) {
      padding-left: 3px;
    }
  }

  &__route-container {
  }

  &__route-block {
    display: flex;
    column-gap: 44px;
    @media (max-width: 767.98px) {
      column-gap: 8px;
    }
    &:last-child {
      .excursion__route-mark span {
        background: none;
      }
    }
  }

  &__route-mark {
    flex: none;
    display: flex;
    flex-direction: column-reverse;
    row-gap: 3px;
    @media (max-width: 767.98px) {
      row-gap: 2px;
    }
    span {
      background: url(~@/assets/images/dot.svg) center 0px/ 4px 7px repeat-y;
      flex: 1 1 auto;
      @media (max-width: 767.98px) {
        background-size: 3px 5px;
      }
    }
    img {
      width: 23px;
      height: 45px;
      object-fit: contain;
      @media (max-width: 767.98px) {
        width: 17px;
        height: 34px;
      }
    }
  }

  &__route-text {
    padding-top: 15px;
    @media (max-width: 767.98px) {
      padding-bottom: 5px;
      padding-top: 13px;
    }
  }

  &__route-subtitle {
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 0.15px;
    margin-bottom: 7px;
  }

  &__route-descr {
    margin-bottom: 6px;
    @media (max-width: 575.98px) {
      font-size: 14px;
    }
  }

  &__route-info {
    font-weight: 700;
    font-size: 14px;
    color: #219ebc;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__route-image {
    height: 270px;
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 10px;
    @media (max-width: 575.98px) {
      height: 200px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__route-end {
    font-weight: 700;
    font-size: 14px;
    @media (min-width: 768px) {
      display: none;
    }
  }

  &__organization {
    padding-left: 67px;
    @media (max-width: 767.98px) {
      padding: 5px 5px 15px 15px;
      background: #cdffbc;
      border-radius: 8px;
      margin: 0 -7px;
    }
  }

  &__organization-title {
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 24px;
    letter-spacing: 0.15px;
    @media (max-width: 575.98px) {
      font-size: 20px;
      margin-bottom: 15px;
    }
  }

  &__organization-block {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__organization-subtitle {
    font-weight: 600;
    font-size: 24px;
    letter-spacing: 0.15px;
    margin-bottom: 10px;
    @media (max-width: 575.98px) {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 5px;
    }
    &--price {
      font-size: 20px;
      margin-bottom: 20px;
      @media (max-width: 575.98px) {
        font-size: 16px;
        margin-bottom: 25px;
      }
    }
  }

  &__organization-text {
  }
  &__calendar {
  }
  &__info {
    margin-left: 67px;
  }
}
.excursion-calendar {
  padding-left: 67px;
  display: flex;
  column-gap: 20px;
  justify-content: center;
  margin-bottom: 17px;
  .mx-calendar + .mx-calendar {
    border: none;
    @media (min-width: 768px) {
      display: block;
    }
  }
  .mx-datepicker-main {
    border: none;
  }
}
</style>
