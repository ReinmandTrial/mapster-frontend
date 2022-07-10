<template>
  <div class="popup">
    <div class="popup__body">
      <form
        @submit.prevent="validate"
        class="popup__content"
        v-click-outside="emitClose"
      >
        <h2 class="popup__title">{{ $t('popups.pass_recovery.title') }}</h2>
        <div class="popup__inputs">
          <div class="popup__input input-popup">
            <h4 class="input-popup__title">
              {{ $t('popups.pass_recovery.input_email.title') }}
            </h4>
            <input
              v-model="email"
              type="text"
              class="input-popup__input"
              :placeholder="$t('popups.pass_recovery.input_email.placeholder')"
            />
          </div>
        </div>
        <vue-recaptcha
          ref="recaptcha"
          size="invisible"
          sitekey="6LcfRowgAAAAAJ17IBWsDRjaB-tyPxzEmXQ13RQB"
          @verify="register"
          @expired="onCaptchaExpired"
        />
        <p class="popup__error" v-if="error.null">
          {{ $t('errors.inputs.email.null') }}
        </p>
        <p class="popup__error" v-if="error.wrong">
          {{ $t('errors.inputs.email.wrong') }}
        </p>
        <p class="popup__error" v-if="error.unknown_request">
          {{ $t('errors.unknown_request') }}
        </p>
        <button type="submit" class="popup__btn">
          {{ $t('popups.pass_recovery.btn') }}
        </button>
        <help-info
          :color_style="'green'"
          :icon_style="'black'"
          class="popup__info"
        >
          {{ $t('popups.pass_recovery.info.text1') }}
          <button
            type="button"
            class="popup__info-btn"
            @click.stop="openSingIn()"
          >
            {{ $t('popups.pass_recovery.info.login') }}
          </button>
        </help-info>
      </form>
    </div>
  </div>
</template>

<script
  src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit"
  async
  defer
></script>
<script>
import axiosConfig from '../../../api/instance'
import HelpInfo from '../HelpInfo.vue'
import ClickOutside from 'vue-click-outside'
import { VueRecaptcha } from 'vue-recaptcha'

export default {
  name: 'PopupPassRecovery',
  components: {
    HelpInfo,
    VueRecaptcha,
  },
  directives: {
    ClickOutside,
  },
  data() {
    return {
      email: 'sanyok.vergun2@gmail.com',
      error: {
        unknown_request: false,
        wrong: false,
        null: false,
      },
      token: '',
      sitekey: '6LcfRowgAAAAAJ17IBWsDRjaB-tyPxzEmXQ13RQB',
    }
  },
  methods: {
    onCaptchaExpired() {
      this.$refs.recaptcha.reset()
    },
    async register(recaptchaToken) {
      // console.log(recaptchaToken)

      this.token = recaptchaToken
      var host = document.location.protocol + '//' + document.location.host
      await axiosConfig
        .post(`/user/password/reset`, {
          email: this.email,
          url: host + '/pass_recovery/',
          token: this.token,
        })
        .then((response) => {
          // console.log(response.data.data[0].token)

          // console.log(response.data)

          this.emitClose()
          this.$emit('openCodeWaiting')
        })
        .catch((error) => {
          console.log(error)
          this.error.unknown_request = true
        })
    },
    async validate() {
      this.error.null = false
      this.error.wrong = false

      function validateEmail(email) {
        const re = /\S+@\S+\.\S+/
        return re.test(email)
      }

      if (this.email) {
        if (!validateEmail(this.email)) {
          this.error.wrong = true
          return false
        }
      } else {
        this.error.null = true
        return false
      }
      this.$refs.recaptcha.execute()
    },
    openSingIn() {
      this.emitClose()
      this.$store.dispatch('popupSignIn', true)
    },
    emitClose() {
      this.$emit('closePopup')
    },
  },
}
</script>

<style lang="scss"></style>
