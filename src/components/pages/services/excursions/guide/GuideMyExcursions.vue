<template>
  <div class="my-excursions">
    <div class="container-xl">
      <div class="my-excursions__content">
        <h2 class="my-excursions__title">
          {{ $t('excursions.guide.my_excursions.title') }}
        </h2>
        <p class="my-excursions__descr">
          {{ $t('excursions.guide.my_excursions.descr') }}
        </p>
        <div class="my-excursions__cards-wrapper">
          <p class="my-excursions__empty" v-if="excursions == 0">
            {{ $t('excursions.guide.my_excursions.empty') }}
          </p>
          <card-excursion
            v-for="(excursion, index) in excursions"
            :key="index"
            :excursion="excursion"
            :my_excursion="true"
          />
        </div>
        <router-link
          :to="{ name: 'GuideAddExcursion' }"
          class="my-excursions__add"
          v-if="excursions == 0"
        >
          {{ $t('excursions.guide.my_excursions.add') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axiosConfig from '../../../../../api/instance'
import CardExcursion from '../../../../ui/cards/excursion'

export default {
  name: 'GuideMyExcursions',
  components: {
    CardExcursion,
  },
  data() {
    return {
      owner_id: null,
      excursions: null,
      errors: {},
    }
  },
  methods: {
    async getMyExcursions() {
      await axiosConfig
        .get(`/guide/my`)
        .then((response) => {
          if (response.data.data) {
            this.excursions = response.data.data
          } else {
            this.excursions = 0
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.owner_id = this.$store.getters.getUser.id

    this.getMyExcursions()
  },
}
</script>

<style lang="scss" scoped>
.my-excursions {
  padding: 30px 0 183px;
  @media (max-width: 575.98px) {
    padding: 28px 0 98px;
  }
  &__content {
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    text-transform: uppercase;
    margin-bottom: 20px;
    @media (max-width: 575.98px) {
      font-size: 16px;
      margin-bottom: 5px;
    }
  }

  &__descr {
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 45px;
    max-width: 350px;
    @media (max-width: 575.98px) {
      font-size: 12px;
      max-width: 270px;
      letter-spacing: 0.2px;
      margin-bottom: 10px;
    }
  }

  &__cards-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 36px;
    @media (max-width: 1199.98px) {
      grid-gap: 20px;
    }
    @media (max-width: 991.98px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 767.98px) {
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 25px;
    }
  }
  &__empty {
    font-size: 20px;
    margin-top: 30px;
    @media (max-width: 575.98px) {
      font-size: 18px;
    }
  }
  &__add {
    width: 100%;
    max-width: 280px;
    background: var(--light-green);
    border-radius: 6px;
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 1.25px;
    text-transform: uppercase;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    @media (max-width: 575.98px) {
      margin-top: 22px;
    }
  }
}
</style>
