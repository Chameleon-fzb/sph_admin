<template>
  <div>
    <el-row>
      <el-col
        :span="6"
        :md="6"
        :sm="12"
        :xs="24"
      >
        <el-card>
          <Detail
            title="总销售额"
            :count="saleInfo.totalSale||0"
            :is-money="true"
          >
            <template slot="charts">
              <span>周同比&nbsp;&nbsp;{{ saleInfo.week_on_year|formatPercentage }}
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
              <span>日同比&nbsp;&nbsp;{{ saleInfo.day_on_year|formatPercentage }}
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
              日销售额￥ {{ saleInfo.daySaleData }}
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col
        :span="6"
        :md="6"
        :sm="12"
        :xs="24"
      >
        <el-card>
          <Detail
            title="访问量"
            :count="visitInfo.totalVisit||0"
          > <template slot="charts">
              <!-- <LineChart /> -->
              <LineChart
                height="100%"
                :chart-data="visitData"
                name="card2"
              />
            </template>
            <template slot="footer">
              日访问量 {{ visitInfo.daySaleData }}
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col
        :span="6"
        :md="6"
        :sm="12"
        :xs="24"
      >
        <el-card>
          <Detail
            title="支付笔数"
            :count="paymentInfo.totalPayment||0"
          >
            <template slot="charts">
              <BarChart
                height="100%"
                :chart-data="paymentData"
                :other-option="card3.otherOption"
                name="card3"
              />
            </template>
            <template slot="footer">
              转化率 {{ paymentInfo.ConversionRate|formatPercentage }}
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col
        :span="6"
        :md="6"
        :sm="12"
        :xs="24"
      >
        <el-card>
          <Detail
            title="运营活动效果"
            :count="progressData[0]"
            :is-percent="true"
          >
            <template slot="charts">
              <!-- <ProgressChart /> -->
              <BarChart
                name="progress"
                height="100%"
                :chart-data="progressData"
                :other-option="progress.otherOption"
                :series-option="progress.seriesOption"
              />
              <!-- <linechart/> -->
            </template>
            <template slot="footer">
              <span>周同比&nbsp;&nbsp;{{ activityEffect.week_on_year|formatPercentage }}
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
              <span>日同比&nbsp;&nbsp;{{ activityEffect.day_on_year |formatPercentage }}
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
import LineChart from '../components/LineChart'
import BarChart from '../components/BarChart'
import Detail from './Detail'
import { mapState } from 'vuex'
export default {
  name: 'Card',
  components: {
    Detail,
    LineChart,
    BarChart

  },
  data () {
    return {
      card3: {
        otherOption: {
          xAxis: {
            show: false,
            type: 'category'
          },
          yAxis: {
            show: false
          }
        }
      },
      progress: {
        otherOption: {
          xAxis: {
            show: false,
            minx: 0,
            max: 100
          },
          yAxis: {
            show: false,
            type: 'category'
          },
          grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          },
          label: { show: true, formatter: '|', position: 'right', distance: -1 }
        },
        seriesOption: [
          {
            type: 'bar',
            barWidth: 20,
            color: 'yellowgreen',
            showBackground: true
          }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      saleInfo: state => state.home.saleInfo || {},
      visitInfo: state => state.home.visitInfo || {},
      paymentInfo: state => state.home.paymentInfo || {},
      activityEffect: state => state.home.activityEffect || {}
    }),
    visitData () {
      return this.visitInfo.visitData || []
    },
    paymentData () {
      return this.paymentInfo.paymentData
    },
    progressData () {
      return [this.$options.filters.formatPercentage(this.activityEffect.value, true)] || [0]
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
