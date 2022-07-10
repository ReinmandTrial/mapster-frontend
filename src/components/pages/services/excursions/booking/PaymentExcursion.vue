<template>
  <div class="info-pay">
    <div class="container-m">
      <div class="info-pay__wrap">
        <div class="info-pay__title">
          {{ $t('excursions.client.payment.title') }} {{ order_id }}
        </div>
        <div class="info-pay__tour-information tour-info">
          <div class="tour-info__img">
            <img
              v-if="excursion_image"
              :src="'data:image/jpg;base64,' + excursion_image[0].data"
              alt="tour-img"
            />
            <div class="tour-info__guide-img">
              <img :src="'data:image/jpg;base64,' + guide_photo" alt="" />
            </div>
          </div>
          <div class="tour-info__content">
            <div class="tour-info__block">
              <div class="tour-info__item">
                <p class="tour-info__subtitle">
                  {{ $t('excursions.client.card_order.route') }}
                </p>
                <p class="tour-info__text tour-info__text_city">
                  <span class="icon icon-mark"></span>
                  {{ excursion.city }}
                </p>
                <p class="tour-info__name-location">
                  {{ excursion.subtitle }}
                </p>
              </div>
            </div>
            <div class="tour-info__block">
              <div class="tour-info__item">
                <p class="tour-info__subtitle">
                  {{ $t('excursions.client.card_order.date') }}
                </p>
                <p class="tour-info__text">
                  <span class="icon icon-calendar"></span>
                  {{ order.date }}
                </p>
              </div>
              <div class="tour-info__item">
                <p class="tour-info__subtitle">
                  {{ $t('excursions.client.card_order.duration') }}
                </p>
                <p class="tour-info__text">
                  <span class="icon icon-watch"></span>
                  {{ calcExcurtionDuration }}
                </p>
              </div>
            </div>
            <div class="tour-info__block">
              <div class="tour-info__item">
                <p class="tour-info__subtitle">
                  {{ $t('excursions.client.card_order.customer') }}
                </p>
                <p class="tour-info__text">
                  <span class="icon icon-person-edit"></span>
                  {{ order.name }}
                </p>
              </div>
              <div class="tour-info__item tour-info__item_amount">
                <p class="tour-info__subtitle">
                  {{ $t('excursions.client.card_order.amount') }}
                </p>
                <p class="tour-info__text tour-info__text_amount">
                  <span
                    v-for="(price_type, index) in order.tickets"
                    :key="index"
                  >
                    {{ calcPriceType(price_type.type, price_type.counter) }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="info-pay__general-info-block">
          <help-info class="info-pay__general-info" :color_style="'green'">
            {{ $t('excursions.client.payment.info_card') }}
          </help-info>
          <help-info class="info-pay__general-info" :color_style="'green'">
            {{ $t('excursions.client.payment.policy') }}
          </help-info>
        </div>
        <div class="info-pay__payment">
          <div class="info-pay__to-pay to-pay">
            <p class="to-pay__text">
              {{ $t('excursions.client.payment.to_pay') }}
            </p>
            <p class="to-pay__price">
              {{ order.price }}
              <span class="icon icon-euro"></span>
            </p>
          </div>
          <div class="info-pay__payment-system">
            <img
              src="@/assets/images/visa.svg"
              alt="Visa"
              class="info-pay__visa"
            />
            <img
              src="@/assets/images/mastercard.svg"
              alt="MasterCard"
              class="info-pay__mastercard"
            />
          </div>
        </div>
        <button class="info-pay__pay-btn green-btn" @click="pay">
          {{ $t('excursions.client.payment.pay') }}
        </button>
        <div class="booking-data__errors">
          <div class="booking-data__error" v-if="errors.unknown_request">
            {{ $t('errors.unknown_request') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosConfig from '../../../../../api/instance'
import HelpInfo from '../../../../ui/HelpInfo.vue'

export default {
  name: 'PaymentExcursion',
  components: { HelpInfo },
  directives: {},
  data() {
    return {
      order: [],
      order_id: null,
      excursion_id: null,
      excursion_image: null,
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
      guide_photo: null,
      errors: {
        unknown_request: false,
      },
    }
  },
  methods: {
    calcPriceType(type, counter) {
      var lastNum = counter.toString().slice(-1),
        lastTwoNums = counter.toString().slice(-2)
      if (type == 'default') {
        if (lastTwoNums != 11 && lastNum == 1) {
          return counter + ' взрослый'
        } else if (
          (lastNum == 2 || lastNum == 3 || lastNum == 4) &&
          lastTwoNums != 12 &&
          lastTwoNums != 13 &&
          lastTwoNums != 14
        ) {
          return counter + ' взрослых'
        } else {
          return counter + ' взрослых'
        }
      } else if (type == 'child') {
        if (lastTwoNums != 11 && lastNum == 1) {
          return counter + ' ребенок'
        } else if (
          (lastNum == 2 || lastNum == 3 || lastNum == 4) &&
          lastTwoNums != 12 &&
          lastTwoNums != 13 &&
          lastTwoNums != 14
        ) {
          return counter + ' ребенка'
        } else {
          return counter + ' детей'
        }
      } else {
        return counter
      }
    },
    async pay() {
      var host = document.location.protocol + '//' + document.location.host
      await axiosConfig
        .post(`/order/checkout/paypal`, {
          id: this.order_id,
          success: host + '/thank_you',
          cancel: host + '/payment',
        })
        .then((response) => {
          // console.log(response)
          localStorage.setItem('payment_id', response.data.data[0].id)

          location.href = response.data.data[0].approve
        })
        .catch(function (error) {
          // alert('error')
          console.log(this.errors.unknown_request)

          this.errors.unknown_request = true

          console.log(error)
        })
      // this.$router.push({
      //   name: `ThankYou`,
      //   params: {
      //     order: this.order,
      //     id: this.excursion_id,
      //   },
      // })
    },
  },
  computed: {
    calcExcurtionDuration() {
      const hours = this.excursion.duration / 60

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
        return hours + ' часа'
      } else {
        return hours + ' часов'
      }
    },
  },
  created() {
    const order = localStorage.getItem('order')
    if (order) {
      this.order = JSON.parse(order)
    }

    // const order = this.$route.params.order
    // if (order) {
    //   this.order = order
    // }

    // const excursion_id = this.$route.params.id
    // if (excursion_id) {
    //   this.excursion_id = excursion_id
    // }
    const order_id = localStorage.getItem('id_order')
    if (order_id) {
      this.order_id = order_id
    }
    const excursion_id = localStorage.getItem('id_for_order')
    if (excursion_id) {
      this.excursion_id = excursion_id
    }
    // console.log(this.order)
    // console.log(this.excursion_id)
  },
  async mounted() {
    await axiosConfig
      .get(`/guide/${this.excursion_id}`)
      .then((response) => {
        this.excursion = response.data.data[0]
        // console.log(this.excursion)
      })
      .catch(function (error) {
        console.log(error)
      })
    await axiosConfig
      .get(`/guide/media/${this.excursion_id}`)
      .then((response) => {
        this.excursion_image = response.data.data
      })
      .catch(function (error) {
        console.log(error)
      })
    await axiosConfig
      .get(`/user/${this.excursion.owner}`)
      .then((response) => {
        this.guide_photo = response.data.data[0].photo[0].data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
}
</script>

<style lang="scss" scoped>
.tour-info {
  display: flex;
  height: 150px;
  @media (max-width: 767.98px) {
    flex-direction: column;
    height: auto;
  }

  &__img {
    flex: 0 0 182px;
    border-radius: 5px 0px 0px 5px;
    background: var(--gray);
    border-radius: 10px;
    position: relative;
    z-index: 10;
    @media (max-width: 767.98px) {
      flex: none;
      width: 100%;
      margin: 0px 0px 30px 0px;
      position: relative;
      padding-bottom: 58%;
      height: 0;
    }
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
      @media (max-width: 767.98px) {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
  &__guide-img {
    position: absolute;
    z-index: 5;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    overflow: hidden;
    right: 16px;
    bottom: -13px;
    @media (min-width: 768px) {
      display: none;
    }
  }

  &__content {
    background-color: var(--white);
    font-family: 'Inter';
    height: 100%;
    display: flex;
    border: 0.5px solid #bebdbd;
    border-left: none;
    padding: 15px 0px;
    padding-left: 15px;
    margin-left: -15px;
    font-size: 12px;
    line-height: 15px;
    flex: 1 1 auto;
    @media (max-width: 767.98px) {
      flex-direction: column;
      border: 0.5px solid #bebdbd;
      padding: 0px 12px;
      margin: 0;
    }
  }

  &__block {
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    row-gap: 13px;
    @media (max-width: 767.98px) {
      flex-direction: row;
      column-gap: 30px;
      padding: 10px 0px;
    }
    @media (max-width: 340px) {
      column-gap: 15px;
    }
    &:not(:last-child) {
      border-right: 1px solid #707070;
      @media (max-width: 767.98px) {
        border: none;
        border-bottom: 0.5px solid #000000;
      }
    }
    &:first-child {
      flex: 0 0 250px;
      @media (max-width: 767.98px) {
        flex: 1 1 auto;
      }
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    &_amount {
      justify-content: space-between;
      @media (max-width: 767.98px) {
        justify-content: flex-start;
        row-gap: 16px;
      }
    }
  }

  &__subtitle {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
  }

  &__text {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    display: flex;
    align-items: center;
    // padding: 0px 0px 0px 10px;
    column-gap: 9px;
    &_city {
      // padding: 0px 0px 0px 3px;
      column-gap: 3px;
    }
    &_amount {
      // padding: 0px 0px 0px 0px;
    }
    .icon {
      display: flex;
    }
    .icon-mark::before {
      font-size: 21px;
      // transform: translate(-3px, 0px);
    }
    .icon-calendar::before {
      font-size: 19px;
      font-weight: 500;
      // transform: translate(-10px, 0px);
    }
    .icon-watch::before {
      font-size: 21px;
      // transform: translate(-10px, 0px);
    }
    .icon-person-edit::before {
      font-size: 22px;
      // transform: translate(-10px, 0px);
    }
  }

  &__name-location {
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.to-pay {
  font-weight: 600;
  font-size: 18px;
  background: #cdffbc;
  border-radius: 5px;
  display: flex;
  padding: 0px 16px;
  max-width: 280px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 575.98px) {
    max-width: 345px;
    width: 100%;
  }
  &__text {
  }

  &__price {
    font-weight: 700;
    font-size: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    column-gap: 4px;
    &.icon-euro::before {
      transform: translate(55px, 0px);
      font-weight: 600;
    }
  }
}
.green-btn {
  font-weight: 600;
  font-size: 18px;
  line-height: 16px;
  letter-spacing: 1.25px;
  text-transform: uppercase;
  padding: 14px 0px;
  background: #41b619;
  border-radius: 5px;
  width: 280px;
  text-align: center;
  @media (max-width: 575.98px) {
    max-width: 345px;
    width: 100%;
  }
}
.general-info {
  max-width: 560px;
  background: #cdffbc;
  border-radius: 5px;
  padding: 10px 40px;
  @media (max-width: 575.98px) {
    padding: 10px 10px 10px 25px;
  }
  &__text {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.4px;
    display: inline-flex;
    @media (max-width: 575.98px) {
      font-size: 12px;
    }
    &.icon-info::before {
      color: #41b619;
      font-size: 24px;
      transform: translate(-17px, 0px);
    }
  }
}
.info-pay {
  padding: 21px 0 0;
  &__wrap {
    min-height: 100vh;
    padding: 32px 15px 150px;
    background-color: var(--white);
    @media (max-width: 767.98px) {
      padding: 0;
      background-color: var(--light-gray);
    }
  }
  &__title {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.4px;
    margin-bottom: 20px;
  }

  &__tour-information {
    margin-bottom: 30px;
  }
  &__general-info-block {
    margin-bottom: 26px;
  }
  &__general-info {
    margin-bottom: 10px;
  }
  &__payment {
    display: flex;
    column-gap: 46px;
    margin-bottom: 50px;
    @media (max-width: 575.98px) {
      flex-direction: column-reverse;
      align-items: center;
      row-gap: 10px;
      margin-bottom: 25px;
      max-width: 345px;
      width: 100%;
      justify-content: center;
      margin: 0px auto 25px auto;
    }
  }

  &__to-pay {
  }

  &__payment-system {
    display: flex;
    column-gap: 20px;
    align-self: flex-start;
  }

  &__visa {
  }

  &__mastercard {
  }
  &__pay-btn {
    @media (max-width: 575.98px) {
      display: block;
      margin: 0 auto;
    }
  }
  &__error {
    font-size: 14px;
    color: red;
    margin-top: 10px;
  }
}
</style>
