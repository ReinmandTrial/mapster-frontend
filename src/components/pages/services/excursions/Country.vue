<template>
  <div class="excursions-country">
    <div class="excursions-country__banner">
      <img
        src="@/assets/images/servises/excursions/country-banner.jpg"
        alt=""
        class="excursions-country__banner-bg--tablet"
      />
      <img
        src="@/assets/images/servises/excursions/country-banner--mobile.jpg"
        alt=""
        class="excursions-country__banner-bg--mobile"
      />
      <div class="container-xl">
        <h1 class="excursions-country__title">Экскурсии в Грузии</h1>
        <p class="excursions-country__descr">371 экскурсия в 5 городах</p>
        <div class="excursions-country__search excursions-search">
          <div class="excursions-search__input-box">
            <input
              type="text"
              class="excursions-search__input"
              placeholder="Где вы планируете путешествовать?"
            />
            <div class="excursions-search__input-body"></div>
          </div>
          <button type="button" class="excursions-search__find" @click="test()">
            НАЙТИ
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
          <h2 class="excursions-country__subtitle">Популярные города</h2>
          <div class="excursions-country__excursions-wrap">
            <card-excursion
              v-for="(excursions, index) in excursions"
              :key="index"
              :excursions="excursions"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardTown from '../../../ui/cards/town.vue'
import CardExcursion from '../../../ui/cards/excursion.vue'

export default {
  name: 'ExcursionsCountry',
  components: {
    CardTown,
    CardExcursion,
  },
  data() {
    return {
      towns: [
        {
          name: 'Лондон',
          excursions: 125,
          image:
            'https://www.kaplaninternational.com/files/styles/hero_banner_k_mb/public/school/featured/kaplan-english-school-in-London-4.jpg?itok=WTnubTro',
        },
        {
          name: 'Стамбул',
          excursions: 38,
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Wiener_Pestsaeule.jpg/276px-Wiener_Pestsaeule.jpg',
        },
        {
          name: 'Рим',
          excursions: 2,
          image:
            'https://www.kaplaninternational.com/files/styles/hero_banner_k_mb/public/school/featured/kaplan-english-school-in-London-4.jpg?itok=WTnubTro',
        },
        {
          name: 'Париж',
          excursions: 11,
          image:
            'data:image/jpeg;base64,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',
        },
        {
          name: 'Барселона',
          excursions: 41,
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Wiener_Pestsaeule.jpg/276px-Wiener_Pestsaeule.jpg',
        },
      ],
    }
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
    @media (min-height: 900px) {
      min-height: 900px;
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
}
</style>
