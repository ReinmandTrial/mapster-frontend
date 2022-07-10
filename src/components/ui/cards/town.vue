<template>
  <router-link
    class="card-town"
    :to="{
      name: `ExcursionsTown`,
      params: {
        country_name: town.country,
        city_name: town.city,
      },
    }"
  >
    <img
      v-if="image.data[0]"
      :src="'data:image/jpg;base64,' + image.data"
      alt=""
      class="card-town__img"
    />
    <div class="card-town__content">
      <h5 class="card-town__name">{{ town.city }}</h5>
      <p class="card-town__amount-excursions" v-html="calcExcursions"></p>
    </div>
  </router-link>
</template>

<script>
import axiosConfig from '../../../api/instance'

export default {
  name: 'CardTown',
  data() {
    return {
      image: {
        data: [],
      },
      count: 0,
    }
  },

  props: {
    town: {
      default() {
        return {
          city: '',
          image: null,
        }
      },
    },
  },
  computed: {
    calcExcursions: function () {
      const amountExcurtions = async () => {
        await axiosConfig
          .get(`/guide/count?city=${this.town.city}`)
          .then((response) => {
            if (response.data.data[0].count) {
              this.count = response.data.data[0].count
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
      amountExcurtions()

      var lastNum = this.count.toString().slice(-1),
        lastTwoNums = this.count.toString().slice(-2)
      if (lastTwoNums != 11 && lastNum == 1) {
        return this.count + this.$t('excursions.client.amount_excursions.one')
      } else if (
        (lastNum == 2 || lastNum == 3 || lastNum == 4) &&
        lastTwoNums != 12 &&
        lastTwoNums != 13 &&
        lastTwoNums != 14
      ) {
        return (
          this.count +
          this.$t('excursions.client.amount_excursions.two_to_four')
        )
      } else {
        return (
          this.count + this.$t('excursions.client.amount_excursions.another')
        )
      }
    },
  },
  methods: {
    getImage() {
      axiosConfig
        .get(`/enums/cityphoto?city=${this.town.city}`)
        .then((response) => {
          // console.log(response.data)
          if (response.data.data[0]) {
            this.image = response.data.data[0]
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
  created() {
    const country = this.$route.params.country_name
    if (country) {
      this.current_country = country
    }
    const city = this.$route.params.city_name
    if (city) {
      this.current_city = city
    }
  },
  mounted() {
    this.getImage()
  },
}
</script>

<style lang="scss" scoped>
.card-town {
  width: 100%;
  height: 0;
  padding-bottom: 91%;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background: #c3c3c3;
  @media (max-width: 575.98px) {
    border-radius: 8px;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: block;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  }
  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  &__content {
    position: absolute;
    z-index: 5;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    color: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px 20px;
    @media (max-width: 575.98px) {
      padding: 7px 15px;
    }
  }

  &__name {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 2px;
    @media (max-width: 575.98px) {
      font-size: 20px;
    }
  }

  &__amount-excursions {
    font-weight: 600;
    font-size: 18px;
    @media (max-width: 575.98px) {
      font-size: 16px;
    }
  }
}
</style>
