<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-card>
          <Detail
            title="总销售额"
            count="￥ 125654"
          >
            <template slot="charts">
              <span>周同比&nbsp;&nbsp;56.67%
                <svg
                  t="1657609772022"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2339"
                  width="12"
                  height="12"
                >
                  <path
                    d="M583.93 296.842l234.8 318.515a73.059 73.059 0 0 1-14.99 102.048l-2.62 1.806a78.116 78.116 0 0 1-44.612 13.908h-469.6a75.588 75.588 0 0 1-76.762-74.414 72.878 72.878 0 0 1 14.269-43.348l234.8-318.515a78.568 78.568 0 0 1 106.834-16.888 77.574 77.574 0 0 1 17.881 16.888z"
                    p-id="2340"
                    fill="#1aaa1a"
                  />
                </svg></span>
              <span>日同比&nbsp;&nbsp;19.99%
                <svg
                  t="1657609905047"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3404"
                  width="12"
                  height="12"
                >
                  <path
                    d="M458.854 701.962l-234.8-318.605a73.059 73.059 0 0 1 15.262-102.048l2.619-1.806a78.026 78.026 0 0 1 44.612-13.817h469.6a75.588 75.588 0 0 1 76.762 74.413 72.246 72.246 0 0 1-14.269 43.258l-234.8 318.605a78.477 78.477 0 0 1-107.195 17.25 77.213 77.213 0 0 1-17.791-17.25z"
                    p-id="3405"
                    fill="#d81e06"
                  />
                </svg>

              </span>
            </template>
            <template slot="footer">
              日销售额￥ 14677
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail
            title="访问量"
            count="99469"
          > <template slot="charts">
              <!-- <LineChart /> -->
              <LineChart
                height="100%"
                :chart-data="chartData"
              />
            </template>
            <template slot="footer">
              日访问量 1677
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail
            title="支付笔数"
            count="12346"
          >
            <template slot="charts">
              <BarChart />
            </template>
            <template slot="footer">
              转化率 67%
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail
            title="运营活动效果"
            count="78%"
          >
            <template slot="charts">
              <ProgressChart />
            </template>
            <template slot="footer">
              <span>周同比&nbsp;&nbsp;12.67%
                <svg
                  t="1657609772022"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2339"
                  width="12"
                  height="12"
                >
                  <path
                    d="M583.93 296.842l234.8 318.515a73.059 73.059 0 0 1-14.99 102.048l-2.62 1.806a78.116 78.116 0 0 1-44.612 13.908h-469.6a75.588 75.588 0 0 1-76.762-74.414 72.878 72.878 0 0 1 14.269-43.348l234.8-318.515a78.568 78.568 0 0 1 106.834-16.888 77.574 77.574 0 0 1 17.881 16.888z"
                    p-id="2340"
                    fill="#1aaa1a"
                  />
                </svg></span>
              <span>日同比&nbsp;&nbsp;11.99%
                <svg
                  t="1657609905047"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3404"
                  width="12"
                  height="12"
                >
                  <path
                    d="M458.854 701.962l-234.8-318.605a73.059 73.059 0 0 1 15.262-102.048l2.619-1.806a78.026 78.026 0 0 1 44.612-13.817h469.6a75.588 75.588 0 0 1 76.762 74.413 72.246 72.246 0 0 1-14.269 43.258l-234.8 318.605a78.477 78.477 0 0 1-107.195 17.25 77.213 77.213 0 0 1-17.791-17.25z"
                    p-id="3405"
                    fill="#d81e06"
                  />
                </svg>

              </span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ProgressChart from './ProgressChart'
import LineChart from '../components/LineChart'
import BarChart from './BarChart'
import Detail from './Detail'
export default {
  name: 'Card',
  components: {
    Detail,
    LineChart,
    BarChart,
    ProgressChart
  },
  data () {
    return {
      chartData: [10, 45, 23, 50, 30, 45, 67, 89, 45, 57, 23, 34, 25, 28, 70]
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  .el-col {
    padding: 0 5px;
  }
}
</style>
