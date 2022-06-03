<template>
  <header class="header">
    <div class="container-xl">
      <div class="header__content">
        <button type="button" class="header__logo logo">
          <span class="logo__image">
            <img src="@/assets/images/logo.svg" alt="Logo" />
          </span>
          <span class="logo__text">
            <span class="logo__name">Mapster</span>
            <span class="logo__descr">
              {{ $t('excursions.client.header.logo_descr') }}
            </span>
          </span>
        </button>
        <ul class="header__servises-nav">
          <li class="header__servises-item">
            <button type="button" class="header__servises-link">
              <span class="icon icon-palm"></span>
              ТУРЫ
            </button>
          </li>
          <li class="header__servises-item">
            <button type="button" class="header__servises-link">
              <span class="icon icon-plane"></span>
              АВИАБИЛЕТЫ
            </button>
          </li>
          <li class="header__servises-item">
            <button type="button" class="header__servises-link">
              <span class="icon icon-bed"></span>
              ЖИЛЬЕ
            </button>
          </li>
          <li class="header__servises-item">
            <button type="button" class="header__servises-link active">
              <span class="icon icon-camera"></span>
              ЭКСКУРСИИ
            </button>
          </li>
          <li class="header__servises-item">
            <button type="button" class="header__servises-link">
              <span class="icon icon-taxi"></span>
              ТРАНСФЕР
            </button>
          </li>
        </ul>

        <div class="lang" :class="{ active: lang_open }">
          <button
            type="button"
            class="lang__head"
            @click="lang_open = !lang_open"
            v-click-outside="closeLang"
          >
            {{ current_lang }}
            <span class="lang__triangle icon icon-triangle-down"></span>
          </button>
          <div class="lang__body" v-if="lang_open">
            <button
              type="button"
              class="lang__item"
              v-for="(lang, index) in langs"
              :key="index"
              @click="selectLang"
            >
              {{ lang.name }}
            </button>
          </div>
        </div>
        <div
          class="header__profile header-profile"
          :class="{ active: dropdown_open }"
        >
          <button
            class="header-profile__head"
            @click="dropdown_open = !dropdown_open"
            v-click-outside="closeDropdown"
          >
            <span class="header-profile__icon icon icon-person"></span>
            <span
              class="header-profile__triangle icon icon-triangle-down"
            ></span>
          </button>
          <div class="header-profile__body" v-if="dropdown_open">
            <div class="header-profile__body-block">
              <button type="button" class="header-profile__item">
                <span class="header-profile__item-icon icon icon-person"></span>
                <span class="header-profile__item-text">Петр Иванов</span>
              </button>
            </div>
            <div class="header-profile__body-block">
              <button type="button" class="header-profile__item">
                <span
                  class="header-profile__item-icon icon icon-distribute-vertical"
                ></span>
                <span class="header-profile__item-text">
                  История бронирований
                </span>
              </button>
              <button type="button" class="header-profile__item">
                <span
                  class="header-profile__item-icon icon icon-settings"
                ></span>
                <span class="header-profile__item-text">
                  Редактировать профиль
                </span>
              </button>
            </div>
            <div class="header-profile__body-block">
              <button type="button" class="header-profile__item">
                <span class="header-profile__item-icon icon icon-exit"></span>
                <span class="header-profile__item-text">Выход</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import ClickOutside from 'vue-click-outside'
export default {
  name: 'VHeader',
  data() {
    return {
      lang_open: false,
      dropdown_open: false,
      current_lang: this.$t('header.lang'),
      langs: [
        {
          name: 'РУС',
          active: true,
        },
        {
          name: 'ENG',
          active: true,
        },
      ],
    }
  },
  methods: {
    closeDropdown() {
      this.dropdown_open = false
    },
    closeLang() {
      this.lang_open = false
    },
    selectLang() {},
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
  &__content {
    height: 100%;
    display: flex;
    column-gap: 46px;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 1023.98px) {
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

    @media (max-width: 1023.98px) {
      width: calc(100% + 50px);
      order: 3;
      margin-left: -25px;
      margin-right: -25px;
      overflow-x: auto;
      margin-bottom: -20px;
      padding-bottom: 20px;
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
    @media (max-width: 1023.98px) {
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
      @media (min-width: 1024px) {
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

  &__profile {
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
  }

  &__triangle {
    @media (max-width: 575.98px) {
      font-size: 21px;
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
  }

  &__item-text {
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.4px;
  }
}
</style>
