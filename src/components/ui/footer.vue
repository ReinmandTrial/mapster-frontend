<template>
  <footer class="footer">
    <div class="footer__main">
      <div class="container-xl">
        <div class="footer__content">
          <div class="footer__leftside">
            <div class="footer__block">
              <h3 class="footer__title">КОМПАНИЯ</h3>
              <div class="footer__list">
                <button type="button" class="footer__link">
                  Политика конфиденциальности
                </button>
                <button type="button" class="footer__link">
                  Информация о компании
                </button>
              </div>
            </div>
            <div class="footer__block footer__block--services">
              <h3 class="footer__title">СЕРВИСЫ</h3>
              <div class="footer__list">
                <button type="button" class="footer__link">
                  Войти / зарегистрироваться
                </button>
                <button type="button" class="footer__link">
                  Мобильное приложение
                </button>
              </div>
            </div>
          </div>
          <div class="footer__rightside">
            <div class="footer__socials">
              <h4 class="footer__socials-title">Батуми, ул Кобаладзе 6</h4>
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
}
</script>

<style lang="scss">
.footer {
  background: var(--black);
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
