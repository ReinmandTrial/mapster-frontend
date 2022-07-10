<template>
  <div>
    <div class="tour-guide-profile">
      <div class="tour-guide-profile__wrap">
        <div class="tour-guide-profile__container">
          <div class="tour-guide-profile__content">
            <p class="tour-guide-profile__title">
              {{ $t('excursions.guide.profile.title') }}
            </p>
            <div class="tour-guide-profile__about-me">
              <div class="tour-guide-profile__photo-guide">
                <img
                  v-if="user.photo.length"
                  :src="setPhoto"
                  alt="photo-guide"
                />
              </div>
              <div class="tour-guide-profile__text-about">
                <p class="tour-guide-profile__subtitle">
                  {{ $t('excursions.guide.profile.sub_title') }}
                </p>
                <p class="tour-guide-profile__descr">
                  {{
                    user.about && user.birthday != ''
                      ? user.about
                      : $t('excursions.guide.profile.unset')
                  }}
                </p>
              </div>
            </div>
            <table class="tour-guide-profile__table">
              <tbody class="tour-guide-profile__tbody">
                <tr class="tour-guide-profile__row">
                  <td class="tour-guide-profile__data">ID</td>
                  <td class="tour-guide-profile__data">{{ user.id }}</td>
                </tr>
                <tr class="tour-guide-profile__row">
                  <td class="tour-guide-profile__data">
                    {{ $t('excursions.guide.profile.name') }}
                  </td>
                  <td class="tour-guide-profile__data">
                    {{
                      user.first_name +
                      ' ' +
                      (user.last_name && user.last_name != ''
                        ? user.last_name
                        : '')
                    }}
                  </td>
                </tr>
                <tr class="tour-guide-profile__row">
                  <td class="tour-guide-profile__data">
                    {{ $t('excursions.guide.profile.birthday') }}
                  </td>
                  <td class="tour-guide-profile__data">
                    {{
                      user.birthday && user.birthday != ''
                        ? user.birthday
                        : $t('excursions.guide.profile.unset')
                    }}
                  </td>
                </tr>
                <tr class="tour-guide-profile__row">
                  <td class="tour-guide-profile__data">
                    {{ $t('excursions.guide.profile.gender') }}
                  </td>
                  <td class="tour-guide-profile__data">
                    {{ selectGender }}
                  </td>
                </tr>
                <tr class="tour-guide-profile__row">
                  <td class="tour-guide-profile__data">
                    {{ $t('excursions.guide.profile.city') }}
                  </td>
                  <td class="tour-guide-profile__data">
                    {{
                      user.nationality && user.nationality != ''
                        ? user.nationality
                        : $t('excursions.guide.profile.unset')
                    }}
                  </td>
                </tr>
                <tr class="tour-guide-profile__row">
                  <td class="tour-guide-profile__data">
                    {{ $t('excursions.guide.profile.phone') }}
                  </td>
                  <td class="tour-guide-profile__data">
                    {{
                      user.phone && user.phone != ''
                        ? user.phone
                        : $t('excursions.guide.profile.unset')
                    }}
                  </td>
                </tr>
                <tr class="tour-guide-profile__row">
                  <td class="tour-guide-profile__data">
                    {{ $t('excursions.guide.profile.email') }}
                  </td>
                  <td class="tour-guide-profile__data">
                    {{
                      user.email && user.email != ''
                        ? user.email
                        : $t('excursions.guide.profile.unset')
                    }}
                  </td>
                </tr>
                <tr class="tour-guide-profile__row">
                  <td class="tour-guide-profile__data">
                    {{ $t('excursions.guide.profile.account_number') }}
                  </td>
                  <td class="tour-guide-profile__data">
                    {{
                      user.card_num || user.card_num == ''
                        ? user.card_num
                        : $t('excursions.guide.profile.unset')
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
            <router-link
              :to="{
                name: 'GuideProfileEdit',
              }"
              class="tour-guide-profile__edit-table"
            >
              {{ $t('excursions.guide.profile.edit_table') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuideProfile',
  data() {
    return {
      user: null,
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.user = this.$store.getters.getUser
    })
  },
  methods: {},
  computed: {
    setPhoto() {
      var format = this.user.photo[0].extension.slice(1)
      return 'data:image/' + format + ';base64,' + this.user.photo[0].data
    },
    selectGender() {
      if (this.user.sex) {
        if (this.user.sex == 'male') {
          return this.$t(
            'excursions.guide.profile_edit.input_label.gender.male',
          )
        } else if (this.user.sex == 'female') {
          return this.$t(
            'excursions.guide.profile_edit.input_label.gender.female',
          )
        }
      }
      return this.$t('excursions.guide.profile.unset')
    },
  },
}
</script>

<style lang="scss" scoped>
.tour-guide-profile {
  margin: 60px 0px 113px 0px;
  @media (max-width: 767.98px) {
    margin: 28px 0px 100px 0px;
  }
  &__wrap {
  }

  &__container {
    max-width: 767px;
    height: 100%;
    margin: 0 auto;
    background-color: var(--white);
    @media (max-width: 767.98px) {
      background-color: transparent;
    }
  }

  &__content {
    margin: 0 auto;
    max-width: 620px;
    padding: 40px 0px 15px 0px;
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
    padding-left: 47px;
    @media (max-width: 767.98px) {
      font-size: 18px;
      line-height: 22px;
      padding: 0px 0px 0px 0px;
    }
  }

  &__about-me {
    display: flex;
    column-gap: 30px;
    margin-bottom: 30px;
    @media (max-width: 500.98px) {
      justify-content: center;
    }
  }

  &__photo-guide {
    border-radius: 50%;
    overflow: hidden;
    height: 146px;
    flex: 0 0 146px;
    margin-bottom: 17px;
    background: var(--light-gray);
    @media (max-width: 767.98px) {
      flex: 0 0 140px;
      height: 140px;
      margin-bottom: 11px;
    }

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  &__text-about {
    @media (max-width: 500.98px) {
      display: none;
    }
  }

  &__subtitle {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.15px;
  }

  &__descr {
    font-size: 14px;
    line-height: 19px;

    color: rgba(26, 27, 32, 0.6);
  }
  &__table {
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    width: 100%;
    border-spacing: 0 4px;
    margin-bottom: 15px;
  }

  &__tbody {
  }

  &__row {
    &:nth-child(odd) {
      background: #e5e5e5;
    }
    &:nth-child(even) {
      background: rgba(33, 158, 188, 0.15);
    }
  }

  &__data {
    height: 30px;
    @media (max-width: 500.98px) {
      font-size: 14px;
      line-height: 19px;
    }
    &:first-child {
      width: 375px;
      padding-left: 20px;
    }
    &:last-child {
      width: 244px;
      padding-left: 30px;
      @media (max-width: 500.98px) {
        font-weight: 600;
      }
      @media (max-width: 360px) {
        font-size: 12px;
      }
    }
  }
  &__edit-table {
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    color: #219ebc;
    @media (max-width: 500.98px) {
      line-height: 13px;
      letter-spacing: 0.2px;
      font-weight: 400;
    }
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
