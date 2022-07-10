<template>
  <div>
    <div class="balance-list-pc__item">
      <div class="balance-list-pc__col balance-list-pc__col_number">
        {{ order.owner }}
      </div>
      <div class="balance-list-pc__image">
        <img v-if="image.id" :src="setPhoto" alt="oops:O" />
      </div>
      <div class="balance-list-pc__col balance-list-pc__col_tour">
        {{ subtitle }}
      </div>
      <div class="balance-list-pc__col balance-list-pc__col_date">
        {{ order.date }}
      </div>
      <div class="balance-list-pc__col balance-list-pc__col_time">
        {{ order.time }}
      </div>
      <div class="balance-list-pc__col balance-list-pc__col_amount">
        <span>
          {{ order.list.default.length }}
          {{ $t('excursions.guide.balance.item.adults') }}
        </span>
        <span>
          {{ order.list.child.length }}
          {{ $t('excursions.guide.balance.item.children') }}
        </span>
      </div>
      <div class="balance-list-pc__col balance-list-pc__col_price-for-one">
        <span>
          {{ price_default }}
          <span class="icon icon-euro"></span>
        </span>
        <span>
          {{ price_child }}
          <span class="icon icon-euro"></span>
        </span>
      </div>
      <div class="balance-list-pc__col balance-list-pc__col_sum">
        <span>
          {{ getPrice }}
          <span class="icon icon-euro"></span>
        </span>
      </div>
      <div class="balance-list-pc__col balance-list-pc__col_commission">
        <span>
          {{ getCommission }}
          <span class="icon icon-euro"></span>
        </span>
      </div>
      <div class="balance-list-pc__col balance-list-pc__col_earned">
        <span>
          {{ getPriceAfterCommission }}
          <span class="icon icon-euro"></span>
        </span>
      </div>
      <div class="balance-list-pc__col balance-list-pc__col_status">
        {{ getStatus }}
      </div>
    </div>
    <div class="balance-list-mob__item">
      <div class="balance-list-mob__top-row">
        <div class="balance-list-mob__image">
          <img v-if="image.id" :src="setPhoto" alt="oops:O" />
        </div>
        <div class="balance-list-mob__top-content">
          <p class="balance-list-mob__number">№ {{ order.owner }}</p>
          <p class="balance-list-mob__location">
            {{ subtitle }}
          </p>
        </div>
        <div
          class="balance-list-mob__status-icon"
          :class="{ paid: getStatusMobile }"
        ></div>
      </div>
      <div class="balance-list-mob__mid-row balance-list-mob__mid-row_first">
        <div class="balance-list-mob__mid-list-label">
          <p class="balance-list-mob__mid-label">
            <span class="icon icon-calendar"></span>
            {{ $t('excursions.guide.balance.top_line.date') }}
          </p>
          <p class="balance-list-mob__mid-label">
            <span class="icon icon-watch"></span>
            {{ $t('excursions.guide.balance.top_line.time') }}
          </p>
          <p class="balance-list-mob__mid-label">
            {{ $t('excursions.guide.balance.top_line.amount') }}
          </p>
        </div>
        <div class="balance-list-mob__mid-list-info">
          <p class="balance-list-mob__mid-info">{{ order.date }}</p>
          <p class="balance-list-mob__mid-info">{{ order.time }}</p>
          <p class="balance-list-mob__mid-info">
            <span>
              {{ order.list.default.length }}
              {{ $t('excursions.guide.balance.item.adults') }}
            </span>
            <span>
              {{ order.list.child.length }}
              {{ $t('excursions.guide.balance.item.children') }}
            </span>
          </p>
        </div>
      </div>
      <div class="balance-list-mob__mid-row balance-list-mob__mid-row_second">
        <div class="balance-list-mob__mid-list-label">
          <p class="balance-list-mob__mid-label">
            {{ $t('excursions.guide.balance.top_line.price_for_one') }}
          </p>
          <p class="balance-list-mob__mid-label">
            {{ $t('excursions.guide.balance.top_line.sum') }}
          </p>
          <p class="balance-list-mob__mid-label">
            {{ $t('excursions.guide.balance.top_line.commission') }}
          </p>
          <p class="balance-list-mob__mid-label">
            {{ $t('excursions.guide.balance.top_line.earned') }}
          </p>
        </div>
        <div class="balance-list-mob__mid-list-info">
          <p class="balance-list-mob__mid-info">
            <span>
              {{ price_default }}
              <span class="icon icon-euro"></span>
            </span>
            <span>
              {{ price_child }}
              <span class="icon icon-euro"></span>
            </span>
          </p>
          <p class="balance-list-mob__mid-info">
            <span>
              {{ getPrice }}
              <span class="icon icon-euro"></span>
            </span>
          </p>
          <p class="balance-list-mob__mid-info">
            <span>
              {{ getCommission }}
              <span class="icon icon-euro"></span>
            </span>
          </p>
          <p class="balance-list-mob__mid-info">
            <span>
              {{ getPriceAfterCommission }}
              <span class="icon icon-euro"></span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosConfig from '@/api/instance'

export default {
  name: 'ExcursionBalance',
  data() {
    return {
      // order:null
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
      subtitle: null,
      price_default: null,
      price_child: null,
    }
  },
  props: {
    order: {
      default() {
        return {
          id: null,
          owner: null,
          full_date: null,
          date: null,
          time: null,
          list: [],
        }
      },
    },
  },
  methods: {
    getImage() {
      axiosConfig
        .get(`/guide/media/${this.order.id}`)
        .then((response) => {
          if (response.data.data[0]) {
            this.image = response.data.data[0]
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getExcursion() {
      axiosConfig
        .get(`/guide/${this.order.id}`)
        .then((response) => {
          if (response.data.data[0]) {
            // console.log(response.data.data[0])

            this.subtitle = response.data.data[0].subtitle
            this.price_default = response.data.data[0].guideprices[0].price
            this.price_child = response.data.data[0].guideprices[1].price
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  computed: {
    setPhoto() {
      var format = this.image.extension.slice(1)
      return 'data:image/' + format + ';base64,' + this.image.data
    },
    getStatus() {
      if (this.order.list.default.length) {
        if (this.order.list.default[0].order.payed == true) {
          return this.$t('excursions.guide.balance.item.paid')
        } else if (this.order.list.default[0].order.canceled == true) {
          return this.$t('excursions.guide.balance.item.canceled')
        } else {
          return this.$t('excursions.guide.balance.item.in_process')
        }
      } else {
        if (this.order.list.child[0].order.payed == true) {
          return this.$t('excursions.guide.balance.item.paid')
        } else if (this.order.list.child[0].order.canceled == true) {
          return this.$t('excursions.guide.balance.item.canceled')
        } else {
          return this.$t('excursions.guide.balance.item.in_process')
        }
      }
    },
    getStatusMobile() {
      if (this.order.list.default.length) {
        if (this.order.list.default[0].order.payed == true) {
          return true
        } else if (this.order.list.default[0].order.canceled == true) {
          return false
        } else {
          return false
        }
      } else {
        if (this.order.list.child[0].order.payed == true) {
          return true
        } else if (this.order.list.child[0].order.canceled == true) {
          return false
        } else {
          return false
        }
      }
    },
    getPrice() {
      // this.price = 0
      var newPrice = 0
      this.order.list.default.forEach((el) => {
        newPrice += el.cost
      })
      this.order.list.child.forEach((el) => {
        newPrice += el.cost
      })
      return Number(newPrice).toFixed(0)
    },
    getCommission() {
      var newPrice = 0
      this.order.list.default.forEach((el) => {
        newPrice += el.cost
      })
      this.order.list.child.forEach((el) => {
        newPrice += el.cost
      })
      return Number(newPrice * 0.2).toFixed(0)
    },
    getPriceAfterCommission() {
      var newPrice = 0
      this.order.list.default.forEach((el) => {
        newPrice += el.cost
      })
      this.order.list.child.forEach((el) => {
        newPrice += el.cost
      })
      return Number(newPrice - newPrice * 0.2).toFixed(0)
    },
  },
  beforeMount() {
    this.getImage()

    this.getExcursion()
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
.balance-list-pc {
  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0px;
    gap: 10px;
    border-bottom: 0.5px solid #707070;
    &:first-child {
      border-top: 0.5px solid #707070;
    }
    @media (max-width: 991.98px) {
      display: none;
    }
  }

  &__col {
    font-size: 12px;
    line-height: 16px;
    display: flex;
    justify-content: center;
    gap: 10px;
    span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    &_number {
      flex: 0 1 62px;
    }

    &_tour {
      flex: 0 1 270px;
      justify-content: flex-start;
    }

    &_date {
      flex: 0 1 102px;
    }

    &_time {
      flex: 0 1 87px;
    }

    &_amount {
      flex: 0 1 115px;
    }

    &_price-for-one {
      flex: 0 1 100px;
    }

    &_sum {
      flex: 0 1 55px;
    }

    &_commission {
      flex: 0 1 97px;
    }

    &_earned {
      flex: 0 1 97px;
    }

    &_status {
      flex: 0 1 97px;
    }
    .icon-euro {
      font-size: 13px;
    }
  }

  &__image {
    width: 70px;
    height: 45px;
    border-radius: 5px;
    overflow: hidden;
    flex: none;
    img {
      border-radius: 5px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.balance-list-mob {
  &__content {
  }

  &__list {
  }

  &__item {
    background: #ffffff;
    border: 0.5px solid #bebdbd;
    border-radius: 5px;

    margin-bottom: 11px;
    @media (min-width: 992px) {
      display: none;
    }
  }

  &__top-row {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 12px;
    line-height: 22px;
    padding: 7px 6px;
  }

  &__image {
    flex: none;
    width: 90px;
    height: 75px;
    border-radius: 5px;
    overflow: hidden;
    margin-right: 7px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  &__top-content {
    flex: auto;
  }

  &__number {
  }

  &__location {
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

  &__status-icon {
    display: flex;
    justify-content: center;
    flex: none;
    width: 18px;
    height: 18px;
    border: 2px solid #707070;
    border-radius: 50%;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      background: #707070;
      width: 9px;
      height: 9px;
      border-radius: 50%;
    }
    &.paid {
      border-color: #41b619;
      &::before {
        background: #41b619;
      }
    }
  }

  &__mid-row {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.15px;
    margin-bottom: 10px;
    &_first {
      .balance-list-mob__mid-label {
        flex: 1 1 33.333%;
      }
      .balance-list-mob__mid-info {
        flex: 1 1 33.333%;
      }
    }

    &_second {
      .balance-list-mob__mid-label {
        flex: 1 1 25%;
      }
      .balance-list-mob__mid-info {
        flex: 1 1 25%;
      }
    }
    .icon-calendar {
      font-size: 19px;
      margin-right: 12px;
    }
    .icon-watch {
      font-size: 21px;
      margin-right: 8px;
    }
    .icon-euro {
      font-size: 11px;
    }
  }

  &__mid-list-label {
    background: #c7c4c4;
    display: flex;
    min-height: 30px;
    align-items: center;
    padding: 0px 5px;
  }

  &__mid-label {
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  &__mid-list-info {
    background: #e5e5e5;
    display: flex;
    min-height: 30px;
    align-items: center;
    padding: 0px 5px;
  }

  &__mid-info {
    display: flex;
    gap: 5px;
    justify-content: center;
    text-align: center;
  }
}
</style>
