<template>
  <div class="excursions-country">
    <div class="excursions-country__banner">
      <div class="excursions-country__banner-bg">
        <img
          :src="'data:image/jpg;base64,' + banner_image.data"
          alt=""
          class=""
        />
      </div>
      <div class="container-xl">
        <h1 class="excursions-country__title">
          {{
            $t('excursions.client.country.banner.title', {
              country: current_country,
            })
          }}
        </h1>
        <p class="excursions-country__descr">
          {{
            calcExcursions(excurtions_count) +
            $t('excursions.client.country.banner.descr') +
            calcTowns()
          }}
        </p>
        <div
          class="excursions-country__search excursions-search"
          v-click-outside="closeSearch"
        >
          <div class="excursions-search__input-box">
            <input
              v-model.trim="search_input"
              type="text"
              class="excursions-search__input"
              :placeholder="$t('excursions.client.search.placeholder')"
              @keyup.enter="search_input ? searchResults() : false"
              @input="search_open = false"
            />
            <div class="excursions-search__input-body" v-if="search_open">
              <router-link
                v-for="(answer, index) in search_answers"
                :key="index"
                :to="{
                  name: `ExcursionsTown`,
                  params: {
                    country_name: answer.country,
                    city_name: answer.city,
                  },
                }"
                type="button"
                class="excursions-search__item"
              >
                <span
                  class="excursions-search__item-mark icon icon-mark"
                ></span>
                <span class="excursions-search__item-text">
                  <span
                    class="excursions-search__item-text-main"
                    v-html="answer.city ? answer.city : answer.country"
                  ></span>
                  <span
                    class="excursions-search__item-text-secondary"
                    v-if="answer.city"
                    v-html="answer.country"
                  ></span>
                </span>
                <span
                  class="excursions-search__amount"
                  v-html="calcExcursions(answer.count)"
                ></span>
              </router-link>
              <div
                class="excursions-search__empty"
                v-if="search_answers.length == 0"
              >
                {{ $t('excursions.client.search.empty') }}
              </div>
            </div>
          </div>
          <button
            type="button"
            class="excursions-search__find"
            @click="search_input ? searchResults() : false"
          >
            {{ $t('excursions.client.search.btn') }}
          </button>
        </div>
      </div>
    </div>
    <div class="excursions-country__towns">
      <div class="container-xl">
        <div class="excursions-country__towns-content">
          <h2 class="excursions-country__subtitle">Популярные города</h2>
          <div class="excursions-country__towns-wrap">
            <card-town
              v-for="(town, index) in towns"
              :key="index"
              :town="town"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="excursions-country__excursions">
      <div class="container-xl">
        <div class="excursions-country__excursions-content">
          <h2 class="excursions-country__subtitle">
            {{
              $t('excursions.client.country.popular_excursions', {
                country: current_country,
              })
            }}
          </h2>
          <div class="excursions-country__excursions-wrap">
            <router-link
              v-for="(excursion, index) in excursions"
              :key="index"
              :to="{
                name: `ExcursionPage`,
                params: {
                  id: excursion.id,
                },
              }"
            >
              <card-excursion :excursion="excursion" />
            </router-link>
          </div>
          <button
            class="excursions-country__excursions-more"
            v-if="show_btn_more"
            @click="moreExcursions()"
            v-html="forMobile()"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardTown from '../../../ui/cards/town.vue'
import CardExcursion from '../../../ui/cards/excursion.vue'
import axiosConfig from '../../../../api/instance'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'ExcursionsCountry',
  components: {
    CardTown,
    CardExcursion,
  },
  directives: {
    ClickOutside,
  },
  data() {
    return {
      current_country: 'Франция',
      banner_image: {
        data: [],
      },
      excurtions_count: 0,
      towns_count: 0,
      search_input: null,
      search_open: false,
      search_answers: [],
      towns: [],
      amount_excursions: 3,
      excursions: [],
      show_btn_more: true,
    }
  },
  methods: {
    closeSearch() {
      this.search_open = false
    },
    searchResults() {
      const getTowns = async () => {
        await axiosConfig
          .get(
            `/guide/count?limit=20&country=${this.current_country}&city__icontains=${this.search_input}`,
          )
          .then(async (response) => {
            const data = response.data.data
            const results = []

            data.forEach((el) => {
              results.push(el)
            })

            results.sort(function (a, b) {
              if (a.count > b.count) {
                return -1
              }
              if (a.count < b.count) {
                return 1
              }
            })

            this.search_answers = results

            this.search_open = true
          })
          .catch(function (error) {
            console.log(error)
          })
      }
      getTowns()
    },
    forMobile() {
      if (window.innerWidth < 575) {
        return this.$t('excursions.client.home.show_more.mobile')
      } else {
        return this.$t('excursions.client.home.show_more.desktop')
      }
    },
    calcExcursions(amount) {
      const lastNum = amount.toString().slice(-1),
        lastTwoNums = amount.toString().slice(-2)
      if (lastTwoNums != 11 && lastNum == 1) {
        return amount + ' экскурсия'
      } else if (
        (lastNum == 2 || lastNum == 3 || lastNum == 4) &&
        lastTwoNums != 12 &&
        lastTwoNums != 13 &&
        lastTwoNums != 14
      ) {
        return amount + ' экскурсии'
      } else {
        return amount + ' экскурсий'
      }
    },
    calcTowns() {
      const amountTowns = async () => {
        await axiosConfig
          .get(`/guide/rating?country=${this.current_country}`)
          .then((response) => {
            this.towns_count = response.data.data.length
            // console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
      amountTowns()

      var lastNum = this.towns_count.toString().slice(-1),
        lastTwoNums = this.towns_count.toString().slice(-2)
      if (lastTwoNums != 11 && lastNum == 1) {
        return this.towns_count + this.$t('excursions.client.amount_towns.one')
      } else if (
        (lastNum == 2 || lastNum == 3 || lastNum == 4) &&
        lastTwoNums != 12 &&
        lastTwoNums != 13 &&
        lastTwoNums != 14
      ) {
        return (
          this.towns_count +
          this.$t('excursions.client.amount_towns.two_to_four')
        )
      } else {
        return (
          this.towns_count + this.$t('excursions.client.amount_towns.another')
        )
      }
    },
    async getBannerImage() {
      await axiosConfig
        .get(`/enums/cityphoto?country=${this.current_country}`)
        .then((response) => {
          if (response.data.data[0]) {
            this.banner_image = response.data.data[0]
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async getExcursions() {
      await axiosConfig
        .get(
          `/guide?country=${this.current_country}&limit=${this.amount_excursions}`,
        )
        .then((response) => {
          this.excursions = response.data.data
          // console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async moreExcursions() {
      this.amount_excursions += 6

      await this.getExcursions()
      if (this.amount_excursions > this.excursions.length) {
        this.show_btn_more = false
      }
    },
    async setCountExcursionsInCountry() {
      await axiosConfig
        .get(`/guide/count/all?country=${this.current_country}`)
        .then((response) => {
          const data = response.data.data
          if (data.length) {
            data.forEach((element) => {
              this.excurtions_count += element.count
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
  computed: {
    // AllExcurtionsInCountry() {
    //   return 2
    // },
  },
  created() {
    const country = this.$route.params.country_name
    if (country) {
      this.current_country = country
    }
  },
  mounted() {
    this.getBannerImage()
    const getPopTowns = async () => {
      await axiosConfig
        .get(`/guide/rating?limit=5&country=${this.current_country}`)
        .then((response) => {
          const towns = response.data.data
          this.towns = towns
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    getPopTowns()

    if (window.innerWidth < 992 && window.innerWidth >= 768) {
      this.amount_excursions = 4
    }
    this.getExcursions()
    this.setCountExcursionsInCountry()
  },
}
</script>

<style lang="scss" scoped>
.excursions-search {
  margin-top: 113px;
  display: flex;
  column-gap: 15px;
  justify-content: center;
  row-gap: 25px;
  position: relative;
  z-index: 10;
  color: var(--black);
  @media (max-width: 767.98px) {
    flex-direction: column;
    // margin-bottom: -90px;
  }
  @media (max-width: 575.98px) {
    // margin-top: 165px;
    margin-top: unset;
    position: absolute;
    top: calc(100% - 25px);
    left: 25px;
    right: 25px;
  }
  &__input-box {
    max-width: 517px;
    width: 100%;
    position: relative;
    @media (max-width: 767.98px) {
      max-width: unset;
    }
  }

  &__input {
    width: 100%;
    background: var(--white);
    border: 3px solid var(--light-green);
    font-size: 16px;
    color: #003566;
    padding: 7px 18px 10px;
    @media (max-width: 575.98px) {
      padding: 9px 18px 13px;
      border-color: var(--white);
      border-radius: 8px;
    }
    &::placeholder {
      color: #003566;
    }
  }

  &__input-body {
    z-index: 20;
    position: absolute;
    top: calc(100% + 5px);
    // top: 100%;
    left: 3px;
    right: 3px;
    background: var(--white);
    border-radius: 3px;
    max-height: 186px;
    overflow-y: auto;
    @media (max-width: 575.98px) {
      left: 0;
      right: 0;
      border-radius: 8px;
    }
  }

  &__item {
    padding: 7px 5px;
    text-align: left;
    width: 100%;
    display: flex;
    align-items: center;
    height: 46px;
    border-radius: 5px;
    column-gap: 5px;
    &:hover {
      background: #d9d9d9;
    }
  }

  &__item-mark {
    flex: none;
    color: var(--gray);
  }

  &__item-text {
    flex: 1 1 auto;
    letter-spacing: 0.4px;
  }

  &__item-text-main {
    font-weight: 600;
    font-size: 14px;
    display: block;
  }

  &__item-text-secondary {
    display: block;
    font-size: 12px;
  }

  &__amount {
    flex: none;
    width: 35%;
    letter-spacing: 0.4px;
    font-size: 12px;
  }
  &__empty {
    font-size: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    color: var(--black);
  }

  &__find {
    padding: 9px 20px 10px;
    background: var(--light-green);
    border-radius: 6px;
    max-width: 250px;
    width: 100%;
    display: block;
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 1.25px;
    text-transform: uppercase;
    @media (max-width: 767.98px) {
      max-width: unset;
    }
  }
}
.excursions-country {
  background: var(--light-gray);
  &__banner {
    position: relative;
    margin-top: -136px;
    padding-top: 156px;
    padding-bottom: 100px;
    padding-left: 45px;
    padding-right: 45px;
    min-height: 100vh;
    color: var(--white);
    background: #023047;
    @media (min-width: 1300px) {
      max-width: 1300px;
      margin-left: auto;
      margin-right: auto;
    }
    @media (min-height: 600px) {
      min-height: 600px;
    }
    @media (max-width: 991.98px) {
      padding-left: unset;
      padding-right: unset;
    }
    @media (max-width: 767.98px) {
      margin-top: unset;
      padding-top: 55px;
      min-height: calc(100vw * 0.62);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: 100%;
    }
    @media (max-width: 575.98px) {
      // min-height: unset;
      // height: 390px;
      padding-bottom: 45px;
      height: calc(100vw * 0.62);
    }
    &-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.2),
          rgba(0, 0, 0, 0.2)
        );
        z-index: 5;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      // @media (max-width: 767.98px) {
      //   display: none;
      // }
    }
    // &-bg--mobile {
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 100%;
    //   object-fit: cover;
    //   @media (min-width: 768px) {
    //     display: none;
    //   }
    // }
  }
  .container-xl {
    position: relative;
    z-index: 10;
    height: 100%;
    @media (max-width: 767.98px) {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: flex-end;
      flex: 1 1 auto;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 48px;
    text-transform: uppercase;
    margin-bottom: 5px;
    @media (max-width: 575.98px) {
      font-size: 18px;
      margin-bottom: 10px;
    }
  }

  &__descr {
    font-weight: 600;
    font-size: 24px;
    letter-spacing: 0.4px;
    @media (max-width: 575.98px) {
      font-size: 14px;
    }
  }
  &__search {
    @media (max-width: 767.98px) {
      display: none;
    }
  }

  &__towns {
    margin-top: -156px;
    padding-bottom: 50px;
    @media (max-width: 767.98px) {
      margin-top: unset;
      padding-top: 50px;
    }
    @media (max-width: 575.98px) {
      padding-bottom: 25px;
    }
    .excursions-country__subtitle {
      @media (min-width: 768px) {
        color: var(--white);
      }
    }
  }

  &__subtitle {
    font-weight: 700;
    font-size: 24px;
    text-transform: uppercase;
    margin-bottom: 35px;
    @media (max-width: 575.98px) {
      font-size: 18px;
      margin-bottom: 15px;
    }
  }

  &__towns-wrap {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 25px 15px;
    @media (max-width: 1199.98px) {
      grid-template-columns: repeat(3, 1fr);
      .card-town:nth-child(1) {
        grid-column: 1 / 3;
        padding-bottom: 44.446%;
      }
    }
    @media (max-width: 767.98px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 17px;
    }
    @media (max-width: 575.98px) {
    }
  }
  &__excursions {
    padding: 50px 0 80px;
    @media (max-width: 575.98px) {
      padding: 25px 0 50px;
    }
  }
  &__excursions-wrap {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 41px;
    @media (max-width: 1199.98px) {
      gap: 20px;
    }
    @media (max-width: 1099.98px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 767.98px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  &__excursions-more {
    display: block;
    padding: 10px 7px;
    max-width: 280px;
    width: 100%;
    background: var(--light-green);
    font-weight: 600;
    font-size: 18px;
    text-transform: uppercase;
    border-radius: 5px;
    margin: 24px auto 0;
    @media (max-width: 575.98px) {
      background: none;
      padding: unset;
      width: fit-content;
      text-transform: none;
      margin: 20px 17px 0 auto;
    }
  }
}
</style>
