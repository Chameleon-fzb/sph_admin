<template>
  <el-card>
    <div
      slot="header"
      class="category_header"
    >
      <span>销售额类别占比</span>
      <div>
        <el-radio-group
          v-model="radio"
          size="mini"
        >
          <el-radio-button label="全部渠道" />
          <el-radio-button label="线上" />
          <el-radio-button label="线下" />
        </el-radio-group>
      </div>
    </div>
    <div
      ref="charts"
      class="charts"
    />
  </el-card>
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'Category',
  data () {
    return {
      radio: '全部渠道',
      categoryCharts: null
    }
  },
  mounted () {
    this.categoryCharts = echarts.init(this.$refs.charts)
    this.chartsSetoption()
    this.categoryCharts.on('mouseover', (params) => {
      const { name, value } = params.data
      this.categoryCharts.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
  },
  methods: {
    chartsSetoption () {
      this.categoryCharts.setOption({
        title: {
          text: '视频',
          subtext: '1048',
          left: 'center',
          top: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: true,
              position: 'outside'
            },
            labelLine: {
              show: true,
              length: 16,
              length2: 10
            },
            data: [
              { value: 1048, name: '视频' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.category_header {
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>
