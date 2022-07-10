<template>
  <div class="popup">
    <div class="popup__body">
      <form class="popup__content" v-click-outside.stop="emitClose">
        <h2 class="popup__title">{{ $t('popups.sing_in.title') }}</h2>
        <div class="popup__inputs">
          <div class="popup__input input-popup">
            <h4 class="input-popup__title">
              {{ $t('popups.sing_in.input_login.title') }}
            </h4>
            <input
              v-model="username"
              type="email"
              class="input-popup__input"
              :placeholder="$t('popups.sing_in.input_login.placeholder')"
            />
          </div>
          <div class="popup__input input-popup">
            <h4 class="input-popup__title">
              {{ $t('popups.sing_in.input_pass.title') }}
            </h4>
            <input
              v-model="password"
              type="password"
              class="input-popup__input"
              :placeholder="$t('popups.sing_in.input_pass.placeholder')"
            />
          </div>
        </div>
        <p class="popup__error" v-if="errors.username.null">
          {{ $t('errors.inputs.email.null') }}
        </p>
        <p class="popup__error" v-if="errors.username.wrong">
          {{ $t('errors.inputs.email.wrong') }}
        </p>
        <p class="popup__error" v-if="errors.password">
          {{ $t('errors.login.password') }}
        </p>
        <p class="popup__error" v-if="errors.unknown_request">
          {{ $t('errors.unknown_request2') }}
        </p>
        <button type="submit" @click.prevent="sendForm" class="popup__btn">
          {{ $t('popups.sing_in.btn') }}
        </button>
        <help-info
          :color_style="'green'"
          :icon_style="'black'"
          class="popup__info"
        >
          {{ $t('popups.sing_in.info.text1') }}
          <br />
          {{ $t('popups.sing_in.info.text2') }}
          <button
            type="button"
            class="popup__info-btn"
            @click.stop="emitOpenReg"
          >
            {{ $t('popups.sing_in.info.reg') }}
          </button>
        </help-info>
        <div class="popup__flex-row">
          <label class="popup__check-block">
            <span class="popup__check-box">
              <input
                type="checkbox"
                class="popup__check-none"
                v-model="remember_me"
              />
              <span class="popup__check-style"></span>
            </span>
            <span class="popup__check-text">
              {{ $t('popups.sing_in.remember_me') }}
            </span>
          </label>
          <button
            type="button"
            class="popup__forget-pass"
            @click.stop="emitForgetPass"
          >
            {{ $t('popups.sing_in.forget_pass') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axiosConfig from '../../../api/instance'
import HelpInfo from '../HelpInfo.vue'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'PopupSignIn',
  components: {
    HelpInfo,
  },
  directives: {
    ClickOutside,
  },
  data() {
    return {
      username: 'sanyok.vergun2@gmail.com',
      password: '12345',
      remember_me: false,
      errors: {
        username: {
          null: false,
          wrong: false,
        },
        password: false,
        unknown_request: false,
      },
    }
  },
  methods: {
    async sendForm() {
      var arr = []
      this.errors.username.null = false
      this.errors.username.wrong = false

      function validateEmail(email) {
        const re = /\S+@\S+\.\S+/
        return re.test(email)
      }

      if (this.username) {
        if (validateEmail(this.username)) {
          arr.login = this.username
        } else {
          this.errors.username.wrong = true
          return false
        }
      } else {
        this.errors.username.null = true
        return false
      }

      this.errors.password = false

      if (this.password != '') {
        arr.password = this.password
      } else {
        this.errors.password = true
        return false
      }

      await axiosConfig
        .post(`/user/login`, {
          login: arr.login,
          password: arr.password,
        })
        .then((response) => {
          this.$store.dispatch('setUser', response.data.data[0])
          localStorage.setItem('user', JSON.stringify(response.data.data[0]))
          localStorage.setItem('ref', response.data.data[0].session.ref)
          axiosConfig.defaults.headers.common['Authorization'] =
            response.data.data[0].session.ref

          this.$emit('closePopup')
          window.location.reload()

          // asd
        })
        .catch((error) => {
          console.log(error)
          this.errors.unknown_request = true
        })
    },
    emitClose() {
      this.$store.dispatch('popupSignIn', false)
    },
    emitOpenReg() {
      // console.log('close')
      this.$store.dispatch('popupReg', true)
      this.$store.dispatch('popupSignIn', false)
      // console.log('forget')
    },
    emitForgetPass() {
      // console.log('close')
      this.$emit('forgetPassword')
      this.$store.dispatch('popupSignIn', false)
      // console.log('forget')
    },
  },
}
</script>

<style lang="scss"></style>
