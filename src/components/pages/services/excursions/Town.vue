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
        <h1 class="excursions-home__title">Экскурсии</h1>
        <p class="excursions-home__descr">экскурсии в 681 городах мира</p>
        <div class="excursions-home__search excursions-search">
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
    <div class="excursions-home__towns">
      <div class="container-xl">
        <div class="excursions-home__towns-content">
          <h2 class="excursions-home__subtitle">Популярные города</h2>
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
  </div>
</template>

<script>
export default {
  name: 'ExcursionsTown',
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
    z-index: 10;
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
}
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
</style>
