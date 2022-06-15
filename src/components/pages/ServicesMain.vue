<template>
  <div class="services-main">
    <v-header />
    <router-view></router-view>
    <v-footer />
  </div>
</template>

<script>
import '@/assets/scss/style.scss'
import VHeader from '../ui/header.vue'
import VFooter from '../ui/footer.vue'
export default {
  name: 'ServicesMain',
  components: {
    VHeader,
    VFooter,
  },
  mounted() {},
}
</script>

<style lang="scss"></style>
