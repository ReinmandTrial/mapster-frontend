<template>
  <div class="preview">
    <excursion :to_buy="false" :watch_excursion="excursion" />
  </div>
</template>

<script>
import Excursion from '../Excursion.vue'
export default {
  name: 'GuidePreviewExcursion',
  components: { Excursion },
  data() {
    return {
      excursion: null,
    }
  },
  created() {
    this.excursion = { ...this.$route.params }
    // console.log({ ...this.$route.params })
  },
}
</script>

<style lang="scss" scoped></style>
