<template>
  <div class="popup">
    <div class="popup__body">
      <div class="popup__content" v-click-outside="emitClose">
        <h2 class="popup__title">{{ $t('popups.code_waiting.title') }}</h2>

        <help-info
          :color_style="'green'"
          :icon_style="'black'"
          class="popup__info"
        >
          {{ $t('popups.code_waiting.info1') }}
        </help-info>
        <help-info
          :color_style="'green'"
          :icon_style="'black'"
          class="popup__info"
        >
          {{ $t('popups.code_waiting.info2') }}
        </help-info>

        <button type="button" class="popup__btn" @click="emitClose">
          {{ $t('popups.code_waiting.btn') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import HelpInfo from '../HelpInfo.vue'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'PopupCodeWaiting',
  components: {
    HelpInfo,
  },
  directives: {
    ClickOutside,
  },
  methods: {
    emitClose() {
      this.$emit('closePopup')
    },
  },
}
</script>

<style lang="scss" scoped>
.popup {
  &__title {
    margin-bottom: 20px;
  }
  &__info {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
  &__btn {
    margin-top: 34px;
  }
}
</style>
