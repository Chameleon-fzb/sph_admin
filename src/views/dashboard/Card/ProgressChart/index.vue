<template>
  <div
    ref="charts"
    class="charts"
  />
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'ProgressChart',
  mounted () {
    // 初始化echarts
    const progressChart = echarts.init(this.$refs.charts)
    progressChart.setOption({
      xAxis: {
        show: false,
        minx: 0,
        max: 100

        // data: ['a', 'b', 'c', 'd', 'e', 'f', 'h']
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: [
        {
          type: 'bar',
          data: [69],
          barWidth: 20,
          color: 'yellowgreen',
          showBackground: true
        }
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      label: { show: true, formatter: '|', position: 'right', distance: -1 }

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
