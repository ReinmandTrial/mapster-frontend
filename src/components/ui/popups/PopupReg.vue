<template>
  <div class="popup">
    <div class="popup__body">
      <form
        @submit.prevent="validate"
        class="popup__content"
        v-click-outside="emitClose"
      >
        <h2 class="popup__title">{{ $t('popups.reg.title') }}</h2>
        <div class="popup__inputs">
          <div class="popup__input input-popup">
            <h4 class="input-popup__title">
              {{ $t('popups.reg.input_name.title') }}
            </h4>
            <input
              type="text"
              class="input-popup__input"
              v-model.trim="name"
              :placeholder="$t('popups.reg.input_name.placeholder')"
            />
          </div>
          <div class="popup__input input-popup">
            <h4 class="input-popup__title">
              {{ $t('popups.reg.input_email.title') }}
            </h4>
            <input
              type="email"
              class="input-popup__input"
              v-model.trim="email"
              :placeholder="$t('popups.reg.input_email.placeholder')"
            />
          </div>
          <div class="popup__input input-popup">
            <h4 class="input-popup__title">
              {{ $t('popups.reg.input_pass.title') }}
            </h4>
            <input
              v-model="password"
              type="password"
              class="input-popup__input"
              :placeholder="$t('popups.reg.input_pass.placeholder')"
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
        <p class="popup__error" v-if="errors.name.null">
          {{ $t('errors.inputs.name') }}
        </p>
        <p class="popup__error" v-if="errors.email.null">
          {{ $t('errors.inputs.email.null') }}
        </p>
        <p class="popup__error" v-if="errors.email.wrong">
          {{ $t('errors.inputs.email.wrong') }}
        </p>
        <p class="popup__error" v-if="errors.password">
          {{ $t('errors.login.password') }}
        </p>
        <p class="popup__error" v-if="errors.unknown_request">
          {{ $t('errors.unknown_request2') }}
        </p>
        <p class="popup__success" v-if="success_reg">
          {{ $t('success.reg') }}
        </p>
        <button type="submit" class="popup__btn">
          {{ $t('popups.reg.btn') }}
        </button>
        <help-info
          :color_style="'green'"
          :icon_style="'black'"
          class="popup__info"
        >
          {{ $t('popups.reg.info.text1') }}
          <br />
          {{ $t('popups.reg.info.text2') }}
          <button
            type="button"
            class="popup__info-btn"
            @click.stop="emitOpenSingIn"
          >
            {{ $t('popups.reg.info.login') }}
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
  name: 'PopupReg',
  components: {
    HelpInfo,
    VueRecaptcha,
  },
  directives: {
    ClickOutside,
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errors: {
        name: false,
        email: {
          null: false,
          wrong: false,
        },
        password: false,
        unknown_request: false,
      },
      success_reg: false,
      sitekey: '6LcfRowgAAAAAJ17IBWsDRjaB-tyPxzEmXQ13RQB',
    }
  },
  methods: {
    onCaptchaExpired() {
      this.$refs.recaptcha.reset()
    },
    async register(recaptchaToken) {
      console.log(recaptchaToken)

      this.token = recaptchaToken
      await axiosConfig
        .post(`/user/register/user`, {
          first_name: this.name,
          email: this.email,
          token: this.token,
          credetinal: {
            type: 1,
            login: this.email,
            password: this.password,
            token: '',
          },
        })
        .then((response) => {
          // console.log(response.data)
          this.success_reg = true
          setTimeout(() => {
            this.$store.dispatch('setUser', response.data.data[0])
            localStorage.setItem('user', JSON.stringify(response.data.data[0]))
            localStorage.setItem('ref', response.data.data[0].session.ref)
            axiosConfig.defaults.headers.common['Authorization'] =
              response.data.data[0].session.ref

            this.$store.dispatch('popupReg', false)
            window.location.reload()
          }, 1000)
          // asd
        })
        .catch((error) => {
          console.log(error)
          this.errors.unknown_request = true
        })
    },
    validate() {
      this.token = null
      this.errors.name = false
      this.errors.email.null = false
      this.errors.email.wrong = false
      this.errors.password = false
      this.success_reg = false
      this.errors.unknown_request = false

      if (this.name == '') {
        this.errors.name = true
        return false
      }
      function validateEmail(email) {
        const re = /\S+@\S+\.\S+/
        return re.test(email)
      }

      if (this.email) {
        if (!validateEmail(this.email)) {
          this.errors.email.wrong = true
          return false
        }
      } else {
        this.errors.email.null = true
        return false
      }

      if (this.password == '') {
        this.errors.password = true
        return false
      }
      this.$refs.recaptcha.execute()
    },
    emitOpenSingIn() {
      this.$store.dispatch('popupSignIn', true)
      this.$store.dispatch('popupReg', false)
    },
    emitClose() {
      this.$store.dispatch('popupReg', false)
    },
  },
}
</script>

<style lang="scss"></style>
