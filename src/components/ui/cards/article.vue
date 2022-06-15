<template>
  <div class="card-article">
    <div class="card-article__image">
      <img
        v-if="image.data != ''"
        :src="'data:image/' + fixFormat + ';base64,' + image.data"
        alt=""
      />
    </div>
    <div class="card-article__text">
      <h4 class="card-article__title" v-html="article.title"></h4>
      <div class="card-article__row">
        <p class="card-article__date" v-html="newDate"></p>
        <p class="card-article__type" v-html="type">some type</p>
      </div>
      <p class="card-article__descr" v-html="article.short_description"></p>
    </div>
  </div>
</template>

<script>
import axiosConfig from '../../../api/instance'

export default {
  name: 'CardArticle',
  data() {
    return {
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
      type: 'Путешествия',
    }
  },
  props: {
    article: {
      default() {
        return {
          id: null,
          date: '-',
          owner: null,
          title: null,
          short_description: null,
          text: null,
          active: null,

          user: {
            id: null,
            privilegies: null,
            first_name: null,
            middle_name: null,
            last_name: null,
            email: null,
            phone: null,
            passport: null,
            timezone: null,
          },
        }
      },
    },
  },
  methods: {
    async getImage() {
      await axiosConfig
        .get(`/blog/media/${this.article.id}`)
        .then((response) => {
          this.image = response.data.data[0]
        })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
  computed: {
    fixFormat() {
      return this.image.extension.slice(1)
    },
    newDate() {
      const oldDate = this.article.date

      const year = oldDate.slice(0, 4)
      const month = oldDate.slice(5, 7)
      const day = oldDate.slice(8, 10)

      return month + '.' + day + '.' + year
    },
  },
  mounted() {
    this.getImage()
  },
}
</script>

<style lang="scss" scoped>
.card-article {
  border-radius: 10px 10px 0px 0px;
  background: var(--white);
  overflow: hidden;
  &__image {
    position: relative;
    height: 0;
    width: 100%;
    padding-bottom: 82%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__text {
    padding: 9px 15px 23px;
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 1.12;
    margin-bottom: 8px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -moz-box;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    box-orient: vertical;
    // word-break: break-all;
    @media (max-width: 575.98px) {
      font-size: 20px;
      margin-bottom: 5px;
    }
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--gray);
    font-size: 12px;
    flex: none;
    line-height: 1.75;
    margin-bottom: 17px;
  }

  &__date {
  }

  &__type {
  }

  &__descr {
    font-size: 14px;
    line-height: 1.5;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -moz-box;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    box-orient: vertical;
    // word-break: break-all;
    @media (max-width: 575.98px) {
      font-size: 12px;
      line-height: 1.75;
    }
  }
}
</style>
