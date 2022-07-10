<template>
  <div class="guide">
    <section class="guide__top top-guide">
      <div class="top-guide__wrapper">
        <div class="top-guide__container container-xl">
          <div class="top-guide__content">
            <p class="top-guide__title">
              {{ $t('excursions.guide.home.banner.title') }}
            </p>
            <p class="top-guide__reg-time">
              {{ $t('excursions.guide.home.banner.descr') }}
            </p>
            <p class="top-guide__reg-check">
              <span class="icon icon-check-circle"></span>
              {{ $t('excursions.guide.home.banner.list.item1') }}
            </p>
            <p class="top-guide__reg-check top-guide__reg-check_last">
              <span class="icon icon-check-circle"></span>
              {{ $t('excursions.guide.home.banner.list.item2') }}
            </p>
            <button
              type="button"
              class="top-guide__btn"
              @click.stop="getRights"
            >
              {{ $t('excursions.guide.home.banner.add_excursion') }}
            </button>
            <p class="top-guide__btn-descr">
              {{ $t('excursions.guide.home.banner.create_acc') }}
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="guide__benefit benefit-guide">
      <div class="benefit-guide__container container-xl">
        <div class="benefit-guide__title">
          {{ $t('excursions.guide.home.benefit.title') }}
        </div>
        <div class="benefit-guide__block">
          <div class="benefit-guide__item">
            <div class="benefit-guide__item-title">
              {{ $t('excursions.guide.home.benefit.card1.title') }}
            </div>
            <div class="benefit-guide__item-descr">
              {{ $t('excursions.guide.home.benefit.card1.descr') }}
            </div>
          </div>
          <div class="benefit-guide__item">
            <div class="benefit-guide__item-title">
              {{ $t('excursions.guide.home.benefit.card2.title') }}
            </div>
            <div class="benefit-guide__item-descr">
              {{ $t('excursions.guide.home.benefit.card2.descr') }}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="guide__howstart howstart-guide">
      <div class="howstart-guide__container container-xl">
        <div class="howstart-guide__content">
          <p class="howstart-guide__title">
            {{ $t('excursions.guide.home.how_start.title') }}
          </p>
          <div class="howstart-guide__steps">
            <div class="howstart-guide__step">
              <p class="howstart-guide__number-step">1</p>
              <p class="howstart-guide__text-step">
                {{ $t('excursions.guide.home.how_start.item1') }}
              </p>
            </div>
            <span class="howstart-guide__arrow icon icon-arrow-right"></span>
            <div class="howstart-guide__step">
              <p class="howstart-guide__number-step">2</p>
              <p class="howstart-guide__text-step">
                {{ $t('excursions.guide.home.how_start.item2') }}
              </p>
            </div>
            <span class="howstart-guide__arrow icon icon-arrow-right"></span>
            <div class="howstart-guide__step">
              <p class="howstart-guide__number-step">3</p>
              <p class="howstart-guide__text-step">
                {{ $t('excursions.guide.home.how_start.item3') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="guide__mob-app mob-app">
      <div class="mob-app__wrapper">
        <div class="mob-app__container container-xl">
          <div class="mob-app__content">
            <p
              class="mob-app__title"
              v-html="$t('excursions.guide.home.mobile_app.banner_title')"
            ></p>
          </div>
          <div class="mob-app__phone">
            <img
              class=""
              src="@/assets/images/servises/excursions/guide/phone.png"
              alt="phone"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="guide__download-app download-app">
      <div class="download-app__container container-xl">
        <div class="download-app__content">
          <div class="download-app__text-block">
            <p
              class="download-app__title"
              v-html="$t('excursions.guide.home.mobile_app.title')"
            ></p>
            <p
              class="download-app__descr"
              v-html="$t('excursions.guide.home.mobile_app.descr')"
            ></p>
          </div>
          <div class="download-app__links-block">
            <div class="download-app__phone">
              <img
                class=""
                src="@/assets/images/servises/excursions/guide/phone.png"
                alt="phone"
              />
            </div>
            <p class="download-app__links-title">
              {{ $t('excursions.guide.home.mobile_app.download_title') }}
            </p>
            <div class="download-app__links-btns">
              <a href="#" class="download-app__links-item">
                <img
                  class="download-app__link"
                  src="@/assets/images/gplay.svg"
                  alt="google-play"
                />
              </a>
              <a href="#" class="download-app__links-item">
                <img
                  class="download-app__link"
                  src="@/assets/images/appstore.svg"
                  alt="app-store"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axiosConfig from '../../../../../api/instance'

export default {
  name: 'GuideRegistration',
  methods: {
    async getRights() {
      const user = this.$store.getters.getUser
      if (user) {
        if (!user.address) {
          user.address = {
            zipcode: '',
            country: '',
            city: '',
            addres_1: '',
            address_2: '',
          }
        }
        await axiosConfig
          .post(`/user`, {
            first_name: user.first_name,
            middle_name: user.middle_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            passport: user.passport,
            privilegies: 3,
            timezone: user.timezone,
          })
          .then((response) => {
            this.$store.dispatch('setUser', response.data.data[0])
            localStorage.setItem('user', JSON.stringify(response.data.data[0]))

            this.$router.push({ name: 'GuideMyExcursions' })
            // asd
          })
          .catch((error) => {
            console.log(error.response)
          })
      } else {
        this.$store.dispatch('popupSignIn', true)
      }
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
.top-guide {
  margin-top: -136px;

  @media (min-width: 1300px) {
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 767.98px) {
    margin-top: unset;
  }
  &__wrapper {
    background-image: url('~@/assets/images/servises/excursions/guide/banner-register.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    @media (max-width: 1200px) {
      background-size: 100% 100%;
    }

    @media (max-width: 576.98px) {
      background-image: url('~@/assets/images/servises/excursions/guide/banner-register-mobile.jpg');
    }
    &::after {
      content: '';
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  &__container {
  }

  &__content {
    padding: 156px 0px 85px 0px;
    color: var(--white);
    position: relative;
    z-index: 5;
    @media (max-width: 991.98px) {
      padding-bottom: 24px;
    }
    @media (max-width: 767.98px) {
      padding-top: 38px;
    }
    @media (max-width: 576.98px) {
      padding-top: 98px;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    letter-spacing: 0.25px;
    margin: 0px 0px 5px 0px;
    @media (max-width: 767.98px) {
      font-size: 18px;
      line-height: 25px;
      padding-right: 100px;
    }
  }

  &__reg-time {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.1px;
    margin: 0px 0px 26px 0px;
    @media (max-width: 767.98px) {
      margin-bottom: 40px;
    }
  }

  &__reg-check {
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    @media (max-width: 576.98px) {
      font-size: 14px;
      line-height: 19px;
    }
    &_last {
      margin-bottom: 58px;
      @media (max-width: 767.98px) {
        margin-top: 5px;
        margin-bottom: 36px;
      }
    }
    .icon-check-circle {
      font-size: 21px;
      padding: 0px 15px 0px 0px;
      display: inline-flex;
      align-items: center;
    }
  }

  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--black);
    margin-bottom: 8px;
    background: #ffffff;
    border-radius: 6px;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 1.25px;
    text-transform: uppercase;
    text-align: center;
    height: 35px;
    width: 308px;
    @media (max-width: 576.98px) {
      background: var(--light-green);
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0px auto 8px auto;
    }
    @media (max-width: 360px) {
      width: 270px;
    }
  }

  &__btn-descr {
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    @media (max-width: 991.98px) {
      display: none;
    }
  }
}
.benefit-guide {
  &__container {
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    text-transform: uppercase;
    margin-bottom: 64px;
    @media (max-width: 576.98px) {
      margin-bottom: 17px;
      font-size: 18px;
      line-height: 25px;
    }
  }

  &__block {
    display: flex;
    gap: 20px 47px;
    justify-content: center;
    @media (max-width: 991.98px) {
      flex-wrap: wrap;
    }
  }

  &__item {
    flex: 0 1 455px;
    height: 225px;
    background: var(--light-green);
    border-radius: 10px;
    padding: 30px;
    @media (max-width: 576.98px) {
      background: var(--black);
      border-radius: 8px;
      color: var(--white);
      padding: 20px 25px 25px 25px;
      height: auto;
    }
  }

  &__item-title {
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    text-transform: uppercase;
    margin-bottom: 17px;
    max-width: 220px;
    @media (max-width: 576.98px) {
      max-width: none;
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 10px;
    }
  }

  &__item-descr {
    font-size: 16px;
    line-height: 22px;
    padding-right: 60px;
    @media (max-width: 576.98px) {
      font-size: 14px;
      line-height: 19px;
      padding-right: 0;
    }
  }
}
.howstart-guide {
  background: var(--light-green);
  padding: 50px 0px;
  @media (min-width: 1300px) {
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
  }
  &__container {
  }

  &__content {
    text-transform: uppercase;
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    @media (max-width: 576.98px) {
      font-size: 18px;
      line-height: 25px;
    }
  }

  &__steps {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 30px;
    max-width: 950px;
    margin: 0 auto;
    @media (max-width: 991.98px) {
      flex-direction: column;
      align-items: start;
    }
  }

  &__step {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
    @media (max-width: 991.98px) {
      width: 100%;
      justify-content: start;
      border-bottom: 1px solid #000000;
      column-gap: 15px;

      &:first-child {
        padding-right: 100px;
      }
      &:nth-child(3) {
        padding-left: 42px;
      }
      &:last-child {
        border: none;
        padding-left: 92px;
        padding-right: 50px;
      }
    }
    @media (max-width: px) {
    }
  }
  &__arrow {
    font-size: 67px;
    @media (max-width: 991.98px) {
      display: none;
    }
  }

  &__number-step {
    font-weight: 700;
    font-size: 60px;
    line-height: 82px;
  }

  &__text-step {
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    padding-right: 20px;
    @media (max-width: 576.98px) {
      font-size: 16px;
      line-height: 22px;
    }
  }
}
.mob-app {
  @media (min-width: 1300px) {
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
  }
  &__wrapper {
    background-image: url('~@/assets/images/servises/excursions/guide/mobile-app-banner.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 640px;
    @media (max-width: 576.98px) {
      background-image: url('~@/assets/images/servises/excursions/guide/mobile-app-banner-mobile.jpg');
    }
  }

  &__container {
    position: relative;
  }

  &__content {
  }

  &__title {
    font-weight: 700;
    font-size: 48px;
    line-height: 70px;
    text-transform: uppercase;
    color: var(--white);
    padding-top: 85px;
    span {
      font-weight: 300;
      font-size: 48px;
      line-height: 65px;
      display: block;
      margin-bottom: -15px;
      @media (max-width: 991.98px) {
        font-size: 32px;
        line-height: 44px;
      }
    }
    @media (max-width: 991.98px) {
      font-size: 32px;
      line-height: 44px;
      padding-top: 44px;
    }
    @media (max-width: 576.98px) {
      color: var(--black);
    }
    @media (max-width: 330px) {
      font-size: 28px;
    }
  }
  &__phone {
    position: absolute;
    height: 330px;
    top: 168px;
    right: 25px;
    img {
      height: 100%;
    }
    @media (min-width: 768px) {
      display: none;
    }
  }
}
.download-app {
  &__container {
  }

  &__content {
    padding: 42px 0px 73px 0px;
    display: flex;
    justify-content: space-between;
    column-gap: 20px;
    @media (max-width: 767.98px) {
      flex-direction: column;
      row-gap: 30px;
      padding: 26px 0px 60px 0px;
    }
  }

  &__text-block {
    flex: 0 1 593px;
    @media (max-width: 767.98px) {
      flex: 1 1 auto;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    text-transform: uppercase;
    margin-bottom: 20px;
    @media (max-width: 767.98px) {
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 10px;
    }
    span {
      color: #432818;
    }
  }

  &__descr {
    font-weight: 400;
    font-size: 18px;
    line-height: 25px;
    @media (max-width: 767.98px) {
      font-size: 14px;
      line-height: 19px;
    }
    span {
      font-weight: 700;
    }
  }

  &__links-block {
    flex: none;
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    max-width: 320px;
    column-gap: 20px;
    position: relative;
    margin: 0px 40px 0px 0px;
    @media (max-width: 991.98px) {
    }
    @media (max-width: 767.98px) {
      align-self: center;
      margin: 0px 0px 0px 0px;
      max-width: none;
      justify-content: center;
      gap: 10px;
    }
  }

  &__links-title {
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    text-transform: uppercase;
    color: #333333;
    flex: 0 0 100%;
    align-self: flex-end;
    margin-bottom: 15px;
    text-align: center;
  }
  &__links-btns {
    display: flex;
    justify-content: space-between;
    column-gap: 10px;
  }
  &__links-item {
    display: block;
    flex: 0 0 147px;
  }
  &__link {
    max-height: 44px;
    width: 100%;
  }
  &__phone {
    position: absolute;
    bottom: calc(100% + 53px);
    left: 50%;
    transform: translateX(-50%);
    max-width: 275px;
    width: stretch;

    @media (max-width: 767.98px) {
      display: none;
      height: 330px;
    }
  }
}

.guide {
  color: var(--black);
  &__top {
    margin-bottom: 35px;
    @media (max-width: 576.98px) {
      margin-bottom: 50px;
    }
  }
  &__benefit {
    margin-bottom: 74px;
    @media (max-width: 576.98px) {
      margin-bottom: 50px;
    }
  }
  &__howstart {
  }
  &__mob-app {
  }
  &__download-app {
  }
}
</style>
