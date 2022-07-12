<template>
  <div
    ref="charts"
    class="charts"
  />
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'BarChart',
  mounted () {
    // 初始化echarts
    const barChart = echarts.init(this.$refs.charts)
    barChart.setOption({
      xAxis: {
        show: false,
        type: 'category'
        // data: ['a', 'b', 'c', 'd', 'e', 'f', 'h']
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'bar',
          data: [15, 45, 23, 50, 30, 45, 67, 34, 25, 28, 70]
        }
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      tooltip: {}
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
