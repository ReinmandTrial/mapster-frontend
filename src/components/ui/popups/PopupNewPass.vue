<template>
  <div class="popup">
    <div class="popup__body">
      <form
        @submit.prevent="sendNewPass"
        class="popup__content"
        v-click-outside="emitClose"
      >
        <h2 class="popup__title">{{ $t('popups.new_pass.title') }}</h2>
        <div class="popup__inputs">
          <div class="popup__input input-popup">
            <h4 class="input-popup__title">
              {{ $t('popups.new_pass.input_login.title') }}
            </h4>
            <input
              v-model="password1"
              type="password"
              class="input-popup__input"
              :placeholder="$t('popups.new_pass.input_login.placeholder')"
            />
          </div>
          <div class="popup__input input-popup">
            <h4 class="input-popup__title">
              {{ $t('popups.new_pass.input_pass.title') }}
            </h4>
            <input
              v-model="password2"
              type="password"
              class="input-popup__input"
              :placeholder="$t('popups.new_pass.input_pass.placeholder')"
            />
          </div>
        </div>
        <p class="popup__error" v-if="errors.null">
          {{ $t('errors.new_pass.null') }}
        </p>
        <p class="popup__error" v-if="errors.not_match">
          {{ $t('errors.new_pass.not_match') }}
        </p>
        <p class="popup__error" v-if="errors.unknown_request">
          {{ $t('errors.unknown_request') }}
        </p>
        <p class="popup__success" v-if="success_password">
          {{ $t('success.change_password') }}
        </p>
        <button type="submit" class="popup__btn">
          {{ $t('popups.new_pass.btn') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axiosConfig from '../../../api/instance'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'PopupNewPass',
  components: {},
  data() {
    return {
      password1: null,
      password2: null,
      token: '',
      errors: {
        null: false,
        not_match: false,
        unknown_request: false,
      },
      success_password: false,
    }
  },
  directives: {
    ClickOutside,
  },
  methods: {
    emitClose() {
      this.$router.push({
        name: 'ExcursionsHome',
      })
    },
    async sendNewPass() {
      this.errors.unknown_request = false
      this.errors.null = false
      this.errors.not_match = false

      if (
        this.password1 == '' ||
        this.password1 == null ||
        this.password2 == '' ||
        this.password2 == null
      ) {
        this.errors.null = true
        return false
      }
      if (this.password1 != this.password2) {
        this.errors.not_match = true
        return false
      }

      await axiosConfig
        .put(`/user/password/reset`, {
          token: this.token,
          password: this.password1,
        })
        .then((response) => {
          this.success_password = true
          setTimeout(() => {
            console.log(response.data.data[0])

            this.$store.dispatch('setUser', response.data.data[0])
            localStorage.setItem('user', JSON.stringify(response.data.data[0]))
            localStorage.setItem('ref', response.data.data[0].session.ref)
            axiosConfig.defaults.headers.common['Authorization'] =
              response.data.data[0].session.ref

            this.$router.push({ name: 'ExcursionsHome' })
          }, 1000)
        })
        .catch((error) => {
          console.log(error)
          this.errors.unknown_request = true
        })
    },
  },
  created() {
    const token = this.$route.query.token
    if (token) {
      this.token = token
    }
  },
  mounted() {
    this.success_password = false
  },
}
</script>

<style lang="scss"></style>
