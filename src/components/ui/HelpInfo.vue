<template>
  <div class="help-info" :style="{ backgroundColor: bgColor }">
    <span
      class="help-info__icon icon icon-info"
      :style="{ color: iconColor }"
    ></span>
    <p class="help-info__text">
      <slot></slot>
    </p>
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
    icon_style: {
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
      if (this.icon_style) {
        if (this.icon_style == 'black') {
          return '#000000'
        }
      }
      if (this.color_style == 'green') {
        return '#41B619'
      } else if (this.color_style == 'black') {
        return '#000000'
      } else {
        return this.color_style
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
  @media (max-width: 575.98px) {
    padding: 8px 10px;
  }
  &__icon {
  }
  &__text {
    padding-top: 2px;
    font-size: 14px;
    letter-spacing: 0.2px;
    a {
      font-weight: 600;
    }
  }
}
</style>
