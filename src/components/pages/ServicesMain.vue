<template>
  <div class="services-main">
    <div class="wrapper">
      <v-header />
      <router-view></router-view>
    </div>
    <v-footer class="footer" />
    <!-- @closePopup="popup_sign_in ? (popup_sign_in = false) : false" -->
    <popup-sign-in
      v-if="this.$store.getters.statePopupSignIn"
      @closePopup="popup_sign_in = false"
      @forgetPassword="popup_pass_recovery = true"
    />
    <popup-reg
      v-if="this.$store.getters.statePopupReg"
      @closePopup="popup_reg = false"
    />
    <popup-pass-recovery
      v-if="popup_pass_recovery"
      @closePopup="popup_pass_recovery = false"
      @openCodeWaiting="popup_code_waiting = true"
    />
    <popup-code-waiting
      v-if="popup_code_waiting"
      @closePopup="popup_code_waiting = false"
    />
    <popup-change-pass v-if="this.$store.getters.statePopupChangePass" />

    <!-- test btns -->
    <!-- <router-link
      :to="{
        name: 'PassRecovery',
        params: { recovery_token: 2 },
      }"
      class="test-auth"
    >
      asdasfasf
    </router-link> -->
  </div>
</template>

<script>
import '@/assets/scss/style.scss'
import VHeader from '../ui/header.vue'
import VFooter from '../ui/footer.vue'
import PopupSignIn from '../ui/popups/PopupSignIn.vue'
import PopupReg from '../ui/popups/PopupReg.vue'
import PopupPassRecovery from '../ui/popups/PopupPassRecovery.vue'
import PopupCodeWaiting from '../ui/popups/PopupCodeWaiting.vue'
import axiosConfig from '../../api/instance'
import PopupChangePass from '../ui/popups/PopupChangePass.vue'

export default {
  name: 'ServicesMain',
  components: {
    VHeader,
    VFooter,
    PopupSignIn,
    PopupReg,
    PopupPassRecovery,
    PopupCodeWaiting,
    PopupChangePass,
  },
  data() {
    return {
      popup_pass_recovery: false,
      popup_code_waiting: false,
    }
  },
  methods: {},
  created() {
    this.$store.dispatch('setUser', JSON.parse(localStorage.getItem('user')))
    if (localStorage.getItem('user')) {
      const ref = localStorage.getItem('ref')

      axiosConfig.defaults.headers.common['Authorization'] = ref
    }
  },
  mounted() {},
}
</script>

<style lang="scss">
.services-main {
  background: var(--light-gray);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.wrapper {
  flex: 1 1 auto;
}
.footer {
  flex: none;
}
.test-auth {
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 20px;
}
</style>
