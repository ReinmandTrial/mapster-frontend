<template>
  <div class="order">
    <div class="order-list-pc__content">
      <div class="order-list-pc__content-image">
        <img v-if="image.id" :src="setPhoto" alt="oops:O" />
      </div>
      <div class="order-list-pc__text-content">
        <div
          class="order-list-pc__content-item order-list-pc__content-item_number"
        >
          <p class="order-list-pc__number-order">
            {{ order.id }}
          </p>
        </div>
        <div
          class="order-list-pc__content-item order-list-pc__content-item_route"
        >
          <p class="order-list-pc__order-city">
            <span class="icon icon-mark"></span>
            {{ order.list[0].guide.city }}
          </p>
          <p class="order-list-pc__order-location">
            {{ order.list[0].guide.subtitle }}
          </p>
        </div>
        <div
          class="order-list-pc__content-item order-list-pc__content-item_date"
        >
          <p class="order-list-pc__order-date-info">
            <span class="icon icon-calendar"></span>
            {{ order.date }}
          </p>
          <p class="order-list-pc__order-date-info">
            <span class="icon icon-watch"></span>
            {{ order.time }}
          </p>
        </div>
        <div
          class="order-list-pc__content-item order-list-pc__content-item_client-amount-contact"
        >
          <div
            class="order-list-pc__list-row"
            v-for="(order, index) in order_list"
            :key="index"
          >
            <p class="order-list-pc__client">{{ order.name }}</p>
            <div class="order-list-pc__amount-person">
              <p class="order-list-pc__person">
                {{ order.list.default.length }}
                {{ $t('excursions.guide.orders.item.adults') }}
              </p>
              <p class="order-list-pc__person">
                {{ order.list.child.length }}
                {{ $t('excursions.guide.orders.item.children') }}
              </p>
            </div>
            <p class="order-list-pc__contact">+995 577 44 5566</p>
          </div>
        </div>
        <div
          class="order-list-pc__content-item order-list-pc__content-item_status"
        >
          <p class="order-list-pc__status" :class="{ active: !completed }">
            {{ left }}
          </p>
          <div class="order-list-pc__price-label">
            <p class="order-list-pc__price-sign">
              {{ $t('excursions.guide.orders.item.sum') }}
            </p>
            <p class="order-list-pc__sum">
              {{ getPrice }}
              <span class="icon icon-euro"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="order-list-mob__item">
      <div class="order-list-mob__top-row">
        <div class="order-list-mob__img">
          <img v-if="image.id" :src="setPhoto" alt="oops:O" />
        </div>
        <div class="order-list-mob__top-info">
          <div class="order-list-mob__number-price">
            <p class="order-list-mob__order-number">
              {{ $t('excursions.guide.orders.item_mob.order_label') }} №
              {{ order.id }}
            </p>
            <p class="order-list-mob__order-price">
              <span class="order-list-mob__price-sign">
                {{ $t('excursions.guide.orders.item_mob.sum') }}
              </span>
              {{ getPrice }}
              <span class="icon icon-euro"></span>
            </p>
          </div>
          <p class="order-list-mob__location">
            {{ order.list[0].guide.subtitle }}
          </p>
        </div>
      </div>
      <div class="order-list-mob__mid-row">
        <div class="order-list-mob__mid-signs">
          <p class="order-list-mob__mid-date">
            <span class="icon icon-calendar"></span>
            {{ $t('excursions.guide.orders.item_mob.date') }}
          </p>
          <p class="order-list-mob__mid-start">
            <span class="icon icon-watch"></span>
            {{ $t('excursions.guide.orders.item_mob.start') }}
          </p>
          <p class="order-list-mob__mid-status">
            {{ $t('excursions.guide.orders.item_mob.status_label') }}
          </p>
        </div>
        <div
          class="order-list-mob__mid-info"
          :class="{ active: !completed, other: completed }"
        >
          <p class="order-list-mob__info">{{ order.date }}</p>
          <p class="order-list-mob__info">{{ order.time }}</p>
          <p class="order-list-mob__info" :class="{ active: !completed }">
            {{ left }}
          </p>
        </div>
      </div>
      <div class="order-list-mob__bottom-row">
        <div class="order-list-mob__bottom-signs">
          <p class="order-list-mob__bottom-sign">
            {{ $t('excursions.guide.orders.item_mob.client_label') }}
          </p>
          <p class="order-list-mob__bottom-sign">
            {{ $t('excursions.guide.orders.item_mob.number_of_persons') }}
          </p>
          <p class="order-list-mob__bottom-sign">
            {{ $t('excursions.guide.orders.item_mob.contacts') }}
          </p>
        </div>
        <div class="order-list-mob__bottom-info">
          <div
            class="order-list-mob__bottom-info-row"
            v-for="(order, index) in order_list"
            :key="index"
          >
            <p class="order-list-mob__client">{{ order.name }}</p>
            <div class="order-list-mob__list-person">
              <p class="order-list-mob__person">
                {{ order.list.default.length }}
                {{ $t('excursions.guide.orders.item.adults') }}
              </p>
              <p class="order-list-mob__person">
                {{ order.list.child.length }}
                {{ $t('excursions.guide.orders.item.children') }}
              </p>
            </div>
            <p class="order-list-mob__contact">{{ order.phone }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosConfig from '../../../api/instance'

export default {
  name: 'ExcursionOrderGuide',
  data() {
    return {
      image: {
        data: '',
        extension: '',
        id: null,
        name: null,
        owner: null,
        basemediamodel_ptr: null,
        primary: null,
        size: null,
      },
      order_list: [],
      price: 0,
      completed: false,
      left: null,
    }
  },
  props: {
    order: {
      id: null,
      full_date: null,
      date: null,
      time: null,
      list: [],
    },
  },
  methods: {
    getImage() {
      axiosConfig
        .get(`/guide/media/${this.order.id}`)
        .then((response) => {
          if (response.data.data[0]) {
            // console.log(response.data.data[0])

            this.image = response.data.data[0]

            // this.$set(this.image, 'data', response.data.data[0].data)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },

    getOrderList() {
      function addFilteredArray(order) {
        if (order.category == 'child') {
          ordersFiltered.push({
            owner: order.owner,
            name: order.order.name,
            phone: order.order.phone,
            list: {
              child: [order],
              default: [],
            },
          })
        } else {
          ordersFiltered.push({
            owner: order.owner,
            name: order.order.name,
            phone: order.order.phone,
            list: {
              child: [],
              default: [order],
            },
          })
        }
      }
      var ordersFiltered = []
      this.order.list.forEach((order) => {
        if (ordersFiltered.length) {
          ordersFiltered.forEach((card, index) => {
            if (card.owner == order.owner) {
              if (order.category == 'child') {
                card.list.child.push(order)
              } else {
                card.list.default.push(order)
              }
            } else if (index + 1 == ordersFiltered.length) {
              addFilteredArray(order)
            }
          })
        } else {
          addFilteredArray(order)
        }
      })
      this.$nextTick(() => {
        this.order_list = ordersFiltered
        this.getImage()
      })
      this.daysLeft()

      // this.order_list.forEach((el) => {})
    },
    daysLeft() {
      var now = new Date()
      var date2 = new Date(this.order.full_date.slice(0, -4))
      var date2Year = date2.getFullYear()
      var nowYear = now.getFullYear()
      var date2Month = date2.getMonth()
      var nowMonth = now.getMonth()
      var date2Date = date2.getDate()
      var nowDate = now.getDate()

      if (
        date2Year > nowYear ||
        (date2Year == nowYear && date2Month > nowMonth) ||
        (date2Year == nowYear && date2Month == nowMonth && date2Date > nowDate)
      ) {
        var now_utc = new Date(now.toUTCString().slice(0, -4))
        var timeDiff = Math.abs(date2.getTime() - now_utc.getTime())
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
        this.$nextTick(() => {
          this.completed = false
          this.left = this.$t('excursions.guide.orders.item.status', {
            amount: diffDays,
          })
        })
      } else {
        this.$nextTick(() => {
          this.completed = true
          this.left = this.$t('excursions.guide.orders.item.completed')
        })
      }
    },
  },
  computed: {
    setPhoto() {
      var format = this.image.extension.slice(1)
      return 'data:image/' + format + ';base64,' + this.image.data
    },
    getPrice() {
      // this.price = 0
      var newPrice = 0
      this.order.list.forEach((el) => {
        newPrice += el.cost
      })
      return newPrice
    },
  },
  mounted() {
    this.getImage()
    this.getOrderList()
    this.daysLeft()
  },
}
</script>

<style lang="scss" scoped>
.order-list-pc {
  &__content {
    display: flex;
    background: #ffffff;
    height: 125px;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    @media (max-width: 991.98px) {
      display: none;
    }
  }

  &__content-image {
    flex: none;
    width: 180px;
    height: 125px;
    border-radius: 5px 0px 0px 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__text-content {
    flex: auto;
    display: flex;
    border: 0.5px solid #bebdbd;
    border-left: none;
    border-radius: 0 5px 5px 0;
    padding: 8px 0px;
  }

  &__content-item {
    border-right: 1px solid #000000;
    &:last-child {
      border: none;
    }
    &_number {
      flex: 0 1 56px;
      font-size: 12px;
      line-height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &_route {
      flex: 0 1 225px;
      padding: 0px 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 14px;
    }

    &_date {
      flex: 0 1 180px;
      padding: 20px 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &_client-amount-contact {
      display: flex;
      flex-direction: column;
      padding: 20px 20px;
      overflow: auto;
      flex: 0 1 383px;
      gap: 10px;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }

    &_status {
      flex: 0 1 135px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 25px;
    }
  }

  &__number-order {
  }

  &__order-city {
    display: inline-flex;
    align-items: center;
    font-family: 'Inter';
    font-size: 12px;
    line-height: 15px;
    .icon-mark {
      font-size: 24px;
    }
  }

  &__order-location {
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    box-orient: vertical;
  }

  &__order-date-info {
    font-family: 'Inter';
    font-size: 12px;
    line-height: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    .icon-calendar {
      font-size: 19px;
    }
    .icon-watch {
      font-size: 21px;
    }
  }

  &__list-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    align-items: center;
  }
  &__client {
    word-break: break-all;
    font-family: 'Inter';
    font-size: 12px;
    line-height: 15px;
  }
  &__amount-person {
    word-break: break-all;
    display: flex;
    gap: 15px;
  }
  &__person {
    word-break: break-all;
    font-family: 'Inter';
    font-size: 12px;
    line-height: 15px;
  }

  &__contact {
    font-family: 'Inter';
    font-size: 12px;
    line-height: 15px;
  }

  &__status {
    font-family: 'Inter';
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    padding: 0px 5px;
    &.active {
      color: #41b619;
    }
    &.cancel {
      color: #707070;
    }
    &.completed {
      color: #023047;
    }
  }

  &__price-label {
    font-family: 'Roboto';
  }

  &__price-sign {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.1px;
    margin-bottom: 8px;
  }

  &__sum {
    font-size: 14px;
    line-height: 16px;
    color: #3e3d3d;
    display: flex;
    align-items: center;
    column-gap: 3px;
    .icon-euro {
      font-size: 18px;
    }
  }
}
.order-list-mob {
  &__item {
    @media (min-width: 992px) {
      display: none;
    }
    padding: 10px;
    background: #ffffff;
    border: 0.5px solid #bebdbd;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  &__top-row {
    display: flex;
    margin-bottom: 10px;
  }

  &__img {
    border-radius: 5px;
    overflow: hidden;
    width: 90px;
    height: 75px;
    flex: none;

    img {
      width: 100%;
      height: 100%;
      object-position: 50% 50%;
      object-fit: cover;
      border-radius: 5px;
    }
  }

  &__top-info {
    flex: auto;
    font-size: 12px;
    letter-spacing: 0.4px;
    margin-left: 15px;
  }

  &__number-price {
    display: flex;
    justify-content: space-between;
    line-height: 22px;
    margin-bottom: 15px;
  }

  &__order-number {
    font-weight: 600;
    line-height: 22px;
  }

  &__order-price {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;

    font-family: 'Roboto';
    line-height: 14px;
    letter-spacing: 0.1px;
    .icon-euro {
      font-size: 13px;
      margin-left: 5px;
    }
  }

  &__price-sign {
    font-family: 'Roboto';
    font-weight: 400;
    line-height: 16px;
    color: #3e3d3d;
    margin-right: 10px;
  }

  &__location {
    font-weight: 600;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    box-orient: vertical;
  }

  &__mid-row {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.15px;
    margin-bottom: 10px;
  }

  &__mid-signs {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 5px;
    .icon-calendar {
      font-size: 19px;
      margin-right: 8px;
    }
    .icon-watch {
      font-size: 21px;
      margin-right: 8px;
    }
  }

  &__mid-date {
    display: inline-flex;
    align-items: center;
  }

  &__mid-start {
    display: inline-flex;
    align-items: center;
  }

  &__mid-status {
    margin-right: 78px;
    @media (max-width: 360px) {
      margin: 0;
    }
  }

  &__mid-info {
    display: flex;
    justify-content: space-around;
    height: 30px;
    align-items: center;
    &.active {
      background: #cdffbc;
    }
    &.other {
      background: var(--light-gray);
    }
  }

  &__info {
    &.active {
      color: #41b619;
      font-weight: 600;
    }
    &.cancel {
      color: #707070;
      font-weight: 600;
    }
    &.completed {
      color: #023047;
      font-weight: 600;
    }
  }

  &__bottom-row {
    font-family: 'Inter';
    font-size: 12px;
    line-height: 15px;
  }

  &__bottom-signs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
    border-bottom: 0.5px solid #707070;
    padding: 0px 0px 7px 0px;
  }

  &__bottom-sign {
  }

  &__bottom-info {
    padding: 10px 10px;
    display: grid;
    grid-gap: 10px;
  }
  &__bottom-info-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    text-align: center;
    word-break: break-all;
    grid-gap: 10px;
  }

  &__client {
  }

  &__list-person {
    gap: 7px 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__person {
  }

  &__contact {
  }
}
</style>
