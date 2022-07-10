<template>
  <div>
    <div class="tour-guide-edit-profile">
      <div class="tour-guide-edit-profile__wrap">
        <div class="tour-guide-edit-profile__container">
          <form
            @submit.prevent="submit"
            class="tour-guide-edit-profile__content"
          >
            <p class="tour-guide-edit-profile__title">
              {{ $t('excursions.guide.profile_edit.title') }}
            </p>
            <div v-if="user.photo" class="tour-guide-edit-profile__photo-guide">
              <img :src="setPhoto" alt="photo-guide" />
            </div>
            <label class="tour-guide-edit-profile__edit-photo">
              <input
                ref="input"
                type="file"
                class="input-file"
                accept=".png, .jpg, .jpeg"
                @change="upload"
              />
              {{
                user.photo.length
                  ? $t('excursions.guide.profile_edit.edit_photo')
                  : $t('excursions.guide.profile_edit.add_photo')
              }}
            </label>
            <div class="tour-guide-edit-profile__text-input temp-textinput">
              <div class="temp-textinput__content">
                <p class="temp-textinput__name-input">
                  {{ $t('excursions.guide.profile_edit.input_label.name') }}
                </p>
                <div class="temp-textinput__wrap">
                  <input
                    class="temp-textinput__input"
                    type="text"
                    v-model.trim="user.first_name"
                  />
                  <p class="error" v-if="errors.name">
                    {{ $t('errors.required') }}
                  </p>
                </div>
              </div>
            </div>
            <div class="tour-guide-edit-profile__text-input temp-textinput">
              <div class="temp-textinput__content">
                <p class="temp-textinput__name-input">
                  {{ $t('excursions.guide.profile_edit.input_label.sur_name') }}
                </p>
                <div class="temp-textinput__wrap">
                  <input
                    class="temp-textinput__input"
                    type="text"
                    v-model.trim="user.last_name"
                  />
                </div>
              </div>
            </div>
            <div class="tour-guide-edit-profile__birthday birthday-picker">
              <div class="birthday-picker__content">
                <p class="birthday-picker__title">
                  {{ $t('excursions.guide.profile_edit.input_label.date') }}
                </p>
                <!-- <div class="birthday-picker__date">
                  <span class="icon icon-calendar-2"></span>
                  21. апр. 1975
                </div> -->
                <div class="temp-textinput__wrap">
                  <!-- <spa class="icon icon-calendar-2"></spa/n> -->
                  <input
                    class="temp-textinput__input"
                    type="text"
                    v-model.trim="user.birthday"
                  />
                </div>
              </div>
            </div>
            <div class="tour-guide-edit-profile__gender select-gender">
              <div class="select-gender__content">
                <p class="select-gender__title">
                  {{
                    $t('excursions.guide.profile_edit.input_label.gender.label')
                  }}
                </p>
                <div class="select-gender__wrap">
                  <p class="select-gender__text-point">
                    {{
                      $t(
                        'excursions.guide.profile_edit.input_label.gender.prompt',
                      )
                    }}
                  </p>
                  <div class="select-gender__buttons">
                    <label class="select-gender__label">
                      <input
                        class="select-gender__radio"
                        type="radio"
                        name="gender"
                        value="male"
                        v-model="user.sex"
                      />
                      <span class="select-gender__style"></span>
                      {{
                        $t(
                          'excursions.guide.profile_edit.input_label.gender.male',
                        )
                      }}
                    </label>
                    <label class="select-gender__label">
                      <input
                        class="select-gender__radio"
                        type="radio"
                        name="gender"
                        value="female"
                        v-model="user.sex"
                      />
                      <span class="select-gender__style"></span>
                      {{
                        $t(
                          'excursions.guide.profile_edit.input_label.gender.female',
                        )
                      }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="tour-guide-edit-profile__text-input temp-textinput">
              <div class="temp-textinput__content">
                <p class="temp-textinput__name-input">
                  {{
                    $t('excursions.guide.profile_edit.input_label.citizenship')
                  }}
                </p>
                <div class="temp-textinput__wrap">
                  <input
                    class="temp-textinput__input"
                    type="text"
                    v-model.trim="user.nationality"
                  />
                </div>
              </div>
            </div>
            <div class="tour-guide-edit-profile__text-input temp-textinput">
              <div class="temp-textinput__content">
                <p class="temp-textinput__name-input">
                  {{ $t('excursions.guide.profile_edit.input_label.phone') }}
                </p>
                <div class="temp-textinput__wrap">
                  <input
                    class="temp-textinput__input"
                    type="number"
                    v-model.trim="user.phone"
                  />
                </div>
              </div>
            </div>
            <div class="tour-guide-edit-profile__text-input temp-textinput">
              <div class="temp-textinput__content">
                <p class="temp-textinput__name-input">
                  {{ $t('excursions.guide.profile_edit.input_label.password') }}
                </p>
                <div class="temp-textinput__wrap">
                  <button
                    type="button"
                    class="change-pass"
                    @click.stop="$store.dispatch('popupChangePass', true)"
                  >
                    {{
                      $t(
                        'excursions.guide.profile_edit.input_label.change_pass',
                      )
                    }}
                  </button>
                </div>
              </div>
            </div>
            <div class="tour-guide-edit-profile__text-input temp-textinput">
              <div class="temp-textinput__content">
                <p class="temp-textinput__name-input">E-mail</p>
                <div class="temp-textinput__wrap">
                  <input
                    class="temp-textinput__input"
                    type="email"
                    v-model.trim="user.email"
                  />
                  <p class="error" v-if="errors.email">
                    {{ $t('errors.required') }}
                  </p>
                </div>
              </div>
            </div>
            <div class="tour-guide-edit-profile__text-input temp-textinput">
              <div class="temp-textinput__content">
                <p class="temp-textinput__name-input">
                  {{
                    $t('excursions.guide.profile_edit.input_label.bank_account')
                  }}
                </p>
                <div class="temp-textinput__wrap">
                  <input
                    class="temp-textinput__input"
                    type="text"
                    v-model.trim="user.bank_account"
                  />
                </div>
              </div>
            </div>
            <div class="tour-guide-edit-profile__about-me temp-textarea">
              <div class="temp-textarea__content">
                <p class="temp-textarea__name-input">
                  {{ $t('excursions.guide.profile_edit.input_label.about_me') }}
                </p>
                <div class="temp-textarea__wrap">
                  <textarea
                    class="temp-textarea__textarea"
                    name="aboutMe"
                    v-model="user.about"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="tour-guide-edit-profile__button-wrap">
              <p class="error" v-if="errors.password">
                {{ $t('errors.all') }}
              </p>
              <p class="success" v-if="success">
                {{ $t('success.change_password') }}
              </p>
              <button type="submit" class="tour-guide-edit-profile__button">
                {{ $t('excursions.guide.profile_edit.save_btn') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosConfig from '../../../../../api/instance'

export default {
  name: 'GuideProfileEdit',
  data() {
    return {
      password: '',
      user: null,
      photo_changed: false,
      errors: {
        name: false,
        email: false,
        password: false,
        all: false,
      },
      success: false,
      user_photo: false,
    }
  },
  created() {
    this.user = this.$store.getters.getUser
    // console.log(this.user)
    // console.log(this.user.photo.length)
  },
  methods: {
    async submit() {
      this.errors.name = false
      if (this.user.first_name == '') {
        this.errors.name = true
      }

      this.errors.email = false
      if (this.user.email == '') {
        this.errors.email = true
      }

      this.errors.all = false
      this.success = false
      if (
        this.errors.email == false &&
        this.errors.name == false &&
        this.errors.password == false
      ) {
        await axiosConfig
          .post(`/user`, {
            first_name: this.user.first_name,
            middle_name: this.user.middle_name,
            last_name: this.user.last_name,
            email: this.user.email,
            phone: this.user.phone,
            passport: this.user.passport,
            privilegies: this.user.privilegies.id,
            timezone: this.user.timezone,
            birthday: this.user.birthday,
            sex: this.user.sex,
            nationality: this.user.nationality,
            bank_account: this.user.bank_account,
            about: this.user.about,
            address: {
              zipcode: this.user.zipcode,
              country: this.user.country,
              city: this.user.city,
              addres_1: this.user.addres_1,
              address_2: this.user.address_2,
            },
          })
          .then(async (response) => {
            console.log(response.data.data[0])
            this.$store.dispatch('setUser', response.data.data[0])
            localStorage.setItem('user', JSON.stringify(response.data.data[0]))
            if (this.photo_changed) {
              await axiosConfig
                .post(`/user/photo`, {
                  primary: 1,
                  name: this.user.photo[0].name,
                  extension: this.user.photo[0].extension,
                  data: this.user.photo[0].data,
                })
                .then((response) => {
                  console.log(response.data.data[0])
                  this.user.photo[0] = response.data.data[0]
                  this.$store.dispatch('setUser', this.user)
                  localStorage.setItem('user', JSON.stringify(this.user))
                  this.success = true
                })
                .catch((error) => {
                  console.log(error)
                })
            }

            this.success = true
            this.$store.dispatch('setUser', this.user)
            localStorage.setItem('user', JSON.stringify(this.user))
            this.success = true
            setTimeout(() => {
              this.$router.push({ name: 'GuideProfile' })
            }, 2000)
          })
          .catch((error) => {
            console.log(error)
            this.errors.photo_new = true
          })
      }
    },
    buildPhotoObject(src) {
      var extension2 = src.split(';')[0].split('/')[1]
      var data = src.split('base64,')[1]
      if (this.user.photo.length == 0) {
        this.$set(this.user.photo, 0, {})
      }
      this.user.photo[0].primary = 1
      this.user.photo[0].name = 'avatar'
      this.user.photo[0].extension = '.' + extension2
      this.user.photo[0].data = data
      // console.log(this.user.photo[0])
      this.user_photo = true
      this.photo_changed = true
    },
    upload() {
      const newPhoto = this.$refs.input.files[0]

      if (/\.(jpe?g|png)$/i.test(newPhoto.name)) {
        let reader = new FileReader()
        reader.addEventListener('load', () => {
          // console.log(reader.result)

          this.buildPhotoObject(reader.result)
        })

        reader.readAsDataURL(newPhoto)
      } else {
        console.log('not image')
      }
    },
  },
  computed: {
    setPhoto() {
      if (this.user.photo.length) {
        var format = this.user.photo[0].extension.slice(1)
        return 'data:image/' + format + ';base64,' + this.user.photo[0].data
      } else {
        return ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.change-pass {
  color: #219ebc;
}
.error {
  color: #ff0000;
  margin-bottom: -15px;
}
.success {
  color: var(--light-green);
  margin-bottom: 5px;
  width: fit-content;
  text-align: center;
}
.temp-textinput {
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 500.98px) {
      display: block;
    }
  }

  &__name-input {
    font-size: 18px;
    line-height: 25px;
    flex: 0 0 200px;
    @media (max-width: 500.98px) {
      font-size: 14px;
      line-height: 19px;
      margin-bottom: 10px;
    }
  }

  &__wrap {
    flex: 0 1 380px;
    position: relative;
  }

  &__input {
    font-family: 'Inter';
    background: var(--white);
    border: 1px solid rgba(26, 27, 32, 0.6);
    border-radius: 5px;
    padding: 14px 15px;
    width: 100%;
    font-size: 16px;
    line-height: 19px;
    @media (max-width: 500.98px) {
      padding: 9px 15px;
      font-weight: 600;
      font-size: 15px;
      line-height: 20px;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }
  }
}
.temp-textarea {
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 500.98px) {
      display: block;
    }
  }

  &__name-input {
    font-size: 18px;
    line-height: 25px;
    flex: 0 0 200px;
    align-self: flex-start;
    @media (max-width: 500.98px) {
      font-size: 14px;
      line-height: 19px;
      margin-bottom: 14px;
    }
  }

  &__wrap {
    flex: 0 1 380px;
  }

  &__textarea {
    font-family: 'Inter';
    background: var(--white);
    border: 1px solid rgba(26, 27, 32, 0.6);
    border-radius: 5px;
    padding: 14px 15px;
    width: 100%;
    height: 200px;
    @media (max-width: 500.98px) {
      height: 180px;
      font-size: 14px;
      line-height: 19px;
    }
  }
}
.birthday-picker {
  &__content {
    display: flex;
    align-items: center;
    @media (max-width: 500.98px) {
      display: block;
    }
  }

  &__title {
    font-size: 18px;
    line-height: 25px;
    flex: 0 0 204px;
    margin-bottom: 12px;
    @media (max-width: 500.98px) {
      font-size: 14px;
      line-height: 19px;
    }
  }

  &__date {
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    background: var(--white);
    border: 1px solid rgba(26, 27, 32, 0.6);
    border-radius: 5px;
    padding: 10px 15px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 257px;

    @media (max-width: 500.98px) {
      max-width: 181px;
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      height: 40px;
      justify-content: start;
      column-gap: 10px;
    }
    span {
      &:first-child {
        display: none;
        @media (max-width: 500.98px) {
          display: block;
        }
      }
      &:last-child {
        @media (max-width: 500.98px) {
          display: none;
        }
      }
    }
  }
  .icon-calendar-2 {
    font-size: 29px;
    position: absolute;
    transform: translateY(-50%);
    right: 15px;
    top: 50%;
    color: rgba(26, 27, 32, 0.6);
    @media (max-width: 500.98px) {
      font-size: 24px;
    }
  }
}
.select-gender {
  &__content {
    display: flex;
    align-items: center;
  }

  &__title {
    font-size: 18px;
    line-height: 25px;
    flex: 0 0 204px;
    @media (max-width: 500.98px) {
      display: none;
    }
  }

  &__wrap {
  }

  &__text-point {
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 7px;
    @media (max-width: 500.98px) {
      font-size: 14px;
      line-height: 19px;
    }
  }

  &__buttons {
  }

  &__label {
    font-size: 18px;
    line-height: 25px;
    display: inline-flex;
    align-items: center;
    column-gap: 8px;
    position: relative;
    @media (max-width: 500.98px) {
      font-size: 14px;
      line-height: 19px;
    }
    &:first-child {
      margin-right: 25px;
    }
  }

  &__style {
    width: 20px;
    height: 20px;
    border-radius: 50px;
    border: 2px solid rgba(0, 0, 0, 0.87);
    display: inline-flex;
    align-items: center;
    justify-content: center;

    .select-gender__radio:checked + &::after {
      content: '';
      width: 10px;
      height: 10px;
      background-color: var(--black);
      border-radius: 50%;
      transition: all 0.3s ease 0s;
      position: absolute;
    }
  }

  &__radio {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }
}
.tour-guide-edit-profile {
  margin: 60px 0px 0px 0px;
  @media (max-width: 767.98px) {
    margin: 28px 0px 0px 0px;
  }
  &__wrap {
  }

  &__container {
    max-width: 800px;
    height: 100%;
    margin: 0 auto;
    background-color: var(--white);
    @media (max-width: 767.98px) {
      background-color: transparent;
    }
  }

  &__content {
    margin: 0 auto;
    max-width: 584px;
    padding-top: 40px;
    @media (max-width: 767.98px) {
      padding: 0px 25px;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 20px;
    letter-spacing: 0.4px;
    margin-bottom: 30px;
    padding-left: 28px;
    @media (max-width: 767.98px) {
      font-size: 18px;
      line-height: 22px;
      padding: 0px 0px 0px 0px;
    }
  }

  &__photo-guide {
    border-radius: 50%;
    overflow: hidden;
    height: 146px;
    width: 146px;
    margin: 0 auto;
    margin-bottom: 17px;
    @media (max-width: 767.98px) {
      width: 140px;
      height: 140px;
      margin-bottom: 11px;
    }
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  &__edit-photo {
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #219ebc;
    margin: 0 auto 60px;
    position: relative;
    overflow: hidden;
    display: block;
    width: fit-content;
    @media (max-width: 500.98px) {
      margin-bottom: 32px;
    }
    @media (any-hover: hover) {
      &:hover {
        text-decoration: underline;
      }
    }
    .input-file {
      visibility: hidden;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  &__text-input {
    margin-bottom: 20px;
  }
  &__birthday {
    margin-bottom: 20px;
  }
  &__gender {
    margin-bottom: 23px;
    @media (max-width: 500.98px) {
      margin-bottom: 16px;
    }
  }
  &__about-me {
    margin-bottom: 25px;
  }
  &__button-wrap {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    @media (max-width: 500.98px) {
      display: block;
    }
  }

  &__button {
    max-width: 280px;
    width: 100%;
    height: 45px;
    margin: 0 auto;
    margin-bottom: 100px;
    font-weight: 600;
    font-size: 18px;
    line-height: 16px;
    letter-spacing: 1.25px;
    text-transform: uppercase;
    background: var(--light-green);
    border-radius: 5px;
    @media (max-width: 767.98px) {
      margin-bottom: 117px;
    }
    @media (max-width: 500.98px) {
      width: 100%;
      height: 40px;
    }
  }
}
</style>
