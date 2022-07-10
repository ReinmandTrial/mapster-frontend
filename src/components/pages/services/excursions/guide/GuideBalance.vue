<template>
  <div class="guide-balance">
    <div class="guide-balance__wrapper">
      <div class="guide-balance__container">
        <p class="guide-balance__title">
          {{ $t('excursions.guide.balance.title') }}
        </p>
        <p class="guide-balance__sub-title guide-balance__sub-title_on-account">
          {{ $t('excursions.guide.balance.on_account_title') }}
          <span class="guide-balance__sub-title-sum">240</span>
          <span class="icon icon-euro"></span>
        </p>
        <p class="guide-balance__sub-title guide-balance__sub-title_earn">
          {{ $t('excursions.guide.balance.earl_title') }}
          <span class="guide-balance__sub-title-sum">{{ earned_month }}</span>
          <span class="icon icon-euro"></span>
        </p>
        <div class="guide-balance__options">
          <div class="guide-balance__options-date date-option">
            <div class="date-option__content">
              <p class="date-option__title">
                {{ $t('excursions.guide.balance.date') }}
              </p>
              <div class="date-option__list">
                <div class="date-option__date-pick-item">
                  <span class="date-option__from-to">
                    {{ $t('excursions.guide.balance.with') }}
                  </span>
                  <!-- <div class="date-option__date-picker">
                      <span class="icon icon-calendar"></span>
                      01.04.2022
                    </div> -->
                  <div
                    class="deep-options__item"
                    v-click-outside="hideFilterDate"
                    :class="{ active: filter_date }"
                  >
                    <button
                      type="button"
                      class="deep-options__item-head"
                      @click="filter_date = !filter_date"
                    >
                      <span class="deep-options__icon">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_1_8877)">
                            <path
                              d="M22 2.25001H18.75V0.750012C18.7501 0.551099 18.6712 0.360281 18.5307 0.219535C18.3901 0.0787893 18.1994 -0.000355495 18.0005 -0.000488103C17.8016 -0.000620711 17.6108 0.0782697 17.47 0.218828C17.3293 0.359387 17.2501 0.550099 17.25 0.749012V2.25001H12.75V0.750012C12.7501 0.65152 12.7307 0.553981 12.6931 0.462961C12.6555 0.371942 12.6003 0.289226 12.5307 0.219535C12.4611 0.149845 12.3784 0.0945453 12.2875 0.0567936C12.1965 0.0190419 12.099 -0.000422453 12.0005 -0.000488114C11.8016 -0.000620723 11.6108 0.0782697 11.47 0.218828C11.3293 0.359387 11.2501 0.550099 11.25 0.749012V2.25001H6.75V0.750012C6.75007 0.65152 6.73073 0.553981 6.6931 0.462961C6.65547 0.371942 6.60028 0.289226 6.53068 0.219535C6.46109 0.149845 6.37844 0.0945453 6.28747 0.0567936C6.19651 0.0190419 6.09899 -0.000422453 6.0005 -0.000488114C5.80159 -0.000620723 5.61077 0.0782697 5.47002 0.218828C5.32928 0.359387 5.25013 0.550099 5.25 0.749012V2.25001H2C1.46974 2.25001 0.961184 2.46059 0.58614 2.83544C0.211096 3.2103 0.00026513 3.71875 0 4.24901V21.999C0 22.5294 0.210714 23.0382 0.585786 23.4132C0.960859 23.7883 1.46957 23.999 2 23.999H22C22.5304 23.999 23.0391 23.7883 23.4142 23.4132C23.7893 23.0382 24 22.5294 24 21.999V4.24901C23.9997 3.71875 23.7889 3.2103 23.4139 2.83544C23.0388 2.46059 22.5303 2.25001 22 2.25001ZM22.5 22C22.5 22.1324 22.4475 22.2595 22.3539 22.3532C22.2604 22.447 22.1334 22.4997 22.001 22.5H2C1.86739 22.5 1.74021 22.4473 1.64645 22.3536C1.55268 22.2598 1.5 22.1326 1.5 22V4.25001C1.50026 4.11758 1.55306 3.99066 1.6468 3.8971C1.74054 3.80355 1.86756 3.75101 2 3.75101H5.25V5.25101C5.24987 5.44992 5.32876 5.64074 5.46932 5.78149C5.60988 5.92223 5.80059 6.00138 5.9995 6.00151C6.19841 6.00164 6.38923 5.92275 6.52998 5.7822C6.67072 5.64164 6.74987 5.45092 6.75 5.25201V3.75101H11.25V5.25101C11.2499 5.44992 11.3288 5.64074 11.4693 5.78149C11.6099 5.92223 11.8006 6.00138 11.9995 6.00151C12.1984 6.00164 12.3892 5.92275 12.53 5.7822C12.6707 5.64164 12.7499 5.45092 12.75 5.25201V3.75101H17.25V5.25101C17.2499 5.44992 17.3288 5.64074 17.4693 5.78149C17.6099 5.92223 17.8006 6.00138 17.9995 6.00151C18.1984 6.00164 18.3892 5.92275 18.53 5.7822C18.6707 5.64164 18.7499 5.45092 18.75 5.25201V3.75101H22C22.1323 3.75128 22.259 3.80393 22.3526 3.89746C22.4461 3.99098 22.4987 4.11775 22.499 4.25001L22.5 22Z"
                              fill="black"
                            />
                            <path
                              d="M5.25 9H8.25V11.25H5.25V9ZM5.25 12.75H8.25V15H5.25V12.75ZM5.25 16.5H8.25V18.75H5.25V16.5ZM10.5 16.5H13.5V18.75H10.5V16.5ZM10.5 12.75H13.5V15H10.5V12.75ZM10.5 9H13.5V11.25H10.5V9ZM15.75 16.5H18.75V18.75H15.75V16.5ZM15.75 12.75H18.75V15H15.75V12.75ZM15.75 9H18.75V11.25H15.75V9Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1_8877">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      <p class="deep-options__name">
                        {{ getDate1 }}
                      </p>
                      <span
                        class="deep-options__arr icon icon-triangle-down"
                      ></span>
                    </button>
                    <div
                      v-if="filter_date"
                      class="deep-options__drop-price drop-date"
                    >
                      <date-picker
                        v-model="datepicker"
                        :editable="false"
                        :clearable="false"
                        :append-to-body="false"
                        :popup-style="{
                          position: 'static',
                          width: 'fit-content',
                        }"
                        :popup-class="['datepicker']"
                        :input-class="['datepicker__input']"
                        :open="true"
                        :title-format="'DD-MM-YYYY'"
                        @input="getOrders()"
                      ></date-picker>
                    </div>
                  </div>
                </div>
                <div class="date-option__date-pick-item">
                  <span class="date-option__from-to">
                    {{ $t('excursions.guide.balance.to') }}
                  </span>
                  <!-- <div class="date-option__date-picker">
                      <span class="icon icon-calendar"></span>
                      09.04.2022
                    </div> -->
                  <div
                    class="deep-options__item"
                    v-click-outside="hideFilterDate2"
                    :class="{ active: filter_date2 }"
                  >
                    <button
                      type="button"
                      class="deep-options__item-head"
                      @click="filter_date2 = !filter_date2"
                    >
                      <span class="deep-options__icon">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_1_8877)">
                            <path
                              d="M22 2.25001H18.75V0.750012C18.7501 0.551099 18.6712 0.360281 18.5307 0.219535C18.3901 0.0787893 18.1994 -0.000355495 18.0005 -0.000488103C17.8016 -0.000620711 17.6108 0.0782697 17.47 0.218828C17.3293 0.359387 17.2501 0.550099 17.25 0.749012V2.25001H12.75V0.750012C12.7501 0.65152 12.7307 0.553981 12.6931 0.462961C12.6555 0.371942 12.6003 0.289226 12.5307 0.219535C12.4611 0.149845 12.3784 0.0945453 12.2875 0.0567936C12.1965 0.0190419 12.099 -0.000422453 12.0005 -0.000488114C11.8016 -0.000620723 11.6108 0.0782697 11.47 0.218828C11.3293 0.359387 11.2501 0.550099 11.25 0.749012V2.25001H6.75V0.750012C6.75007 0.65152 6.73073 0.553981 6.6931 0.462961C6.65547 0.371942 6.60028 0.289226 6.53068 0.219535C6.46109 0.149845 6.37844 0.0945453 6.28747 0.0567936C6.19651 0.0190419 6.09899 -0.000422453 6.0005 -0.000488114C5.80159 -0.000620723 5.61077 0.0782697 5.47002 0.218828C5.32928 0.359387 5.25013 0.550099 5.25 0.749012V2.25001H2C1.46974 2.25001 0.961184 2.46059 0.58614 2.83544C0.211096 3.2103 0.00026513 3.71875 0 4.24901V21.999C0 22.5294 0.210714 23.0382 0.585786 23.4132C0.960859 23.7883 1.46957 23.999 2 23.999H22C22.5304 23.999 23.0391 23.7883 23.4142 23.4132C23.7893 23.0382 24 22.5294 24 21.999V4.24901C23.9997 3.71875 23.7889 3.2103 23.4139 2.83544C23.0388 2.46059 22.5303 2.25001 22 2.25001ZM22.5 22C22.5 22.1324 22.4475 22.2595 22.3539 22.3532C22.2604 22.447 22.1334 22.4997 22.001 22.5H2C1.86739 22.5 1.74021 22.4473 1.64645 22.3536C1.55268 22.2598 1.5 22.1326 1.5 22V4.25001C1.50026 4.11758 1.55306 3.99066 1.6468 3.8971C1.74054 3.80355 1.86756 3.75101 2 3.75101H5.25V5.25101C5.24987 5.44992 5.32876 5.64074 5.46932 5.78149C5.60988 5.92223 5.80059 6.00138 5.9995 6.00151C6.19841 6.00164 6.38923 5.92275 6.52998 5.7822C6.67072 5.64164 6.74987 5.45092 6.75 5.25201V3.75101H11.25V5.25101C11.2499 5.44992 11.3288 5.64074 11.4693 5.78149C11.6099 5.92223 11.8006 6.00138 11.9995 6.00151C12.1984 6.00164 12.3892 5.92275 12.53 5.7822C12.6707 5.64164 12.7499 5.45092 12.75 5.25201V3.75101H17.25V5.25101C17.2499 5.44992 17.3288 5.64074 17.4693 5.78149C17.6099 5.92223 17.8006 6.00138 17.9995 6.00151C18.1984 6.00164 18.3892 5.92275 18.53 5.7822C18.6707 5.64164 18.7499 5.45092 18.75 5.25201V3.75101H22C22.1323 3.75128 22.259 3.80393 22.3526 3.89746C22.4461 3.99098 22.4987 4.11775 22.499 4.25001L22.5 22Z"
                              fill="black"
                            />
                            <path
                              d="M5.25 9H8.25V11.25H5.25V9ZM5.25 12.75H8.25V15H5.25V12.75ZM5.25 16.5H8.25V18.75H5.25V16.5ZM10.5 16.5H13.5V18.75H10.5V16.5ZM10.5 12.75H13.5V15H10.5V12.75ZM10.5 9H13.5V11.25H10.5V9ZM15.75 16.5H18.75V18.75H15.75V16.5ZM15.75 12.75H18.75V15H15.75V12.75ZM15.75 9H18.75V11.25H15.75V9Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1_8877">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      <p class="deep-options__name">
                        {{ getDate2 }}
                      </p>
                      <span
                        class="deep-options__arr icon icon-triangle-down"
                      ></span>
                    </button>
                    <div
                      v-if="filter_date2"
                      class="deep-options__drop-price drop-date"
                    >
                      <date-picker
                        v-model="datepicker2"
                        :editable="false"
                        :clearable="false"
                        :append-to-body="false"
                        :popup-style="{
                          position: 'static',
                          width: 'fit-content',
                        }"
                        :popup-class="['datepicker']"
                        :input-class="['datepicker__input']"
                        :open="true"
                        :title-format="'DD-MM-YYYY'"
                        @input="getOrders()"
                      ></date-picker>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="guide-balance__status-prompt status-prompt">
            <p class="status-prompt__title">
              {{ $t('excursions.guide.balance.top_line.status') }}
            </p>
            <div class="status-prompt__in-process">
              <span class="status-prompt__icon">
                <!-- <img
                  src="@/assets/images/servises/excursions/country-banner.jpg"
                  alt=""
                /> -->
              </span>
              {{ $t('excursions.guide.balance.mob_prompt.in_process') }}
            </div>
            <div class="status-prompt__done">
              <span class="status-prompt__icon paid">
                <!-- <img
                  src="@/assets/images/servises/excursions/country-banner.jpg"
                  alt=""
                /> -->
              </span>
              {{ $t('excursions.guide.balance.mob_prompt.paid') }}
            </div>
          </div>
        </div>
        <p class="empty" v-if="empty">
          {{ $t('excursions.guide.orders.empty') }}
        </p>
        <div v-if="preloader" class="for-preloader">
          <v-preloader />
        </div>
        <div v-if="orders.length && !preloader">
          <div class="guide-balance__balance-list-pc balance-list-pc">
            <div class="balance-list-pc__top-line">
              <div
                class="balance-list-pc__top-line-item balance-list-pc__top-line-item_number"
              >
                №
              </div>
              <div
                class="balance-list-pc__top-line-item balance-list-pc__top-line-item_tour"
              >
                {{ $t('excursions.guide.balance.top_line.tour') }}
              </div>
              <div
                class="balance-list-pc__top-line-item balance-list-pc__top-line-item_date"
              >
                <span class="icon icon-calendar"></span>
                {{ $t('excursions.guide.balance.top_line.date') }}
              </div>
              <div
                class="balance-list-pc__top-line-item balance-list-pc__top-line-item_time"
              >
                <span class="icon icon-watch"></span>
                {{ $t('excursions.guide.balance.top_line.time') }}
              </div>
              <div
                class="balance-list-pc__top-line-item balance-list-pc__top-line-item_amount"
              >
                {{ $t('excursions.guide.balance.top_line.amount') }}
              </div>
              <div
                class="balance-list-pc__top-line-item balance-list-pc__top-line-item_price-for-one"
              >
                {{ $t('excursions.guide.balance.top_line.price_for_one') }}
              </div>
              <div
                class="balance-list-pc__top-line-item balance-list-pc__top-line-item_sum"
              >
                {{ $t('excursions.guide.balance.top_line.sum') }}
              </div>
              <div
                class="balance-list-pc__top-line-item balance-list-pc__top-line-item_commission"
              >
                {{ $t('excursions.guide.balance.top_line.commission') }}
              </div>

              <div
                class="balance-list-pc__top-line-item balance-list-pc__top-line-item_earned"
              >
                {{ $t('excursions.guide.balance.top_line.earned') }}
              </div>
              <div
                class="balance-list-pc__top-line-item balance-list-pc__top-line-item_status"
              >
                {{ $t('excursions.guide.balance.top_line.status') }}
              </div>
            </div>
            <div class="balance-list-pc__content">
              <div class="balance-list-pc__list">
                <excursion-balance
                  v-for="(order, index) in orders"
                  :key="index"
                  :order="order"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosConfig from '../../../../../api/instance'
import ClickOutside from 'vue-click-outside'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import VPreloader from '@/components/ui/VPreloader.vue'
import ExcursionBalance from '@/components/ui/cards/ExcursionBalance.vue'

export default {
  name: 'GuideBalance',
  directives: {
    ClickOutside,
  },
  components: {
    DatePicker,
    VPreloader,
    ExcursionBalance,
  },
  data() {
    return {
      filter_date: false,
      datepicker: new Date(),
      filter_date2: false,
      datepicker2: new Date(),
      preloader: true,
      empty: false,
      orders: [],
      earned: 0,
      earned_month: 0,
    }
  },
  computed: {
    getDate1() {
      var thisDate = this.datepicker.getDate()
      if (thisDate.toString().length == 1) {
        thisDate = '0' + thisDate
      }
      var thisMonth = Number(this.datepicker.getMonth()) + 1
      if (thisMonth.toString().length == 1) {
        thisMonth = '0' + thisMonth
      }
      var thisFullYear = this.datepicker.getFullYear()
      var newDate = thisDate + '.' + thisMonth + '.' + thisFullYear

      return newDate
    },
    getDate2() {
      var thisDate = this.datepicker2.getDate()
      if (thisDate.toString().length == 1) {
        thisDate = '0' + thisDate
      }
      var thisMonth = Number(this.datepicker2.getMonth()) + 1
      if (thisMonth.toString().length == 1) {
        thisMonth = '0' + thisMonth
      }
      var thisFullYear = this.datepicker2.getFullYear()
      var newDate = thisDate + '.' + thisMonth + '.' + thisFullYear

      return newDate
    },
    setStartDate() {
      var thisDate = this.datepicker.getDate()
      if (thisDate.toString().length == 1) {
        thisDate = '0' + thisDate
      }

      var thisMonth = Number(this.datepicker.getMonth()) + 1
      if (thisMonth.toString().length == 1) {
        thisMonth = '0' + thisMonth
      }

      var thisFullYear = this.datepicker.getFullYear()
      var newDate = thisDate + '-' + thisMonth + '-' + thisFullYear

      return newDate
    },
    setEndDate() {
      var thisDate = this.datepicker2.getDate()
      if (thisDate.toString().length == 1) {
        thisDate = '0' + thisDate
      }

      var thisMonth = Number(this.datepicker2.getMonth()) + 1
      if (thisMonth.toString().length == 1) {
        thisMonth = '0' + thisMonth
      }

      var thisFullYear = this.datepicker2.getFullYear()
      var newDate = thisDate + '-' + thisMonth + '-' + thisFullYear

      return newDate
    },
  },
  methods: {
    setDate2() {
      var date = new Date()
      date.setMonth(date.getMonth() + 2)
      this.datepicker2 = date
    },
    hideFilterDate() {
      this.filter_date = false
    },
    hideFilterDate2() {
      this.filter_date2 = false
    },
    async getOrders() {
      this.preloader = true
      await axiosConfig
        .get(
          `/user/ordered/guides?start_on_the_date=${this.setStartDate}&end_on_the_date=${this.setEndDate}`,
        )
        .then((response) => {
          const data = response.data.data
          // console.log(data)

          var ordersFiltered = []
          function addFilteredArray(order) {
            var getDate = order.on_the_date.slice(8, 10)
            var getMonth = order.on_the_date.slice(5, 7)
            var getYear = order.on_the_date.slice(0, 4)
            var date = getDate + '.' + getMonth + '.' + getYear

            if (order.category == 'child') {
              ordersFiltered.push({
                id: order.servicetype,
                owner: order.owner,
                full_date: order.on_the_date,
                date: date,
                time: order.on_the_date.slice(11, 16),
                list: {
                  child: [order],
                  default: [],
                },
              })
            } else {
              ordersFiltered.push({
                id: order.servicetype,
                owner: order.owner,
                full_date: order.on_the_date,
                date: date,
                time: order.on_the_date.slice(11, 16),
                list: {
                  child: [],
                  default: [order],
                },
              })
            }
          }
          var earned = 0
          data.forEach((order) => {
            earned += order.cost - order.cost * 0.2
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
          this.$nextTick(function () {
            this.earned = earned
            this.orders = ordersFiltered
            // console.log(this.orders)
            if (!this.orders.length) {
              this.empty = true
            } else {
              this.empty = false
            }
          })
        })
        .catch((error) => {
          console.log(error)
        })
      this.preloader = false
    },
    async getEarned() {
      var today = new Date()
      var lastMonth = new Date(today.setMonth(today.getMonth() - 1))
      await axiosConfig
        .get(
          `/user/ordered/guides?start_on_the_date=${lastMonth}&end_on_the_date=${today}`,
        )
        .then((response) => {
          const data = response.data.data
          // console.log(data)

          var earned = 0
          data.forEach((order) => {
            earned += order.cost - order.cost * 0.2
          })
          this.$nextTick(function () {
            this.earned_month = earned
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  beforeMount() {
    var now1 = new Date()
    var now2 = new Date()
    this.datepicker = new Date(now1.setMonth(now1.getMonth() - 2))
    this.datepicker2 = new Date(now2.setMonth(now2.getMonth() + 2))
  },
  mounted() {
    this.getOrders()
    this.getEarned()
    // this.setDate2()
  },
}
</script>

<style lang="scss" scoped>
.for-preloader {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}
.empty {
  font-size: 20px;
}
.deep-options__item-head {
  // min-width: 175px;
  @media (max-width: 767.98px) {
    // min-width: 140px;
    color: var(--black) !important;
    .deep-options__icon path {
      fill: var(--black);
    }
  }
}
.deep-options__item {
  @media (max-width: 575.98px) {
    position: static;
  }
}
.date-option__list {
  @media (max-width: 575.98px) {
    position: relative;
  }
}
.deep-options__name {
  flex: 1 1 auto;
}
.date-option {
  &__content {
    display: flex;
    align-items: center;
    gap: 26px;
  }

  &__title {
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    letter-spacing: 0.1px;
    @media (max-width: 767.98px) {
      display: none;
    }
  }
  &__list {
    display: flex;
    gap: 12px;
  }

  &__date-pick-item {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 11px;
    @media (max-width: 500.98px) {
      gap: 0;
    }
  }

  &__from-to {
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0.1px;
    @media (max-width: 500.98px) {
      font-size: 14px;
      line-height: 17px;
      font-weight: 400;
    }
  }

  &__date-picker {
    background: #ffffff;
    border: 2px solid #41b619;
    padding: 8px 14px;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    @media (max-width: 500.98px) {
      border: none;
      background-color: transparent;
      font-size: 12px;
      padding: 0px 6px;
    }
    .icon-calendar {
      font-size: 24px;
      @media (max-width: 500.98px) {
        font-size: 19px;
      }
    }
  }
}
//========================================================================================================================================================
.status-prompt {
  @media (min-width: 991.98px) {
    display: none;
  }
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;

  &__title {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.15px;
    background: #c7c4c4;
    padding: 2px 22px;
  }

  &__in-process {
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    line-height: 14px;
    color: #3e3d3d;
    @media (max-width: 360px) {
      font-size: 10px;
    }
  }

  &__icon {
    margin-right: 4px;
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

  &__done {
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    line-height: 14px;
    color: #3e3d3d;
    @media (max-width: 360px) {
      font-size: 10px;
    }
  }
}
.balance-list-pc {
  &__top-line {
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.15px;
    background: #c7c4c4;
    padding: 5px 0px;
    justify-content: space-between;
    margin-bottom: 5px;
    gap: 10px;
    @media (max-width: 991.98px) {
      display: none;
    }
  }

  &__top-line-item {
    display: flex;
    justify-content: center;
    text-align: center;

    &_number {
      flex: 0 1 75px;
    }

    &_tour {
      flex: 0 1 340px;
    }

    &_date {
      display: inline-flex;
      align-items: center;
      flex: 0 1 102px;
      .icon-calendar {
        font-size: 19px;
        margin-right: 12px;
      }
    }

    &_time {
      flex: 0 1 87px;
      display: inline-flex;
      align-items: center;
      .icon-watch {
        font-size: 21px;
        margin-right: 8px;
      }
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
  }

  &__content {
  }

  &__list {
  }
}

.guide-balance {
  &__wrapper {
    margin: 22px 0px 395px 0px;
    @media (max-width: 767.98px) {
      margin: 18px 0px 61px 0px;
    }
  }

  &__container {
    max-width: 1210px;
    padding: 0px 22px;
    margin: 0 auto;
    height: 100%;
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    text-transform: uppercase;
    margin-bottom: 20px;
    @media (max-width: 500.98px) {
      font-size: 18px;
      line-height: 25px;
      margin-bottom: 5px;
    }
  }

  &__sub-title {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.1px;
    display: flex;
    align-items: center;
    @media (max-width: 500.98px) {
      font-size: 14px;
      line-height: 19px;
    }
    &_on-account {
      margin-bottom: 16px;
      @media (max-width: 500.98px) {
        margin-bottom: 5px;
      }
    }

    &_earn {
      margin-bottom: 46px;
      @media (max-width: 500.98px) {
        margin-bottom: 15px;
      }
    }
    .icon-euro {
      font-size: 18px;
    }
    span {
      margin-left: 7px;
    }
  }

  &__sub-title-sum {
    font-weight: 700;
    font-size: 20px;
    line-height: 16px;
    letter-spacing: 0.4px;
  }
  &__options-date {
    margin-bottom: 36px;
  }
  &__status-prompt {
  }
  &__balance-list-pc {
  }
  &__balance-list-mob {
  }
}
</style>
