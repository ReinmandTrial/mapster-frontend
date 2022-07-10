<template>
  <div class="booking-data">
    <div class="container-m">
      <div class="booking-data__content">
        <div class="booking-data__image">
          <div class="booking-data__image-bg">
            <img
              v-if="excursion_image"
              :src="'data:image/jpg;base64,' + excursion_image[0].data"
              alt=""
            />
          </div>
          <h2 class="booking-data__title booking-data__title--mobile">
            {{ excursion.subject }}
          </h2>
          <p class="booking-data__descr booking-data__descr--mobile">
            {{ excursion.subtitle }}
          </p>
          <div class="booking-data__guide" v-if="guide">
            <div class="booking-data__guide-text">
              <p class="booking-data__guide-name">
                {{
                  guide.first_name +
                  ' ' +
                  guide.middle_name +
                  ' ' +
                  guide.last_name
                }}
              </p>
              <p class="booking-data__guide-function">
                {{ $t('excursions.client.excursion_page.guide_function.once') }}
              </p>
            </div>
            <div class="booking-data__guide-image">
              <img
                :src="'data:image/jpg;base64,' + guide.photo[0].data"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="booking-data__city">
          <span class="icon icon-mark"></span>
          <span class="booking-data__city-name">
            {{ excursion.city }}
          </span>
        </div>
        <h2 class="booking-data__title booking-data__title--desktop">
          {{ excursion.subject }}
        </h2>
        <p class="booking-data__descr booking-data__descr--desktop">
          {{ excursion.subtitle }}
        </p>
        <div class="booking-data__date">
          <h4 class="booking-data__date-title">
            {{ $t('excursions.client.booking.date_title') }}
          </h4>
          <p class="booking-data__date-params">{{ excursion_date }}</p>
        </div>
        <div class="booking-data__time">
          <h4 class="booking-data__time-title">
            {{ $t('excursions.client.booking.time_title') }}
          </h4>
          <ul class="booking-data__time-list">
            <li
              class="booking-data__time-item"
              v-for="(day, index) in new_schedule"
              :key="index"
            >
              <label class="booking-data__time-checkbox">
                <input
                  type="radio"
                  name="time"
                  class="booking-data__time-checkbox-none"
                  :value="day.date.slice(-5)"
                  v-model="radio_time"
                />
                <span class="booking-data__time-checkbox-style"></span>
              </label>
              <p class="booking-data__time-text">
                {{ day.date.slice(11, 16) + ' - ' + calcPlace(day.count) }}
              </p>
            </li>
          </ul>
        </div>
        <div class="booking-data__ticket">
          <h4 class="booking-data__ticket-title">
            {{ $t('excursions.client.booking.ticket.title') }}
          </h4>
          <table class="booking-data__ticket-table">
            <tr class="booking-data__ticket-head">
              <th class="booking-data__ticket-head-item">
                {{ $t('excursions.client.booking.ticket.category') }}
              </th>
              <th class="booking-data__ticket-head-item">
                {{
                  $t('excursions.client.booking.ticket.price', {
                    for: costType,
                  })
                }}
              </th>
            </tr>
            <tr
              class="booking-data__ticket-row"
              v-for="(price, index) in excursion.guideprices"
              :key="index"
            >
              <td
                class="booking-data__ticket-item"
                v-html="setPriceListName(price.type)"
              ></td>
              <td class="booking-data__ticket-item">
                <div class="booking-data__ticket-item-flex">
                  <div class="booking-data__ticket-price">
                    <span class="booking-data__ticket-price-num">
                      {{ price.price }}
                    </span>
                    <span class="booking-data__ticket-currency">
                      <span class="icon icon-euro"></span>
                    </span>
                  </div>
                  <div class="booking-data__ticket-counter counter">
                    <button
                      type="button"
                      class="booking-data__ticket-counter counter__minus"
                      @click="price.counter != 0 ? price.counter-- : false"
                    ></button>
                    <input
                      type="text"
                      class="counter__num"
                      v-model="price.counter"
                      disabled
                    />
                    <button
                      @click="price.counter++"
                      type="button"
                      class="booking-data__ticket-counter counter__plus"
                    ></button>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="booking-data__inputs">
          <div class="booking-data__input-block">
            <h5 class="booking-data__input-title">
              {{ $t('excursions.client.booking.input_name.title') }}
            </h5>
            <input
              type="text"
              class="booking-data__input"
              v-model.trim="inputs.name"
              :placeholder="
                $t('excursions.client.booking.input_name.placeholder')
              "
            />
          </div>
          <div class="booking-data__input-block">
            <h5 class="booking-data__input-title">
              {{ $t('excursions.client.booking.input_email.title') }}
            </h5>
            <input
              type="email"
              class="booking-data__input"
              v-model.trim="inputs.email"
              :placeholder="
                $t('excursions.client.booking.input_email.placeholder')
              "
            />
          </div>
          <div class="booking-data__input-block">
            <h5 class="booking-data__input-title">
              {{ $t('excursions.client.booking.input_phone.title') }}
            </h5>
            <input
              type="number"
              class="booking-data__input"
              v-model.trim="inputs.phone"
              :placeholder="
                $t('excursions.client.booking.input_phone.placeholder')
              "
            />
          </div>
          <div class="booking-data__input-block">
            <h5 class="booking-data__input-title">
              {{ $t('excursions.client.booking.input_textarea.title') }}
            </h5>

            <textarea
              v-model.trim="inputs.question"
              class="booking-data__input booking-data__textarea"
            ></textarea>
          </div>
        </div>
        <button type="button" class="booking-data__submit" @click="submitForm">
          {{ $t('excursions.client.booking.submit') }}
        </button>
        <div class="booking-data__errors">
          <div class="booking-data__error" v-if="errors.unknown_request">
            {{ $t('errors.unknown_request') }}
          </div>
          <div class="booking-data__error" v-if="errors.unauthorized">
            {{ $t('errors.unauthorized') }}
          </div>
          <div class="booking-data__error" v-if="errors.date.null">
            {{ $t('errors.date.null') }}
          </div>
          <div class="booking-data__error" v-if="errors.date.wrong">
            {{ $t('errors.date.wrong') }}
          </div>
          <div class="booking-data__error" v-if="errors.time.null">
            {{ $t('errors.time.null') }}
          </div>
          <div class="booking-data__error" v-if="errors.ticket.null">
            {{ $t('errors.ticket.null') }}
          </div>
          <div class="booking-data__error" v-if="errors.inputs.name.null">
            {{ $t('errors.inputs.name.null') }}
          </div>
          <div class="booking-data__error" v-if="errors.inputs.email.null">
            {{ $t('errors.inputs.email.null') }}
          </div>
          <div class="booking-data__error" v-if="errors.inputs.email.wrong">
            {{ $t('errors.inputs.email.wrong') }}
          </div>
          <div class="booking-data__error" v-if="errors.inputs.phone.null">
            {{ $t('errors.inputs.phone.null') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosConfig from '../../../../../api/instance'
import 'vue2-datepicker/index.css'

export default {
  name: 'BookingData',
  components: {},
  directives: {},
  data() {
    return {
      current_id: null,
      week_day: null,
      excursion_date: null,
      excursion_image: null,
      guide: null,
      counter: 0,
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
        available_calendar: [],
      },
      new_schedule: null,
      radio_time: null,
      inputs: {
        name: '',
        email: '',
        phone: '',
        question: '',
      },
      errors: {
        unauthorized: false,
        unknown_request: false,
        date: {
          null: false,
          wrong: false,
        },
        time: {
          null: false,
        },
        ticket: {
          null: false,
        },
        inputs: {
          name: {
            null: false,
          },
          email: {
            null: false,
            wrong: false,
          },
          phone: {
            null: false,
          },
        },
      },
    }
  },
  methods: {
    setPriceListName(priceType) {
      if (priceType == 'default') {
        return this.$t('excursions.client.booking.ticket.default_ticket')
      } else if (priceType == 'child') {
        return this.$t('excursions.client.booking.ticket.child_ticket')
      } else {
        return 'unknown type'
      }
    },
    async submitForm() {
      var arrayD = {}
      // date
      this.errors.date.null = false

      if (this.excursion_date) {
        arrayD.date = this.excursion_date
      } else {
        this.errors.date.null = true
        return false
      }
      // time

      this.errors.time.null = false

      if (this.radio_time) {
        arrayD.time = this.radio_time
      } else {
        this.errors.time.null = true
        return false
      }

      // ticket
      this.errors.ticket.null = false

      var counter = 0

      this.excursion.guideprices.forEach((el) => {
        counter += el.counter
      })
      if (counter != 0) {
        arrayD.tickets = this.excursion.guideprices
      } else {
        this.errors.ticket.null = true
        return false
      }

      // inputs

      // name
      this.errors.inputs.name.null = false

      if (this.inputs.name) {
        arrayD.name = this.inputs.name
      } else {
        this.errors.inputs.name.null = true
        return false
      }

      // email
      this.errors.inputs.email.null = false
      this.errors.inputs.email.wrong = false

      function validateEmail(email) {
        const re = /\S+@\S+\.\S+/
        return re.test(email)
        // if (email) {
        //   return true
        // }
      }

      if (this.inputs.email) {
        if (validateEmail(this.inputs.email)) {
          arrayD.email = this.inputs.email
        } else {
          this.errors.inputs.email.wrong = true
          return false
        }
      } else {
        this.errors.inputs.email.null = true
        return false
      }

      // phone
      this.errors.inputs.phone.null = false

      if (this.inputs.phone) {
        arrayD.phone = this.inputs.phone
      } else {
        this.errors.inputs.phone.null = true
        return false
      }

      // question
      arrayD.question = this.inputs.question
      // console.log(arrayD)

      var ticketsForPost = []
      var ticketsAllPrice = 0

      arrayD.tickets.forEach((ticket) => {
        for (let i = 0; i < ticket.counter; i++) {
          var ticketForPost = {
            type: 'guides',
            servicetype: this.excursion.id,
            on_the_date: arrayD.date + ' ' + arrayD.time,
            departure: arrayD.date + ' ' + arrayD.time,
            cost: ticket.price,
            category: ticket.type,
          }
          ticketsAllPrice += ticket.price
          ticketsForPost.push(ticketForPost)
        }
      })
      arrayD.price = ticketsAllPrice
      this.errors.unknown_request = false

      await axiosConfig
        .post(`/order/new`, {
          date: arrayD.date + ' ' + arrayD.time,
          name: arrayD.name,
          email: arrayD.email,
          phone: arrayD.phone,
          question: arrayD.question,
          currency: 'USD',
          details: ticketsForPost,
        })
        .then((response) => {
          // console.log(response.data.data[0].id)
          if (response.data.status === 200) {
            localStorage.setItem('order', JSON.stringify(arrayD))
            localStorage.setItem('id_for_order', this.excursion.id)
            localStorage.setItem('id_order', response.data.data[0].id)

            this.$router.push({
              name: `PaymentExcursion`,
              params: {
                order: arrayD,
                id: this.excursion.id,
              },
            })
          } else {
            this.errors.unknown_request = true
          }
        })
        .catch((error) => {
          if (error.request.status == 401) {
            this.errors.unauthorized = true
          } else {
            this.errors.unknown_request = true
          }
          console.log(error)
        })
    },
    setTimeSchedule() {
      var newSchedule = []
      // console.log(this.excursion_date)
      // 22.06.2022

      const newDay = this.excursion_date.slice(0, 2)
      const newMonth = this.excursion_date.slice(3, 5)
      const newYear = this.excursion_date.slice(6, 11)

      const changeDate = newYear + '-' + newMonth + '-' + newDay

      const calendar = this.excursion.available_calendar
      // console.log(calendar)

      for (var key in calendar) {
        if (key.indexOf(changeDate) > -1) {
          let obj = {
            date: key,
            count: calendar[key],
          }
          newSchedule.push(obj)
        }
      }

      // console.log(newSchedule)

      this.new_schedule = newSchedule
      // console.log(this.new_schedule)
    },
    calcPlace(numPlaces) {
      numPlaces
      if (!numPlaces < 10) {
        var lastTwoNums = numPlaces.toString().slice(-2, 2)
      }
      var lastNum = numPlaces.toString().slice(-1, 1)

      if (lastTwoNums != '11' && lastNum == '1') {
        return numPlaces + ' место'
      } else if (
        (lastNum == '2' || lastNum == '3' || lastNum == '4') &&
        lastTwoNums != 12 &&
        lastTwoNums != 13 &&
        lastTwoNums != 14
      ) {
        return numPlaces + ' места'
      } else {
        return numPlaces + ' мест'
      }
    },
  },
  computed: {
    costType() {
      if (this.excursion.cost_type == 'person') {
        return 'за человека'
      } else if (this.excursion.cost_type == 'excursion') {
        return 'за экскурсию'
      } else {
        return ''
      }
    },
    langDatepicker() {
      if (this.$i18n.locale == 'ru') {
        return this.datepicker_ru
      } else {
        return this.datepicker_en
      }
    },
  },
  created() {
    const excursionId = this.$route.params.id
    if (excursionId) {
      this.current_id = excursionId
    }

    const week_day = this.$route.params.week_day
    if (week_day) {
      this.week_day = week_day
    }

    const date = this.$route.params.date
    if (date) {
      this.excursion_date = date
    }
  },
  async beforeMount() {
    await axiosConfig
      .get(`/guide/${this.current_id}`)
      .then((response) => {
        this.excursion = response.data.data[0]
        // console.log(this.excursion)

        this.excursion.guideprices.forEach((el) => {
          this.$set(el, 'counter', 0)
        })

        this.setTimeSchedule()
      })
      .catch(function (error) {
        console.log(error)
      })

    await axiosConfig
      .get(`/guide/media/${this.current_id}`)
      .then((response) => {
        this.excursion_image = response.data.data
      })
      .catch(function (error) {
        console.log(error)
      })
    await axiosConfig
      .get(`/user/${this.excursion.owner}`)
      .then((response) => {
        this.guide = response.data.data[0]
      })
      .catch(function (error) {
        console.log(error)
      })
  },

  async mounted() {},
}
</script>

<style lang="scss">
.counter {
  display: flex;
  align-items: center;
  column-gap: 3px;
  &__minus {
    width: 20px;
    height: 20px;
    background: var(--light-green);
    border-radius: 50%;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 12px;
      height: 2px;
      background: var(--white);
    }
  }

  &__num {
    font-weight: 600;
    font-size: 20px;
    line-height: 22px;
    text-align: center;
    width: 28px;
    padding: 0;
    pointer-events: none;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &:disabled {
      color: var(--black);
    }
  }

  &__plus {
    width: 20px;
    height: 20px;
    background: var(--light-green);
    border-radius: 50%;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 12px;
      height: 2px;
      background: var(--white);
    }
    &::after {
      content: '';
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 2px;
      height: 12px;
      background: var(--white);
    }
  }
}
.booking-data {
  padding: 21px 0 0px;

  @media (max-width: 767.98px) {
    padding-top: 0;
    padding-bottom: 100px;
    .container-m {
      padding: 0;
    }
  }
  &__content {
    min-height: 100vh;
    background: var(--white);
    border-radius: 5px;
    padding: 25px 25px 143px;
    @media (max-width: 767.98px) {
      background: none;
      padding-bottom: 0;
    }
  }

  &__image {
    margin: -25px -25px 16px;
    width: stretch;
    padding-bottom: 33%;
    height: 0;
    position: relative;
    @media (max-width: 767.98px) {
      padding: 30px 35px 11px;
      min-height: 300px;
      display: flex;
      flex-direction: column;
      background: #023047;
      margin-bottom: 20px;
    }
  }

  &__image-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gray);
    @media (max-width: 767.98px) {
      height: auto;
      bottom: 65px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__guide {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: calc(100% - 30px);
    display: flex;
    column-gap: 6px;
    color: var(--white);
    text-align: right;
    align-items: flex-end;
    @media (max-width: 767.98px) {
      position: relative;
      left: 0;
      bottom: 0;
      transform: none;
      z-index: 5;
      top: 0;
      margin-top: auto;
      align-self: flex-end;
    }
  }
  &__guide-text {
    @media (min-width: 768px) {
      display: none;
    }
  }
  &__guide-name {
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  &__guide-function {
    font-family: 'Inter';
    font-size: 14px;
  }

  &__guide-image {
    overflow: hidden;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: var(--light-gray);
    @media (max-width: 767.98px) {
      width: 100px;
      height: 100px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__city {
    display: flex;
    column-gap: 2px;
    font-size: 14px;
    margin-bottom: 20px;
    @media (max-width: 767.98px) {
      display: none;
    }
  }

  &__city-name {
    padding-top: 3px;
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 7px;
    max-width: 500px;
    @media (max-width: 767.98px) {
      position: relative;
      z-index: 5;
      font-size: 18px;
      color: var(--white);
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    &--mobile {
      @media (min-width: 768px) {
        display: none;
      }
    }
    &--desktop {
      @media (max-width: 767.98px) {
        display: none;
      }
    }
  }

  &__descr {
    font-size: 18px;
    max-width: 500px;
    margin-bottom: 15px;
    @media (max-width: 767.98px) {
      position: relative;
      z-index: 5;
      font-weight: 600;
      font-size: 14px;
      color: var(--white);
      letter-spacing: 0.4px;
      margin-bottom: 40px;
    }
    &--mobile {
      @media (min-width: 768px) {
        display: none;
      }
    }
    &--desktop {
      @media (max-width: 767.98px) {
        display: none;
      }
    }
  }

  &__date {
    margin-bottom: 25px;
  }

  &__date-title {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 10px;
  }

  &__date-input-box {
    position: relative;
    width: fit-content;

    input {
      & + i.mx-icon-calendar {
        right: 15px;
        svg {
          width: 25px;
          height: 29px;
        }
      }
    }
  }

  &__date-input {
    width: 200px;
    background: var(--white);
    border: 1px solid rgba(26, 27, 32, 0.6);
    border-radius: 5px;
    padding: 13px 55px 13px 16px;
  }

  &__calendar {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: 14px;
  }

  &__time {
    margin-bottom: 40px;
    @media (max-width: 575.98px) {
      margin-bottom: 20px;
    }
  }

  &__time-title {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 12px;
  }

  &__time-list {
  }

  &__time-item {
    display: flex;
    column-gap: 9px;
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  &__time-checkbox {
  }

  &__time-checkbox-none {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  &__time-checkbox-style {
    display: block;
    cursor: pointer;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__time-checkbox-none:checked + &__time-checkbox-style {
    &::before {
      content: '';
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--black);
    }
  }

  &__time-text {
  }

  &__ticket {
    margin-bottom: 37px;
    @media (max-width: 575.98px) {
      margin-bottom: 25px;
    }
  }

  &__ticket-title {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 15px;
  }

  &__ticket-table {
  }

  &__ticket-head {
  }

  &__ticket-head-item {
    text-align: left;
    font-size: 15px;
    font-weight: normal;
    padding: 0 15px 18px 0;
    @media (max-width: 575.98px) {
      font-weight: 600;
      padding-bottom: 12px;
    }
  }

  &__ticket-row {
    &:not(:last-child) {
      padding-bottom: 10px;
    }
  }

  &__ticket-item {
    font-size: 15px;
    &:first-child {
      padding: 0 25px 0 0;
      @media (max-width: 575.98px) {
        padding-right: 36px;
        vertical-align: baseline;
        padding-top: 8px;
      }
    }
    &-flex {
      display: flex;
      align-items: center;
      column-gap: 50px;
      @media (max-width: 575.98px) {
        flex-direction: column;
        row-gap: 20px;
        align-items: flex-start;
      }
    }
  }

  &__ticket-price {
    display: flex;
    align-items: center;
    column-gap: 4px;
    @media (max-width: 575.98px) {
      background: #ffffff;
      border: 1px solid rgba(26, 27, 32, 0.6);
      border-radius: 5px;
      column-gap: 0px;
      height: 35px;
    }
  }

  &__ticket-price-num {
    background: #ffffff;
    border: 1px solid rgba(26, 27, 32, 0.6);
    border-radius: 5px;
    height: 35px;
    min-width: 55px;
    padding: 0 10px;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
    @media (max-width: 575.98px) {
      border: none;
      height: 100%;
      padding-left: 18px;
      padding-right: 13px;
    }
  }

  &__ticket-currency {
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 575.98px) {
      background: #41b619;
      border-radius: 5px;
      color: var(--black);
      width: 51px;
      margin: -1px;
      height: calc(100% + 2px);
    }
    .icon {
      font-size: 24px;
    }
  }

  &__ticket-counter {
  }

  &__inputs {
  }

  &__input-block {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  &__input-title {
    font-weight: 600;
    letter-spacing: 0.15px;
    margin-bottom: 10px;
  }

  &__input {
    padding: 16px;
    background: var(--white);
    border: 1px solid rgba(26, 27, 32, 0.6);
    border-radius: 5px;
    width: 100%;
    font-size: 12px;
    @media (max-width: 575.98px) {
      padding: 11px 16px;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &::placeholder {
      color: rgba(26, 27, 32, 0.6);
    }
  }

  &__textarea {
    height: 94px;
  }

  &__submit {
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
    margin-top: 53px;
  }
  &__error {
    font-size: 14px;
    color: red;
    margin-top: 10px;
  }
}
</style>
