<template>
  <div :style="{width,height}" />
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'LineChart',
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
    chartOption: {
      type: Object,
      default () {
        return {}
      }
    }

  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el)
      this.setOption(this.chartData)
    },
    setOption () {
      this.chart.setOption({
        xAxis: {
          show: false,
          type: 'category'
        },
        yAxis: {
          show: false
        },
        series: [
          {
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
      })
    }
  }

}
</script>
<style>
</style>
