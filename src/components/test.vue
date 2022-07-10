<template>
  <div id="app">
    <div class="container my-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h2 class="text-center mb-4">
            Sign Up Form with Google reCAPTCHA
          </h2>
          <form method="post" @submit.prevent="validate">
            <div class="form-group">
              <input
                type="email"
                name="email"
                class="form-control"
                placeholder="Enter your e-mail address"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                name="password"
                class="form-control"
                placeholder="Enter your password"
                required
              />
            </div>
            <div class="form-group">
              <vue-recaptcha
                ref="recaptcha"
                size="invisible"
                :sitekey="sitekey"
                @verify="register"
                @expired="onCaptchaExpired"
              />
              <button type="submit" class="btn btn-primary btn-block">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueRecaptcha } from 'vue-recaptcha'

export default {
  name: 'testPage',

  components: { VueRecaptcha },

  data() {
    return {
      email: null,
      password: null,
      sitekey: '6LcfRowgAAAAAJ17IBWsDRjaB-tyPxzEmXQ13RQB',
    }
  },

  methods: {
    register(recaptchaToken) {
      console.log(recaptchaToken)

      console.log('success')
    },

    validate() {
      console.log('validate')
      // тут можно добавить проверку на валидацию
      // например, с помощью vee validate
      // если с валидацией наших полей все хорошо, запускаем каптчу
      this.$refs.recaptcha.execute()
    },

    onCaptchaExpired() {
      console.log('reset')
      this.$refs.recaptcha.reset()
    },
  },
}
</script>
