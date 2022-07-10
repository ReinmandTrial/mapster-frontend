<template>
  <div class="add-excursion">
    <div class="container-m">
      <div class="add-excursion__content">
        <h1 class="add-excursion__title">
          {{ title ? title : $t('excursions.guide.add_excursion.title') }}
        </h1>
        <p class="add-excursion__notif">
          {{ $t('excursions.guide.add_excursion.notif') }}
        </p>
        <help-info class="add-excursion__info-main" :color_style="'green'">
          <p v-html="$t('excursions.guide.add_excursion.info')"></p>
        </help-info>
        <div class="add-excursion__block">
          <h2 class="add-excursion__subtitle">
            {{ $t('excursions.guide.add_excursion.topic.title') }}
          </h2>
          <div class="add-excursion__input input__box">
            <input
              type="text"
              class="input"
              v-model.trim="excursion.subject"
              :placeholder="
                $t('excursions.guide.add_excursion.topic.placeholder')
              "
            />
          </div>
          <p class="error" v-if="errors.subject">{{ $t('errors.required') }}</p>
          <p class="error" v-if="errors.subject_length">
            {{ $t('errors.max_length', { num: 300 }) }}
          </p>
          <help-info class="add-excursion__info" :color_style="'green'">
            {{ $t('excursions.guide.add_excursion.topic.info') }}
          </help-info>
        </div>
        <div class="add-excursion__block">
          <h2 class="add-excursion__subtitle">
            {{ $t('excursions.guide.add_excursion.subtitle.title') }}
          </h2>
          <div class="add-excursion__input input__box">
            <input
              type="text"
              class="input"
              v-model.trim="excursion.subtitle"
              :placeholder="
                $t('excursions.guide.add_excursion.subtitle.placeholder')
              "
            />
          </div>
          <p class="error" v-if="errors.subtitle">
            {{ $t('errors.required') }}
          </p>
          <p class="error" v-if="errors.subtitle_length">
            {{ $t('errors.max_length', { num: 300 }) }}
          </p>
          <help-info class="add-excursion__info" :color_style="'green'">
            {{ $t('excursions.guide.add_excursion.subtitle.info') }}
          </help-info>
        </div>
        <div class="add-excursion__block">
          <h2 class="add-excursion__subtitle">
            {{ $t('excursions.guide.add_excursion.descr.title') }}
          </h2>
          <div class="add-excursion__input input__box">
            <textarea
              class="input input--l"
              v-model.trim="excursion.descr"
              :placeholder="
                $t('excursions.guide.add_excursion.descr.placeholder')
              "
            />
          </div>
          <p class="error" v-if="errors.descr">{{ $t('errors.required') }}</p>

          <help-info class="add-excursion__info" :color_style="'green'">
            {{ $t('excursions.guide.add_excursion.descr.info') }}
          </help-info>
        </div>
        <div class="add-excursion__block tags">
          <h2 class="add-excursion__subtitle">
            {{ $t('excursions.guide.add_excursion.tags.title') }}
          </h2>

          <div class="add-tag">
            <div class="add-tag__content">
              <div class="add-tag__list-wrap">
                <p class="add-tag__holder" v-if="!excursion.tags.list.length">
                  {{ $t('excursions.guide.add_excursion.tags.placeholder') }}
                </p>
                <ul class="add-tag__list">
                  <li
                    class="add-tag__item"
                    v-for="(tag, index) in excursion.tags.list"
                    :key="index"
                  >
                    <span class="add-tag__item-name">{{ tag.tag }}</span>
                    <button
                      type="button"
                      class="add-tag__item-delete icon icon-trash"
                      @click="deleteTag(tag, index)"
                    ></button>
                  </li>
                  <button
                    v-if="excursion.tags.list.length < 8"
                    type="button"
                    class="add-tag__icon-add icon icon-plus-out"
                    @click.stop="openPopupTags"
                  ></button>
                </ul>
              </div>
            </div>
          </div>
          <p class="error" v-if="errors.tags">{{ $t('errors.required') }}</p>
          <div class="popup" v-if="excursion.tags.popup_add_tag">
            <div class="popup__body">
              <form
                class="popup__content"
                @submit.prevent="selectTag"
                v-click-outside="closePopupTags"
              >
                <h2 class="popup__title">
                  {{ $t('excursions.guide.add_excursion.tags.popup.title') }}
                </h2>
                <div class="popup__inputs">
                  <div class="popup__input input-popup">
                    <input
                      type="text"
                      class="input-popup__input"
                      v-model.trim="excursion.tags.input"
                      @keyup="searchTags(excursion.tags.input)"
                    />
                  </div>
                </div>
                <div
                  class="popup__input-dropdown"
                  v-if="excursion.tags.options.length"
                >
                  <ul class="popup__dropdown-list">
                    <li
                      class="popup__dropdown-item"
                      v-for="(tag, index) in this.excursion.tags.options"
                      :key="index"
                      @click="enterTag(tag.tag)"
                    >
                      {{ tag.tag }}
                    </li>
                  </ul>
                </div>
                <div class="popup__btn-wrap">
                  <button
                    type="button"
                    class="popup__btn-cancel"
                    @click="closePopupTags"
                  >
                    {{ $t('excursions.guide.add_excursion.tags.popup.cancel') }}
                  </button>
                  <button type="submit" class="popup__btn-add">
                    {{ $t('excursions.guide.add_excursion.tags.popup.add') }}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <help-info class="add-excursion__info" :color_style="'green'">
            {{ $t('excursions.guide.add_excursion.tags.info') }}
          </help-info>
        </div>
        <div class="add-excursion__block">
          <h2 class="add-excursion__subtitle">
            {{ $t('excursions.guide.add_excursion.content.title') }}
          </h2>
          <help-info class="add-excursion__info" :color_style="'green'">
            {{ $t('excursions.guide.add_excursion.content.info1') }}
          </help-info>
          <help-info class="add-excursion__info" :color_style="'green'">
            <p v-html="$t('excursions.guide.add_excursion.content.info2')"></p>
          </help-info>
        </div>
        <div class="add-excursion__block">
          <h2 class="add-excursion__subtitle">
            {{ $t('excursions.guide.add_excursion.main_photo.title') }}
          </h2>

          <input-image
            :src2="photo.main.src"
            @src="(src) => (photo.main.src = src)"
          />
          <p class="error" v-if="errors.photo">{{ $t('errors.required') }}</p>
        </div>
        <div class="add-excursion__points">
          <div
            class="add-excursion__block add-excursion__point"
            v-for="(point, index) in excursion.points"
            :key="index"
          >
            <h4 class="add-excursion__point-num">
              {{ index + 1 + $t('excursions.guide.add_excursion.points.num') }}
            </h4>
            <h2 class="add-excursion__subtitle">
              {{ $t('excursions.guide.add_excursion.points.title') }}
            </h2>
            <div class="add-excursion__input input__box">
              <input
                type="text"
                class="input"
                v-model.trim="point.subject"
                :placeholder="
                  $t('excursions.guide.add_excursion.points.title_placeholder')
                "
              />
            </div>
            <p class="error" v-if="point.error_subject">
              {{ $t('errors.required') }}
            </p>
            <p class="error" v-if="point.error_subject_length">
              {{ $t('errors.max_length', { num: 300 }) }}
            </p>
            <div class="add-excursion__input input__box">
              <textarea
                type="text"
                class="input input--l"
                v-model.trim="point.descr"
                :placeholder="
                  $t('excursions.guide.add_excursion.points.descr_placeholder')
                "
              ></textarea>
            </div>
            <p class="error" v-if="point.error_descr">
              {{ $t('errors.required') }}
            </p>
            <div class="add-excursion__point-flex">
              <div class="add-excursion__point-flex-box">
                <div class="add-excursion__point-time point-time">
                  <h5 class="point-time__title">
                    {{
                      $t('excursions.guide.add_excursion.points.time_to_place')
                    }}
                  </h5>
                  <div class="point-time__box">
                    <input
                      type="number"
                      class="point-time__input input"
                      v-model="point.roadtime"
                      placeholder="00"
                    />
                    <span class="point-time__minuts">
                      {{ $t('excursions.guide.add_excursion.points.min') }}
                    </span>
                  </div>
                </div>
                <div class="add-excursion__point-time point-time">
                  <h5 class="point-time__title">
                    {{
                      $t('excursions.guide.add_excursion.points.parking_dur')
                    }}
                  </h5>
                  <div class="point-time__box">
                    <input
                      type="number"
                      class="point-time__input input"
                      v-model="point.stoptime"
                      placeholder="00"
                    />
                    <span class="point-time__minuts">
                      {{ $t('excursions.guide.add_excursion.points.min') }}
                    </span>
                  </div>
                </div>
              </div>
              <input-image
                :src2="point.image.src"
                @src="(src) => (point.image.src = src)"
                :caption="true"
                :name="point.image.name"
                @emitCaption="(val) => (point.image.name = val)"
              />
            </div>
          </div>
          <div class="add-excursion__add-point-block">
            <button
              type="button"
              class="add-excursion__add-point"
              @click="addPoint"
            >
              <span class="icon icon-plus"></span>
              {{ $t('excursions.guide.add_excursion.points.add') }}
            </button>
            <p class="add-excursion__add-point-info">
              {{ $t('excursions.guide.add_excursion.points.add_info') }}
            </p>
          </div>
        </div>
        <div class="add-excursion__block">
          <h2 class="add-excursion__subtitle">
            {{ $t('excursions.guide.add_excursion.organization.title') }}
          </h2>
          <div class="add-excursion__input input__box">
            <textarea
              class="input input--xl"
              v-model.trim="excursion.details"
              :placeholder="
                $t('excursions.guide.add_excursion.organization.placeholder')
              "
            />
          </div>
          <p class="error" v-if="errors.details">{{ $t('errors.required') }}</p>
          <help-info class="add-excursion__info" :color_style="'green'">
            {{ $t('excursions.guide.add_excursion.organization.info') }}
          </help-info>
        </div>
        <div class="add-excursion__block">
          <h2 class="add-excursion__subtitle">
            {{ $t('excursions.guide.add_excursion.terms.title') }}
          </h2>
          <div class="add-excursion__term term">
            <div class="term__flex-row">
              <div class="term__flex-row-item">
                <h4 class="term__row-title">
                  {{ $t('excursions.guide.add_excursion.terms.country.title') }}
                </h4>
                <dropdown-select
                  class="term__input"
                  style="width: 215px;"
                  :placeholder="
                    $t(
                      'excursions.guide.add_excursion.terms.country.placeholder',
                    )
                  "
                  :error="errors.country"
                  :value="excursion.country"
                  :body="dropdownsData.countries"
                  @selectedValue="selectCountry"
                />
              </div>
              <div class="term__flex-row-item">
                <h4 class="term__row-title">
                  {{ $t('excursions.guide.add_excursion.terms.town.title') }}
                </h4>
                <dropdown-select
                  class="term__input"
                  style="width: 215px;"
                  :placeholder="
                    $t('excursions.guide.add_excursion.terms.town.placeholder')
                  "
                  :error="errors.city"
                  :body="dropdownsData.cities"
                  :value="excursion.city"
                  @selectedValue="selectCity"
                />
              </div>
            </div>
          </div>
          <div class="add-excursion__term term--lang">
            <div class="term__flex-row">
              <h4 class="term__row-title">
                {{ $t('excursions.guide.add_excursion.terms.langs.title') }}
              </h4>

              <p class="term__descr term__descr--mobile">
                {{ $t('excursions.guide.add_excursion.terms.langs.descr') }}
              </p>
              <ul class="term__langs">
                <li
                  class="term__lang"
                  v-for="(lang, index) in excursion.langs"
                  :key="index"
                >
                  {{ lang }}
                  <button
                    type="button"
                    class="term__lang-icon icon icon-trash"
                    @click="removeSelectLang(index)"
                  ></button>
                </li>
              </ul>
              <dropdown-select
                class="term__input"
                style="width: 215px;"
                :placeholder="
                  $t('excursions.guide.add_excursion.terms.langs.placeholder')
                "
                :body="dropdownsData.langs"
                @selectedValue="selectLangs"
              />
            </div>
            <p class="error" v-if="errors.langs">{{ $t('errors.required') }}</p>
          </div>
          <p class="term__descr term__descr--desktop">
            {{ $t('excursions.guide.add_excursion.terms.langs.descr') }}
          </p>
          <div class="add-excursion__term term">
            <h4 class="term__title">
              {{ $t('excursions.guide.add_excursion.terms.duration.title') }}
            </h4>
            <div class="term__rightside">
              <dropdown-select
                class="term__input"
                style="width: 130px;"
                :placeholder="
                  $t(
                    'excursions.guide.add_excursion.terms.duration.placeholder',
                  )
                "
                :body="
                  $t('excursions.guide.add_excursion.terms.duration.options')
                "
                :value="excursion.duration.value"
                @selectedValue="selectDuration"
              />
            </div>
          </div>
          <p class="error" v-if="errors.duration">
            {{ $t('errors.required') }}
          </p>
          <div class="add-excursion__term term">
            <h4 class="term__title">
              {{ $t('excursions.guide.add_excursion.terms.length.title') }}
            </h4>
            <div class="term__rightside">
              <div class="term__amount">
                <div class="term__amount-input input__box" style="width: 66px;">
                  <input
                    type="number"
                    class="input"
                    v-model="excursion.length_val"
                    :placeholder="
                      $t(
                        'excursions.guide.add_excursion.terms.length.placeholder',
                      )
                    "
                  />
                </div>
                <p class="term__amount-text">
                  {{ $t('excursions.guide.add_excursion.terms.length.unit') }}
                </p>
              </div>
            </div>
          </div>
          <p class="error" v-if="errors.length">{{ $t('errors.required') }}</p>
          <div class="add-excursion__term term">
            <h4 class="term__title">
              {{ $t('excursions.guide.add_excursion.terms.amount.title') }}
            </h4>
            <div class="term__rightside">
              <div class="term__amount">
                <div class="term__amount-input input__box" style="width: 66px;">
                  <input
                    type="number"
                    class="input"
                    v-model="excursion.amount"
                    :placeholder="
                      $t(
                        'excursions.guide.add_excursion.terms.amount.placeholder',
                      )
                    "
                  />
                </div>
                <label class="term__check-block">
                  <span class="term__ckeck-box">
                    <input
                      type="checkbox"
                      class="term__check-none"
                      v-model="excursion.children"
                    />
                    <span class="term__check-style"></span>
                  </span>
                  <span class="term__ckeck-text">
                    {{
                      $t('excursions.guide.add_excursion.terms.amount.children')
                    }}
                  </span>
                </label>
              </div>
            </div>
          </div>
          <p class="error" v-if="errors.amount">{{ $t('errors.required') }}</p>
          <div class="add-excursion__term term">
            <h4 class="term__title">
              {{ $t('excursions.guide.add_excursion.terms.move.title') }}
            </h4>
            <div class="term__rightside">
              <dropdown-select
                class="term__input"
                style="width: 215px;"
                :placeholder="
                  $t('excursions.guide.add_excursion.terms.move.placeholder')
                "
                :body="$t('excursions.guide.add_excursion.terms.move.options')"
                :value="excursion.moves.value"
                @selectedValue="selectMovement"
              />
            </div>
          </div>
          <p class="error" v-if="errors.moves">{{ $t('errors.required') }}</p>
        </div>
        <div class="add-excursion__block">
          <h2 class="add-excursion__subtitle">
            {{ $t('excursions.guide.add_excursion.schedule.title') }}
          </h2>
          <div class="add-excursion__radio-block radio-block">
            <h3 class="radio-block__title">
              {{ $t('excursions.guide.add_excursion.schedule.type.title') }}
            </h3>
            <div class="radio-block__content">
              <div class="radio-block__item">
                <label class="radio-block__check-block">
                  <input
                    type="radio"
                    class="radio-block__check-none"
                    :value="'individual'"
                    v-model="excursion.type"
                  />
                  <span class="radio-block__check-style"></span>
                </label>
                <div
                  class="radio-block__text"
                  v-html="
                    $t('excursions.guide.add_excursion.schedule.type.type1')
                  "
                ></div>
              </div>
              <div class="radio-block__item">
                <label class="radio-block__check-block">
                  <input
                    type="radio"
                    class="radio-block__check-none"
                    :value="'groups'"
                    v-model="excursion.type"
                  />
                  <span class="radio-block__check-style"></span>
                </label>
                <div
                  class="radio-block__text"
                  v-html="
                    $t('excursions.guide.add_excursion.schedule.type.type2')
                  "
                ></div>
              </div>
            </div>
          </div>
          <div class="add-excursion__schedule schedule">
            <h3 class="schedule__title">
              {{ $t('excursions.guide.add_excursion.schedule.days.title') }}
            </h3>
            <div class="schedule__content">
              <ul class="schedule__main">
                <li
                  class="schedule__day"
                  v-for="(day, index) in excursion.schedule"
                  :key="index"
                >
                  <h4 class="schedule__day-name">
                    {{
                      $t(
                        `excursions.guide.add_excursion.schedule.days.names[${index}]`,
                      )
                    }}
                  </h4>
                  <div class="schedule__day-content">
                    <button
                      type="button"
                      class="schedule__add-new-time"
                      @click="addTime(day.time.length, day.day)"
                      v-if="day.time.length == 0"
                    >
                      {{
                        $t(
                          'excursions.guide.add_excursion.schedule.days.add_new_time',
                        )
                      }}
                    </button>
                    <ul class="schedule__times">
                      <li
                        class="schedule__time"
                        v-for="(time_item, index) in day.time"
                        :key="index"
                      >
                        <dropdown-select
                          type="xs"
                          :placeholder="dropdownsData.time_placeholder"
                          :body="dropdownsData.time"
                          @selectedValue="selectStartTime"
                          @selected="selectStartTime2(time_item)"
                          :value="time_item.start"
                        />
                        <button
                          type="button"
                          class="schedule__close icon icon-close"
                          @click="removeTime(day.day, index)"
                        ></button>
                      </li>
                    </ul>
                    <button
                      type="button"
                      class="schedule__add-time icon icon-plus-out"
                      v-if="day.time.length != 0"
                      @click="addTime(day.time.length, day.day)"
                    ></button>
                  </div>
                </li>
              </ul>
              <p class="error" v-if="errors.schedule">
                {{ $t('errors.schedule.select_time') }}
              </p>
              <help-info class="add-excursion__info" :color_style="'green'">
                {{ $t('excursions.guide.add_excursion.schedule.days.info') }}
              </help-info>
            </div>
          </div>
          <div class="add-excursion__expire expire">
            <h3 class="expire__title">
              {{ $t('excursions.guide.add_excursion.schedule.expire.title') }}
            </h3>
            <div class="expire__content">
              <dropdown-select
                style="width: 215px;"
                :placeholder="
                  $t(
                    'excursions.guide.add_excursion.schedule.expire.placeholder',
                  )
                "
                :error="errors.expire"
                :body="
                  $t('excursions.guide.add_excursion.schedule.expire.options')
                "
                @selectedValue="selectExpire"
              />
            </div>
          </div>
        </div>
        <div class="add-excursion__block add-excursion__place place">
          <h2 class="add-excursion__subtitle">
            {{ $t('excursions.guide.add_excursion.place.title') }}
          </h2>
          <div class="place__block">
            <div class="place__flex">
              <h4 class="place__title">
                {{ $t('excursions.guide.add_excursion.place.checkbox.title') }}
              </h4>
              <div class="place__check-block">
                <label class="place__check-box">
                  <input
                    type="checkbox"
                    class="place__check-none"
                    v-model="excursion.common_point"
                    @change="removeCommonPoint"
                  />
                  <span class="place__check-style"></span>
                </label>
                <p class="place__check-text">
                  {{ $t('excursions.guide.add_excursion.place.checkbox.text') }}
                </p>
              </div>
            </div>
          </div>
          <div class="place__block">
            <div class="place__flex">
              <h4 class="place__title">
                {{
                  $t('excursions.guide.add_excursion.place.approximate.title')
                }}
              </h4>
              <p class="place__descr">
                {{
                  $t('excursions.guide.add_excursion.place.approximate.descr')
                }}
              </p>
            </div>
            <div class="add-excursion__input input__box">
              <input
                type="text"
                class="input"
                v-model.trim="excursion.expect_point"
                :placeholder="
                  $t(
                    'excursions.guide.add_excursion.place.approximate.placeholder',
                  )
                "
              />
            </div>
            <p class="error" v-if="errors.expect_point">
              {{ $t('errors.required') }}
            </p>
          </div>
          <div class="place__block" v-if="excursion.common_point">
            <div class="place__flex">
              <h4 class="place__title">
                {{ $t('excursions.guide.add_excursion.place.exact.title') }}
              </h4>
              <p class="place__descr">
                {{ $t('excursions.guide.add_excursion.place.exact.descr') }}
              </p>
            </div>
            <div class="add-excursion__input input__box">
              <textarea
                class="input input--l"
                v-model.trim="excursion.exact_point"
                :placeholder="
                  $t('excursions.guide.add_excursion.place.exact.placeholder')
                "
              />
            </div>
            <p class="error" v-if="errors.exact_point">
              {{ $t('errors.required') }}
            </p>
            <div class="place__map map">
              <button
                type="button"
                class="map__btn"
                v-if="!open_map"
                @click="open_map = true"
              >
                {{ $t('excursions.guide.add_excursion.place.map.btn') }}
              </button>
              <div class="map__content" v-if="open_map">
                <h3 class="map__title">
                  {{ $t('excursions.guide.add_excursion.place.map.title') }}
                </h3>
                <div class="map__control">
                  <GmapMap
                    :center="center"
                    :zoom="5"
                    :streetView="false"
                    style="width: 100%; height: 290px;"
                    ref="gmap"
                  >
                    <gmap-marker
                      :position="marker.position"
                      :clickable="true"
                      :draggable="false"
                      @click="center = marker.position"
                      @dragend="setPlace2"
                    ></gmap-marker>
                  </GmapMap>
                </div>
                <div class="map__details">
                  <div class="map__input">
                    <h4 class="map__subtitle">
                      {{
                        $t(
                          'excursions.guide.add_excursion.place.map.address.title',
                        )
                      }}
                    </h4>
                    <div class="add-excursion__input input__box">
                      <gmap-autocomplete
                        :value="marker.name"
                        class="input"
                        :placeholder="
                          $t(
                            'excursions.guide.add_excursion.place.map.address.placeholder',
                          )
                        "
                        @place_changed="setPlace"
                        :select-first-on-enter="true"
                      >
                        <!-- <input
                          type="text"
                          class="input"
                          v-model="excursion.description"
                          :placeholder="
                            $t(
                              'excursions.guide.add_excursion.place.map.address.placeholder',
                            )
                          "
                        /> -->
                      </gmap-autocomplete>
                    </div>
                  </div>
                  <div class="map__flex">
                    <div class="map__input">
                      <h4 class="map__subtitle">
                        {{
                          $t('excursions.guide.add_excursion.place.map.y.title')
                        }}
                      </h4>
                      <div class="add-excursion__input input__box">
                        <input
                          type="number"
                          class="input"
                          v-model="marker.position.lat"
                          disabled
                          :placeholder="
                            $t(
                              'excursions.guide.add_excursion.place.map.y.placeholder',
                            )
                          "
                        />
                      </div>
                    </div>
                    <div class="map__input">
                      <h4 class="map__subtitle">
                        {{
                          $t('excursions.guide.add_excursion.place.map.x.title')
                        }}
                      </h4>
                      <div class="add-excursion__input input__box">
                        <input
                          type="number"
                          class="input"
                          v-model="marker.position.lng"
                          disabled
                          :placeholder="
                            $t(
                              'excursions.guide.add_excursion.place.map.x.placeholder',
                            )
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="add-excursion__block price">
          <h2 class="add-excursion__subtitle">
            {{ $t('excursions.guide.add_excursion.price.title') }}
          </h2>

          <help-info class="add-excursion__info" :color_style="'green'">
            <p v-html="$t('excursions.guide.add_excursion.price.info')"></p>
          </help-info>
          <div class="price__flex">
            <h4 class="price__title">
              {{ $t('excursions.guide.add_excursion.price.type.title') }}
            </h4>
            <div class="price__rightside">
              <div class="price__radio">
                <label class="price__check-block">
                  <span class="price__check-box">
                    <input
                      type="radio"
                      class="price__check-none"
                      value="excursion"
                      v-model="excursion.price_type"
                    />
                    <span class="price__check-style"></span>
                  </span>
                  <span class="price__check-text">
                    {{
                      $t('excursions.guide.add_excursion.price.type.excursion')
                    }}
                  </span>
                </label>
                <label class="price__check-block">
                  <span class="price__check-box">
                    <input
                      type="radio"
                      class="price__check-none"
                      value="person"
                      v-model="excursion.price_type"
                    />
                    <span class="price__check-style"></span>
                  </span>
                  <span class="price__check-text">
                    {{ $t('excursions.guide.add_excursion.price.type.person') }}
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div class="price__flex">
            <h4 class="price__title">
              {{ $t('excursions.guide.add_excursion.price.variant.title') }}
            </h4>
            <div class="price__rightside">
              <div class="price__radio">
                <label class="price__check-block">
                  <span class="price__check-box">
                    <input
                      type="radio"
                      class="price__check-none"
                      value="single"
                      v-model="excursion.price_variant"
                    />
                    <span class="price__check-style"></span>
                  </span>
                  <span class="price__check-text">
                    {{
                      $t('excursions.guide.add_excursion.price.variant.single')
                    }}
                  </span>
                </label>
                <label class="price__check-block">
                  <span class="price__check-box">
                    <input
                      type="radio"
                      class="price__check-none"
                      value="tickets"
                      v-model="excursion.price_variant"
                    />
                    <span class="price__check-style"></span>
                  </span>
                  <span class="price__check-text">
                    {{
                      $t(
                        'excursions.guide.add_excursion.price.variant.by_types',
                      )
                    }}
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div class="price__flex">
            <h4 class="price__title">
              {{ $t('excursions.guide.add_excursion.price.tickets.title') }}
            </h4>
            <div class="price__rightside">
              <div class="price__table price-table">
                <div class="price-table__row">
                  <div class="price-table__item-left">
                    <h5 class="price-table__head">
                      {{
                        $t(
                          'excursions.guide.add_excursion.price.tickets.category_title',
                        )
                      }}
                    </h5>
                  </div>
                  <div class="price-table__item-right">
                    <h5 class="price-table__head">
                      {{ costTypeTitle }}
                    </h5>
                  </div>
                </div>
                <div class="price-table__row">
                  <div class="price-table__item-left">
                    <p class="price-table__category input">
                      {{
                        $t(
                          'excursions.guide.add_excursion.price.tickets.default.title',
                        )
                      }}
                    </p>
                  </div>
                  <div class="price-table__item-right">
                    <div class="price-table__price">
                      <input
                        type="number"
                        class="price-table__price-val input"
                        v-model.trim="excursion.tickets.default"
                      />
                      <span class="price-table__currency icon icon-euro"></span>
                    </div>
                    <p class="price-table__descr --desktop">
                      {{
                        $t(
                          'excursions.guide.add_excursion.price.tickets.default.descr',
                        )
                      }}
                    </p>
                  </div>
                </div>
                <p class="error" v-if="errors.tickets_default">
                  {{ $t('errors.required') }}
                </p>
                <div class="price-table__row --mobile">
                  <p class="price-table__descr">
                    {{
                      $t(
                        'excursions.guide.add_excursion.price.tickets.default.descr',
                      )
                    }}
                  </p>
                </div>
                <div
                  class="price-table__row"
                  v-if="
                    excursion.price_variant != 'single' && excursion.children
                  "
                >
                  <div class="price-table__item-left">
                    <p class="price-table__category input">
                      {{
                        $t(
                          'excursions.guide.add_excursion.price.tickets.children.title',
                        )
                      }}
                    </p>
                  </div>
                  <div class="price-table__item-right">
                    <div class="price-table__price">
                      <input
                        type="number"
                        class="price-table__price-val input"
                        v-model.trim="excursion.tickets.children"
                      />
                      <span class="price-table__currency icon icon-euro"></span>
                    </div>
                  </div>
                </div>
                <p class="error" v-if="errors.tickets_children">
                  {{ $t('errors.required') }}
                </p>
              </div>
            </div>
          </div>
          <help-info class="add-excursion__info" :color_style="'green'">
            <p
              v-html="$t('excursions.guide.add_excursion.price.tickets.info')"
            ></p>
          </help-info>
          <div class="price__flex">
            <h4
              class="price__title price__title-min-price"
              v-html="$t('excursions.guide.add_excursion.price.min.title')"
            ></h4>
            <div class="price__min">
              <div class="price__min-value input__box">
                <input
                  type="number"
                  class="input"
                  v-model="excursion.min_price"
                />
              </div>
              <span class="price__currency icon icon-euro"></span>
            </div>
          </div>
          <help-info class="add-excursion__info" :color_style="'green'">
            <p
              v-html="$t('excursions.guide.add_excursion.price.min.info1')"
            ></p>
          </help-info>
          <help-info class="add-excursion__info" :color_style="'green'">
            <p
              v-html="$t('excursions.guide.add_excursion.price.min.info2')"
            ></p>
          </help-info>
        </div>
        <div class="add-excursion__block calendar">
          <h3 class="add-excursion__subtitle">
            {{ $t('excursions.guide.add_excursion.calendar.title') }}
          </h3>
          <help-info class="add-excursion__info" :color_style="'green'">
            <p v-html="$t('excursions.guide.add_excursion.calendar.info')"></p>
          </help-info>
          <div class="calendar__picker">
            <div class="excursion-calendar__wrap">
              <date-picker v-show="always_false" />
              <calendar-panel
                v-model="calendar.datepicker"
                :calendar="calendar.calendar1"
                @update:calendar="handleUpdateCalendar1"
                :get-classes="getClasses"
                @select="handleSelect"
              ></calendar-panel>
              <calendar-panel
                :calendar="calendar.calendar2"
                v-model="calendar.datepicker"
                @update:calendar="handleUpdateCalendar2"
                :get-classes="getClasses"
                @select="handleSelect"
                valueType="format"
              ></calendar-panel>
            </div>
            <div class="excursion-calendar__info">
              <div
                class="excursion-calendar__info-item excursion-calendar__info-item--red"
              >
                <span></span>
                {{ $t('calendar.info.busy') }}
              </div>
              <div
                class="excursion-calendar__info-item excursion-calendar__info-item--green"
              >
                <span></span>
                {{ $t('calendar.info.free') }}
              </div>
            </div>
          </div>
          <div class="calendar__changes calendar-changes">
            <h4 class="calendar-changes__title">
              {{ $t('excursions.guide.add_excursion.calendar.changes.title') }}
            </h4>
            <div class="calendar-changes__selected-row">
              <span class="calendar-changes__selected">
                {{
                  $t(
                    'excursions.guide.add_excursion.calendar.changes.selected',
                    { amount: calendar.selected.length },
                  )
                }}
              </span>
              <button
                type="button"
                class="calendar-changes__remove"
                @click="removeSelectedCells"
              >
                {{
                  $t('excursions.guide.add_excursion.calendar.changes.remove')
                }}
              </button>
            </div>
            <div class="calendar-changes__row">
              <div class="calendar-changes__row-box">
                <div class="calendar-changes__change">
                  <dropdown-select
                    :body="
                      $t(
                        'excursions.guide.add_excursion.calendar.changes.options',
                      )
                    "
                    :placeholder="
                      $t(
                        'excursions.guide.add_excursion.calendar.changes.options_placeholder',
                      )
                    "
                    @selectedValue="selectDiscountOptions"
                  />
                </div>
                <p class="calendar-changes__change-on">
                  {{
                    $t(
                      'excursions.guide.add_excursion.calendar.changes.text_change_on',
                    )
                  }}
                </p>
                <div class="calendar-changes__value">
                  <dropdown-select
                    :body="
                      $t('excursions.guide.add_excursion.calendar.changes.size')
                    "
                    @selectedValue="selectDiscountValue"
                  />
                </div>
              </div>
              <button
                type="button"
                class="calendar-changes__confirm"
                @click="changeDiscount"
              >
                {{
                  $t('excursions.guide.add_excursion.calendar.changes.confirm')
                }}
              </button>
            </div>
          </div>
        </div>
        <div class="add-excursion__block about">
          <h3 class="add-excursion__subtitle">
            {{ $t('excursions.guide.add_excursion.about.title') }}
          </h3>
          <div class="about__flex-row">
            <h4 class="about__subtitle">
              {{ $t('excursions.guide.add_excursion.about.subtitle') }}
            </h4>
            <div class="about__input input__box">
              <textarea class="input input--l" v-model.trim="excursion.about" />
            </div>
          </div>
          <p class="error" v-if="errors.about">{{ $t('errors.required') }}</p>
          <help-info class="add-excursion__info" :color_style="'green'">
            <p v-html="$t('excursions.guide.add_excursion.about.info')"></p>
          </help-info>
        </div>
        <div class="add-excursion__save">
          <p class="error" v-if="errors.post">
            {{ $t('errors.unknown_request') }}
          </p>
          <p class="error" v-if="errors.all">
            {{ $t('errors.all') }}
          </p>
          <p class="success" v-if="success.post">
            {{ $t('success.new_excursion') }}
          </p>
          <p class="error" v-if="errors.photo_new">
            {{ $t('errors.photo') }}
          </p>
          <button
            class="add-excursion__save-btn"
            @click="sendExcursion"
            :disabled="wait"
          >
            {{
              wait
                ? $t('excursions.guide.add_excursion.wait')
                : $t('excursions.guide.add_excursion.save')
            }}
          </button>
          <button class="add-excursion__watch" @click="previewData">
            {{ $t('excursions.guide.add_excursion.watch') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HelpInfo from '../../../../ui/HelpInfo.vue'
import InputImage from '../../../../ui/inputs/InputImage.vue'
import DropdownSelect from '../../../../ui/DropdownSelect.vue'
import DatePicker from 'vue2-datepicker'
import { addMonths, subMonths } from 'date-fns'
import ClickOutside from 'vue-click-outside'
import axiosConfig from '../../../../../api/instance'

const { CalendarPanel } = DatePicker

var calendar2date = new Date()
function setCalendar2() {
  calendar2date.setMonth(calendar2date.getMonth() + 1)
}
setCalendar2()

export default {
  name: 'GuideAddExcursion',
  data() {
    return {
      opened_dropdowns: {
        city: true,
      },
      dropdownsData: {
        cities: [
          {
            value: 'Киев',
          },
          {
            value: 'Прага',
          },
          {
            value: 'Ливерпуль',
          },
          {
            value: 'Лондон',
          },
          {
            value: 'Тбилиси',
          },
          {
            value: 'Париж',
          },
        ],
        countries: [
          {
            value: 'Украина',
          },
          {
            value: 'Грузия',
          },
          {
            value: 'Франция',
          },
          {
            value: 'Литва',
          },
          {
            value: 'Латвия',
          },
          {
            value: 'Болгария',
          },
        ],
        langs: [
          { value: 'Русский' },
          { value: 'Английский' },
          { value: 'Грузинский' },
          { value: 'Украинский' },
          { value: 'Иврит' },
          { value: 'Немецкий' },
        ],
        time_placeholder: '??:??',
        time: [
          { value: '00:00' },
          { value: '00:30' },
          { value: '01:00' },
          { value: '01:30' },
          { value: '02:00' },
          { value: '02:30' },
          { value: '03:00' },
          { value: '03:30' },
          { value: '04:00' },
          { value: '04:30' },
          { value: '05:00' },
          { value: '05:30' },
          { value: '06:00' },
          { value: '06:30' },
          { value: '07:00' },
          { value: '07:30' },
          { value: '08:00' },
          { value: '08:30' },
          { value: '09:00' },
          { value: '09:30' },
          { value: '10:00' },
          { value: '10:30' },
          { value: '11:00' },
          { value: '11:30' },
          { value: '12:00' },
          { value: '12:30' },
          { value: '13:00' },
          { value: '13:30' },
          { value: '14:00' },
          { value: '14:30' },
          { value: '15:00' },
          { value: '15:30' },
          { value: '16:00' },
          { value: '16:30' },
          { value: '17:00' },
          { value: '17:30' },
          { value: '18:00' },
          { value: '18:30' },
          { value: '19:00' },
          { value: '19:30' },
          { value: '20:00' },
          { value: '20:30' },
          { value: '21:00' },
          { value: '21:30' },
          { value: '22:00' },
          { value: '22:30' },
          { value: '23:00' },
          { value: '23:30' },
        ],
      },
      open_map: true,
      center: { lat: 50.4016974, lng: 30.251825 },

      map: {
        address: '',
      },
      marker: {
        name: 'Киев',
        position: {
          lat: 50.4016974,
          lng: 30.251825,
        },
      },
      always_false: false,
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

      calendar: {
        datepicker: null,
        calendar1: new Date(),
        calendar2: calendar2date,
        busy_array: [],
        selected: [],
        discount_array: [],
        discount_options: null,
        discount_value: null,
      },

      dragAndDropCapable: false,
      photo: {
        main: {
          id: null,
          src: '',
        },
      },

      temp_time: '',
      excursion: {
        subject: 'Заголовок',
        subtitle: 'Подаголовок',
        descr: 'Описание',
        points: [
          {
            subject: 'Пункт',
            error_subject: false,
            error_subject_length: false,
            descr: 'Описание пункта',
            error_descr: false,
            roadtime: '20',
            stoptime: '10',
            image: {
              src: '',
              name: '',
            },
          },
          {
            subject: 'Пункт',
            error_subject: false,
            error_subject_length: false,
            descr: 'Описание пункта',
            error_descr: false,
            roadtime: '24',
            stoptime: '',
            image: {
              src: '',
            },
          },
        ],
        details: 'Детали',
        country: 'Украина',
        city: 'Киев',
        langs: ['Русский', 'Английский'],
        duration: { name: 'Полчаса', value: '30' },
        length_val: '25',
        amount: '10',
        children: true,
        moves: {
          name: 'Пешком',
          value: 'onfoot',
        },
        type: 'individual',
        schedule: [
          {
            day: 0,
            time: [{ day: '0', start: '10:00', end: '10:00' }],
          },
          {
            day: 1,
            time: [],
          },
          {
            day: 2,
            time: [],
          },
          {
            day: 3,
            time: [],
          },
          {
            day: 4,
            time: [],
          },
          {
            day: 5,
            time: [],
          },
          {
            day: 6,
            time: [],
          },
        ],
        expire: '27.11.2022 23:59',
        discount_expire: '2022-11-09T23:59:00Z',
        common_point: true,
        expect_point: 'Тут',
        exact_point: 'Здесь',
        price_type: 'person',
        price_variant: 'tickets',
        tickets: {
          default: '20',
          default_id: null,
          children: '10',
          children_id: null,
        },
        min_price: '40',
        about: 'Я лучший',
        tags: {
          input: '',
          list: [{ tag: 'taaggg' }],
          popup_add_tag: false,
          options: [],
        },
      },
      errors: {
        subject: false,
        subject_length: false,
        subtitle: false,
        subtitle_length: false,
        descr: false,
        tags: false,
        photo: false,
        points: false,
        details: false,
        country: false,
        city: false,
        langs: false,
        duration: false,
        length: false,
        amount: false,
        children: false,
        moves: false,
        schedule: false,
        expire: false,
        expect_point: false,
        exact_point: false,
        tickets_default: false,
        tickets_children: false,
        about: false,
        post: false,
        photo_new: false,
        all: false,
      },
      wait: false,
      success: {
        post: false,
      },
    }
  },
  props: {
    title: {
      default() {
        return null
      },
    },
    edit_photo: {
      default() {
        return ''
      },
    },
    edit_photo_id: {
      default() {
        return null
      },
    },
    edit_excursion: {
      default() {
        return null
      },
    },
    edit: {
      default() {
        return false
      },
    },
    marker_adderss: {
      default() {
        return ''
      },
    },
    marker_lat: {
      default() {
        return 0
      },
    },
    marker_lng: {
      default() {
        return 0
      },
    },
    edit_discount_arr: {
      default() {
        return []
      },
    },
  },
  computed: {
    costTypeTitle() {
      if (this.excursion.price_type == 'excursion') {
        return this.$t(
          'excursions.guide.add_excursion.price.tickets.per_excursion_title',
        )
      } else {
        return this.$t(
          'excursions.guide.add_excursion.price.tickets.per_person_title',
        )
      }
    },
  },
  watch: {
    edit_excursion: function (val, oldVal) {
      if (oldVal != val) {
        this.excursion = this.edit_excursion
      }
    },
    edit_photo: function () {
      this.photo.main.src = this.edit_photo
    },
    edit_photo_id: function () {
      this.photo.main.id = this.edit_photo_id
    },
    marker_adderss: function () {
      this.marker.name = this.marker_adderss
    },
    marker_lat: function () {
      this.marker.position.lat = this.marker_lat
    },
    marker_lng: function () {
      this.marker.position.lng = this.marker_lng
    },
    edit_discount_arr: function () {
      this.calendar.discount_array = this.edit_discount_arr
    },
  },

  mounted() {
    if (this.edit_excursion != null) {
      this.photo.main.src = this.edit_photo
      this.excursion = this.edit_excursion
    }
  },
  methods: {
    selectTimeNow(date) {
      var now = new Date()
      var nowHours = now.getHours()
      var nowMinutes = now.getMinutes()
      var dateHours = new Date(date.setHours(nowHours))
      var dateMinutes = new Date(dateHours.setMinutes(nowMinutes))

      return dateMinutes
    },
    previewData() {
      // title
      this.errors.subject_length = false
      this.errors.subject = false
      if (this.excursion.subject != '') {
        if (this.excursion.subject.length >= 300) {
          this.errors.subject_length = true
        }
      } else {
        this.errors.subject = true
      }

      // subtitle
      this.errors.subtitle_length = false
      this.errors.subtitle = false
      if (this.excursion.subtitle != '') {
        if (this.excursion.subtitle.length >= 300) {
          this.errors.subtitle_length = true
        }
      } else {
        this.errors.subtitle = true
      }

      // descr
      this.errors.descr = false
      if (this.excursion.descr == '') {
        this.errors.descr = true
      }

      // tags
      this.errors.tags = false
      if (!this.excursion.tags.list.length) {
        this.errors.tags = true
      }

      // main image
      this.errors.photo = false
      if (this.photo.main.src == '') {
        this.errors.photo = true
      }
      var mainImageExtension = this.photo.main.src.split(';')[0].split('/')[1]
      var mainImageData = this.photo.main.src.split('base64,')[1]

      var mainImage = {
        primary: 1,
        name: 'some name',
        extension: '.' + mainImageExtension,
        data: mainImageData,
      }
      // console.log(mainImage)

      // points
      ////////////////////////////////////
      this.errors.points = false
      ////////////////////////////////////
      var pointsArr = []
      var pointsImages = []

      this.excursion.points.forEach((el) => {
        this.errors.points = true
        el.error_subject_length = false
        el.error_subject = false
        el.error_descr = false

        // title
        if (el.subject != '') {
          if (el.subject.length >= 300) {
            el.error_subject_length = true
          }
        } else {
          el.error_subject = true
        }

        // descr
        if (el.descr == '') {
          el.error_descr = true
        }

        if (
          el.error_subject_length == false &&
          el.error_subject == false &&
          el.error_descr == false
        ) {
          this.errors.points = false

          var pointObj = {
            subject: el.subject,
            description: el.descr,
            roadtime: Number(el.roadtime),
            stoptime: Number(el.stoptime),
          }
          pointsArr.push(pointObj)
          if (el.image.src != '') {
            var pointImageExtension = el.image.src.split(';')[0].split('/')[1]
            var pointImageData = el.image.src.split('base64,')[1]

            var pointImage = {
              primary: 1,
              name: el.image.name == '' ? 'some name' : el.image.name,
              extension: '.' + pointImageExtension,
              data: pointImageData,
            }
            if (el.image.id) {
              pointImage.id = el.image.id
            }
            pointsImages.push(pointImage)
          } else {
            pointsImages.push(null)
          }
        }

        //
      })

      // details
      this.errors.details = false
      if (this.excursion.details == '') {
        this.errors.details = true
      }

      // country
      this.errors.country = false
      if (this.excursion.country == '') {
        this.errors.country = true
      }

      // city
      this.errors.city = false
      if (this.excursion.city == '') {
        this.errors.city = true
      }

      // langs
      this.errors.langs = false
      if (!this.excursion.langs.length) {
        this.errors.langs = true
      } else {
        var langsStr = ''
        this.excursion.langs.forEach((el) => {
          langsStr += el + ';'
        })
        var langsValue = langsStr.substring(0, langsStr.length - 1)
      }

      // duration
      this.errors.duration = false
      if (this.excursion.duration.value == '') {
        this.errors.duration = true
      }

      // length
      this.errors.length = false
      if (this.excursion.length_val == '') {
        this.errors.length = true
      }

      // amount
      this.errors.amount = false
      if (this.excursion.amount == '') {
        this.errors.amount = true
      }

      // children
      var children
      if (this.excursion.children) {
        children = 1
      } else {
        children = 0
      }

      this.errors.moves = false
      // moves
      if (this.excursion.moves.value == '') {
        this.errors.moves = true
      }

      // type

      // schedule
      this.errors.schedule = false
      var schedule = []
      this.excursion.schedule.forEach((day) => {
        day.time.forEach((time) => {
          if (time.start != '' && time.end != '') {
            schedule.push(time)
          } else {
            this.errors.schedule = true
          }
        })
      })
      if (!schedule.length) {
        this.errors.schedule = true
      }

      // expire
      this.errors.expire = false
      if (this.excursion.expire == '') {
        this.errors.expire = true
      }

      // children
      var common_point
      if (this.excursion.common_point) {
        common_point = 1
      } else {
        common_point = 0
      }

      // expect point
      this.errors.expect_point = false
      if (this.excursion.expect_point == '') {
        this.errors.expect_point = true
      }

      // exact point
      this.errors.exact_point = false
      if (common_point == 1) {
        if (this.excursion.exact_point == '') {
          this.errors.exact_point = true
        }
      } else {
        this.excursion.exact_point = ''
      }

      // tickets default
      this.errors.tickets_default = false
      if (this.excursion.tickets.default == '') {
        this.errors.tickets_default = true
      }

      if (this.excursion.price_variant == 'tickets') {
        this.errors.tickets_children = false
        if (this.excursion.tickets.children == '') {
          this.errors.tickets_children = true
        }
      }

      var pricesArr = [
        {
          type: 'default',
          name: 'Стандартный билет',
          currency: 'EUR',
          price: Number(Number(this.excursion.tickets.default).toFixed(0)),
        },
      ]
      if (this.edit) {
        pricesArr[0].id = this.excursion.tickets.default_id
      }

      if (
        this.excursion.children == true &&
        this.excursion.price_variant == 'tickets'
      ) {
        var pricesChildren = {
          type: 'child',
          name: 'Детский билет',
          currency: 'EUR',
          price: Number(Number(this.excursion.tickets.children).toFixed(0)),
        }
        if (this.edit) {
          pricesChildren.children_id
        }
        pricesArr.push(pricesChildren)
      }

      // discount
      var discountArr = []
      this.calendar.discount_array.forEach((el) => {
        var date = el.date.slice(0, 11)
        var last = el.date.slice(-1)

        var newObj = {
          discount: el.value,
          start: date + '00:00:00.000' + last,
          finish: date + '23:59:00.000' + last,
        }
        discountArr.push(newObj)
      })
      // console.log(discountArr)

      // about
      this.errors.about = false
      if (this.excursion.about == '') {
        this.errors.about = true
      }

      // locale
      var locale = localStorage.getItem('lang')

      if (!this.errors.all) {
        var toSendArr = {
          locale: locale ? locale : 'en',
          subject: this.excursion.subject,
          subtitle: this.excursion.subtitle,
          description: this.excursion.descr,
          details: this.excursion.details,
          country: this.excursion.country,
          city: this.excursion.city,
          lang: langsValue,
          duration: Number(this.excursion.duration.value),
          length: Number(Number(this.excursion.length_val).toFixed(1)),
          number: Number(Number(this.excursion.amount).toFixed(0)),
          children_allowed: children,
          moves: this.excursion.moves.value,
          type: this.excursion.type,
          expire: this.excursion.expire,
          has_common_point: common_point,
          expect_point: this.excursion.expect_point,
          exact_point: this.excursion.exact_point,
          cost_type: this.excursion.price_type,
          price_type: this.excursion.price_variant,
          min_price: Number(this.excursion.min_price),
          currency: 'EUR',
          discount: 1,
          discount_expire: this.excursion.expire,
          conductor_type: 'company',
          conductor_description: this.excursion.about,
          moderate: 1,
          tags: this.excursion.tags.list,
          guideplan: pointsArr,
          guideschedule: schedule,
          addres: this.marker.name,
          latitude: this.marker.position.lat,
          longtitude: this.marker.position.lng,
          guideprices: pricesArr,
          guidediscountcalendar: discountArr,
        }
        // console.log(toSendArr)
        this.errors.post = false
        this.errors.photo_new = false
        this.success.post = false
        this.errors.all = false

        for (var key in this.errors) {
          if (this.errors[key] == true) {
            console.log(key)

            this.errors.all = true
          }
        }
        if (!this.errors.all) {
          this.$router.push({
            name: 'GuidePreviewExcursion',
            params: {
              ...toSendArr,
              main_image: mainImage,
              points_images: pointsImages,
            },
          })
        }
      }
    },
    async sendExcursion() {
      // title
      this.errors.subject_length = false
      this.errors.subject = false
      if (this.excursion.subject != '') {
        if (this.excursion.subject.length >= 300) {
          this.errors.subject_length = true
        }
      } else {
        this.errors.subject = true
      }

      // subtitle
      this.errors.subtitle_length = false
      this.errors.subtitle = false
      if (this.excursion.subtitle != '') {
        if (this.excursion.subtitle.length >= 300) {
          this.errors.subtitle_length = true
        }
      } else {
        this.errors.subtitle = true
      }

      // descr
      this.errors.descr = false
      if (this.excursion.descr == '') {
        this.errors.descr = true
      }

      // tags
      this.errors.tags = false
      if (!this.excursion.tags.list.length) {
        this.errors.tags = true
      }

      // main image
      this.errors.photo = false
      if (this.photo.main.src == '') {
        this.errors.photo = true
      }
      var mainImageExtension = this.photo.main.src.split(';')[0].split('/')[1]
      var mainImageData = this.photo.main.src.split('base64,')[1]

      var mainImage = {
        primary: 1,
        name: 'some name',
        extension: '.' + mainImageExtension,
        data: mainImageData,
      }
      // console.log(mainImage)

      // points
      ////////////////////////////////////
      this.errors.points = false
      ////////////////////////////////////
      var pointsArr = []
      var pointsImages = []

      this.excursion.points.forEach((el) => {
        this.errors.points = true
        el.error_subject_length = false
        el.error_subject = false
        el.error_descr = false

        // title
        if (el.subject != '') {
          if (el.subject.length >= 300) {
            el.error_subject_length = true
          }
        } else {
          el.error_subject = true
        }

        // descr
        if (el.descr == '') {
          el.error_descr = true
        }

        if (
          el.error_subject_length == false &&
          el.error_subject == false &&
          el.error_descr == false
        ) {
          this.errors.points = false

          var pointObj = {
            subject: el.subject,
            description: el.descr,
            roadtime: Number(el.roadtime),
            stoptime: Number(el.stoptime),
          }
          pointsArr.push(pointObj)
          if (el.image.src != '') {
            var pointImageExtension = el.image.src.split(';')[0].split('/')[1]
            var pointImageData = el.image.src.split('base64,')[1]

            var pointImage = {
              primary: 1,
              name: el.image.name == '' ? 'some name' : el.image.name,
              extension: '.' + pointImageExtension,
              data: pointImageData,
            }
            if (el.image.id) {
              pointImage.id = el.image.id
            }
            pointsImages.push(pointImage)
          } else {
            pointsImages.push(null)
          }
        }

        //
      })

      // details
      this.errors.details = false
      if (this.excursion.details == '') {
        this.errors.details = true
      }

      // country
      this.errors.country = false
      if (this.excursion.country == '') {
        this.errors.country = true
      }

      // city
      this.errors.city = false
      if (this.excursion.city == '') {
        this.errors.city = true
      }

      // langs
      this.errors.langs = false
      if (!this.excursion.langs.length) {
        this.errors.langs = true
      } else {
        var langsStr = ''
        this.excursion.langs.forEach((el) => {
          langsStr += el + ';'
        })
        var langsValue = langsStr.substring(0, langsStr.length - 1)
      }

      // duration
      this.errors.duration = false
      if (this.excursion.duration.value == '') {
        this.errors.duration = true
      }

      // length
      this.errors.length = false
      if (this.excursion.length_val == '') {
        this.errors.length = true
      }

      // amount
      this.errors.amount = false
      if (this.excursion.amount == '') {
        this.errors.amount = true
      }

      // children
      var children
      if (this.excursion.children) {
        children = 1
      } else {
        children = 0
      }

      this.errors.moves = false
      // moves
      if (this.excursion.moves.value == '') {
        this.errors.moves = true
      }

      // type

      // schedule
      this.errors.schedule = false
      var schedule = []
      this.excursion.schedule.forEach((day) => {
        day.time.forEach((time) => {
          if (time.start != '' && time.end != '') {
            schedule.push(time)
          } else {
            this.errors.schedule = true
          }
        })
      })
      if (!schedule.length) {
        this.errors.schedule = true
      }

      // expire
      this.errors.expire = false
      if (this.excursion.expire == '') {
        this.errors.expire = true
      }

      // children
      var common_point
      if (this.excursion.common_point) {
        common_point = 1
      } else {
        common_point = 0
      }

      // expect point
      this.errors.expect_point = false
      if (this.excursion.expect_point == '') {
        this.errors.expect_point = true
      }

      // exact point
      this.errors.exact_point = false
      if (common_point == 1) {
        if (this.excursion.exact_point == '') {
          this.errors.exact_point = true
        }
      } else {
        this.excursion.exact_point = ''
      }

      // tickets default
      this.errors.tickets_default = false
      if (this.excursion.tickets.default == '') {
        this.errors.tickets_default = true
      }

      if (this.excursion.price_variant == 'tickets') {
        this.errors.tickets_children = false
        if (this.excursion.tickets.children == '') {
          this.errors.tickets_children = true
        }
      }

      var pricesArr = [
        {
          type: 'default',
          name: 'Стандартный билет',
          currency: 'EUR',
          price: Number(Number(this.excursion.tickets.default).toFixed(0)),
        },
      ]
      if (this.edit) {
        pricesArr[0].id = this.excursion.tickets.default_id
      }

      if (
        this.excursion.children == true &&
        this.excursion.price_variant == 'tickets'
      ) {
        var pricesChildren = {
          type: 'child',
          name: 'Детский билет',
          currency: 'EUR',
          price: Number(Number(this.excursion.tickets.children).toFixed(0)),
        }
        if (this.edit) {
          pricesChildren.children_id
        }
        pricesArr.push(pricesChildren)
      }

      // discount
      var discountArr = []
      this.calendar.discount_array.forEach((el) => {
        var date = el.date.slice(0, 11)
        var last = el.date.slice(-1)

        var newObj = {
          discount: el.value,
          start: date + '00:00:00.000' + last,
          finish: date + '23:59:00.000' + last,
        }
        discountArr.push(newObj)
      })
      // console.log(discountArr)

      // about
      this.errors.about = false
      if (this.excursion.about == '') {
        this.errors.about = true
      }

      // locale
      var locale = localStorage.getItem('lang')

      if (!this.errors.all) {
        var toSendArr = {
          locale: locale ? locale : 'en',
          subject: this.excursion.subject,
          subtitle: this.excursion.subtitle,
          description: this.excursion.descr,
          details: this.excursion.details,
          country: this.excursion.country,
          city: this.excursion.city,
          lang: langsValue,
          duration: Number(this.excursion.duration.value),
          length: Number(Number(this.excursion.length_val).toFixed(1)),
          number: Number(Number(this.excursion.amount).toFixed(0)),
          children_allowed: children,
          moves: this.excursion.moves.value,
          type: this.excursion.type,
          expire: this.excursion.expire,
          has_common_point: common_point,
          expect_point: this.excursion.expect_point,
          exact_point: this.excursion.exact_point,
          cost_type: this.excursion.price_type,
          price_type: this.excursion.price_variant,
          min_price: Number(this.excursion.min_price),
          currency: 'EUR',
          discount: 1,
          discount_expire: this.excursion.expire,
          conductor_type: 'company',
          conductor_description: this.excursion.about,
          moderate: 1,
          tags: this.excursion.tags.list,
          guideplan: pointsArr,
          guideschedule: schedule,
          addres: this.marker.name,
          latitude: this.marker.position.lat,
          longtitude: this.marker.position.lng,
          guideprices: pricesArr,
          guidediscountcalendar: discountArr,
        }
        // console.log(toSendArr)
        this.errors.post = false
        this.errors.photo_new = false
        this.success.post = false
        this.wait = true
        this.errors.all = false

        for (var key in this.errors) {
          if (this.errors[key] == true) {
            console.log(key)

            this.errors.all = true
          }
        }

        // console.log(mainImage)
        // console.log(toSendArr)
        if (this.edit) {
          await axiosConfig
            .put(`/guide/${this.excursion.id}`, toSendArr)
            .then(async (response) => {
              const data = response.data.data[0]
              const id = data.id

              // add main photo

              await axiosConfig
                .delete(`/guide/media/${id}/${this.photo.main.id}`)
                .then(() => {
                  console.log('detele photo', response.data.data[0])
                })
                .catch((error) => {
                  console.log(error)
                  this.errors.photo_new = true
                })
              await axiosConfig
                .post(`/guide/media/${id}`, mainImage)
                .then(() => {
                  console.log('add photo', response.data.data[0])
                })
                .catch((error) => {
                  console.log(error)
                  this.errors.photo_new = true
                })

              // add points photo

              await data.guideplan.forEach(async (el, index) => {
                let pointID = el.id
                if (pointsImages[index] != null) {
                  if (pointsImages[index].id) {
                    await axiosConfig
                      .delete(
                        `/guide/media/guideplan/${pointID}/${pointsImages[index].id}`,
                      )
                      .then(() => {
                        console.log('detele point photo', response.data.data[0])
                      })
                      .catch((error) => {
                        console.log(error)
                        this.errors.photo_new = true
                      })
                  }
                  await axiosConfig
                    .post(
                      `/guide/media/guideplan/${pointID}`,
                      pointsImages[index],
                    )
                    .then(() => {
                      console.log('add point photo', response.data.data[0])
                    })
                    .catch((error) => {
                      console.log(error)
                      this.errors.photo_new = true
                    })
                }
              })
              this.success.post = true
              this.wait = false
            })
            .catch((error) => {
              console.log(error)
              this.errors.post = true
              this.wait = false
            })
        } else {
          await axiosConfig
            .post(`/guide`, toSendArr)
            .then(async (response) => {
              // console.log(response.data.data[0])
              const data = response.data.data[0]
              const id = data.id

              // add main photo

              // await axiosConfig
              //   .post(`/guide/media/${id}/${this.photo.main.id}`, mainImage)
              //   .then(() => {
              // console.log(response.data.data[0])
              //   })
              //   .catch((error) => {
              //     console.log(error)
              //     this.errors.photo_new = true
              //   })
              await axiosConfig
                .post(`/guide/media/${id}`, mainImage)
                .then(() => {
                  console.log(response.data.data[0])
                })
                .catch((error) => {
                  console.log(error)
                  this.errors.photo_new = true
                })

              // add points photo

              await data.guideplan.forEach(async (el, index) => {
                let pointID = el.id
                if (pointsImages[index] != null) {
                  await axiosConfig
                    .post(
                      `/guide/media/guideplan/${pointID}`,
                      pointsImages[index],
                    )
                    .then(() => {
                      // console.log(response.data.data[0])
                    })
                    .catch((error) => {
                      console.log(error)
                      this.errors.photo_new = true
                    })
                }
              })
              this.success.post = true
              this.wait = false
            })
            .catch((error) => {
              console.log(error)
              this.errors.post = true
              this.wait = false
            })
        }
        if (!this.errors.post && !this.errors.photo_new) {
          setTimeout(() => {
            this.$router.push({
              name: 'GuideMyExcursions',
            })
          }, 2000)
        }
      }
    },
    addPoint() {
      var points = this.excursion.points
      var length = points.length
      var newObj = {
        subject: '',
        descr: '',
        roadtime: '',
        stoptime: '',
        image: {
          src: '',
        },
      }
      this.$set(points, length, newObj)
    },
    deleteTag(tag, index) {
      this.$delete(this.excursion.tags.list, index)
    },
    enterTag(tag) {
      this.excursion.tags.input = tag
    },
    closePopupTags() {
      this.excursion.tags.popup_add_tag = false
    },
    openPopupTags() {
      this.excursion.tags.popup_add_tag = true
      this.excursion.tags.input = ''
    },
    searchTags(val) {
      setTimeout(() => {
        if (
          this.excursion.tags.input == val &&
          this.excursion.tags.input != ''
        ) {
          axiosConfig
            .get(`/guide/tags?limit=5&tag__contains=${val}`)
            .then((response) => {
              // console.log(response.data.data)
              this.excursion.tags.options = response.data.data
            })
            .catch((error) => {
              console.log(error)
            })
        }
      }, 600)
    },
    selectTag() {
      if (this.excursion.tags.input != '') {
        var arr = this.excursion.tags.list
        var length = arr.length
        this.$set(arr, length, { tag: this.excursion.tags.input })
        this.closePopupTags()
      }
    },
    handleUpdateCalendar1(date) {
      this.calendar.calendar1 = date
      this.calendar.calendar2 = addMonths(date, 1)
    },
    handleUpdateCalendar2(date) {
      this.calendar.calendar2 = date
      this.calendar.calendar1 = subMonths(date, 1)
    },
    getClasses(cellDate) {
      const result = []

      var newDate = this.selectTimeNow(cellDate).toISOString()

      if (!this.excursion.schedule[cellDate.getDay()].time.length) {
        result.push('busy')
      }
      if (new Date().toISOString() > cellDate.toISOString()) {
        result.push('disabled')
      }
      if (this.calendar.selected.some((v) => v == newDate)) {
        result.push('active')
      }
      this.calendar.discount_array.some((v) => {
        if (v.date == newDate) {
          if (v.discount == '-100 %') {
            result.push('discount-m100')
          } else if (v.discount == '-95 %') {
            result.push('discount-m95')
          } else if (v.discount == '-90 %') {
            result.push('discount-m90')
          } else if (v.discount == '-85 %') {
            result.push('discount-m85')
          } else if (v.discount == '-80 %') {
            result.push('discount-m80')
          } else if (v.discount == '-75 %') {
            result.push('discount-m75')
          } else if (v.discount == '-70 %') {
            result.push('discount-m70')
          } else if (v.discount == '-65 %') {
            result.push('discount-m65')
          } else if (v.discount == '-60 %') {
            result.push('discount-m60')
          } else if (v.discount == '-55 %') {
            result.push('discount-m55')
          } else if (v.discount == '-50 %') {
            result.push('discount-m50')
          } else if (v.discount == '-45 %') {
            result.push('discount-m45')
          } else if (v.discount == '-40 %') {
            result.push('discount-m40')
          } else if (v.discount == '-35 %') {
            result.push('discount-m35')
          } else if (v.discount == '-30 %') {
            result.push('discount-m30')
          } else if (v.discount == '-25 %') {
            result.push('discount-m25')
          } else if (v.discount == '-20 %') {
            result.push('discount-m20')
          } else if (v.discount == '-15 %') {
            result.push('discount-m15')
          } else if (v.discount == '-10 %') {
            result.push('discount-m10')
          } else if (v.discount == '+95 %') {
            result.push('discount-p95')
          } else if (v.discount == '+90 %') {
            result.push('discount-p90')
          } else if (v.discount == '+85 %') {
            result.push('discount-p85')
          } else if (v.discount == '+80 %') {
            result.push('discount-p80')
          } else if (v.discount == '+75 %') {
            result.push('discount-p75')
          } else if (v.discount == '+70 %') {
            result.push('discount-p70')
          } else if (v.discount == '+65 %') {
            result.push('discount-p65')
          } else if (v.discount == '+60 %') {
            result.push('discount-p60')
          } else if (v.discount == '+55 %') {
            result.push('discount-p55')
          } else if (v.discount == '+50 %') {
            result.push('discount-p50')
          } else if (v.discount == '+45 %') {
            result.push('discount-p45')
          } else if (v.discount == '+40 %') {
            result.push('discount-p40')
          } else if (v.discount == '+35 %') {
            result.push('discount-p35')
          } else if (v.discount == '+30 %') {
            result.push('discount-p30')
          } else if (v.discount == '+25 %') {
            result.push('discount-p25')
          } else if (v.discount == '+20 %') {
            result.push('discount-p20')
          } else if (v.discount == '+15 %') {
            result.push('discount-p15')
          } else if (v.discount == '+10 %') {
            result.push('discount-p10')
          }
          return true
        }
      })

      // console.log(result)

      return result
    },

    handleSelect(date) {
      // console.log(date)
      // var date =
      var newDate = this.selectTimeNow(date).toISOString()

      if (event.shiftKey) {
        var selected = this.calendar.selected
        var length = selected.length
        var itemInArr = selected.indexOf(newDate)

        // console.log(itemInArr)

        if (itemInArr == -1) {
          this.$set(selected, length, newDate)
        } else {
          this.$delete(selected, itemInArr)
        }

        // console.log(selected)
        this.calendar.datepicker = null
      } else {
        this.calendar.selected = [newDate]
        this.calendar.datepicker = newDate
      }
    },
    changeDiscount() {
      this.calendar.selected.forEach((el) => {
        if (this.discount_value.value != 1) {
          var sign = ''

          if (this.discount_options == 'decrease') {
            sign = '-'
          } else if (this.discount_options == 'increase') {
            sign = '+'
          }

          var newObj = {
            date: el,
            discount: sign + this.discount_value.title,
            value: this.discount_value.value,
          }

          var discountArr = this.calendar.discount_array
          var discountArrLength = discountArr.length

          if (
            !discountArr.some((o) => {
              if (o.date == newObj.date) {
                o.discount = newObj.discount
                return true
              } else {
                return false
              }
            })
          ) {
            this.$set(discountArr, discountArrLength, newObj)
          }
        } else {
          this.calendar.discount_array.some((o, index) => {
            if (o.date == el) {
              this.$delete(this.calendar.discount_array, index)
              return true
            } else {
              return false
            }
          })
        }
      })
      // console.log(this.calendar.discount_array)
    },

    removeSelectedCells() {
      this.calendar.selected = []
    },
    selectCountry(name, val) {
      this.excursion.country = val
    },
    selectCity(name, val) {
      this.excursion.city = val
    },
    selectLangs(val) {
      var selectedLangs = this.excursion.langs

      if (!selectedLangs.includes(val)) {
        let index = selectedLangs.length
        this.$set(selectedLangs, index, val)
      }
    },
    removeSelectLang(index) {
      this.$delete(this.excursion.langs, index)
    },
    selectDuration(name, val) {
      this.excursion.duration = { name: name, value: val }
    },
    selectMovement(name, value) {
      this.excursion.moves = { name: name, value: value }
    },
    selectStartTime(value) {
      this.temp_time = value
    },
    selectStartTime2(item) {
      item.start = this.temp_time
      item.end = this.temp_time
    },
    addTime(length, index) {
      this.$set(this.excursion.schedule[index].time, length, {
        day: index,
        start: '',
        end: '',
      })
    },
    removeTime(dayIndex, itemIndex) {
      this.$delete(this.excursion.schedule[dayIndex].time, itemIndex)
    },
    selectExpire(name, value) {
      var date = new Date()
      var toNum = Number(value)

      date.setMonth(date.getMonth() + toNum)

      var day = date.getDate()
      var month = date.getMonth()
      var year = date.getFullYear()

      var sendDate = day + '.' + month + '.' + year + ' 23:59'
      this.excursion.expire = sendDate
    },
    setPlace(place) {
      // console.log(place)

      if (!place?.geometry) return

      this.marker.position = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }

      this.marker.name = place.formatted_address
    },
    setPlace2(place) {
      // console.log(place)

      if (!place?.latLng) return

      // this.marker.position = {
      //   lat: place.latLng.lat,
      //   lng: place.latLng,
      // }
    },
    removeCommonPoint() {
      if (this.excursion.common_point == false) {
        this.marker.name = ''
        this.marker.position.lat = ''
        this.marker.position.lng = ''
      }
    },
    selectDiscountOptions(name, value) {
      this.discount_options = value
    },
    selectDiscountValue(name, value) {
      this.discount_value = { title: name, value: value }
    },
  },
  components: {
    DatePicker,
    CalendarPanel,
    HelpInfo,
    DropdownSelect,
    InputImage,
  },
  directives: {
    ClickOutside,
  },
}
</script>

<style lang="scss" scoped>
.add-tag {
  margin-bottom: 15px;
  &__list-wrap {
    background: #ffffff;
    border: 1px solid rgba(26, 27, 32, 0.6);
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 7px 21px;
    min-height: 48px;
    @media (max-width: 575.98px) {
      padding: 5px 6px;
    }
  }

  &__holder {
    font-size: 12px;
    line-height: 16px;
    color: rgba(26, 27, 32, 0.6);
    padding-right: 9px;
    &.hiden {
      display: none;
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 17px 17px;
    @media (max-width: 767.98px) {
      gap: 5px 8px;
    }
  }

  &__icon-add {
    color: var(--light-green);
    @media (max-width: 767.98px) {
      margin-left: 10px;
    }
  }
  &__item {
    background: #d9d9d9;
    border-radius: 5px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 6px 10px;
    column-gap: 10px;
  }

  &__item-name {
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
  }

  &__item-delete {
    font-size: 16px;
  }
}
.popup {
  &__content {
    width: 100%;
    background: var(--white);
    border-radius: 5px;
    max-width: 380px;
    padding: 18px 21px 22px 16px;
    margin: 40px 10px;
    color: var(--black);
    border: 1px dashed var(--black);
    @media (max-width: 575.98px) {
      padding: 20px 10px 20px;
    }
  }

  &__title {
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 20px;
  }

  &__inputs {
    margin-bottom: 15px;
  }

  &__input {
  }

  &__input-dropdown {
    background: #ececec;
    border-radius: 6px;
    padding: 10px 10px;
    margin-bottom: 11px;
    display: inline-block;
    position: relative;
    &::before {
      content: '';
      width: 0;
      height: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 11px solid #ececec;
      position: absolute;
      top: -11px;
      left: 27px;
    }
  }

  &__dropdown-list {
    display: flex;
    flex-wrap: wrap;
    gap: 15px 15px;
  }

  &__dropdown-item {
    font-size: 12px;
    line-height: 16px;
    color: rgba(26, 27, 32, 0.6);
    cursor: pointer;
  }

  &__btn-wrap {
    display: flex;
    column-gap: 23px;
  }

  &__btn-add {
    background: #41b619;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 1px;
    text-transform: uppercase;
    width: 100%;
    padding: 8px 0px;
  }
  &__btn-cancel {
    background: #ececec;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 1px;
    text-transform: uppercase;
    width: 100%;
    padding: 8px 0px;
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
  @media (max-width: 575.98px) {
    padding: 12px 10px;
  }
  &--l {
    height: 94px;
  }
  &--xl {
    height: 120px;
  }
  &::placeholder {
    color: rgba(26, 27, 32, 0.6);
    font-weight: 400;
  }
  &__box {
  }
}

.point-time {
  max-width: 160px;
  &__title {
    font-size: 14px;
    color: rgba(26, 27, 32, 0.6);
    margin-bottom: 7px;
  }

  &__box {
    display: flex;
    column-gap: 5px;
    align-items: center;
  }

  &__input {
    width: 85px;
    padding-left: 23px;
    padding-right: 15px;
    font-size: 14px;
    padding-top: 14px;
    padding-bottom: 14px;
    @media (max-width: 575.98px) {
      padding-top: 10px;
      padding-bottom: 10px;
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

  &__minuts {
    font-weight: 600;
    font-size: 14px;
  }
}
.term {
  display: flex;
  align-items: center;
  width: 100%;
  @media (max-width: 991.98px) {
    flex-direction: column;
    row-gap: 10px;
    align-items: flex-start;
  }
  &--lang {
    @media (max-width: 991.98px) {
      .term__flex-row {
        flex-direction: column;
        align-items: flex-start;
        row-gap: 15px;
      }
    }
  }
  &__flex-row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    column-gap: 40px;
    @media (max-width: 991.98px) {
      flex-direction: column;
      align-items: flex-start;
      row-gap: 10px;
    }
  }

  &__flex-row-item {
    display: flex;
    column-gap: 20px;
    align-items: center;
    @media (max-width: 991.98px) {
      flex-direction: column;
      align-items: flex-start;
      row-gap: 10px;
    }
  }

  &__title {
    width: 42%;
    padding-right: 15px;
    font-weight: 600;
    @media (max-width: 575.98px) {
      font-size: 14px;
    }
  }
  &__row-title {
    flex: none;
    padding-right: 15px;
    font-weight: 600;
    @media (max-width: 575.98px) {
      font-size: 14px;
    }
  }

  &__rightside {
    width: 58%;
  }

  &__input {
    flex: none;
  }

  &__dropdown {
  }

  &__amount {
    display: flex;
    align-items: center;
    column-gap: 7px;
  }

  &__amount-input {
    .input {
      padding-left: 10px;
      padding-right: 10px;
      text-align: center;
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

  &__amount-text {
    font-weight: 600;
    font-size: 14px;
  }

  &__check-block {
    display: flex;
    align-items: center;
    column-gap: 9px;
  }

  &__ckeck-box {
    position: relative;
  }

  &__check-none {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  &__check-style {
    display: block;
    flex: none;
    background: var(--white);
    width: 17px;
    height: 17px;
    left: 0;
    border-radius: 2px;
    border: 2px solid rgba(0, 0, 0, 0.87);
    box-sizing: border-box;
  }

  &__check-none:checked + &__check-style {
    background: url('~@/assets/images/svg-icons/check.svg') center center/100%
      100% no-repeat;
    border: none;
  }

  &__ckeck-text {
    font-size: 14px;
    color: rgba(26, 27, 32, 0.6);
  }
  &__langs {
    display: flex;
    gap: 10px 16px;
    align-items: center;
    // flex: 1 1 auto;
    margin-left: auto;
    // justify-content: flex-end;
    flex-wrap: wrap;
    @media (max-width: 991.98px) {
      margin-left: unset;
    }
    @media (max-width: 575.98px) {
      flex-direction: column;
    }
  }
  &__lang {
    display: flex;
    column-gap: 5px;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
  }
  &__lang-icon {
    font-size: 16px;
  }
  &__descr {
    font-size: 14px;
    max-width: 550px;
    color: rgba(26, 27, 32, 0.6);
    margin: 10px 0 15px;
    @media (max-width: 575.98px) {
      font-size: 12px;
    }
    &--desktop {
      @media (max-width: 991.98px) {
        display: none;
      }
    }
    &--mobile {
      margin: 0;
      @media (min-width: 992px) {
        display: none;
      }
    }
  }
}

.radio-block {
  display: flex;
  @media (max-width: 991.98px) {
    flex-direction: column;
  }
  &__title {
    width: 160px;
    flex: none;
    padding-right: 10px;
    font-size: 16px;
    font-weight: 600;
    row-gap: 5px;
    @media (max-width: 575.98px) {
      font-size: 14px;
    }
  }

  &__content {
    padding-top: 3px;
  }

  &__item {
    display: flex;
    column-gap: 18px;
    @media (max-width: 575.98px) {
      column-gap: 10px;
    }
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  &__check-none {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  &__check-style {
    position: relative;
    display: block;
    flex: none;
    width: 19px;
    height: 19px;
    left: 0;
    border-radius: 50%;
    border: 2px solid rgba(0, 0, 0, 0.87);
    box-sizing: border-box;
  }

  &__check-none:checked + &__check-style {
    &::before {
      content: '';
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.87);
    }
  }

  &__text {
    font-size: 14px;
    color: rgba(26, 27, 32, 0.6);
    span {
      font-size: 10px;
    }
  }
}
.schedule {
  display: flex;
  @media (max-width: 991.98px) {
    flex-direction: column;
  }
  &__title {
    width: 160px;
    flex: none;
    padding-right: 10px;
    font-size: 16px;
    font-weight: 600;
    row-gap: 5px;
    @media (max-width: 991.98px) {
      width: 100%;
    }
    @media (max-width: 575.98px) {
      font-size: 14px;
    }
  }

  &__content {
  }

  &__main {
    margin-bottom: 20px;
  }

  &__day {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px dashed #000000;
    min-height: 49px;
    @media (max-width: 575.98px) {
      padding: 7px 0;
    }
  }

  &__day-name {
    font-weight: 600;
    font-size: 16px;
    margin-right: 10px;
    width: 24px;
    @media (max-width: 575.98px) {
      font-size: 14px;
    }
  }

  &__day-content {
    display: flex;
    align-items: center;
    column-gap: 20px;
  }

  &__add-new-time {
    font-size: 14px;
    text-decoration-line: underline;
    color: rgba(26, 27, 32, 0.6);
    &:hover {
      text-decoration-line: none;
    }
  }

  &__times {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 24px;
    row-gap: 10px;
  }

  &__time {
    display: flex;
    align-items: center;
    column-gap: 13px;
  }

  &__close {
    color: #828282;
  }

  &__add-time {
    font-size: 20px;
    color: var(--light-green);
  }
}

.expire {
  display: flex;
  @media (max-width: 991.98px) {
    flex-direction: column;
  }
  &__title {
    width: 160px;
    flex: none;
    padding-right: 10px;
    font-size: 16px;
    font-weight: 600;
    row-gap: 5px;
    @media (max-width: 991.98px) {
      width: 100%;
      margin-bottom: 10px;
    }
    @media (max-width: 575.98px) {
      font-size: 14px;
    }
  }

  &__content {
  }
}
.place {
  &__block {
    margin-bottom: 15px;
  }

  &__flex {
    margin-bottom: 10px;
    display: flex;
    @media (max-width: 991.98px) {
      flex-direction: column;
      row-gap: 10px;
    }
  }

  &__title {
    width: 240px;
    flex: none;
    font-weight: 600;
    font-size: 16px;
    @media (max-width: 575.98px) {
      font-size: 14px;
    }
  }

  &__check-block {
    display: flex;
    align-items: center;
    column-gap: 11px;
  }

  &__check-box {
  }

  &__check-none {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  &__check-style {
    display: block;
    flex: none;
    background: var(--white);
    width: 17px;
    height: 17px;
    left: 0;
    border-radius: 2px;
    border: 2px solid rgba(0, 0, 0, 0.87);
    box-sizing: border-box;
  }

  &__check-none:checked + &__check-style {
    background: url('~@/assets/images/svg-icons/check.svg') center center/100%
      100% no-repeat;
    border: none;
  }

  &__check-text {
    font-size: 14px;
    color: rgba(26, 27, 32, 0.6);
    @media (max-width: 575.98px) {
      font-size: 12px;
    }
  }

  &__descr {
    font-size: 14px;
    color: rgba(26, 27, 32, 0.6);
    @media (max-width: 575.98px) {
      font-size: 12px;
    }
  }

  &__map {
  }
}
.map {
  &__btn {
    font-size: 14px;
    text-decoration-line: underline;
    color: #219ebc;
    &:hover {
      text-decoration-line: none;
    }
  }

  &__content {
    max-width: 560px;
  }

  &__title {
    font-weight: 700;
    font-size: 20px;
    letter-spacing: 0.4px;
    margin-bottom: 15px;
  }

  &__control {
  }

  &__details {
    // display: flex;
    // flex-direction: column;
    // row-gap: 15px;
  }

  &__input {
  }

  &__subtitle {
    font-size: 18px;
    margin-bottom: 5px;
    font-weight: 400;
  }

  &__flex {
    display: flex;
    column-gap: 42px;
    & > * {
      width: 160px;
    }
  }
}

.price {
  &__flex {
    display: flex;
    margin-bottom: 15px;
    @media (max-width: 991.98px) {
      flex-direction: column;
      row-gap: 10px;
    }
  }

  &__title {
    width: 160px;
    flex: none;
    font-weight: 600;
    font-size: 16px;
    @media (max-width: 575.98px) {
      font-size: 14px;
    }
  }

  &__rightside {
    flex: 1 1 auto;
  }

  &__radio {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }

  &__check-block {
    display: flex;
    align-items: center;
    column-gap: 7px;
  }

  &__check-box {
    position: relative;
  }
  &__check-none {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  &__check-style {
    position: relative;
    display: block;
    flex: none;
    width: 19px;
    height: 19px;
    left: 0;
    border-radius: 50%;
    border: 2px solid rgba(0, 0, 0, 0.87);
    box-sizing: border-box;
  }

  &__check-none:checked + &__check-style {
    &::before {
      content: '';
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.87);
    }
  }

  &__check-text {
    font-size: 14px;
    color: rgba(26, 27, 32, 0.6);
    @media (max-width: 575.98px) {
      font-size: 12px;
    }
  }

  &__table {
  }

  &__title-min-price {
    width: 400px;
    @media (max-width: 575.98px) {
      br {
        display: none;
      }
    }
  }

  &__min {
    display: flex;
    align-items: center;
  }

  &__min-value {
    .input {
      height: 50px;
      font-weight: 600;
      font-size: 20px;
      width: 66px;
      text-align: center;
      padding: 10px;
      @media (max-width: 575.98px) {
        padding: 10px 5px;
        height: 42px;
        width: 54px;
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

  &__currency {
    font-size: 28px;
    @media (max-width: 575.98px) {
      font-size: 22px;
    }
  }
}
.price-table {
  &__row {
    display: flex;
    column-gap: 24px;
    align-items: flex-end;
    @media (max-width: 575.98px) {
      column-gap: 7px;
    }
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__item-left {
    width: 216px;
    flex: none;
    font-weight: 400;
    @media (max-width: 575.98px) {
      flex: auto;
      max-width: 216px;
      width: 100%;
    }
  }

  &__head {
    font-size: 14px;
    color: rgba(26, 27, 32, 0.6);
    font-weight: 400;
    @media (max-width: 575.98px) {
      font-size: 12px;
    }
  }

  &__item-right {
    display: flex;
    flex: 1 1 auto;
  }

  &__category {
    font-size: 14px;
    // color: rgba(26, 27, 32, 0.6);
    height: 50px;
    padding: 14px 12px;
    overflow: hidden;
    white-space: nowrap;
    @media (max-width: 575.98px) {
      font-size: 12px;
    }
    @media (max-width: 575.98px) {
      padding: 10px 12px;
      height: 42px;
    }
  }

  &__price {
    display: flex;
    align-items: center;
    @media (max-width: 575.98px) {
      column-gap: 3px;
    }
  }

  &__price-val {
    height: 50px;
    font-weight: 600;
    font-size: 20px;
    width: 66px;
    text-align: center;
    padding: 10px;
    @media (max-width: 575.98px) {
      padding: 10px 5px;
      height: 42px;
      width: 54px;
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

  &__currency {
    font-size: 28px;
    @media (max-width: 575.98px) {
      font-size: 22px;
    }
  }

  &__descr {
    margin-left: auto;
    font-size: 14px;
    color: rgba(26, 27, 32, 0.6);
    max-width: 205px;
    @media (max-width: 991.98px) {
      margin-left: unset;
      max-width: unset;
    }
    @media (max-width: 575.98px) {
      font-size: 12px;
    }
  }
  .--desktop {
    @media (max-width: 991.98px) {
      display: none;
    }
  }
  .--mobile {
    @media (min-width: 992px) {
      display: none;
    }
  }
}
.add-excursion {
  padding: 30px 0 210px;
  @media (max-width: 575.98px) {
    padding: 25px 0 50px;
  }

  &__content {
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 20px;
    text-transform: uppercase;
    @media (max-width: 575.98px) {
      font-size: 16px;
      margin-bottom: 5px;
    }
  }

  &__notif {
    font-family: 'Inter';
    font-size: 14px;
    color: rgba(26, 27, 32, 0.6);
    margin-bottom: 23px;
    @media (max-width: 575.98px) {
      font-size: 12px;
      margin-bottom: 13px;
    }
  }

  &__info-main {
    margin-bottom: 20px;
    @media (max-width: 575.98px) {
      margin-bottom: 15px;
    }
  }

  &__block {
    margin-bottom: 20px;
    @media (max-width: 575.98px) {
      margin-bottom: 15px;
    }
  }

  &__subtitle {
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0.15px;
    margin-bottom: 10px;
    @media (max-width: 575.98px) {
      font-size: 16px;
    }
  }

  &__input {
    margin-bottom: 15px;
    @media (max-width: 575.98px) {
      margin-bottom: 10px;
    }
  }
  &__info {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__photo {
  }

  &__points {
    margin-bottom: 28px;
  }

  &__point {
  }

  &__point-num {
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 10px;
  }

  &__point-flex {
    display: flex;
    column-gap: 10px;
    justify-content: space-between;
    @media (max-width: 991.98px) {
      flex-direction: column;
      row-gap: 13px;
    }
  }

  &__point-flex-box {
    display: flex;
    align-items: flex-end;
    align-self: flex-start;
    column-gap: 10px;
  }

  &__point-time {
  }

  &__add-point-block {
    margin-top: 15px;
    display: flex;
    align-items: center;
    column-gap: 16px;
    @media (max-width: 767.98px) {
      flex-direction: column;
      row-gap: 10px;
      align-items: flex-start;
    }
  }

  &__add-point {
    flex: none;
    background: var(--light-green);
    border-radius: 5px;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 2px;
    padding: 10px 12px 10px 4px;
    @media (max-width: 575.98px) {
      padding: 3px 14px 3px 4px;
    }
  }

  &__add-point-info {
    background: #cdffbc;
    border-radius: 5px;
    padding: 9px 11px;
    font-size: 14px;
    letter-spacing: 0.2px;
    @media (max-width: 575.98px) {
      font-size: 11px;
    }
  }

  &__term {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  &__radio-block {
    margin-bottom: 40px;
    @media (max-width: 575.98px) {
      margin-bottom: 15px;
    }
  }

  &__schedule {
    margin-bottom: 25px;
  }

  &__info {
  }
  &__expire {
  }

  &__place {
  }

  &__save {
    margin-top: 40px;
    @media (max-width: 575.98px) {
      margin-top: 30px;
    }
  }

  &__save-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: var(--light-green);
    border-radius: 5px;
    font-weight: 700;
    font-size: 14px;
    padding: 12px;
    text-transform: uppercase;
    width: 100%;
    max-width: 280px;
    @media (max-width: 575.98px) {
      max-width: unset;
      padding: 10px;
    }
  }

  &__watch {
    font-weight: 600;
    font-size: 16px;
    text-decoration-line: underline;
    text-align: left;
    margin-top: 16px;
    @media (max-width: 575.98px) {
      font-size: 14px;
    }
  }
}
.calendar {
  &__picker {
  }

  &__changes {
  }
}
.calendar-changes {
  &__title {
    margin-bottom: 15px;
    font-weight: 600;
    font-size: 16px;
  }

  &__selected-row {
    margin-bottom: 15px;
  }

  &__selected {
  }

  &__remove {
    color: #219ebc;
  }

  &__row {
    display: flex;
    column-gap: 17px;
    align-items: center;
    @media (max-width: 991.98px) {
      flex-direction: column;
      align-items: flex-start;
      row-gap: 18px;
    }
  }
  &__row-box {
    display: flex;
    column-gap: 12px;
    align-items: center;
    @media (max-width: 991.98px) {
      column-gap: 5px;
      width: 100%;
    }
    @media (max-width: 379.98px) {
      flex-direction: column;
      row-gap: 5px;
      align-items: flex-start;
    }
  }

  &__change {
    max-width: 205px;
    width: 100%;
    @media (max-width: 575.98px) {
      max-width: 145px;
    }
  }

  &__change-on {
    font-weight: 400;
    font-size: 14px;
    color: rgba(26, 27, 32, 0.6);
    flex: none;
  }

  &__value {
    width: 100%;
    max-width: 100px;
    @media (max-width: 575.98px) {
      max-width: 89px;
    }
  }

  &__confirm {
    background: #41b619;
    border-radius: 5px;
    padding: 14px;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
  }
}
.calendar .mx-calendar + .mx-calendar {
  @media (min-width: 992px) {
    display: block;
  }
}
.calendar .mx-calendar {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.about {
  &__flex-row {
    display: flex;
    margin-bottom: 25px;
    @media (max-width: 991.98px) {
      flex-direction: column;
      row-gap: 5px;
    }
    @media (max-width: 575.98px) {
      margin-bottom: 10px;
    }
  }

  &__subtitle {
    flex: none;
    width: 160px;
    font-weight: 600;
    font-size: 16px;
  }

  &__input {
    flex: 1 1 auto;
  }
}
.error {
  color: #ff0000;
  margin: 10px 0 20px;
}
.term + .error {
  margin-top: -15px;
  margin-bottom: 5px;
  @media (min-width: 992px) {
    margin-left: 42%;
  }
}
.about__flex-row + .error {
  margin-top: -20px;
  @media (min-width: 992px) {
    margin-left: 160px;
  }
}
.success {
  margin: 10px 0;
  color: var(--light-green);
}
</style>

<style lang="scss">
.pac-target-input {
  width: 100%;
}
.calendar .cell {
  background: #85d95e;
}
.calendar .excursion-calendar__wrap {
  justify-content: flex-start;
  margin-bottom: 10px;
}
.calendar {
  .mx-calendar:nth-child(2) .mx-btn-icon-right {
    @media (min-width: 992px) {
      visibility: hidden;
    }
  }
  .mx-calendar:nth-child(3) .mx-btn-icon-left {
    visibility: hidden;
  }
}
.calendar .cell[class*='discount-'] {
  &::after {
    font-size: 10px;
    letter-spacing: 0.2px;
    margin-top: -2px;
    display: block;
  }
}
.calendar .cell.discount-m100::after {
  content: '-100%';
}
.calendar .cell.discount-m90::after {
  content: '-90%';
}
.calendar .cell.discount-m85::after {
  content: '-85%';
}
.calendar .cell.discount-m80::after {
  content: '-80%';
}
.calendar .cell.discount-m75::after {
  content: '-75%';
}
.calendar .cell.discount-m70::after {
  content: '-70%';
}
.calendar .cell.discount-m65::after {
  content: '-65%';
}
.calendar .cell.discount-m60::after {
  content: '-60%';
}
.calendar .cell.discount-m55::after {
  content: '-55%';
}
.calendar .cell.discount-m50::after {
  content: '-50%';
}
.calendar .cell.discount-m45::after {
  content: '-45%';
}
.calendar .cell.discount-m40::after {
  content: '-40%';
}
.calendar .cell.discount-m35::after {
  content: '-35%';
}
.calendar .cell.discount-m30::after {
  content: '-30%';
}
.calendar .cell.discount-m25::after {
  content: '-25%';
}
.calendar .cell.discount-m20::after {
  content: '-20%';
}
.calendar .cell.discount-m15::after {
  content: '-15%';
}
.calendar .cell.discount-m10::after {
  content: '-10%';
}
.calendar .cell.discount-p100::after {
  content: '+100%';
}
.calendar .cell.discount-p90::after {
  content: '+90%';
}
.calendar .cell.discount-p85::after {
  content: '+85%';
}
.calendar .cell.discount-p80::after {
  content: '+80%';
}
.calendar .cell.discount-p75::after {
  content: '+75%';
}
.calendar .cell.discount-p70::after {
  content: '+70%';
}
.calendar .cell.discount-p65::after {
  content: '+65%';
}
.calendar .cell.discount-p60::after {
  content: '+60%';
}
.calendar .cell.discount-p55::after {
  content: '+55%';
}
.calendar .cell.discount-p50::after {
  content: '+50%';
}
.calendar .cell.discount-p45::after {
  content: '+45%';
}
.calendar .cell.discount-p40::after {
  content: '+40%';
}
.calendar .cell.discount-p35::after {
  content: '+35%';
}
.calendar .cell.discount-p30::after {
  content: '+30%';
}
.calendar .cell.discount-p25::after {
  content: '+25%';
}
.calendar .cell.discount-p20::after {
  content: '+20%';
}
.calendar .cell.discount-p15::after {
  content: '+15%';
}
.calendar .cell.discount-p10::after {
  content: '+10%';
}
</style>
