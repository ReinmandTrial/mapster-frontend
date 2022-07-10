<template>
  <div
    class="dropdown"
    :class="[
      { open: open },
      {
        xs: type == 'xs',
      },
    ]"
    v-click-outside="closeDropdown"
  >
    <button type="button" class="dropdown__head" @click="open = !open">
      <input
        type="text"
        class="input"
        v-model="selectedValue"
        :placeholder="placeholder"
        disabled
      />
      <span class="dropdown__icon icon icon-triangle-down"></span>
    </button>

    <p class="error" v-if="error">{{ $t('errors.required') }}</p>
    <div class="dropdown__body" v-if="open">
      <button
        type="button"
        class="dropdown__item"
        v-for="(item, index) in body"
        :key="index"
        @click="selectItem(item.name, item.value)"
        :data-value="item.value"
      >
        {{ item.name ? item.name : item.value }}
      </button>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: 'DropdownSelect',
  directives: {
    ClickOutside,
  },
  data() {
    return {
      open: false,
      selected_value: '',
      once: true,
    }
  },
  props: {
    placeholder: {
      default() {
        return ''
      },
    },
    value: {
      default() {
        return null
      },
    },
    body: {
      default() {
        return []
      },
    },
    type: {
      default() {
        return ''
      },
    },
    error: {
      default() {
        return false
      },
    },
  },
  methods: {
    closeDropdown() {
      this.open = false
    },
    selectItem(name, value) {
      this.selected_value = name

      // this.selected_value = name
      this.$emit('selectedValue', this.selected_value, value)
      this.$emit('selected')
      this.open = false
    },
    onceFunction() {
      this.$nextTick(() => {
        this.body.some((el) => {
          if (el.value == this.value) {
            if (el.name) {
              this.selected_value = el.name
              return true
            } else {
              this.selected_value = el.value
              return true
            }
          } else {
            this.selected_value = el.value
          }
        })
      })
      this.once = false
    },
  },
  computed: {
    selectedValue() {
      if (this.value && this.once) {
        this.onceFunction()
        this.$emit('selectedValue', this.selected_value, this.value)
        return this.value
      } else {
        // this.$emit('selectedValue', this.selected_value)

        return this.selected_value
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.error {
  color: #ff0000;
  @media (min-width: 992px) {
    position: absolute;
    top: 100%;
    left: 0;
  }
  @media (max-width: 991.98px) {
    margin: 5px 0 10px;
  }
}
.dropdown {
  position: relative;
  &.open {
    .dropdown__head {
      z-index: 15;
    }
    .dropdown__icon {
      transform: translateY(-50%) rotate(-180deg);
    }
  }

  &__head {
    position: relative;
    // cursor: pointer;
  }

  &__icon {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: 12px;
  }

  &__body {
    position: absolute;
    left: 0;
    width: 100%;
    top: calc(100% + 5px);
    background: var(--white);
    border-radius: 3px;
    z-index: 10;
    max-height: 240px;
    overflow-y: auto;
    padding: 7px 0 15px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  }

  &__item {
    display: block;
    width: 100%;
    text-align: left;
    padding: 4px 13px;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.4px;
  }
  &.xs {
    width: 78px;
    .input {
      padding: 3px 30px 3px 6px;
      font-size: 14px;
    }
    .dropdown__icon {
      right: 5px;
    }
  }
}
.input {
  background: var(--white);
  border: 1px solid rgba(26, 27, 32, 0.6);
  border-radius: 5px;
  font-weight: 600;
  font-size: 12px;
  padding: 15px 21px;
  width: 100%;
  cursor: pointer;
  @media (max-width: 575.98px) {
    padding: 12px 10px;
  }
  &::placeholder {
    font-weight: 400;
    color: rgba(26, 27, 32, 0.6);
  }
}
</style>
