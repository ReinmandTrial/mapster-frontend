<template>
  <div class="card-town">
    <img
      v-if="town.image != null"
      :src="town.image"
      alt=""
      class="card-town__img"
    />
    <div class="card-town__content">
      <h5 class="card-town__name">{{ town.name }}</h5>
      <p class="card-town__amount-excursions" v-html="calcExcursions"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardTown',
  data() {
    return {
      // town: {
      //    name:'',
      // },
    }
  },
  computed: {
    calcExcursions: function () {
      var lastNum = this.town.excursions.toString().slice(-1),
        lastTwoNums = this.town.excursions.toString().slice(-2)
      if (lastTwoNums != 11 && lastNum == 1) {
        return this.town.excursions + ' экскурсия'
      } else if (
        (lastNum == 2 || lastNum == 3 || lastNum == 4) &&
        lastTwoNums != 12 &&
        lastTwoNums != 13 &&
        lastTwoNums != 14
      ) {
        return this.town.excursions + ' экскурсии'
      } else {
        return this.town.excursions + ' экскурсий'
      }
    },
  },
  methods: {},
  props: {
    town: {
      default() {
        return {
          name: 'some name',
          excursions: 0,
          image: null,
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.card-town {
  width: 100%;
  height: 0;
  padding-bottom: 91%;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  @media (max-width: 575.98px) {
    border-radius: 8px;
  }
  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  &__content {
    position: absolute;
    z-index: 5;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    color: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px 20px;
    @media (max-width: 575.98px) {
      padding: 7px 15px;
    }
  }

  &__name {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 2px;
    @media (max-width: 575.98px) {
      font-size: 20px;
    }
  }

  &__amount-excursions {
    font-weight: 600;
    font-size: 18px;
    @media (max-width: 575.98px) {
      font-size: 16px;
    }
  }
}
</style>
