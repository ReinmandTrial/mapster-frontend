<template>
  <div class="page-thanks">
    <div class="container-m">
      <div class="page-thanks__wrap">
        <div class="page-thanks__title">
          {{ $t('excursions.client.thanks.title') }}
        </div>
        <div class="page-thanks__sub-title">
          {{ $t('excursions.client.thanks.descr') }}
        </div>
        <div class="page-thanks__order-number">
          {{ $t('excursions.client.thanks.order_num') }} {{ order_id }}
        </div>

        <div class="page-thanks__tour-information tour-info">
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
        <div class="page-thanks__bottom-content">
          <div class="page-thanks__to-pay to-pay">
            <p class="to-pay__text">
              {{ $t('excursions.client.thanks.paid') }}
            </p>
            <p class="to-pay__price">
              {{ order.price }}
              <span class="icon icon-euro"></span>
            </p>
          </div>
          <router-link
            :to="{ name: 'ExcursionsHome' }"
            class="page-thanks__go-main-btn green-btn"
          >
            {{ $t('excursions.client.thanks.to_main') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosConfig from '../../../../../api/instance'

export default {
  name: 'ThankYou',
  components: {},
  directives: {},
  data() {
    return {
      order_id: null,
      payment_id: null,
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
      } else {
        return counter
      }
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
    const order_id = this.$route.params.order_id
    if (order_id) {
      this.order_id = order_id
    }

    const payment_id = this.$route.params.payment_id
    if (payment_id) {
      this.payment_id = payment_id
    }
    // const excursion_id = localStorage.getItem('id_for_order')
    // if (excursion_id) {
    //   this.excursion_id = excursion_id
    // }
    console.log(this.order)
    console.log(this.excursion_id)
  },
  async mounted() {
    await axiosConfig
      .get(`/order/checkout/success/${this.payment_id}/${this.order_id}`)
      .then((response) => {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    await axiosConfig
      .get(`/order/${this.order_id} `)
      .then((response) => {
        console.log(response.data.data[0].details[0].servicetype.id)
        this.excursion_id = response.data.data[0].details[0].servicetype.id
      })
      .catch(function (error) {
        console.log(error)
      })

    await axiosConfig
      .get(`/guide/${this.excursion_id}`)
      .then((response) => {
        this.excursion = response.data.data[0]
        console.log(this.excursion)
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
  beforeRouteLeave(to, from, next) {
    localStorage.removeItem('order')
    localStorage.removeItem('id_for_order')
    localStorage.removeItem('id_order')
    localStorage.removeItem('payment_id')
    next()
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
    flex: 1 1 auto;
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
.page-thanks {
  &__wrap {
    min-height: 100vh;
    padding: 32px 15px 260px;
    margin: 0 auto;
    background-color: var(--white);
    @media (max-width: 767.98px) {
      padding: 20px 0 60px;
      background-color: var(--light-gray);
    }
  }

  &__title {
    letter-spacing: 0.4px;
    font-weight: 600;
    font-size: 24px;
    line-height: 22px;
    margin-bottom: 10px;
    @media (max-width: 575.98px) {
      font-size: 20px;
    }
  }

  &__sub-title {
    letter-spacing: 0.4px;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 30px;
    @media (max-width: 575.98px) {
      margin-bottom: 10px;
    }
  }
  &__order-number {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.4px;
    margin-bottom: 10px;
  }

  &__tour-information {
    margin-bottom: 20px;
  }

  &__bottom-content {
    display: flex;
    flex-direction: column;
    @media (max-width: 575.98px) {
      align-items: center;
      justify-content: center;
    }
  }
  &__to-pay {
    align-self: flex-end;
    margin-bottom: 30px;
    width: 100%;
    @media (max-width: 575.98px) {
      align-self: center;
    }
  }
}
</style>
