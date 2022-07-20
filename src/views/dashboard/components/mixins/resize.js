import * as $_echarts from 'echarts'
import debounce from 'lodash/debounce'
export default {
  data() {
    return {
      $_myChart: null,
      $_resizeHandler: null,
      $_echartsInit: null
    }
  },
  // watch: {
  //   chartData: {
  //     handler(val) {
  //       console.log('chartData改变')
  //       val && this.updateChart()
  //     }
  //   }
  // },
  mounted() {
    this.$_myChart = $_echarts.init(this.$el)
    // 定义并保存更新图表的函数
    this.$_resizeHandler = debounce(() => {
      // 函数防抖, 避免频繁更新图表
      // 使用echarts的组件
      this.$_myChart.resize()
    }, 100)
    this.$_initResizeHandler()
    this.initChart()
  },
  /*
  组件死亡时的回调 ==> 解绑窗口resize事件监听
  */
  beforeDestroy() {
    this.$_destroyResizeEvent()
    this.destroyChart()
  },
  methods: {
    initChart() {
      this.$_initChart()
    },
    updateChart() {
      this.$_updateChart()
    },
    destroyChart() {
      this.$_destroyChart()
    },
    $_initChart() {
      this.$_myChart.showLoading()
      this.$_myChart.setOption(this.getOption(), true)
      this.$_myChart.hideLoading()
    },
    $_updateChart() {
      this.$_myChart.setOption(this.newOption)
    },
    /* 销毁chart */
    $_destroyChart() {
      if (!this.myChart) {
        return
      }
      this.$_myChart.dispose()
    },
    /*
    给窗口绑定resize事件监听 ==> 更新图表
    */
    $_initResizeHandler() {
      window.addEventListener('resize', this.$_resizeHandler)
    },
    /*
    解绑窗口的resize事件监听
    */
    $_destroyResizeEvent() {
      window.removeEventListener('resize', this.$_resizeHandler)
    }
  }
}
