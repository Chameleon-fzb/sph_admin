<template>
  <div
    ref="charts"
    :class="className"
    :style="{width,height}"
  />
</template>
<script>
// import * as echarts from 'echarts'
import merge from 'lodash/merge'
import resize from '../mixins/resize'
export default {
  name: 'BarChart',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'charts'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: ''
    },
    chartData: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    name: {
      type: String,
      required: true

    },
    seriesOption: {
      type: Array,
      default () {
        return [{ type: 'pie', name: this.name }]
      }
    },
    otherOption: {
      type: Object,
      default () {
        return {
          xAxis: {},
          yAxis: {}
        }
      }
    },
    events: {
      type: [Array, Object],
      default () { return {} }
    }
  },
  data () {
    return {
      chart: null,
      option: {},
      boundEvents: []
    }
  },
  computed: {
    seriesObj () {
      const { seriesOption } = this
      seriesOption[0].name = this.name
      seriesOption[0].data = this.chartData
      return { series: seriesOption }
    },
    newOption () {
      const { seriesObj, otherOption } = this
      return merge(seriesObj, otherOption)
    }
  },
  watch: {
    newOption: {
      handler () {
        this.updateChart()
      }
    },
    events: {
      handler () {
        this.bindEvents()
      }
    }
  },
  mounted () {
    // this.chart = echarts.init(this.$el)
    this.chart = this.$_myChart
    this.bindEvents()
  },
  beforeDestroy () {
    this.unbindEvents()
    this.chart = null
  },
  methods: {
    getOption () {
      const { option, seriesObj, otherOption } = this
      return merge(option, seriesObj, otherOption)
    },
    addEventListener (eventName, fn) {
      this.chart.on(eventName, fn)
      const i = this.boundEvents.findIndex(item => item.eventName === eventName)
      if (i !== -1) {
        this.boundEvents[i].fn = fn
        return
      }
      this.boundEvents.push({ eventName, fn })
    },
    bindEvents () {
      const { events } = this
      if (events) {
        if (events.eventName && events.eventFn) {
          const fn = events.eventFn(this)
          this.addEventListener(events.eventName, fn)
        } else if (Object.prototype.toString.call(events) === '[object Array]') {
          events.forEach(item => {
            const fn = item.eventFn(this)
            this.addEventListener(item.eventName, fn)
          })
        }
      }
    },
    unbindEvents () {
      this.boundEvents.forEach((item) => {
        this.chart.off(item.eventName)
      })
      this.boundEvents = []
    }
  }
}

</script>
