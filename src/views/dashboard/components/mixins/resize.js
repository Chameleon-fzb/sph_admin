import * as $_echarts from 'echarts'
import debounce from 'lodash/debounce'
export default {
  data() {
    return {
      $_myChart: null,
      $_resizeHandler: null,
      $_echartsInit: null,
      $_sidebarElm: null
    }
  },
  mounted() {
    this.$_myChart = $_echarts.init(this.$el)
    // 定义并保存更新图表的函数
    this.$_resizeHandler = debounce(() => {
      // 函数防抖, 避免频繁更新图表
      // 使用echarts的组件
      this.$_myChart.resize()
    }, 100)
    this.$_initSidebarResizeEvent()
    this.$_initResizeHandler()
    this.initChart()
  },
  /*
  组件死亡时的回调 ==> 解绑窗口resize事件监听
  */
  beforeDestroy() {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
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
    },
    /** 滑块导致的宽度改变*/
    $_initSidebarResizeEvent() {
      this.$_sidebarElm =
        document.getElementsByClassName('sidebar-container')[0]
      this.$_sidebarElm &&
        this.$_sidebarElm.addEventListener(
          'transitionend',
          this.$_sidebarResizeHandler
        )
    },
    /*
    处理sidebar绑定尺寸变化的监听回调 ==> 更新图表
    */
    $_sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        // 是width属性变化才处理
        this.$_resizeHandler()
      }
    },
    /*
    解绑sidebar的尺寸变化的事件监听
    */
    $_destroySidebarResizeEvent() {
      this.$_sidebarElm &&
        this.$_sidebarElm.removeEventListener(
          'transitionend',
          this.$_sidebarResizeHandler
        )
    }
  }
}
