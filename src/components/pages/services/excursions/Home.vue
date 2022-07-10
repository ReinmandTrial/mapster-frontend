<template>
  <div class="excursions-home">
    <div class="excursions-home__banner">
      <img
        src="@/assets/images/servises/excursions/home-banner.jpg"
        alt=""
        class="excursions-home__banner-bg--tablet"
      />
      <img
        src="@/assets/images/servises/excursions/home-banner--mobile.jpg"
        alt=""
        class="excursions-home__banner-bg--mobile"
      />
      <div class="container-xl">
        <h1 class="excursions-home__title">
          {{ $t('excursions.client.home.banner.title') }}
        </h1>
        <p class="excursions-home__descr">
          {{
            $t('excursions.client.home.banner.descr', {
              count: all_cities_count,
            })
          }}
        </p>
        <div
          class="excursions-home__search excursions-search"
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
                :to="
                  answer.city
                    ? {
                        name: `ExcursionsTown`,
                        params: {
                          country_name: answer.country,
                          city_name: answer.city,
                        },
                      }
                    : {
                        name: `ExcursionsCountry`,
                        params: {
                          country_name: answer.country,
                        },
                      }
                "
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
    <div class="excursions-home__towns">
      <div class="container-xl">
        <div class="excursions-home__towns-content">
          <h2 class="excursions-home__subtitle">
            {{ $t('excursions.client.home.popular_towns') }}
          </h2>
          <div class="excursions-home__towns-wrap">
            <card-town
              v-for="(town, index) in towns"
              :key="index"
              :town="town"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="excursions-home__articles">
      <div class="container-xl">
        <div class="excursions-home__articles-content">
          <h2 class="excursions-home__subtitle">
            {{ $t('excursions.client.home.watch_articles') }}
          </h2>
          <div class="excursions-home__articles-wrap">
            <card-article
              v-for="(article, index) in articles"
              :key="index"
              :article="article"
            />
          </div>
          <button
            class="excursions-home__articles-more"
            v-if="show_btn_more"
            @click="moreArticles()"
            v-html="forMobile()"
          ></button>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import axiosConfig from '../../../../api/instance'
import CardTown from '../../../ui/cards/town.vue'
import CardArticle from '../../../ui/cards/article.vue'

export default {
  name: 'ExcursionsHome',
  components: {
    CardTown,
    CardArticle,
  },
  directives: {
    ClickOutside,
  },
  data() {
    return {
      all_cities_count: '-',
      search_input: null,
      search_open: false,
      search_answers: [],
      towns: [],
      articles: [],
      amount_articles: 3,
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
          .get(`/guide/count?limit=20&country__icontains=${this.search_input}`)
          .then(async (response) => {
            const data = response.data.data
            const uniqueCountry = [...new Set(data.map((data) => data.country))]
            const results = []

            await uniqueCountry.forEach(async (el) => {
              var amount = 0
              await axiosConfig
                .get(`/guide/count/all?country=${el}`)
                .then((response) => {
                  const getAddCounts = response.data.data

                  getAddCounts.forEach((el) => {
                    amount += el.count
                  })
                })
                .catch(function (error) {
                  console.log(error)
                })

              const countryObj = {
                country: el,
                count: amount,
              }
              results.push(countryObj)

              results.sort(function (a, b) {
                if (a.count > b.count) {
                  return -1
                }
                if (a.count < b.count) {
                  return 1
                }
              })
            })

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
    calcExcursions: function (amount) {
      var lastNum = amount.toString().slice(-1),
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
    forMobile() {
      if (window.innerWidth < 575) {
        return this.$t('excursions.client.home.show_more.mobile')
      } else {
        return this.$t('excursions.client.home.show_more.desktop')
      }
    },

    async getArticles() {
      await axiosConfig
        .get(`/blog?last_id=${this.amount_articles + 1}`)
        .then((response) => {
          this.articles = response.data.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async moreArticles() {
      this.amount_articles += 6

      await this.getArticles()
      if (this.amount_articles > this.articles.length) {
        this.show_btn_more = false
      }
    },
    async calcCities() {
      await axiosConfig
        .get('/guide/rating')
        .then((response) => {
          this.all_cities_count = response.data.data.length
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },

  async mounted() {
    const getPopTowns = async () => {
      await axiosConfig
        .get('/guide/rating?limit=10')
        .then((response) => {
          const towns = response.data.data
          this.towns = towns
          // towns.forEach((el, index) => {
          //   this.$set(this.towns, index, el)
          // })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    getPopTowns()

    if (window.innerWidth < 992 && window.innerWidth >= 768) {
      this.amount_articles = 4
    }
    this.getArticles()
    await this.calcCities()
  },
}
</script>

<style lang="scss" scoped>
.excursions-home {
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
      min-height: calc(100vw * 0.76);
    }
    @media (max-width: 575.98px) {
      // min-height: unset;
      // height: 390px;
      height: calc(100vw * 0.76);

      padding-bottom: unset;
    }
    &-bg--tablet {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      @media (max-width: 767.98px) {
        display: none;
      }
    }
    &-bg--mobile {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      @media (min-width: 768px) {
        display: none;
      }
      @media (max-width: 575.98px) {
        height: 100%;
      }
    }
  }
  .container-xl {
    position: relative;
    // z-index: 10;
    height: 100%;
  }

  &__title {
    font-weight: 700;
    font-size: 48px;
    text-transform: uppercase;
    margin-bottom: 5px;
    @media (max-width: 575.98px) {
      font-size: 18px;
      margin-bottom: 7px;
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

  &__towns {
    padding-top: 67px;
    padding-bottom: 35px;
    @media (max-width: 575.98px) {
      padding-top: 144px;
      padding-bottom: 78px;
      background: #023047
        url('~@/assets/images/servises/excursions/patterns.png') center -380px/
        100% auto no-repeat;
      .excursions-home__subtitle {
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
      @media (min-width: 768px) {
        .card-town:nth-child(1) {
          grid-column: 1 / 3;
          padding-bottom: 44.446%;
        }
        .card-town:nth-child(7) {
          grid-column: 2 / 4;
          padding-bottom: 44.446%;
        }
      }
    }
    @media (max-width: 767.98px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 17px;
    }
    @media (max-width: 575.98px) {
    }
  }
  &__articles {
    padding-top: 35px;
    padding-bottom: 111px;
    @media (max-width: 575.98px) {
      padding-bottom: 95px;
    }
  }
  &__articles-content {
  }
  &__articles-wrap {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 21px;
    @media (max-width: 991.98px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 767.98px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  &__articles-more {
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
</style>
