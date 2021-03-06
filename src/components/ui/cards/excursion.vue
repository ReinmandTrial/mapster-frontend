<template>
  <div class="card-excursion">
    <div class="card-excursion__image">
      <img
        v-if="image.data != ''"
        :src="
          'data:image/' +
          photo_owner.extension.slice(1) +
          ';base64,' +
          image.data
        "
        alt=""
      />
    </div>
    <div class="card-excursion__text">
      <div class="card-excursion__photo">
        <img
          :src="
            'data:image/' +
            photo_owner.extension.slice(1) +
            ';base64,' +
            photo_owner.data
          "
          alt=""
        />
      </div>
      <div class="card-excursion__mark">
        <span class="card-excursion__mark-icon icon icon-mark"></span>
        {{ excursion.city }}
      </div>
      <h4 class="card-excursion__title">{{ excursion.subject }}</h4>
      <p class="card-excursion__descr">
        {{ excursion.subtitle }}
      </p>

      <div class="card-excursion__price">
        <span
          class="card-excursion__sum-discount"
          v-if="excursion.discount != 1"
        >
          {{ '€' + excursion.guideprices[0].price }}
        </span>
        <span class="card-excursion__sum">
          {{
            excursion.discount == 1
              ? '€' + excursion.guideprices[0].price
              : '€' + calcDiscount
          }}
        </span>
        <span class="card-excursion__price-text">
          {{
            excursion.cost_type == 'person'
              ? $t('excursions.client.card_excursion.cost_type.person')
              : $t('excursions.client.card_excursion.cost_type.excursion')
          }}
        </span>
      </div>

      <div class="card-excursion__my" v-if="my_excursion">
        <div class="card-excursion__btns">
          <router-link
            :to="{ name: 'GuideEditExcursion', params: { id: excursion.id } }"
            class="card-excursion__button icon icon-pencil"
          ></router-link>
          <router-link
            :to="{
              name: `ExcursionPage`,
              params: {
                id: excursion.id,
              },
            }"
            class="card-excursion__button icon icon-eye"
          ></router-link>
        </div>
        <label class="card-excursion__show-checkbox" @click="changeVisibility">
          <input
            type="checkbox"
            class="card-excursion__show-checkbox-input"
            v-model="show_excursion"
            disabled
          />
          <span class="card-excursion__show-checkbox-style"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import axiosConfig from '../../../api/instance'

export default {
  name: 'CardExcursion',
  data() {
    return {
      show_excursion: false,
      photo_owner: {
        id: null,
        primary: true,
        name: 'name',
        extension: '.jpeg',
        size: null,
        basemediamodel_ptr: null,
        owner: null,
        data: '',
      },
      image: {
        id: null,
        primary: null,
        name: null,
        extension: '.jpg',
        size: null,
        basemediamodel_ptr: null,
        owner: null,
        data: '',
      },
    }
  },
  computed: {
    calcDiscount() {
      let num = this.excursion.guideprices[0].price * this.excursion.discount
      return num.toFixed(0)
    },
  },
  methods: {
    getImage() {
      axiosConfig
        .get(`/guide/media/${this.excursion.id}`)
        .then((response) => {
          if (response.data.data[0]) {
            this.image = response.data.data[0]
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getPhotoOwner() {
      axiosConfig
        .get(`/user/${this.excursion.owner}`)
        .then((response) => {
          if (response.data.data[0]) {
            this.photo_owner = response.data.data[0].photo[0]
            // console.log(this.photo_owner)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async changeVisibility() {
      console.log(this.show_excursion)
      await axiosConfig
        .get(`/guide/${this.excursion.id}/visible`)
        .then((response) => {
          this.show_excursion = response.data.data[0].active
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },

  mounted() {
    this.excursion.id && this.getImage()
    this.excursion.id && this.getPhotoOwner()
    this.show_excursion = this.excursion.active
  },
  props: {
    my_excursion: {
      type: Boolean,
      default() {
        return false
      },
    },
    excursion: {
      default() {
        return {
          id: null,
          subject: 'Title',
          subtitle: null,
          description: null,
          details: null,
          country: null,
          city: null,
          lang: null,
          duration: 0,
          number: null,
          children_allowed: false,
          moves: 'На авто',
          type: 'groups',
          expire: null,
          has_common_point: true,
          expect_point: null,
          exact_point: null,
          cost_type: 'person',
          price_type: 'tickets',
          min_price: null,
          currency: 'USD',
          discount: null,
          discount_expire: null,
          conductor_type: 'company',
          conductor_description: null,
          active: true,
          moderate: true,
          hide: false,
          owner: null,
          guideplan: [
            {
              id: null,
              subject: null,
              description: null,
              roadtime: null,
              stoptime: null,
              owner: null,
            },
          ],
          guideschedule: [
            {
              id: null,
              day: null,
              start: null,
              end: null,
              owner: null,
            },
          ],
          guideprices: [
            {
              id: null,
              type: null,
              name: 'Стандартный билет',
              price: null,
              currency: 'USD',
              owner: null,
            },
          ],
          guidediscountcalendar: [
            {
              id: null,
              discount: null,
              start: null,
              finish: null,
              owner: null,
            },
          ],
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.card-excursion {
  background: #ffffff;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &__image {
    flex: none;
    width: 100%;
    height: 0;
    padding-bottom: 66.67%;
    position: relative;
    background: #c3c3c3;
    @media (max-width: 575.98px) {
      padding-bottom: 58%;
    }
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
    }
  }

  &__text {
    flex: 1 1 auto;
    padding: 20px 12px 28px;
    position: relative;
    display: flex;
    flex-direction: column;
    @media (max-width: 575.98px) {
      padding: 12px 12px 28px;
    }
  }

  &__photo {
    overflow: hidden;
    background: var(--light-gray);
    position: absolute;
    transform: translate(-50%, -70%);
    width: 140px;
    height: 140px;
    border-radius: 50%;
    top: 0;
    left: 50%;
    @media (max-width: 575.98px) {
      width: 72px;
      height: 72px;
      transform: translate(0, -50%);
      left: unset;
      right: 23px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__mark {
    display: flex;
    align-items: center;
    column-gap: 2px;
    font-size: 14px;
    margin-left: -3px;
    margin-bottom: 18px;
    width: 40%;
    @media (max-width: 575.98px) {
      margin-bottom: 6px;
    }
  }

  &__mark-icon {
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 10px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -moz-box;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    box-orient: vertical;
    @media (max-width: 575.98px) {
      font-size: 18px;
    }
  }

  &__descr {
    font-size: 18px;
    margin-bottom: 37px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -moz-box;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    box-orient: vertical;
    flex: 1 1 auto;
    @media (max-width: 575.98px) {
      font-size: 16px;
      margin-bottom: 15px;
    }
  }

  &__price {
    display: flex;
    align-items: center;
    column-gap: 12px;
  }

  &__sum-discount {
    font-size: 24px;
    margin-right: 17px;
    text-decoration-line: line-through;
  }

  &__sum {
    font-weight: 700;
    font-size: 24px;
  }

  &__price-text {
    font-size: 18px;
  }

  &__my {
    border-top: 1px dashed #000000;
    padding-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
    margin-top: 15px;
    @media (max-width: 575.98px) {
      margin-top: 10px;
      padding-top: 15px;
    }
  }
  &__btns {
    display: flex;
    align-items: center;
    column-gap: 11px;
  }

  &__button {
    width: 52px;
    height: 31px;
    border: 1px solid #000000;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.icon-pencil {
      font-size: 20px;
    }
    &.icon-eye {
      font-size: 29px;
    }
  }

  &__show-checkbox {
    position: relative;
    margin-right: 10px;
  }

  &__show-checkbox-input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  &__show-checkbox-style {
    display: block;
    width: 37px;
    height: 15px;
    background: var(--light-gray);
    border-radius: 50px;
    position: relative;
    cursor: pointer;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--black);
    }
  }

  &__show-checkbox-input:checked + .card-excursion__show-checkbox-style {
    background: #bababa;
    &::before {
      left: 17px;
    }
  }
}
</style>
