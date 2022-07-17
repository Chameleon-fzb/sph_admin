<template>
  <div>
    <div class="charts_header">
      <span>{{ title }}</span>
      <svg
        t="1657560100645"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3021"
        width="16"
        height="16"
      >
        <path
          d="M512 0a512 512 0 1 0 0 1024A512 512 0 0 0 512 0z m0 896A384 384 0 0 1 512 128a384 384 0 0 1 0 768z m29.696-194.88c-11.136 10.112-24.96 17.344-31.488 15.36-6.08-1.792-9.536-7.424-8.384-13.056l89.344-248c7.424-31.488-12.736-60.16-55.424-63.872-44.8 0-110.976 40.128-151.232 90.944 0 6.08-1.344 21.12 0.128 30.208l53.632-54.208c11.008-10.176 23.808-17.344 30.336-15.424 6.592 1.92 10.112 8.384 8 14.464l-88.704 246.848c-10.176 28.864 9.152 57.152 56.192 63.616 68.928 0 109.888-39.168 150.208-89.984 0-6.08 2.368-22.08 0.96-31.104l-53.568 54.208zM575.744 192c-35.584 0-64.448 25.728-64.448 63.808 0 37.952 28.864 63.744 64.448 63.744 35.648 0 64.448-25.728 64.448-63.744 0-38.08-28.8-63.808-64.448-63.808z"
          p-id="3022"
          fill="#bfbfbf"
        />
      </svg>
    </div>
    <div class="charts_main">
      <span>
        {{ num }}
      </span>
      <span class="text">
        <slot name="main_svg" />
      </span>

      <div
        ref="charts"
        class="charts"
      />
    </div>
    <div class="charts_footer" />
  </div>

</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'LineChart',
  props: {
    title: { require: true, type: String, default: '未设置题目' },
    num: { require: true, type: String, default: '未传入num' }
  },
  data () {
    return {
      lineChart: null
    }
  },
  mounted () {
    // 初始化echarts
    this.lineChart = echarts.init(this.$refs.charts)
    this.chartSetOption()
  },
  methods: {
    chartSetOption () {
      this.lineChart.setOption({
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
}

</script>
<style lang="scss" scoped>
.charts {
  width: 100%;
  height: 60px;
}
.charts_header {
  display: flex;
  margin-bottom: 25px;
  span {
    font-size: 14px;
    color: #9f9f9f;
    margin-right: 10px;
  }
}
.charts_main {
  span {
    margin-right: 20px;
  }
  .text {
    font-size: 14px;
    color: #9f9f9f;
  }
}
</style>
