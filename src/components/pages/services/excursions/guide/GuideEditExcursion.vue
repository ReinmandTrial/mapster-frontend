<template>
  <div>
    <guide-add-excursion
      :edit_photo="photo.main.src"
      :edit_excursion="excursion"
      :edit_photo_id="photo.main.id"
      :edit="true"
      :marker_adderss="marker.name"
      :marker_lat="marker.position.lat"
      :marker_lng="marker.position.lng"
      :title="$t('excursions.guide.edit_excursion.title')"
      :edit_discount_arr="discount_arr"
    />
  </div>
</template>

<script>
import axiosConfig from '../../../../../api/instance'
import GuideAddExcursion from './GuideAddExcursion.vue'

export default {
  name: 'GuideEditExcursion',
  components: {
    GuideAddExcursion,
  },
  data() {
    return {
      excursion_id: null,
      excursion: null,
      photo: {
        main: {
          id: null,
          src: '',
        },
      },
      marker: {
        name: '',
        position: {
          lat: 0,
          lng: 0,
        },
      },
      discount_arr: [],
    }
  },
  created() {
    const excursion_id = this.$route.params.id
    if (excursion_id) {
      this.excursion_id = excursion_id
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
    async getExcursion() {
      await axiosConfig
        .get(`/guide/${this.excursion_id}`)
        .then(async (response) => {
          var data = response.data.data[0]
          // console.log(response.data.data[0])

          await axiosConfig
            .get(`/guide/media/${this.excursion_id}`)
            .then((response) => {
              if (response.data.data[0]) {
                var newImage = response.data.data[0]

                this.photo.main.id = newImage.id
                this.photo.main.src =
                  'data:image/' +
                  newImage.extension.slice(1) +
                  ';base64,' +
                  newImage.data
              }
            })
            .catch((error) => {
              console.log(error)
            })
          // points

          var pointsArr = []

          data.guideplan.forEach(async (el) => {
            var newPoint = {
              id: el.id,
              subject: el.subject,
              error_subject: false,
              error_subject_length: false,
              descr: el.description,
              error_descr: false,
              roadtime: el.roadtime,
              stoptime: el.stoptime,
              image: {
                src: '',
                name: '',
              },
            }

            await axiosConfig
              .get(`/guide/media/guideplan/${el.id}`)
              .then((response) => {
                if (response.data.data[0]) {
                  var newImage = response.data.data[0]
                  newPoint.image.id = newImage.id
                  newPoint.image.name = newImage.name
                  newPoint.image.src =
                    'data:image/' +
                    newImage.extension.slice(1) +
                    ';base64,' +
                    newImage.data
                }
                pointsArr.push(newPoint)
              })
              .catch(function (error) {
                console.log(error)
                pointsArr.push(newPoint)
              })
          })

          // langs
          var langsArr = data.lang.split(';')
          // duration
          var durationObj = {}
          var durationVal = data.duration
          var durationOptions = this.$t(
            'excursions.guide.add_excursion.terms.duration.options',
          )
          durationOptions.forEach((el) => {
            if (el.value == durationVal) {
              durationObj = el
            }
          })
          if (durationObj == {}) {
            durationObj.name = ''
            durationObj.value = ''
          }

          // duration
          var movesObj = {
            name: '',
            value: '',
          }
          var movesVal = data.moves
          if (movesVal == 'onfoot') {
            movesObj = {
              name: 'Пешком',
              value: 'onfoot',
            }
          } else {
            movesObj = {
              name: 'На машине',
              value: 'car',
            }
          }

          // discount
          var discountArr = []
          data.guidediscountcalendar.forEach((el) => {
            let val = Number(el.discount)
            var discount = 1
            var newDiscount
            if (val < 1) {
              newDiscount = (1 - val).toFixed(2)
              discount = '-' + String(newDiscount).slice(2) + ' %'
            } else if (val > 1) {
              newDiscount = (1 - val).toFixed(2)
              discount = '+' + String(newDiscount).slice(3) + ' %'
            }

            let obj = {
              date: this.selectTimeNow(new Date(el.start)).toISOString(),
              discount: discount,
              value: el.discount,
            }
            discountArr.push(obj)
          })

          this.discount_arr = discountArr

          // schedule
          var scheduleArr = [
            {
              day: 0,
              time: [],
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
          ]

          data.guideschedule.forEach((el) => {
            var newPoint = {
              id: el.id,
              day: el.day,
              start: el.start.slice(0, 5),
              end: el.end.slice(0, 5),
            }
            scheduleArr[el.day].time.push(newPoint)
          })

          // tickets
          var ticketsObj = {
            default: '',
            children: '',
          }
          data.guideprices.forEach((el) => {
            if (el.type == 'default') {
              ticketsObj.default = el.price
              ticketsObj.default_id = el.id
            } else if (el.type == 'child') {
              ticketsObj.children = el.price
              ticketsObj.children_id = el.id
            }
          })

          this.marker.name = data.addres
          this.marker.position.lat = data.latitude
          this.marker.position.lng = data.longtitude

          // tags
          var tagsListArr = []
          data.tags.forEach((el) => {
            var tagObj = {
              id: el.id,
              tag: el.tag,
            }
            tagsListArr.push(tagObj)
          })

          var obj = {
            id: this.excursion_id,
            subject: data.subject,
            subtitle: data.subtitle,
            descr: data.description,
            points: pointsArr,
            details: data.details,
            country: data.country,
            city: data.city,
            langs: langsArr,
            duration: durationObj,
            length_val: data.length,
            amount: data.number,
            children: data.children_allowed,
            moves: movesObj,
            type: data.type,
            schedule: scheduleArr,
            expire: '2022-11-09T23:59:00Z',
            discount_expire: data.discount_expire,
            common_point: data.has_common_point,
            expect_point: data.expect_point,
            exact_point: data.exact_point,
            price_type: data.cost_type,
            price_variant: data.price_type,
            tickets: ticketsObj,
            min_price: data.min_price,
            about: data.conductor_description,
            tags: {
              input: '',
              list: tagsListArr,
              popup_add_tag: false,
              options: [],
            },
          }
          this.excursion = obj
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.getExcursion()
  },
}
</script>

<style></style>
