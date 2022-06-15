<template>
  <div class="help-info" :style="{ backgroundColor: bgColor }">
    <span
      class="help-info__icon icon icon-info"
      :style="{ color: iconColor }"
    ></span>
    <p class="help-info__text" v-html="text"></p>
  </div>
</template>

<script>
export default {
  name: 'HelpInfo',
  data() {
    return {}
  },

  props: {
    color_style: {
      default() {
        return null
      },
    },
    text: {
      default() {
        return null
      },
    },
  },
  methods: {},
  computed: {
    bgColor() {
      if (this.color_style == 'green') {
        return '#CDFFBC'
      } else {
        return '#ececec'
      }
    },
    iconColor() {
      if (this.color_style == 'green') {
        return '#41B619'
      } else {
        return 'gray'
      }
    },
  },

  mounted() {},
}
</script>

<style lang="scss">
.help-info {
  display: flex;
  column-gap: 13px;
  padding: 8px 22px;
  border-radius: 5px;
  &__icon {
  }
  &__text {
    padding-top: 2px;
    font-size: 14px;
    letter-spacing: 0.2px;
  }
}
</style>
