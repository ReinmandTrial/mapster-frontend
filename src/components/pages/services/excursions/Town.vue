<template>
  <div class="excursions-city">
    <div class="excursions-in-city__head head-city">
      <div class="container-xl">
        <div class="head-city__content">
          <div class="head-city__title">
            {{
              $t('excursions.client.city.banner.title', {
                city: current_city,
              })
            }}
          </div>
          <div
            class="head-city__sub-title"
            v-html="calcExcursions(excurtions_count)"
          ></div>
          <div class="head-city__description">
            {{
              $t('excursions.client.city.banner.descr', {
                min_price: min_price,
              })
            }}
          </div>
          <div class="filter-post__content filter-post__content_mob">
            <div class="filter-post__list filter-post__list_mob">
              <button
                v-if="tags.length"
                type="button"
                class="filter-post__item filter-post__item_mob"
              >
                {{ $t('excursions.client.city.tags.all') }}
                {{ excurtions_count }}
              </button>
              <button
                type="button"
                class="filter-post__item filter-post__item_mob"
                v-for="(tag, index) in tags"
                :key="index"
                @click="searchByTags(tag)"
                :class="{ active: tag.checked }"
                v-show="index < tags_limit || tags_limit == null"
              >
                {{ tag.tag }} {{ tag.count }}
              </button>
              <button
                v-if="tags.length > tags_limit && tags_limit != null"
                @click="tags_limit = null"
                type="button"
                class="filter-post__item filter-post__item_mob"
              >
                {{ $t('excursions.client.city.tags.more') }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="head-city__bg">
        <img
          v-if="banner_image.data.length"
          :src="'data:image/jpg;base64,' + banner_image.data"
          alt=""
        />
      </div>
    </div>
    <div class="excursions-in-city__filter-post filter-post">
      <div class="container-xl">
        <div class="filter-post__content">
          <div class="filter-post__list">
            <button
              v-if="tags.length"
              type="button"
              @click="crearTags()"
              class="filter-post__item"
              :class="{ active: tags_all_checked }"
            >
              {{ $t('excursions.client.city.tags.all') }} {{ excurtions_count }}
            </button>
            <button
              type="button"
              class="filter-post__item"
              v-for="(tag, index) in tags"
              :key="index"
              @click="searchByTags(tag)"
              :class="{ active: tag.checked }"
              v-show="index < tags_limit || tags_limit == null"
            >
              {{ tag.tag }} {{ tag.count }}
            </button>
            <button
              v-if="tags.length > tags_limit && tags_limit != null"
              @click="tags_limit = null"
              type="button"
              class="filter-post__item"
            >
              {{ $t('excursions.client.city.tags.more') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="excursions-in-city__deep-options deep-options">
      <div class="container-xl">
        <div class="deep-options__content">
          <div class="deep-options__list">
            <div
              class="deep-options__item"
              v-click-outside="hideFilterDate"
              :class="{ active: filter_date }"
            >
              <button
                type="button"
                class="deep-options__item-head"
                @click="filter_date = !filter_date"
              >
                <span class="deep-options__icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1_8877)">
                      <path
                        d="M22 2.25001H18.75V0.750012C18.7501 0.551099 18.6712 0.360281 18.5307 0.219535C18.3901 0.0787893 18.1994 -0.000355495 18.0005 -0.000488103C17.8016 -0.000620711 17.6108 0.0782697 17.47 0.218828C17.3293 0.359387 17.2501 0.550099 17.25 0.749012V2.25001H12.75V0.750012C12.7501 0.65152 12.7307 0.553981 12.6931 0.462961C12.6555 0.371942 12.6003 0.289226 12.5307 0.219535C12.4611 0.149845 12.3784 0.0945453 12.2875 0.0567936C12.1965 0.0190419 12.099 -0.000422453 12.0005 -0.000488114C11.8016 -0.000620723 11.6108 0.0782697 11.47 0.218828C11.3293 0.359387 11.2501 0.550099 11.25 0.749012V2.25001H6.75V0.750012C6.75007 0.65152 6.73073 0.553981 6.6931 0.462961C6.65547 0.371942 6.60028 0.289226 6.53068 0.219535C6.46109 0.149845 6.37844 0.0945453 6.28747 0.0567936C6.19651 0.0190419 6.09899 -0.000422453 6.0005 -0.000488114C5.80159 -0.000620723 5.61077 0.0782697 5.47002 0.218828C5.32928 0.359387 5.25013 0.550099 5.25 0.749012V2.25001H2C1.46974 2.25001 0.961184 2.46059 0.58614 2.83544C0.211096 3.2103 0.00026513 3.71875 0 4.24901V21.999C0 22.5294 0.210714 23.0382 0.585786 23.4132C0.960859 23.7883 1.46957 23.999 2 23.999H22C22.5304 23.999 23.0391 23.7883 23.4142 23.4132C23.7893 23.0382 24 22.5294 24 21.999V4.24901C23.9997 3.71875 23.7889 3.2103 23.4139 2.83544C23.0388 2.46059 22.5303 2.25001 22 2.25001ZM22.5 22C22.5 22.1324 22.4475 22.2595 22.3539 22.3532C22.2604 22.447 22.1334 22.4997 22.001 22.5H2C1.86739 22.5 1.74021 22.4473 1.64645 22.3536C1.55268 22.2598 1.5 22.1326 1.5 22V4.25001C1.50026 4.11758 1.55306 3.99066 1.6468 3.8971C1.74054 3.80355 1.86756 3.75101 2 3.75101H5.25V5.25101C5.24987 5.44992 5.32876 5.64074 5.46932 5.78149C5.60988 5.92223 5.80059 6.00138 5.9995 6.00151C6.19841 6.00164 6.38923 5.92275 6.52998 5.7822C6.67072 5.64164 6.74987 5.45092 6.75 5.25201V3.75101H11.25V5.25101C11.2499 5.44992 11.3288 5.64074 11.4693 5.78149C11.6099 5.92223 11.8006 6.00138 11.9995 6.00151C12.1984 6.00164 12.3892 5.92275 12.53 5.7822C12.6707 5.64164 12.7499 5.45092 12.75 5.25201V3.75101H17.25V5.25101C17.2499 5.44992 17.3288 5.64074 17.4693 5.78149C17.6099 5.92223 17.8006 6.00138 17.9995 6.00151C18.1984 6.00164 18.3892 5.92275 18.53 5.7822C18.6707 5.64164 18.7499 5.45092 18.75 5.25201V3.75101H22C22.1323 3.75128 22.259 3.80393 22.3526 3.89746C22.4461 3.99098 22.4987 4.11775 22.499 4.25001L22.5 22Z"
                        fill="black"
                      />
                      <path
                        d="M5.25 9H8.25V11.25H5.25V9ZM5.25 12.75H8.25V15H5.25V12.75ZM5.25 16.5H8.25V18.75H5.25V16.5ZM10.5 16.5H13.5V18.75H10.5V16.5ZM10.5 12.75H13.5V15H10.5V12.75ZM10.5 9H13.5V11.25H10.5V9ZM15.75 16.5H18.75V18.75H15.75V16.5ZM15.75 12.75H18.75V15H15.75V12.75ZM15.75 9H18.75V11.25H15.75V9Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_8877">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <p class="deep-options__name">
                  {{ $t('excursions.client.city.filter.date') }}
                </p>
                <span class="deep-options__arr icon icon-triangle-down"></span>
              </button>
              <div
                v-if="filter_date"
                class="deep-options__drop-price drop-date"
              >
                <date-picker
                  v-model="datepicker"
                  :editable="false"
                  :clearable="false"
                  :append-to-body="false"
                  :popup-style="{ position: 'static', width: 'fit-content' }"
                  :popup-class="['datepicker']"
                  :input-class="['datepicker__input']"
                  :open="true"
                  :lang="langDatepicker"
                  @input="setDate()"
                  :title-format="'DD-MM-YYYY'"
                ></date-picker>
              </div>
            </div>
            <div
              class="deep-options__item"
              v-click-outside="hideFilterPeople"
              :class="{ active: filter_people }"
            >
              <button
                type="button"
                class="deep-options__item-head"
                @click="filter_people = !filter_people"
              >
                <span class="deep-options__icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.5 21C22.5 21 24 21 24 19.5C24 18 22.5 13.5 16.5 13.5C10.5 13.5 9 18 9 19.5C9 21 10.5 21 10.5 21H22.5ZM10.533 19.5C10.5219 19.4985 10.5109 19.4965 10.5 19.494C10.5015 19.098 10.7505 17.949 11.64 16.914C12.468 15.9435 13.923 15 16.5 15C19.0755 15 20.5305 15.945 21.36 16.914C22.2495 17.949 22.497 19.0995 22.5 19.494L22.488 19.497C22.481 19.4982 22.474 19.4992 22.467 19.5H10.533ZM16.5 10.5C17.2956 10.5 18.0587 10.1839 18.6213 9.62132C19.1839 9.05871 19.5 8.29565 19.5 7.5C19.5 6.70435 19.1839 5.94129 18.6213 5.37868C18.0587 4.81607 17.2956 4.5 16.5 4.5C15.7044 4.5 14.9413 4.81607 14.3787 5.37868C13.8161 5.94129 13.5 6.70435 13.5 7.5C13.5 8.29565 13.8161 9.05871 14.3787 9.62132C14.9413 10.1839 15.7044 10.5 16.5 10.5ZM21 7.5C21 8.09095 20.8836 8.67611 20.6575 9.22208C20.4313 9.76804 20.0998 10.2641 19.682 10.682C19.2641 11.0998 18.768 11.4313 18.2221 11.6575C17.6761 11.8836 17.0909 12 16.5 12C15.9091 12 15.3239 11.8836 14.7779 11.6575C14.232 11.4313 13.7359 11.0998 13.318 10.682C12.9002 10.2641 12.5687 9.76804 12.3425 9.22208C12.1164 8.67611 12 8.09095 12 7.5C12 6.30653 12.4741 5.16193 13.318 4.31802C14.1619 3.47411 15.3065 3 16.5 3C17.6935 3 18.8381 3.47411 19.682 4.31802C20.5259 5.16193 21 6.30653 21 7.5ZM10.404 13.92C9.80397 13.7311 9.18545 13.6069 8.559 13.5495C8.207 13.516 7.85359 13.4995 7.5 13.5C1.5 13.5 0 18 0 19.5C0 20.5005 0.4995 21 1.5 21H7.824C7.60163 20.5317 7.49074 20.0183 7.5 19.5C7.5 17.985 8.0655 16.437 9.135 15.144C9.4995 14.703 9.924 14.2905 10.404 13.92ZM7.38 15C6.49223 16.3339 6.01266 17.8977 6 19.5H1.5C1.5 19.11 1.746 17.955 2.64 16.914C3.4575 15.96 4.878 15.03 7.38 15.0015V15ZM2.25 8.25C2.25 7.05653 2.72411 5.91193 3.56802 5.06802C4.41193 4.22411 5.55653 3.75 6.75 3.75C7.94347 3.75 9.08807 4.22411 9.93198 5.06802C10.7759 5.91193 11.25 7.05653 11.25 8.25C11.25 9.44347 10.7759 10.5881 9.93198 11.432C9.08807 12.2759 7.94347 12.75 6.75 12.75C5.55653 12.75 4.41193 12.2759 3.56802 11.432C2.72411 10.5881 2.25 9.44347 2.25 8.25ZM6.75 5.25C5.95435 5.25 5.19129 5.56607 4.62868 6.12868C4.06607 6.69129 3.75 7.45435 3.75 8.25C3.75 9.04565 4.06607 9.80871 4.62868 10.3713C5.19129 10.9339 5.95435 11.25 6.75 11.25C7.54565 11.25 8.30871 10.9339 8.87132 10.3713C9.43393 9.80871 9.75 9.04565 9.75 8.25C9.75 7.45435 9.43393 6.69129 8.87132 6.12868C8.30871 5.56607 7.54565 5.25 6.75 5.25Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <p class="deep-options__name">
                  {{ $t('excursions.client.city.filter.people.title') }}
                </p>
                <span class="deep-options__arr icon icon-triangle-down"></span>
              </button>
              <div
                v-if="filter_people"
                class="deep-options__drop-people drop-people"
              >
                <p class="drop-people__title">
                  {{ $t('excursions.client.city.filter.people.subtitle') }}
                </p>
                <div class="drop-people__counter">
                  <button
                    type="button"
                    @click="filerPeopleCountMinus"
                    class="drop-people__sub"
                    :disabled="filter_people_count == 1"
                  ></button>
                  <input
                    type="text"
                    class="drop-people__result"
                    v-model="filter_people_count"
                    disabled
                  />
                  <button
                    type="button"
                    @click="filerPeopleCountPlus"
                    class="drop-people__add"
                    :disabled="filter_people_count == 1000"
                  ></button>
                </div>
              </div>
            </div>
            <div
              class="deep-options__item"
              v-click-outside="hideFilterPrice"
              :class="{ active: filter_price }"
            >
              <button
                @click="filter_price = !filter_price"
                type="button"
                class="deep-options__item-head"
              >
                <span class="deep-options__icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.2 17.41C18.6674 18.1822 17.9611 18.8188 17.1379 19.2686C16.3147 19.7184 15.3975 19.9689 14.46 20C11.78 20 9.46 18 8.46 15H14C14.2652 15 14.5196 14.8946 14.7071 14.7071C14.8946 14.5196 15 14.2652 15 14C15 13.7348 14.8946 13.4804 14.7071 13.2929C14.5196 13.1054 14.2652 13 14 13H8.05C8.05 12.67 8 12.33 8 12C8 11.67 8 11.33 8.05 11H14C14.2652 11 14.5196 10.8946 14.7071 10.7071C14.8946 10.5196 15 10.2652 15 10C15 9.73478 14.8946 9.48043 14.7071 9.29289C14.5196 9.10536 14.2652 9 14 9H8.47C9.47 6 11.78 4 14.47 4C15.4058 4.03267 16.321 4.28392 17.1424 4.73366C17.9637 5.1834 18.6684 5.81913 19.2 6.59C19.2706 6.71152 19.366 6.8168 19.48 6.89898C19.5939 6.98116 19.724 7.03839 19.8616 7.06694C19.9992 7.09549 20.1412 7.09472 20.2785 7.06468C20.4158 7.03464 20.5452 6.976 20.6583 6.8926C20.7714 6.80919 20.8656 6.70288 20.9349 6.58061C21.0041 6.45833 21.0468 6.32283 21.0602 6.18294C21.0736 6.04305 21.0573 5.90192 21.0125 5.76874C20.9676 5.63556 20.8952 5.51332 20.8 5.41C20.0877 4.38118 19.1418 3.53577 18.0398 2.94304C16.9378 2.35031 15.711 2.02714 14.46 2C10.7 2 7.46 4.84 6.39 9H4C3.73478 9 3.48043 9.10536 3.29289 9.29289C3.10536 9.48043 3 9.73478 3 10C3 10.2652 3.10536 10.5196 3.29289 10.7071C3.48043 10.8946 3.73478 11 4 11H6.05V13H4C3.73478 13 3.48043 13.1054 3.29289 13.2929C3.10536 13.4804 3 13.7348 3 14C3 14.2652 3.10536 14.5196 3.29289 14.7071C3.48043 14.8946 3.73478 15 4 15H6.39C7.48 19.16 10.7 22 14.46 22C15.711 21.9729 16.9378 21.6497 18.0398 21.057C19.1418 20.4642 20.0877 19.6188 20.8 18.59C20.9237 18.377 20.9644 18.1258 20.9144 17.8846C20.8643 17.6434 20.727 17.4292 20.5288 17.283C20.3305 17.1368 20.0853 17.0689 19.8401 17.0923C19.5949 17.1158 19.367 17.2289 19.2 17.41Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <p class="deep-options__name">
                  {{ $t('excursions.client.city.filter.price.title') }}
                </p>
                <span class="deep-options__arr icon icon-triangle-down"></span>
              </button>
              <div
                v-if="filter_price"
                class="deep-options__drop-price drop-price"
              >
                <h4 class="drop-price__title">
                  {{ $t('excursions.client.city.filter.price.subtitle') }}
                </h4>
                <div class="drop-price__price">
                  <p class="drop-price__from">
                    {{
                      $t('excursions.client.city.filter.price.from') +
                      '€ ' +
                      range_slider_value[0]
                    }}
                  </p>
                  <p class="drop-price__to">
                    {{
                      $t('excursions.client.city.filter.price.to') +
                      '€ ' +
                      range_slider_value[1]
                    }}
                  </p>
                </div>
                <vue-slider
                  class="drop-price__slider"
                  v-model="range_slider_value"
                  :min="range_slider_min_const"
                  :max="range_slider_max_const"
                  :order="false"
                  :tooltip="'none'"
                  :rail-style="{ background: '#ECECEC', height: '3px' }"
                  :process-style="{ background: '#41B619' }"
                  :dot-size="20"
                  :dot-style="{
                    background: '#41B619',
                    border: 'none',
                  }"
                  @drag-end="getSliderValue(range_slider_value)"
                />
              </div>
            </div>
            <div
              class="deep-options__item"
              v-click-outside="hideFilterMove"
              :class="{ active: filter_move }"
            >
              <button
                @click="filter_move = !filter_move"
                type="button"
                class="deep-options__item-head"
              >
                <p class="deep-options__name">
                  <span class="deep-options__pc-text">
                    {{ $t('excursions.client.city.filter.move.title') }}
                  </span>
                  <span class="deep-options__mob-text">
                    {{ $t('excursions.client.city.filter.move.title_mobile') }}
                  </span>
                </p>
                <span class="deep-options__arr icon icon-triangle-down"></span>
              </button>

              <div v-if="filter_move" class="deep-options__drop-move drop-move">
                <div class="drop-move__top-line">
                  <div class="drop-move__title">
                    {{ $t('excursions.client.city.filter.move.subtitle') }}
                  </div>
                  <label class="drop-move__any">
                    <span class="drop-move__any-name">
                      {{ $t('excursions.client.city.filter.move.any') }}
                    </span>
                    <input
                      class="drop-move__any-input"
                      type="checkbox"
                      name="any"
                      @change="selectMoveType($event)"
                      v-model="filter_any_move"
                      ref="inputAnyMove"
                    />
                    <span class="drop-move__any-style"></span>
                  </label>
                </div>
                <div class="drop-move__bottom-line">
                  <label class="drop-move__onfoot">
                    <span class="drop-move__onfoot-name">
                      {{ $t('excursions.client.city.filter.move.onfoot') }}
                    </span>
                    <input
                      class="drop-move__onfoot-input"
                      type="checkbox"
                      name="onfoot"
                      @change="selectMoveType($event)"
                      v-model="filter_on_foot"
                      ref="inputOnFoot"
                    />
                    <span class="drop-move__onfoot-style"></span>
                  </label>
                  <label class="drop-move__bycar">
                    <span class="drop-move__bycar-name">
                      {{ $t('excursions.client.city.filter.move.car') }}
                    </span>
                    <input
                      class="drop-move__bycar-input"
                      type="checkbox"
                      name="bycar"
                      @change="selectMoveType($event)"
                      v-model="filter_by_car"
                      ref="inputByCar"
                    />
                    <span class="drop-move__bycar-style"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="deep-options__select">
            <button
              type="button"
              class="deep-options__select-item"
              @click="changeSortingType($event)"
              ref="sortByPopular"
              :class="{ active: sort_popular }"
            >
              {{ $t('excursions.client.city.sort.popular') }}
            </button>
            <button
              type="button"
              class="deep-options__select-item"
              @click="changeSortingType($event)"
              ref="sortByPrice"
              :class="{ active: !sort_popular }"
            >
              {{ $t('excursions.client.city.sort.by_price') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="excursions-city__excursions">
      <div class="container-xl">
        <div class="excursions-city__excursions-content">
          <h2 class="excursions-city__subtitle">
            {{
              $t('excursions.client.city.subtitle', {
                city: current_city,
              })
            }}
          </h2>
          <h3 v-if="excursions.length == 0">
            {{ $t('excursions.client.city.not_found') }}
          </h3>
          <div
            v-if="excursions.langth != 0"
            class="excursions-city__excursions-wrap"
          >
            <card-excursion
              v-for="(excursion, index) in excursions"
              :key="index"
              :excursion="excursion"
            />
          </div>
          <button
            class="excursions-city__excursions-more"
            v-if="show_btn_more"
            @click="moreExcursions()"
            v-html="forMobile()"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardExcursion from '../../../ui/cards/excursion.vue'
import axiosConfig from '../../../../api/instance'
import ClickOutside from 'vue-click-outside'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
  name: 'ExcursionsTown',
  components: {
    CardExcursion,
    VueSlider,
    DatePicker,
  },
  directives: {
    ClickOutside,
  },
  data() {
    return {
      current_country: 'Франция',
      current_city: 'Париж',
      excurtions_count: 0,
      min_price: '€',
      banner_image: {
        data: [],
      },
      amount_excursions: 6,
      excursions: [],
      show_btn_more: true,
      tags: [],
      tags_all_checked: true,
      tags_limit: 7,
      sort_by_tag: '',
      filter_date: false,
      filter_people: false,
      filter_price: false,
      filter_move: false,
      filter_people_count: 1,
      sort_by_people: '',
      filter_any_move: true,
      filter_on_foot: true,
      filter_by_car: true,
      sort_by_moves: '',
      range_slider_min_const: 0,
      range_slider_max_const: 100,
      range_slider_min: 0,
      range_slider_max: 100,
      range_slider_value: [10, 50],
      sort_by_price: '',
      sort_popular: true,
      sort_by_popular: '',
      datepicker: null,
      datepicker_ru: {
        // the locale of formatting and parsing function
        formatLocale: {
          // MMMM
          months: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
          ],
          // MMM
          monthsShort: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июнь',
            'Июль',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
          ],
          // dddd
          weekdays: [
            'Понедельник',
            'Вторник',
            'Среда',
            'Черверг',
            'Пятница',
            'Суббота',
            'Воскресенье',
          ],
          // ddd
          weekdaysShort: ['Пнд', 'Втр', 'Сре', 'Чтв', 'Птн', 'Суб', 'Вск'],
          // dd
          weekdaysMin: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
          // first day of week
          firstDayOfWeek: 0,
          // first week contains January 1st.
          firstWeekContainsDate: 1,
        },
      },
      datepicker_en: {
        formatLocale: {
          // MMMM
          months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          // MMM
          monthsShort: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          // dddd
          weekdays: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          // ddd
          weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          // dd
          weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          // first day of week
          firstDayOfWeek: 0,
          // first week contains January 1st.
          firstWeekContainsDate: 1,
        },
      },
      sort_by_date: '',
    }
  },
  methods: {
    forMobile() {
      if (window.innerWidth < 575) {
        return this.$t('excursions.client.home.show_more.mobile')
      } else {
        return this.$t('excursions.client.home.show_more.desktop')
      }
    },
    async getBannerImage() {
      await axiosConfig
        .get(`/enums/cityphoto?country=${this.current_country}`)
        .then((response) => {
          if (response.data.data[0]) {
            this.banner_image = response.data.data[0]
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async getTags() {
      await axiosConfig
        .get(
          `/guide/tags?owner__city=${this.current_city}&owner__country=${this.current_country}`,
        )
        .then((response) => {
          const data = response.data.data
          data.forEach((obj, index) => {
            obj.checked = false

            this.$set(this.tags, index, obj)
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    searchByTags(tag) {
      if (tag.checked == false) {
        this.tags.forEach((tag) => {
          tag.checked = false
        })
        this.tags_all_checked = false
        tag.checked = true
        this.sort_by_tag = `&tags__tag=${tag.tag}`
      } else {
        tag.checked = false
        this.sort_by_tag = ''
        this.tags_all_checked = true
      }
      // var resultString = ''
      // this.tags.forEach((tag) => {
      //   if (tag.checked == true) {
      // resultString = `&tags__tag=${tag.tag}`
      //   }
      // })
      // console.log(resultString)
      this.getExcursions()
    },
    crearTags() {
      this.sort_by_tag = ''
      this.tags.forEach((tag) => {
        tag.checked = false
      })
      this.tags_all_checked = true
      this.getExcursions()
    },
    hideFilterDate() {
      this.filter_date = false
    },
    hideFilterPeople() {
      this.filter_people = false
    },
    hideFilterPrice() {
      this.filter_price = false
    },
    hideFilterMove() {
      this.filter_move = false
    },
    filerPeopleCountMinus() {
      this.filter_people_count--

      const oldCount = this.filter_people_count
      setTimeout(() => {
        if (oldCount == this.filter_people_count) {
          this.sort_by_people = `&number__gte=${this.filter_people_count}`
          this.getExcursions()
        }
      }, 1000)
    },
    filerPeopleCountPlus() {
      this.filter_people_count++

      const oldCount = this.filter_people_count
      setTimeout(() => {
        if (oldCount == this.filter_people_count) {
          this.sort_by_people = `&number__gte=${this.filter_people_count}`
          this.getExcursions()
        }
      }, 1000)
    },
    selectMoveType(e) {
      // if (e.target == this.$refs.inputByCar) {
      //   if (this.filter_by_car == false && this.filter_on_foot == false) {
      //     this.filter_on_foot = true
      //   }
      // } else if (e.target == this.$refs.inputOnFoot) {
      //   if (this.filter_on_foot == false && this.filter_by_car == false) {
      //     this.filter_by_car = true
      //   }
      // } else
      if (e.target == this.$refs.inputAnyMove) {
        if (this.filter_any_move == true) {
          this.filter_on_foot = true
          this.filter_by_car = true
        } else {
          this.filter_by_car = false
        }
      }
      if (this.filter_on_foot == true && this.filter_by_car == true) {
        this.filter_any_move = true
      } else if (this.filter_on_foot == false || this.filter_by_car == false) {
        this.filter_any_move = false
      }

      if (this.filter_by_car == this.filter_on_foot) {
        this.sort_by_moves = ''
      } else if (this.filter_by_car == true) {
        this.sort_by_moves = `&moves=car`
      } else if (this.filter_on_foot == true) {
        this.sort_by_moves = `&moves=onfoot`
      }
      this.getExcursions()
      // console.log(this.sort_by_moves)
    },
    async getExcursions() {
      await axiosConfig
        .get(
          `/guide?country=${this.current_country}&city=${this.current_city}&limit=${this.amount_excursions}${this.sort_by_tag}${this.sort_by_people}${this.sort_by_moves}${this.sort_by_price}${this.sort_by_popular}${this.sort_by_date}`,
        )
        .then((response) => {
          this.excursions = response.data.data
          // console.log(response.data.data)
          this.amount_excursions = 6
        })
        .catch(function (error) {
          console.log(error)
        })
      this.moreExcursionsBtnVisibility()
    },
    moreExcursionsBtnVisibility() {
      if (this.amount_excursions > this.excursions.length) {
        this.show_btn_more = false
      } else {
        this.show_btn_more = true
      }
    },
    async moreExcursions() {
      this.amount_excursions += 6

      await this.getExcursions()
      this.moreExcursionsBtnVisibility()
    },
    calcExcursions(amount) {
      var lastNum = amount.toString().slice(-1),
        lastTwoNums = amount.toString().slice(-2)
      if (lastTwoNums != 11 && lastNum == 1) {
        return amount + this.$t('excursions.client.amount_excursions.one')
      } else if (
        (lastNum == 2 || lastNum == 3 || lastNum == 4) &&
        lastTwoNums != 12 &&
        lastTwoNums != 13 &&
        lastTwoNums != 14
      ) {
        return (
          amount + this.$t('excursions.client.amount_excursions.two_to_four')
        )
      } else {
        return amount + this.$t('excursions.client.amount_excursions.another')
      }
    },
    async setCountExcursionsInCountry() {
      await axiosConfig
        .get(
          `/guide/count/all?country=${this.current_country}&city=${this.current_city}`,
        )
        .then((response) => {
          const data = response.data.data

          if (data.length) {
            data.forEach((element) => {
              this.excurtions_count += element.count
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async setMinPrice() {
      await axiosConfig
        .get(
          `/guide?country=${this.current_country}&city=${this.current_city}&limit=1&sort_min_price=1`,
        )
        .then((response) => {
          const data = response.data.data

          if (data.length) {
            this.min_price = '€' + data[0].min_price
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async setRangeSliderValues() {
      await axiosConfig
        .get(
          `/guide?country=${this.current_country}&city=${this.current_city}&limit=1&sort_min_price=1`,
        )
        .then((response) => {
          const newMin = response.data.data[0].min_price.toFixed(0)
          this.range_slider_min_const = Number(newMin)
          this.range_slider_min = Number(newMin)
        })
        .catch(function (error) {
          console.log(error)
        })
      await axiosConfig
        .get(
          `/guide?country=${this.current_country}&city=${this.current_city}&limit=1&sort_min_price=0`,
        )
        .then((response) => {
          const newMax = response.data.data[0].min_price.toFixed(0)
          // console.log(newMax)

          this.range_slider_max_const = Number(newMax)
          this.range_slider_max = Number(newMax)

          // this.range_slider_max = 200
        })
        .catch(function (error) {
          console.log(error)
        })

      this.range_slider_value = [this.range_slider_min, this.range_slider_max]
    },
    getSliderValue(params) {
      if (
        params[1] == this.range_slider_max_const &&
        params[0] == this.range_slider_min_const
      ) {
        this.sort_by_price = ``
      } else if (params[1] == this.range_slider_max_const) {
        this.sort_by_price = `&min_price__gte=${params[0]}`
      } else if (params[0] == this.range_slider_min_const) {
        this.sort_by_price = `&min_price__lte=${params[1]}`
      } else {
        this.sort_by_price = `&min_price__gte=${params[0]}&min_price__lte=${params[1]}`
      }

      this.getExcursions()
    },
    changeSortingType(e) {
      if (e.target == this.$refs.sortByPopular) {
        this.sort_popular = true
        this.sort_by_popular = ''
      } else if (e.target == this.$refs.sortByPrice) {
        this.sort_popular = false
        this.sort_by_popular = '&sort_min_price=1'
      }
      // console.log(this.sort_by_popular)

      this.getExcursions()
    },
    setDate() {
      // console.log(this.datepicker)

      const startDateArr = this.datepicker.toISOString().slice(0, 10).split('-')
      // console.log(startDateArr)

      // const endDateArr = this.datepicker[1]
      //   .toISOString()
      //   .slice(0, 10)
      //   .split('-')
      const startDate =
        startDateArr[2] + '-' + startDateArr[1] + '-' + startDateArr[0]
      // const endDate = endDateArr[2] + '-' + endDateArr[1] + '-' + endDateArr[0]
      this.sort_by_date = `&end_expire=${startDate}`
      this.getExcursions()
    },
  },
  computed: {
    langDatepicker() {
      if (this.$i18n.locale == 'ru') {
        return this.datepicker_ru
      } else {
        return this.datepicker_en
      }
    },
  },
  created() {
    const country = this.$route.params.country_name
    if (country) {
      this.current_country = country
    }
    const city = this.$route.params.city_name
    if (city) {
      this.current_city = city
    }
  },
  async mounted() {
    this.getBannerImage()
    this.setCountExcursionsInCountry()
    this.getTags()
    this.getExcursions()
    this.setMinPrice()
    await this.setRangeSliderValues()
    if (window.innerWidth < 768) {
      this.tags_limit = null
    }
    this.moreExcursionsBtnVisibility()
  },
}
</script>

<style lang="scss">
.excursions-city {
  background: var(--light-gray);

  &__banner {
    position: relative;
    margin-top: -136px;
    padding-top: 156px;
    padding-bottom: 100px;
    padding-left: 45px;
    padding-right: 45px;
    min-height: 100vh;
    color: var(--white);
    background: #023047;

    // @media (min-height: 770px) {
    //   min-height: 770px;
    // }
    @media (max-width: 991.98px) {
      padding-left: unset;
      padding-right: unset;
    }
    @media (max-width: 767.98px) {
      margin-top: unset;
      padding-top: 55px;
      min-height: calc(100vw * 0.76);
    }
    @media (max-width: 575.98px) {
      // min-height: unset;
      // height: 390px;
      height: calc(100vw * 0.76);

      padding-bottom: unset;
    }
    &-bg--tablet {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      @media (max-width: 767.98px) {
        display: none;
      }
    }
    &-bg--mobile {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      @media (min-width: 768px) {
        display: none;
      }
      @media (max-width: 575.98px) {
        height: 100%;
      }
    }
  }
  .container-xl {
    position: relative;
    z-index: 10;
    height: 100%;
  }

  &__title {
    font-weight: 700;
    font-size: 48px;
    text-transform: uppercase;
    margin-bottom: 5px;
    @media (max-width: 575.98px) {
      font-size: 18px;
      margin-bottom: 7px;
    }
  }

  &__descr {
    font-weight: 600;
    font-size: 24px;
    letter-spacing: 0.4px;
    @media (max-width: 575.98px) {
      font-size: 14px;
    }
  }

  &__towns {
    padding-top: 67px;
    padding-bottom: 35px;
    @media (max-width: 575.98px) {
      padding-top: 144px;
      padding-bottom: 78px;
      background: #023047
        url('~@/assets/images/servises/excursions/patterns.png') center -380px/
        100% auto no-repeat;
      .excursions-city__subtitle {
        color: var(--white);
      }
    }
  }

  &__subtitle {
    font-weight: 700;
    font-size: 24px;
    text-transform: uppercase;
    margin-bottom: 35px;
    @media (max-width: 575.98px) {
      font-size: 18px;
      margin-bottom: 15px;
    }
  }
  &__excursions {
    padding: 50px 0 80px;
    @media (max-width: 575.98px) {
      padding: 25px 0 50px;
    }
  }
  &__excursions-wrap {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 41px;
    @media (max-width: 1199.98px) {
      gap: 20px;
    }
    @media (max-width: 1099.98px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 767.98px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  &__excursions-more {
    display: block;
    padding: 10px 7px;
    max-width: 280px;
    width: 100%;
    background: var(--light-green);
    font-weight: 600;
    font-size: 18px;
    text-transform: uppercase;
    border-radius: 5px;
    margin: 24px auto 0;
    @media (max-width: 575.98px) {
      background: none;
      padding: unset;
      width: fit-content;
      text-transform: none;
      margin: 20px 17px 0 auto;
    }
  }
}
.head-city {
  position: relative;
  margin-top: -136px;
  @media (max-width: 575.98px) {
    margin-top: -123px;
  }
  @media (min-width: 1500px) {
    max-width: 1500px;
    margin-left: auto;
    margin-right: auto;
  }
  &::before {
    content: '';
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }
  &__content {
    color: var(--white);
    position: relative;
    z-index: 2;
    padding: 155px 0px 120px 0px;
    @media (max-width: 767.98px) {
      padding: 240px 0px 15px 0px;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 48px;
    line-height: 65px;
    text-transform: uppercase;
    margin-bottom: 10px;
    @media (max-width: 767.98px) {
      font-size: 18px;
      line-height: 25px;
    }
  }

  &__sub-title {
    font-weight: 700;
    font-size: 24px;
    line-height: 16px;
    letter-spacing: 0.4px;
    margin-bottom: 40px;
    @media (max-width: 767.98px) {
      font-size: 14px;
      margin-bottom: 12px;
    }
  }

  &__description {
    font-weight: 400;
    font-size: 24px;
    line-height: 33px;
    letter-spacing: 0.4px;
    @media (max-width: 767.98px) {
      display: none;
    }
  }

  &__bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    @media (max-width: 767.98px) {
      top: 123px;
      height: calc(100% - 123px);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.filter-post {
  &__content {
    @media (max-width: 767.98px) {
      display: none;
    }
    &_mob {
      display: none;
      overflow: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      @media (max-width: 767.98px) {
        display: block;
        padding: 0px 25px;
        margin: 0px -25px;
      }
    }
  }

  &__list {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    @media (max-width: 767.98px) {
      flex-wrap: nowrap;
    }
    &_mob {
    }
  }

  &__item {
    flex: 0 0 auto;
    background: #ffffff;
    border-radius: 50px;
    padding: 10px 10px;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    &_mob {
      background: transparent;
      border: 1px solid #ffffff;
      color: var(--white);
    }
    &.active {
      background: var(--light-green);
      color: var(--white);
    }
  }
}
.deep-options {
  .container-xl {
    z-index: 15;
  }
  @media (max-width: 767.98px) {
    background: #023047;
  }
  &__content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 40px;
    @media (max-width: 767.98px) {
      justify-content: center;
    }
  }

  &__list {
    display: flex;
    column-gap: 25px;
    padding-right: 20px;
    @media (max-width: 767.98px) {
      padding: 0px 0px 5px 0px;
      column-gap: 0;
      // border-bottom: 1px solid #ffffff;
    }
    @media (max-width: 380px) {
      flex-wrap: wrap;
      gap: 20px;
      justify-content: space-between;
    }
  }

  &__item {
    flex: 0 0 auto;

    position: relative;
    @media (max-width: 767.98px) {
      &:not(:last-child) {
        .deep-options__item-head {
          border-right: 1px solid #ffffff;
        }
      }
    }
    @media (max-width: 380px) {
      flex: 0 1 40%;
      &:not(:last-child) {
        .deep-options__item-head {
          border: none;
        }
      }
    }
    &.active {
      .deep-options__arr {
        transform: rotate(-180deg);
      }
    }
  }
  &__item-head {
    display: flex;
    column-gap: 10px;
    padding: 7px 8px;
    background: #ffffff;
    border: 2px solid var(--light-green);
    justify-content: center;
    align-items: center;
    @media (max-width: 767.98px) {
      border: none;
      background-color: transparent;
      color: var(--white);
      padding: 1px 5px;
      column-gap: 5px;
      height: 100%;
    }
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 767.98px) {
      svg {
        width: 20px;
        height: 20px;
      }
      path {
        fill: white;
      }
    }
  }

  &__name {
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.4px;
    @media (max-width: 767.98px) {
      font-weight: 600;
      font-size: 12px;
    }
  }
  &__pc-text {
    @media (max-width: 767.98px) {
      display: none;
    }
  }

  &__mob-text {
    display: none;
    @media (max-width: 767.98px) {
      display: block;
    }
  }

  &__arr {
    @media (max-width: 767.98px) {
      path {
        fill: white;
      }
    }
    @media (max-width: 490px) {
      display: none;
    }
    @media (max-width: 380px) {
      display: block;
    }
    &_last {
      @media (max-width: 490px) {
        display: block;
      }
    }
  }

  &__select {
    display: flex;
    column-gap: 30px;
    justify-content: center;
    align-items: center;
    @media (max-width: 767.98px) {
      display: none;
    }
  }

  &__select-item {
    font-weight: 400;
    font-size: 18px;
    line-height: 25px;
    &.active {
      font-weight: 700;
      color: var(--light-green);
    }
  }
  &__drop-people {
  }
  &__drop-move {
  }
}
.drop-date {
  position: absolute;
  left: 0;
  top: calc(100% + 10px);
  background-color: #fff;
  z-index: 10;
}
.drop-people {
  border-radius: 3px;
  position: absolute;
  width: 170px;
  height: 110px;
  left: 0;
  top: calc(100% + 10px);
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 10px 0px 25px 0px;
  text-align: center;
  color: var(--black);
  display: none;
  display: flex;
  z-index: 10;
  cursor: default;
  @media (max-width: 380px) {
    left: unset;
    right: 0;
  }
  &.open {
  }
  &__title {
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.4px;
  }

  &__counter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__sub {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 30px;
    height: 30px;
    position: relative;
    background: var(--light-green);
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 2px;
      background: var(--black);
    }
    &:disabled {
      background: #e8edf1;
      cursor: default;
    }
  }

  &__result {
    flex: 0 0 30px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  &__add {
    flex: 0 0 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: var(--light-green);
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 2px;
      background: var(--black);
    }
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(90deg);
      width: 10px;
      height: 2px;
      background: var(--black);
    }
    &:disabled {
      background: #e8edf1;
      cursor: default;
    }
  }
}
.drop-price {
  background: var(--white);
  width: 300px;
  padding: 12px 20px 25px;
  position: absolute;
  left: 0;
  top: calc(100% + 10px);
  @media (max-width: 767.98px) and(min-width:381px) {
    left: 50%;
    transform: translateX(-50%);
  }
  &__title {
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.4px;
    margin-bottom: 5px;
  }
  &__price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    letter-spacing: 0.4px;
    margin-bottom: 15px;
  }
  &__slider {
    .vue-slider-rail {
      background: var(--light-gray);
    }
  }
}

.drop-move {
  border-radius: 3px;
  width: 240px;
  height: 160px;
  position: absolute;
  background-color: #fff;
  top: calc(100% + 10px);
  left: 0;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.4px;
  padding: 8px 27px 30px 20px;
  flex-direction: column;
  justify-content: space-between;
  color: var(--black);
  display: none;
  display: flex;
  @media (max-width: 767.98px) {
    right: 0;
    left: unset;
  }
  &.open {
  }
  &__top-line {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__title {
  }

  &__any {
  }

  &__any-name {
  }

  &__any-input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  &__any-style {
    position: absolute;
    background: #e8edf1;
    border-radius: 50px;
    width: 37px;
    height: 15px;
    right: 27px;
    cursor: pointer;
    &::before {
      content: '';
      background: #a3a3a3;
      width: 20px;
      height: 20px;
      position: absolute;
      border-radius: 50%;
      top: -3px;
      left: 0px;
      transition: all 0.3s ease 0s;
    }
    .drop-move__any-input:checked + &::before {
      content: '';
      background: var(--light-green);
      left: 17px;
      transition: all 0.3s ease 0s;
    }
  }

  &__bottom-line {
    display: inline-flex;
    flex-direction: column;
    gap: 15px;
  }

  &__onfoot {
    padding-left: 30px;
    cursor: pointer;
  }

  &__onfoot-name {
  }

  &__onfoot-input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  &__onfoot-style {
    position: absolute;
    background: var(--white);
    width: 17px;
    height: 17px;
    left: 0;
    border-radius: 2px;
    margin: 0px 0px 0px 20px;
    border: 2px solid rgba(0, 0, 0, 0.87);
    box-sizing: border-box;

    .drop-move__onfoot-input:checked + & {
      background: url('~@/assets/images/svg-icons/check.svg') center center/100%
        100% no-repeat;
      border: none;
    }
  }

  &__bycar {
    padding-left: 30px;
  }

  &__bycar-name {
  }

  &__bycar-input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  &__bycar-style {
    position: absolute;
    background: var(--white);
    width: 17px;
    height: 17px;
    left: 0;
    border-radius: 3px;
    margin: 0px 0px 0px 20px;
    border: 2px solid rgba(0, 0, 0, 0.87);
    box-sizing: border-box;

    .drop-move__bycar-input:checked + & {
      background: url('~@/assets/images/svg-icons/check.svg') center center/100%
        100% no-repeat;
      border: none;
    }
  }
}

.excursions-in-city {
  height: 1000px;
  background: var(--light-gray);
  &__head {
    margin-bottom: 33px;
    @media (max-width: 767.98px) {
      margin-bottom: 0;
    }
  }
  &__filter-post {
    margin-bottom: 92px;
    @media (max-width: 767.98px) {
      margin-bottom: 0;
    }
  }
  &__deep-options {
    margin-bottom: 30px;

    @media (max-width: 767.98px) {
      padding: 20px 0px 25px 0px;
    }
  }
}
.mx-btn-icon-double-right,
.mx-btn-icon-double-left {
  display: none;
}
.mx-datepicker {
  width: auto;
  // input {
  //   background: #000;
  // }
}
.mx-btn-text {
  font-family: 'Open Sans';
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.15px;
  color: var(--black);
}
.mx-calendar-header-label {
  pointer-events: none;
}
.mx-datepicker-popup {
  margin-top: 0;
  box-shadow: none;
}
.cell {
  background: #ececec;
  border: 1px solid #e0e0e0;
  &.not-current-month {
    visibility: hidden;
    // display: none;
  }
}
.mx-table-date .today,
.cell.active,
.cell:hover {
  color: var(--black) !important;
  background: var(--light-green) !important;
}
.cell.in-range {
  color: var(--black) !important;
  background: rgba(65, 182, 25, 0.7) !important;
}
.mx-icon-right::before,
.mx-icon-left::before {
  width: 13px;
  height: 13px;
}
.mx-table-date th {
  text-transform: uppercase;
}
.mx-calendar-content {
  height: auto;
  .cell.hover-in-range {
    color: var(--black) !important;
    background: rgba(65, 182, 25, 0.7) !important;
  }
}
.mx-calendar {
  padding: 6px;
  width: 290px;
  & + .mx-calendar {
    display: none;
  }
}
.mx-table-date td,
.mx-table-date th {
  height: 36px;
  font-family: 'Open Sans';
  font-size: 13px;
  letter-spacing: 0.2px;
  color: #000000;
}
.datepicker__input {
  //   background: #000;
  display: none;
  & + i {
    display: none;
  }
}
</style>
