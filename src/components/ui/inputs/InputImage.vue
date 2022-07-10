<template>
  <form class="photo" ref="fileform">
    <div class="photo__image" v-if="src != ''">
      <img :src="src" />
      <v-preloader class="preloader" v-if="preloader" />
      <button
        type="button"
        class="photo__remove icon icon-trash"
        @click="removeFile"
      ></button>
    </div>
    <div class="photo__add-change">
      <label class="photo__btn">
        <input
          ref="input"
          type="file"
          class="input-file"
          accept=".png, .jpg, .jpeg"
          @change="upload"
        />
        {{
          src == ''
            ? $t('excursions.guide.add_excursion.photo.add')
            : $t('excursions.guide.add_excursion.photo.change')
        }}
      </label>
    </div>
    <p class="photo__descr">
      {{ $t('excursions.guide.add_excursion.photo.descr') }}
    </p>
    <input
      type="text"
      v-if="caption"
      class="message"
      v-model="caption_value"
      :placeholder="$t('excursions.guide.add_excursion.photo.placeholder')"
    />
  </form>
</template>

<script>
import VPreloader from '../VPreloader.vue'

export default {
  name: 'InputImage',
  data() {
    return {
      dragAndDropCapable: false,
      src: '',
      preloader: false,
      caption_value: '',
    }
  },
  props: {
    caption: {
      default() {
        return false
      },
    },
    name: {
      default() {
        return ''
      },
    },
    src2: {
      default() {
        return ''
      },
    },
  },
  watch: {
    caption_value: function (val) {
      this.$emit('emitCaption', val)
    },
    src2: function (val, oldVal) {
      if (val != oldVal) {
        this.src = this.src2
      }
    },
  },
  computed: {},
  methods: {
    removeFile() {
      this.src = ''
      this.$emit('src', this.src)
    },
    determineDragAndDropCapable() {
      var div = document.createElement('div')
      return (
        ('draggable' in div || ('ondragstart' in div && 'ondrop' in div)) &&
        'FormData' in window &&
        'FileReader' in window
      )
    },
    upload() {
      const newPhoto = this.$refs.input.files[0]
      if (/\.(jpe?g|png)$/i.test(newPhoto.name)) {
        this.preloader = true
        // console.log(newPhoto)

        let reader = new FileReader()
        reader.addEventListener('load', () => {
          this.src = reader.result
          this.$emit('src', this.src)
          this.preloader = false
        })
        // console.log(this.

        reader.readAsDataURL(newPhoto)
      } else {
        console.log('not image')
      }
    },
  },

  mounted() {
    // if (this.src2 != '') {
    this.$nextTick(() => {
      this.src = this.src2
    })
    // }
    this.caption_value = this.name
    this.dragAndDropCapable = this.determineDragAndDropCapable()
    var evtsArr = [
      'drag',
      'dragstart',
      'dragend',
      'dragover',
      'dragenter',
      'dragleave',
      'drop',
    ]
    if (this.dragAndDropCapable) {
      evtsArr.forEach(
        function (evt) {
          this.$refs.fileform.addEventListener(
            evt,
            function (e) {
              e.preventDefault()
              e.stopPropagation()
            }.bind(this),
            false,
          )
        }.bind(this),
      )
      this.$refs.fileform.addEventListener(
        'drop',
        function (e) {
          this.preloader = true
          const newPhoto = e.dataTransfer.files[0]
          if (/\.(jpe?g|png)$/i.test(newPhoto.name)) {
            // console.log(newPhoto)

            let reader = new FileReader()
            reader.addEventListener('load', () => {
              this.src = reader.result
              this.$emit('src', this.src)
              this.preloader = false
            })
            // console.log(this.

            reader.readAsDataURL(newPhoto)
          } else {
            console.log('not image')
          }
        }.bind(this),
      )
    }
  },
  components: {
    VPreloader,
  },
}
</script>

<style lang="scss" scoped>
.message {
  margin-top: 5px;
  width: 100%;
  background: var(--white);
  border: 1px solid rgba(26, 27, 32, 0.6);
  border-radius: 5px;
  padding: 9px 24px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  &::placeholder {
    font-weight: 400;
    color: rgba(26, 27, 32, 0.6);
  }
}
.preloader {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
.input-file {
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
}
.photo {
  flex: none;
  // width: 400px;
  width: 100%;
  max-width: 400px;
  &__image {
    position: relative;
    margin-bottom: 10px;
    max-width: 400px;
    width: 100%;
    height: 266px;
    border-radius: 10px;
    overflow: hidden;
    img {
      z-index: 5;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__remove {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #ff0000;
    z-index: 10;
  }

  &__add-change {
    background: var(--white);
    border: 1px dashed #becad6;
    border-radius: 4px;
    padding: 16px;
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: center;
  }

  &__btn {
    cursor: pointer;
    overflow: hidden;
    background: var(--light-gray);
    border-radius: 6px;
    font-weight: 700;
    padding: 6px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    max-width: 290px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  &__descr {
    font-size: 12px;
    margin-top: 2px;
    max-width: 400px;
    color: rgba(26, 27, 32, 0.6);
  }
}
</style>
