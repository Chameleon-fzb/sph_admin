<template>
  <div
    ref="charts"
    :class="className"
    :style="{width,height}"
  />
</template>
<script>
import * as echarts from 'echarts'
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
        return [{ type: 'bar', name: this.name }]
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
    }
  },
  data () {
    return {
      chart: null,
      option: {
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        series: [
          {
            name: this.name,
            type: 'bar',
            data: this.chartData
          }
        ],
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        }
      }
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
    }
  },
  mounted () {
    this.chart = echarts.init(this.$el)
  },
  beforeDestroy () {
    this.chart = null
  },
  methods: {
    getOption () {
      const { option, seriesObj, otherOption } = this
      return merge(option, seriesObj, otherOption)
    }
  }
}

</script>
