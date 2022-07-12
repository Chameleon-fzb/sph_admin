<template>
  <div
    ref="charts"
    class="charts"
  />
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'LineCharts',
  mounted () {
    // 初始化echarts
    const lineChart = echarts.init(this.$refs.charts)
    lineChart.setOption({
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
          data: [10, 45, 23, 50, 30, 45, 67, 89, 45, 57, 23, 34, 25, 28, 70],
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

</script>
<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
