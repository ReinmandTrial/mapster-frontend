<template>
  <div class="excursion">
    <div class="excursion__banner excursion-banner">
      <div class="excursion-banner__image-bg">
        <img
          v-if="excursion_image.length"
          :src="'data:image/jpg;base64,' + excursion_image[0].data"
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
                  (guide.last_name ? guide.last_name : '')
                }}
              </p>
              <p class="excursion-banner__guide-function">
                {{ $t('excursions.client.excursion_page.guide_function.once') }}
              </p>
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
          <h2 class="excursion__title">
            {{ $t('excursions.client.excursion_page.title') }}
          </h2>
          <div class="excursion__content-wrap">
            <div class="excursion__group">
              <h4 class="excursion__group-title">
                {{ $t('excursions.client.excursion_page.title_group') }}
              </h4>
              <div class="excursion__group-container">
                <div class="excursion__group-mark">
                  <img src="@/assets/images/point-path-curve.svg" alt="" />
                </div>
                <table class="excursion__table">
                  <tbody class="excursion__table-body">
                    <tr class="excursion__table-row">
                      <td class="excursion__table-item">
                        {{
                          $t('excursions.client.excursion_page.table.duration')
                        }}
                      </td>
                      <td class="excursion__table-item">
                        {{ calcDuration(excursion.duration) }}
                      </td>
                    </tr>
                    <tr class="excursion__table-row">
                      <td class="excursion__table-item">
                        {{
                          $t('excursions.client.excursion_page.table.amount')
                        }}
                      </td>
                      <td class="excursion__table-item">до {{ calcPeople }}</td>
                    </tr>
                    <tr class="excursion__table-row">
                      <td class="excursion__table-item">
                        {{
                          $t(
                            'excursions.client.excursion_page.table.children.title',
                          )
                        }}
                      </td>
                      <td class="excursion__table-item">
                        {{
                          excursion.children_allowed == true
                            ? $t(
                                'excursions.client.excursion_page.table.children.true',
                              )
                            : $t(
                                'excursions.client.excursion_page.table.children.false',
                              )
                        }}
                      </td>
                    </tr>
                    <tr class="excursion__table-row">
                      <td class="excursion__table-item">
                        {{
                          $t(
                            'excursions.client.excursion_page.table.move.title',
                          )
                        }}
                      </td>
                      <td class="excursion__table-item">
                        {{
                          excursion.moves == 'car'
                            ? $t(
                                'excursions.client.excursion_page.table.move.car',
                              )
                            : $t(
                                'excursions.client.excursion_page.table.move.onfoot',
                              )
                        }}
                      </td>
                    </tr>
                    <tr class="excursion__table-row excursion__table-row--bold">
                      <td class="excursion__table-item">
                        {{
                          $t(
                            'excursions.client.excursion_page.table.length.term',
                          )
                        }}
                      </td>
                      <td class="excursion__table-item">
                        {{
                          excursion.length +
                          ' ' +
                          $t('excursions.client.excursion_page.table.length.km')
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="excursion__tags excursion-tags">
              <ul class="excursion-tags__list">
                <li
                  class="excursion-tags__item"
                  v-for="tag in excursion.tags"
                  :key="tag.id"
                >
                  {{ tag.tag }}
                </li>
              </ul>
            </div>
            <div class="excursion__route">
              <h3 class="excursion__route-title">
                {{ $t('excursions.client.excursion_page.route.title') }}
              </h3>
              <div
                class="excursion__route-container"
                v-if="excursion.guideplan.length"
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
                      {{
                        $t('excursions.client.excursion_page.route.wait') +
                        calcMinutes(route.stoptime)
                      }}
                    </p>
                    <div class="excursion__route-image" v-if="route.image">
                      <img
                        :src="
                          'data:image/' +
                          route.image.extension.slice(1) +
                          ';base64,' +
                          route.image.data
                        "
                        alt=""
                      />
                    </div>
                    <p class="excursion__route-descr">
                      {{ route.description }}
                    </p>
                    <p class="excursion__route-info" v-if="route.roadtime">
                      {{
                        $t('excursions.client.excursion_page.route.next') +
                        calcMinutes(route.roadtime)
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="excursion__organization">
              <h3 class="excursion__organization-title">
                {{ $t('excursions.client.excursion_page.organization.title') }}
              </h3>
              <div class="excursion__organization-block">
                <h4
                  class="excursion__organization-subtitle excursion__organization-subtitle--price"
                >
                  {{
                    $t('excursions.client.excursion_page.organization.price') +
                    min_price +
                    ' €'
                  }}
                </h4>
                <p class="excursion__organization-text">
                  {{ excursion.details }}
                </p>
              </div>
              <div class="excursion__organization-block">
                <h4 class="excursion__organization-subtitle">
                  {{
                    $t(
                      'excursions.client.excursion_page.organization.meeting_point',
                    )
                  }}
                </h4>
                <p class="excursion__organization-text">
                  {{ excursion.expect_point }}
                </p>
              </div>
              <div class="excursion__organization-block">
                <h4 class="excursion__organization-subtitle">
                  {{
                    $t('excursions.client.excursion_page.organization.book_now')
                  }}
                </h4>
                <p class="excursion__organization-text">
                  {{
                    $t(
                      'excursions.client.excursion_page.organization.book_now_text',
                      {
                        langs: calcLanguages(excursion.lang),
                      },
                    )
                  }}
                </p>
              </div>
            </div>
            <div v-if="to_buy" class="excursion__calendar excursion-calendar">
              <div class="excursion-calendar__wrap">
                <date-picker v-show="sdd"></date-picker>
                <calendar-panel
                  :calendar="calendar1"
                  v-model="datepicker"
                  @update:calendar="handleUpdateCalendar1"
                  :get-classes="getClasses"
                  @select="handleSelect"
                ></calendar-panel>
                <calendar-panel
                  :calendar="calendar2"
                  v-model="datepicker"
                  @update:calendar="handleUpdateCalendar2"
                  :get-classes="getClasses"
                  @select="handleSelect"
                ></calendar-panel>
              </div>
              <div class="excursion-calendar__info">
                <div
                  class="excursion-calendar__info-item excursion-calendar__info-item--red"
                >
                  <span></span>
                  {{ $t('calendar.info.busy') }}
                </div>
                <div
                  class="excursion-calendar__info-item excursion-calendar__info-item--green"
                >
                  <span></span>
                  {{ $t('calendar.info.free') }}
                </div>
              </div>
            </div>
            <help-info
              v-if="to_buy"
              class="excursion__info"
              :color_style="'green'"
            >
              {{ $t('excursions.client.excursion_page.calendar.info') }}
            </help-info>
            <button
              v-if="to_buy"
              type="button"
              class="excursion__btn"
              @click="pickDate"
            >
              {{ $t('excursions.client.excursion_page.calendar.btn') }}
            </button>
            <div class="excursion__error" v-if="errors.date.null">
              {{ $t('errors.date.null') }}
            </div>
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
import 'vue2-datepicker/index.css'
import HelpInfo from '../../../ui/HelpInfo.vue'
import DatePicker from 'vue2-datepicker'
import { addMonths, subMonths } from 'date-fns'

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
  props: {
    to_buy: {
      default() {
        return true
      },
    },
    watch_excursion: {
      default() {
        return null
      },
    },
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
            image: null,
          },
          {
            id: null,
            subject: null,
            description: null,
            roadtime: null,
            stoptime: null,
            owner: null,
            image: null,
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
      excursion_image: null,
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
      value1: [new Date(2022, 7, 3), new Date(2022, 7, 10)],
      value2: [new Date(2022, 7, 11), new Date(2022, 7, 10)],
      calendar1: new Date(),
      calendar2: new Date(),
      busy_array: [],
      errors: {
        date: {
          null: false,
        },
      },
    }
  },
  watch: {
    busy_array: {
      immediate: true,
      handler(val) {
        if (val[0]) {
          this.handleUpdateCalendar1(new Date(val[0]))
        }
      },
    },
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
    selectTimeNow(date) {
      var now = new Date()
      var nowHours = now.getHours()
      var nowMinutes = now.getMinutes()
      var dateHours = new Date(date.setHours(nowHours))
      var dateMinutes = new Date(dateHours.setMinutes(nowMinutes))

      return dateMinutes
    },
    getClasses(date) {
      const result = []
      var cellDate = this.selectTimeNow(date)
      if (
        this.busy_array.some((v) => v === cellDate.toISOString().slice(0, 10))
      ) {
        result.push('busy')
      }
      if (new Date().toISOString() >= cellDate.toISOString()) {
        result.push('disabled')
      }

      return result
    },

    handleSelect(date) {
      this.datepicker = date
    },
    pickDate() {
      if (this.datepicker) {
        // console.log(this.datepicker)
        // console.log(this.datepicker.toLocaleDateString())

        this.$router.push({
          name: `BookingData`,
          params: {
            id: this.current_id,
            week_day: this.datepicker.getDay(),
            date: this.datepicker.toLocaleDateString(),
          },
        })
      } else {
        this.errors.date.null = true
      }
    },
    calcDuration(minutes) {
      const hours = (minutes / 60).toFixed(1)
      var lastNum = hours.toString().slice(-1),
        lastTwoNums = hours.toString().slice(-2)
      if (lastTwoNums != 11 && lastNum == 1) {
        return hours + ' час'
      } else if (
        (lastNum == 2 || lastNum == 3 || lastNum == 4) &&
        lastTwoNums != 12 &&
        lastTwoNums != 13 &&
        lastTwoNums != 14
      ) {
        hours
        return hours + ' часа'
      } else {
        return hours + ' часов'
      }
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
    getGuidePlanImages() {
      // var
      this.excursion.guideplan.forEach((el) => {
        axiosConfig
          .get(`/guide/media/guideplan/${el.id}`)
          .then((response) => {
            const newImage = response.data.data[0]
            this.$set(el, 'image', newImage)
          })
          .catch(function (error) {
            console.log(error)
          })
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
        return this.excursion.number + ' человека'
      } else if (
        (lastNum == 2 || lastNum == 3 || lastNum == 4) &&
        lastTwoNums != 12 &&
        lastTwoNums != 13 &&
        lastTwoNums != 14
      ) {
        return this.excursion.number + ' человек'
      } else {
        return this.excursion.number + ' человек'
      }
    },
  },
  created() {
    if (this.to_buy) {
      const excursion = this.$route.params.id
      if (excursion) {
        this.current_id = excursion
      }
    } else {
      this.excursion = this.watch_excursion
      this.excursion_image = [this.watch_excursion.main_image]
      this.excursion.guideplan.forEach((el, index) => {
        this.$set(el, 'image', this.watch_excursion.points_images[index])
      })
      this.guide = this.$store.getters.getUser
    }
  },
  async mounted() {
    if (this.to_buy) {
      await axiosConfig
        .get(`/guide/${this.current_id}`)
        .then((response) => {
          this.excursion = response.data.data[0]
          // console.log(this.excursion)
        })
        .catch(function (error) {
          console.log(error)
        })

      this.checkPrice()
      this.getGuidePlanImages()
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
          this.excursion_image = response.data.data
          // console.log(this.excursion_image)
        })
        .catch(function (error) {
          console.log(error)
        })

      var newSchedule = []

      const calendar = this.excursion.available_calendar
      const maxPeople = this.excursion.number
      for (var key in calendar) {
        if (calendar[key] < maxPeople) {
          newSchedule.push(key.toString().slice(0, 10))
        }
      }
      // console.log(newSchedule)
      this.busy_array = newSchedule
      // console.log(this.busy_array)
    } else {
      this.checkPrice()
    }
  },
}
</script>

<style lang="scss">
.busy {
  background: #ff0000 !important;
  pointer-events: none;
}
.disabled {
  background: #bdbdbd !important;
  pointer-events: none;
  color: #000 !important;
}
.in-range1 {
  background: #ffaaaa;
}
.active2 {
  background: #00ff00;
}
.in-range2 {
  background: #aaffaa;
}
.excursion-banner {
  position: relative;
  margin-top: -136px;
  padding: 175px 0 45px;
  @media (min-width: 1300px) {
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
  }
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
    margin: 0 -6px 47px;

    @media (max-width: 575.98px) {
      border-spacing: 0px 4px;
      margin: 0 0 20px;
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
    flex: 1 1 auto;
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
    @media (max-width: 767.98px) {
      margin-left: unset;
    }
  }
  &__btn {
    width: 100%;
    max-width: 280px;
    background: var(--light-green);
    border-radius: 6px;
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 1.25px;
    text-transform: uppercase;
    padding: 7px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px auto 0;
    @media (max-width: 575.98px) {
      margin-top: 22px;
    }
  }
  &__error {
    font-size: 14px;
    color: red;
    margin-top: 10px;
    text-align: center;
  }
}

.excursion-tags {
  padding-left: 67px;
  margin-bottom: 32px;
  @media (max-width: 767.98px) {
    padding-left: unset;
  }
  &__list {
    display: flex;
    gap: 9px;
    align-items: center;
    flex-wrap: wrap;
  }

  &__item {
    background: #d9d9d9;
    border-radius: 5px;
    padding: 6px 10px;
    font-weight: 600;
    font-size: 14px;
  }
}

.excursion-calendar {
  padding-left: 67px;
  margin: 0 auto 26px;
  width: fit-content;
  @media (max-width: 767.98px) {
    padding-left: unset;
  }
  &__wrap {
    display: flex;
    column-gap: 20px;
    justify-content: center;
  }

  &__info {
    display: flex;
    column-gap: 68px;
    margin-bottom: 17px;
    padding-left: 5px;
  }

  &__info-item {
    display: flex;
    column-gap: 10px;
    font-size: 14px;
    align-items: center;
    span {
      width: 35px;
      height: 29px;
      background: #85d95e;
      border: 2px solid #78e4de;
    }
  }

  &__info-item--red {
    span {
      background: #ee0e00;
      border: 2px solid #ff5f5f;
    }
  }

  &__info-item--green {
    span {
      background: #85d95e;
      border: 2px solid #78e4de;
    }
  }
  .mx-calendar:nth-child(2) {
    .mx-btn-icon-right {
      display: none;
      @media (max-width: 767.98px) {
        display: block;
      }
    }
  }
  .mx-calendar:last-child {
    .mx-btn-icon-left {
      display: none;
    }
  }
  .mx-calendar + .mx-calendar {
    border: none;
    @media (min-width: 768px) {
      display: block;
    }
  }
  .mx-datepicker-main {
    border: none;
  }
  .cell {
    background: #85d95e;
  }
}
</style>
