<template>
  <div :style="{width,height}" />
</template>
<script>
// import * as echarts from 'echarts'
import merge from 'lodash/merge'
import resize from '../mixins/resize'
export default {
  name: 'LineChart',
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
      default: '300px'
    },
    chartData: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true

    },
    seriesOption: {
      type: Array,
      default () {
        return [{ type: 'line', name: this.name }]
      }
    },
    otherOption: {
      type: Object,
      default () {
        return {}
      }
    }

  },
  data () {
    return {
      chart: null,
      option: {
        xAxis: {
          show: false,
          type: 'category'
        },
        yAxis: {
          show: false
        },
        series: [
          {
            name: this.name,
            type: 'line',
            data: this.chartData,
            // 拐点的样式
            itemStyle: {
              opacity: 0
            },
            // 线条的 样式
            lineStyle: {
              color: 'purple'
            },
            // 填充颜色
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'purple'
                  },
                  {
                    offset: 1,
                    color: '#fff'
                  }
                ]
              }
            },
            // 圆润的折线
            smooth: true
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
    // this.chart = echarts.init(this.$el)
    this.chart = this.$_myChart
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
<style>
</style>
