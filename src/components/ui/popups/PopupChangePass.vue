<template>
  <div class="popup">
    <div class="popup__body">
      <form
        @submit.prevent="sendNewPass"
        class="popup__content"
        v-click-outside="emitClose"
      >
        <h2 class="popup__title">{{ $t('popups.change_pass.title') }}</h2>
        <div class="popup__inputs">
          <div class="popup__input input-popup">
            <h4 class="input-popup__title">
              {{ $t('popups.change_pass.old_pass.title') }}
            </h4>
            <input
              v-model="old_password"
              type="password"
              class="input-popup__input"
              :placeholder="$t('popups.change_pass.old_pass.placeholder')"
            />
          </div>
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
      old_password: null,
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
      this.$store.dispatch('popupChangePass', false)
    },
    async sendNewPass() {
      this.errors.unknown_request = false
      this.errors.null = false
      this.errors.not_match = false

      if (
        this.password1 == '' ||
        this.password1 == null ||
        this.password2 == '' ||
        this.password2 == null ||
        this.old_password == null ||
        this.old_password == ''
      ) {
        this.errors.null = true
        return false
      }
      if (this.password1 != this.password2) {
        this.errors.not_match = true
        return false
      }

      await axiosConfig
        .post(`/user/password/change`, {
          old_password: this.old_password,
          new_password: this.password1,
        })
        .then((response) => {
          this.success_password = true
          setTimeout(() => {
            console.log(response.data.data[0])
            this.$store.dispatch('deleteUser')
            localStorage.removeItem('user')
            localStorage.removeItem('ref')
            axiosConfig.defaults.headers.common['Authorization'] = ''
            window.location.reload()
          }, 1000)
        })
        .catch((error) => {
          console.log(error)
          this.errors.unknown_request = true
        })
    },
  },
  created() {},
  mounted() {
    this.success_password = false
  },
}
</script>

<style lang="scss"></style>
