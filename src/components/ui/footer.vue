<template>
  <footer
    class="footer"
    :class="{
      supplier: profile_mode == 'supplier',
    }"
  >
    <div class="footer__main">
      <div class="container-xl">
        <div class="footer__content">
          <div class="footer__leftside">
            <div class="footer__block">
              <h3 class="footer__title">
                {{ $t('footer.company') }}
              </h3>
              <div class="footer__list">
                <button type="button" class="footer__link">
                  {{ $t('footer.privacy_policy') }}
                </button>
                <button type="button" class="footer__link">
                  {{ $t('footer.info_company') }}
                </button>
              </div>
            </div>
            <div class="footer__block footer__block--services">
              <h3 class="footer__title">{{ $t('footer.services') }}</h3>
              <div class="footer__list">
                <button
                  v-if="!$store.getters.getUser"
                  type="button"
                  class="footer__link"
                  @click.stop="openPopupSingIn"
                >
                  {{ $t('footer.login') }}
                </button>
                <button type="button" class="footer__link">
                  {{ $t('footer.app') }}
                </button>
              </div>
            </div>
          </div>
          <div class="footer__rightside">
            <div class="footer__socials">
              <h4 class="footer__socials-title">{{ $t('footer.adress') }}</h4>
              <div class="footer__socials-items">
                <a href="#" class="footer__socials-link icon icon-facebook"></a>
                <a href="#" class="footer__socials-link icon icon-inst"></a>
                <a href="#" class="footer__socials-link icon icon-youtube"></a>
              </div>
            </div>
            <div class="footer__apps footer__apps--mobile">
              <a href="#" class="footer__app">
                <img src="@/assets/images/gplay.svg" alt="" />
              </a>
              <a href="#" class="footer__app">
                <img src="@/assets/images/appstore.svg" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container-xl">
        <div class="footer__bottom-content">
          <p class="footer__rights">
            © 2022 All Right Reserved Meta Mapster | Design by
            <a href="#">Artur Kirakosyan</a>
          </p>
          <div class="footer__apps footer__apps--desktop">
            <a href="#" class="footer__app">
              <img src="@/assets/images/gplay.svg" alt="" />
            </a>
            <a href="#" class="footer__app">
              <img src="@/assets/images/appstore.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'VFooter',
  data() {
    return {
      profile_mode: null,
    }
  },
  watch: {
    $route: function () {
      this.changeHeader()
    },
  },
  methods: {
    openPopupSingIn() {
      this.$store.dispatch('popupSignIn', true)
    },
    changeHeader() {
      if (this.$route.name == 'ExcursionsHome') {
        this.profile_mode = 'client'
      } else if (this.$route.name == 'ExcursionsCountry') {
        this.profile_mode = 'client'
      } else if (this.$route.name == 'ExcursionsTown') {
        this.profile_mode = 'client'
      } else if (this.$route.name == 'ExcursionPage') {
        this.profile_mode = 'client'
      } else if (this.$route.name == 'BookingData') {
        this.profile_mode = 'client'
      } else if (this.$route.name == 'PaymentExcursion') {
        this.profile_mode = 'client'
      } else if (this.$route.name == 'ThankYou') {
        this.profile_mode = 'client'
      } else if (this.$route.name == 'GuideMyExcursions') {
        this.profile_mode = 'supplier'
      } else if (this.$route.name == 'GuideRegistration') {
        this.profile_mode = 'supplier'
      }
    },
  },
  mounted() {
    this.changeHeader()
  },
}
</script>

<style lang="scss">
.footer {
  background: var(--black);

  &.supplier {
    @media (max-width: 991.98px) {
      .footer__main {
        background: var(--light-green);
      }
      .footer__title,
      .footer__link,
      .footer__socials-title,
      .footer__socials-link {
        color: var(--black);
      }
    }
  }
  &__main {
    background: var(--black);
    @media (max-width: 991.98px) {
      background: #023047;
    }
  }

  &__content {
    padding: 63px 0 23px;
    display: flex;
    justify-content: space-between;
    column-gap: 50px;
    @media (max-width: 991.98px) {
      flex-direction: column;
    }
    @media (max-width: 575.98px) {
      padding: 25px 0 10px;
    }
  }

  &__leftside {
    display: flex;
    column-gap: 90px;
    row-gap: 30px;
    flex-wrap: wrap;
    @media (max-width: 991.98px) {
      // flex-direction: column;
    }
  }

  &__block {
    &--services {
      @media (max-width: 575.98px) {
        display: none;
      }
    }
  }

  &__title {
    margin-bottom: 24px;
    color: var(--light-green);
    font-weight: 700;
    font-size: 18px;
    @media (max-width: 575.98px) {
      display: none;
    }
  }

  &__list {
  }

  &__link {
    color: var(--white);
    line-height: 140%;
    display: block;
    text-align: left;
  }

  &__rightside {
    margin-left: auto;
    flex: none;
    @media (max-width: 991.98px) {
      margin-left: unset;
    }
    @media (max-width: 575.98px) {
      align-self: flex-start;
    }
  }

  &__socials {
    margin-top: 70px;
    @media (max-width: 991.98px) {
      margin-top: 55px;
    }
  }

  &__socials-title {
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.4px;
    margin-bottom: 17px;
    color: var(--white);
    @media (max-width: 575.98px) {
      font-size: 12px;
      margin-bottom: 10px;
    }
  }

  &__socials-items {
    display: flex;
    column-gap: 20px;
    justify-content: flex-end;
    @media (max-width: 991.98px) {
      justify-content: flex-start;
    }
    @media (max-width: 575.98px) {
      column-gap: 15px;
    }
  }

  &__socials-link {
    font-size: 35px;
    color: var(--light-green);
  }

  &__bottom {
    background: var(--black);
    @media (max-width: 575.98px) {
      .container-xl {
        padding: 0 10px;
      }
    }
  }

  &__bottom-content {
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__rights {
    font-size: 14px;
    color: var(--white);
    letter-spacing: 0.04em;
    @media (max-width: 991.98px) {
      text-align: center;
      width: 100%;
    }
    @media (max-width: 575.98px) {
      font-size: 10px;
    }
  }

  &__apps {
    display: flex;
    column-gap: 15px;
    align-items: center;
    &--mobile {
      margin-top: 30px;
      @media (min-width: 992px) {
        display: none;
      }
    }
    @media (max-width: 991.98px) {
      &--desktop {
        display: none;
      }
    }
  }

  &__app {
    flex: none;
  }
}
</style>
