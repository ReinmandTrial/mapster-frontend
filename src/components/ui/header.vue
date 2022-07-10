<template>
  <header
    class="header"
    :class="{ 'header-supplier': profile_mode == 'supplier' }"
    :style="{
      background: background_color,
    }"
  >
    <div class="container-xl">
      <div class="header__content">
        <router-link :to="{ name: 'ExcursionsHome' }" class="header__logo logo">
          <span class="logo__image">
            <img src="@/assets/images/logo.svg" alt="Logo" />
          </span>
          <span class="logo__text">
            <span class="logo__name">Mapster</span>
            <span class="logo__descr" v-html="changeLogoDescr"></span>
          </span>
        </router-link>
        <ul
          class="header__servises-nav"
          v-if="nav_visibility && profile_mode == 'client'"
        >
          <li class="header__servises-item">
            <button type="button" class="header__servises-link">
              <span class="icon icon-palm"></span>
              {{ $t('header.menu.tours') }}
            </button>
          </li>
          <li class="header__servises-item">
            <button type="button" class="header__servises-link">
              <span class="icon icon-plane"></span>
              {{ $t('header.menu.air') }}
            </button>
          </li>
          <li class="header__servises-item">
            <button type="button" class="header__servises-link">
              <span class="icon icon-bed"></span>
              {{ $t('header.menu.apartments') }}
            </button>
          </li>
          <li class="header__servises-item">
            <button type="button" class="header__servises-link active">
              <span class="icon icon-camera"></span>
              {{ $t('header.menu.excursions') }}
            </button>
          </li>
          <li class="header__servises-item">
            <button type="button" class="header__servises-link">
              <span class="icon icon-taxi"></span>
              {{ $t('header.menu.transfer') }}
            </button>
          </li>
        </ul>
        <ul
          class="header__servises-nav header__servises-nav--supplier"
          v-if="
            $route.name != 'GuideRegistration' &&
            profile_mode == 'supplier' &&
            nav_visibility
          "
        >
          <li class="header__servises-item">
            <router-link
              :to="{
                name: 'GuideMyExcursions',
              }"
              class="header__servises-link"
            >
              {{ $t('header.menu_guide.my_excursions') }}
            </router-link>
          </li>
          <li class="header__servises-item">
            <router-link
              :to="{ name: 'GuideOrders' }"
              class="header__servises-link"
            >
              {{ $t('header.menu_guide.orders') }}
            </router-link>
          </li>
          <li class="header__servises-item">
            <router-link
              :to="{ name: 'GuideBalance' }"
              class="header__servises-link"
            >
              {{ $t('header.menu_guide.balance') }}
            </router-link>
          </li>
        </ul>
        <div class="header__rightside">
          <div class="lang" :class="{ active: lang_open }">
            <button
              type="button"
              class="lang__head"
              @click="lang_open = !lang_open"
              v-click-outside="closeLang"
            >
              {{ $t('header.lang') }}
              <span class="lang__triangle icon icon-triangle-down"></span>
            </button>
            <div class="lang__body" v-if="lang_open">
              <button
                type="button"
                class="lang__item"
                v-for="(lang, index) in langs"
                :class="{ active: lang.active }"
                :key="index"
                @click="selectLang(lang)"
              >
                {{ lang.name }}
              </button>
            </div>
          </div>
          <button
            type="button"
            class="header__login"
            v-if="!$store.getters.getUser"
            @click.stop="openPopupSingIn"
          >
            {{ $t('header.login') }}
          </button>
          <div
            class="header__profile header-profile"
            :class="{ active: dropdown_open }"
            v-if="$store.getters.getUser"
            v-click-outside="closeDropdown"
          >
            <button
              class="header-profile__head"
              @click="dropdown_open = !dropdown_open"
            >
              <span class="header-profile__icon icon icon-person"></span>
              <span
                class="header-profile__triangle icon icon-triangle-down"
              ></span>
              <span class="header-profile__burger icon icon-burger"></span>
            </button>
            <div class="header-profile__body" v-if="dropdown_open">
              <div class="header-profile__body-block">
                <button type="button" class="header-profile__item">
                  <span class="header-profile__photo">
                    <span
                      v-if="$store.getters.getUser.photo[0]"
                      class="header-profile__photo-img"
                    >
                      <img
                        :src="
                          'data:image/' +
                          $store.getters.getUser.photo[0].extension.slice(1) +
                          ';base64,' +
                          $store.getters.getUser.photo[0].data
                        "
                        alt=""
                      />
                    </span>
                    <span
                      v-if="!$store.getters.getUser.photo[0]"
                      class="header-profile__item-icon icon icon-person"
                    ></span>
                  </span>
                  <span
                    class="header-profile__item-text"
                    v-if="$store.getters.getUser"
                  >
                    {{
                      $store.getters.getUser.first_name +
                        ' ' +
                        $store.getters.getUser.last_name &&
                      $store.getters.getUser.first_name
                    }}
                  </span>
                </button>
              </div>
              <div class="header-profile__body-block">
                <div class="header-profile__langs">
                  <button
                    type="button"
                    class="header-profile__lang"
                    v-for="(lang, index) in langs"
                    :class="{ active: lang.active }"
                    :key="index"
                    @click="selectLang(lang)"
                  >
                    {{ lang.name }}
                  </button>
                </div>
                <button
                  type="button"
                  class="header-profile__item"
                  v-if="profile_mode == 'client'"
                >
                  <span
                    class="header-profile__item-icon icon icon-distribute-vertical"
                  ></span>
                  <span class="header-profile__item-text">
                    {{ $t('excursions.client.header.profile.history') }}
                  </span>
                </button>
                <button
                  type="button"
                  class="header-profile__item"
                  v-if="profile_mode == 'supplier'"
                  @click="toAddExcursion"
                >
                  <span class="header-profile__item-icon icon icon-plus"></span>
                  <span class="header-profile__item-text">
                    {{ $t('excursions.guide.header.profile.add') }}
                  </span>
                </button>
                <button
                  type="button"
                  class="header-profile__item"
                  v-if="profile_mode == 'supplier'"
                  @click="toMyExcursions"
                >
                  <span
                    class="header-profile__item-icon icon icon-camera"
                  ></span>
                  <span class="header-profile__item-text">
                    {{ $t('excursions.guide.header.profile.my') }}
                  </span>
                </button>
                <button
                  type="button"
                  class="header-profile__item"
                  v-if="profile_mode == 'supplier'"
                  @click="toMyOrders"
                >
                  <span
                    class="header-profile__item-icon icon icon-distribute-vertical"
                  ></span>
                  <span class="header-profile__item-text">
                    {{ $t('excursions.guide.header.profile.orders') }}
                  </span>
                </button>
                <button
                  type="button"
                  class="header-profile__item"
                  v-if="profile_mode == 'supplier'"
                  @click="toBalance"
                >
                  <span class="header-profile__item-icon icon icon-euro"></span>
                  <span class="header-profile__item-text">
                    {{ $t('excursions.guide.header.profile.balance') }}
                  </span>
                </button>
                <button
                  type="button"
                  class="header-profile__item"
                  v-if="profile_mode == 'client'"
                  @click="toGuideHome"
                >
                  <span
                    class="header-profile__item-icon icon icon-person"
                  ></span>
                  <span class="header-profile__item-text">
                    {{ $t('excursions.client.header.profile.to_guide') }}
                  </span>
                </button>
                <button
                  type="button"
                  class="header-profile__item"
                  v-if="profile_mode == 'supplier'"
                  @click="toClientHome"
                >
                  <span
                    class="header-profile__item-icon icon icon-person"
                  ></span>
                  <span class="header-profile__item-text">
                    {{ $t('excursions.guide.header.profile.to_client') }}
                  </span>
                </button>
                <button
                  type="button"
                  class="header-profile__item"
                  @click="toProfile"
                >
                  <span
                    class="header-profile__item-icon icon icon-settings"
                  ></span>
                  <span class="header-profile__item-text">
                    {{ $t('excursions.client.header.profile.edit') }}
                  </span>
                </button>
              </div>
              <div class="header-profile__body-block">
                <button
                  type="button"
                  class="header-profile__item"
                  @click="logoutHandler"
                >
                  <span class="header-profile__item-icon icon icon-exit"></span>
                  <span class="header-profile__item-text">
                    {{ $t('excursions.client.header.profile.exit') }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import axiosConfig from '../../api/instance'

export default {
  name: 'VHeader',
  data() {
    return {
      background_color: null,
      profile_mode: 'client',
      nav_visibility: true,
      profile: {
        photo: null,
        // null,
        name: null,
      },
      lang_open: false,
      dropdown_open: false,
      // current_lang: this.$t('header.lang'),
      current_lang: 'РУС',
      langs: [
        {
          name: 'РУС',
          value: 'ru',
          active: true,
        },
        {
          name: 'ENG',
          value: 'en',
          active: false,
        },
      ],
    }
  },
  computed: {
    // findProfilePhoto() {
    //   if (this.$store.getters.getUser.photo) {
    //   }
    // },
    changeLogoDescr() {
      if (this.profile_mode == 'client') {
        return this.$t('excursions.client.header.logo_descr')
      } else if (this.profile_mode == 'supplier') {
        return this.$t('excursions.guide.header.logo_descr')
      } else {
        return ''
      }
    },
  },
  watch: {
    $route: function () {
      this.changeHeader()
    },
    profile_mode: function () {
      if (this.$route.name == 'GuideRegistration') {
        this.nav_visibility = false
      } else {
        this.nav_visibility = true
      }
    },
  },
  methods: {
    toClientHome() {
      this.$router.push({ name: `ExcursionsHome` })
      this.dropdown_open = false
    },
    toGuideHome() {
      this.$router.push({ name: `GuideMyExcursions` })
      this.dropdown_open = false
    },
    toMyExcursions() {
      this.$router.push({ name: `GuideMyExcursions` })
      this.dropdown_open = false
    },
    toAddExcursion() {
      this.$router.push({ name: `GuideAddExcursion` })
      this.dropdown_open = false
    },
    toMyOrders() {
      this.$router.push({ name: `GuideOrders` })
      this.dropdown_open = false
    },
    toBalance() {
      this.$router.push({ name: 'GuideBalance' })
      this.dropdown_open = false
    },
    toProfile() {
      if (this.profile_mode == 'supplier') {
        this.$router.push({ name: `GuideProfile` })
      } else {
        // this.$router.push({ name: `GuideProfile` })
      }
      this.dropdown_open = false
    },
    changeHeader() {
      if (this.$route.name == 'ExcursionsHome') {
        this.profile_mode = 'client'
        this.background_color = 'rgba(0, 0, 0, 0.5)'
        if (window.innerWidth < 768) {
          this.background_color = '#023047'
        }
      } else if (this.$route.name == 'ExcursionsCountry') {
        this.profile_mode = 'client'
        this.background_color = 'rgba(0, 0, 0, 0.5)'
        if (window.innerWidth < 768) {
          this.background_color = '#023047'
        }
      } else if (this.$route.name == 'ExcursionsTown') {
        this.profile_mode = 'client'
        this.background_color = 'rgba(0, 0, 0, 0.5)'
        if (window.innerWidth < 768) {
          this.background_color = '#023047'
        }
      } else if (this.$route.name == 'ExcursionPage') {
        this.profile_mode = 'client'
        this.background_color = 'rgba(0, 0, 0, 0.5)'
        if (window.innerWidth < 768) {
          this.background_color = '#023047'
        }
      } else if (this.$route.name == 'GuidePreviewExcursion') {
        this.profile_mode = 'supplier'
        this.background_color = 'rgba(0, 0, 0, 0.5)'
        if (window.innerWidth < 768) {
          this.background_color = '#023047'
        }
      } else if (this.$route.name == 'BookingData') {
        this.profile_mode = 'client'
        this.background_color = 'var(--black)'
        if (window.innerWidth < 768) {
          this.background_color = '#023047'
        }
      } else if (this.$route.name == 'PaymentExcursion') {
        this.profile_mode = 'client'
        this.background_color = 'var(--black)'
        if (window.innerWidth < 768) {
          this.background_color = '#023047'
        }
      } else if (this.$route.name == 'ThankYou') {
        this.profile_mode = 'client'
        this.background_color = 'var(--black)'
        if (window.innerWidth < 768) {
          this.background_color = '#023047'
        }
      } else if (this.$route.name == 'GuideMyExcursions') {
        this.profile_mode = 'supplier'
        this.background_color = 'var(--black)'
      } else if (this.$route.name == 'GuideRegistration') {
        this.profile_mode = 'supplier'
        this.background_color = 'transparent'
        if (window.innerWidth < 768) {
          this.background_color = 'var(--black)'
        }
      } else if (this.$route.name == 'GuideAddExcursion') {
        this.profile_mode = 'supplier'
        this.background_color = 'var(--black)'
        if (window.innerWidth < 768) {
          this.background_color = 'var(--black)'
        }
      } else if (this.$route.name == 'GuideOrders') {
        this.profile_mode = 'supplier'
        this.background_color = 'var(--black)'
        if (window.innerWidth < 768) {
          this.background_color = 'var(--black)'
        }
      } else if (this.$route.name == 'GuideBalance') {
        this.profile_mode = 'supplier'
        this.background_color = 'var(--black)'
        if (window.innerWidth < 768) {
          this.background_color = 'var(--black)'
        }
      } else if (this.$route.name == 'GuideProfile') {
        this.profile_mode = 'supplier'
        this.background_color = 'var(--black)'
        if (window.innerWidth < 768) {
          this.background_color = 'var(--black)'
        }
      } else if (this.$route.name == 'GuideProfileEdit') {
        this.profile_mode = 'supplier'
        this.background_color = 'var(--black)'
        if (window.innerWidth < 768) {
          this.background_color = 'var(--black)'
        }
      }
    },
    logoutHandler() {
      this.$store.dispatch('deleteUser')
      localStorage.removeItem('user')
      localStorage.removeItem('ref')
      axiosConfig.defaults.headers.common['Authorization'] = ''
      window.location.reload()
    },
    openPopupSingIn() {
      this.$store.dispatch('popupSignIn', true)
    },
    closeDropdown() {
      this.dropdown_open = false
    },
    closeLang() {
      this.lang_open = false
    },
    selectLang(el) {
      this.langs.forEach((element) => {
        element.active = false
      })
      el.active = true
      this.current_lang = el.name
      // this.$i18n.locale = el.value
      localStorage.setItem('lang', el.value)
      window.location.reload()
    },
  },
  mounted() {
    // console.log(this.$store.getters.getUser)
    this.changeHeader()
    if (localStorage.getItem('lang') == 'ru') {
      this.langs[0].active = true
      this.langs[1].active = false
    } else {
      this.langs[0].active = false
      this.langs[1].active = true
    }
    if (this.$route.name == 'GuideRegistration') {
      this.nav_visibility = false
    } else {
      this.nav_visibility = true
    }
  },
  directives: {
    ClickOutside,
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  z-index: 20;
  height: 136px;
  background: rgba(0, 0, 0, 0.5);
  @media (max-width: 767.98px) {
    background: #023047;
  }
  @media (max-width: 575.98px) {
    height: 123px;
  }
  &.header-supplier {
    @media (max-width: 1099.98px) {
      height: 100px;
    }
    @media (max-width: 575.98px) {
      height: 80px;
    }
  }
  &__content {
    height: 100%;
    display: flex;
    column-gap: 46px;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 1099.98px) {
      flex-wrap: wrap;
    }
  }

  &__logo {
  }

  &__servises-nav {
    display: flex;
    align-items: center;
    column-gap: 23px;
    margin-right: auto;

    @media (max-width: 1099.98px) {
      width: calc(100% + 50px);
      order: 3;
      margin-left: -25px;
      margin-right: -25px;
      overflow-x: auto;
      margin-bottom: -20px;
      padding-bottom: 20px;
    }
    &--supplier {
      @media (max-width: 1099.98px) {
        display: none;
      }
    }
  }

  &__servises-item {
    &:not(:first-child) {
      position: relative;
      &::before {
        content: '';
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        right: calc(100% + (23px / 2));
        width: 1px;
        height: 23px;
        background: var(--white);
      }
    }
    @media (max-width: 1099.98px) {
      &:first-child {
        padding-left: 25px;
      }
      &:last-child {
        padding-right: 25px;
      }
    }
  }

  &__servises-link {
    font-size: 18px;
    line-height: 20px;
    color: var(--white);
    letter-spacing: 0.4px;
    display: flex;
    align-items: center;
    column-gap: 4px;
    @media (max-width: 575.98px) {
      font-size: 16px;
    }
    .icon {
      transform: translateY(-7%);
      @media (max-width: 575.98px) {
        transform: translateY(-2%);
      }
      @media (min-width: 1100px) {
        display: none;
      }
    }
    .icon-palm {
      font-size: 18px;
    }
    .icon-plane,
    .icon-bed,
    .icon-taxi,
    .icon-camera {
      font-size: 16px;
    }
    &.active {
      font-weight: bold;
    }
  }
  &__rightside {
    display: flex;
    align-items: center;
  }
  &__profile {
  }
  &__login {
    // padding: 5px;
    font-weight: 600;
    letter-spacing: 0.4px;
    color: var(--white);
  }
}
.logo {
  display: flex;
  align-items: center;
  column-gap: 11px;
  width: max-content;
  flex: none;
  color: var(--white);
  @media (max-width: 575.98px) {
    column-gap: 6px;
  }
  &__image {
    width: 40px;
    height: 40px;
    flex: none;
    @media (max-width: 575.98px) {
      width: 32px;
      height: 32px;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__name {
    font-weight: 600;
    font-size: 24px;
    letter-spacing: 0.4px;
    margin-bottom: 1px;
    @media (max-width: 575.98px) {
      font-size: 18px;
    }
  }

  &__descr {
    font-weight: 600;
    letter-spacing: 0.4px;
    font-size: 12px;
    @media (max-width: 575.98px) {
      display: none;
    }
  }
}
.lang {
  margin-right: 15px;
  position: relative;
  @media (max-width: 991.98px) {
    display: none;
  }
  &.active {
    .lang__triangle {
      transform: rotate(-180deg);
    }
  }
  &__head {
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 0.4px;
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 4px;
  }
  &__triangle {
  }

  &__body {
    padding: 5px 0;
    position: absolute;
    top: calc(100% + 15px);
    left: 50%;
    transform: translateX(-50%);
    background: var(--white);
    min-width: 80px;
    border-radius: 5px;
    &::before {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 18px;
      border: 9px solid var(--white);
      border-top: 9px solid transparent;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
    }
  }

  &__item {
    padding: 7px 15px;
    display: block;
    width: 100%;
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 0.4px;
    &.active {
      color: var(--gray);
    }
  }
}

.header-profile {
  position: relative;
  &.active {
    .header-profile__triangle {
      transform: rotate(-180deg);
    }
  }
  &__head {
    padding: 7px 7px 7px 8px;
    display: flex;
    align-items: center;
    column-gap: 9px;
    border: 1px solid var(--white);
    border-radius: 8px;
    color: var(--white);
    @media (max-width: 575.98px) {
      padding: 0 5px 0 6px;
      column-gap: 4px;
      border-radius: 5px;
    }
    @media (max-width: 991.98px) {
      padding: 0;
      border: 0;
    }
  }
  &__photo {
  }
  &__photo-img {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__icon {
    font-size: 17px;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--white);
    @media (max-width: 575.98px) {
      width: unset;
      height: unset;
      font-size: 14px;
      border: none;
    }
    @media (max-width: 991.98px) {
      display: none;
    }
  }

  &__triangle {
    @media (max-width: 575.98px) {
      font-size: 21px;
    }
    @media (max-width: 991.98px) {
      display: none;
    }
  }
  &__burger {
    @media (min-width: 992px) {
      display: none;
    }
  }

  &__body {
    z-index: 30;
    position: absolute;
    top: calc(100% + 5px);
    right: 0;
    background: var(--white);
    border-radius: 8px;
    width: 254px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  }
  &__langs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px 34px;
    padding: 12px 12px 8px;
    @media (min-width: 992px) {
      display: none;
    }
  }
  &__lang {
    font-size: 14px;
    font-weight: bold;
    &.active {
      font-weight: normal;
      color: var(--gray);
    }
  }

  &__body-block {
    &:not(:last-child) {
      padding-bottom: 1px;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 7px;
        right: 7px;
        height: 1px;
        background: var(--gray);
      }
    }
  }

  &__item {
    padding: 8px;
    width: 100%;
    display: flex;
    text-align: left;
    align-items: center;
    column-gap: 6px;
  }

  &__item-icon {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.icon-distribute-vertical {
      font-size: 16px;
    }
    &.icon-exit {
      font-size: 15px;
    }
    &.icon-camera {
      font-size: 18px;
    }
  }

  &__item-text {
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.4px;
  }
}
</style>
