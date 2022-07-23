<template>
  <div class="sale">
    <el-card shadow="always">
      <div
        slot="header"
        class="header"
      >
        <!-- 左侧 -->
        <el-tabs
          v-model="activeName"
          class="tab"
          @tab-click="handleClick"
        >
          <el-tab-pane
            label="销售额"
            name="sale"
          />
          <el-tab-pane
            label="访问量"
            name="visit"
          />
        </el-tabs>
        <!-- 右侧 -->
        <div class="right_header">
          <div class="setDate hidden-sm-and-down">
            <span @click="setDay">今日</span>
            <span @click="setWeek">本周</span>
            <span @click="setMonth">本月</span>
            <span @click="setYear">本年</span>
          </div>
          <el-dropdown
            class="hidden-md-and-up"
            @command="handleCommand"
          >
            <span class="el-dropdown-link el-icon-more" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="setDay">今日</el-dropdown-item>
              <el-dropdown-item command="setWeek">本周</el-dropdown-item>
              <el-dropdown-item command="setMonth">本月</el-dropdown-item>
              <el-dropdown-item command="setYear">本年</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-date-picker
            v-model="date"
            value-format="yyyy-MM-dd"
            type="daterange"
            size="small"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
      </div>
      <div>
        <el-row>
          <el-col
            :span="18"
            :lg="{span:15,offset:1}"
            :md="{span:16,offset:1}"
            :sm="{span:18,offset:3}"
            :xs="{span:24,offset:0}"
            :offset="0"
          >
            <BarChart
              height="320px"
              name="bar1"
              :other-option="otherOption"
              :series-option="seriesOption"
              :chart-data="chartData"
            />
          </el-col>
          <el-col
            :span="6"
            :lg="{span:6,offset:1}"
            :md="{span:6,offset:0}"
            :sm="{span:14,offset:5}"
            :xs="{span:18,offset:3}"
            :offset="0"
          >
            <div class="right_rank">
              <h4 class="rank_title">门店{{ title }}排名</h4>
              <ul>
                <li
                  v-for="(item,i) in rankList"
                  :key="item.id"
                >
                  <span class="rank_index">{{ i+1 }}</span>
                  <span class="rank_name">{{ item.name }}</span>
                  <span class="rank_num">
                    <countTo
                      :start-val="0"
                      :end-val="item[`${activeName}Num`]"
                      :duration="2000"
                    />
                  </span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import 'element-ui/lib/theme-chalk/display.css'
import BarChart from '../components/BarChart'
import countTo from 'vue-count-to'
import dayjs from 'dayjs'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Sale',
  components: {
    BarChart,
    countTo
  },
  data () {
    return {
      date: [],
      activeName: 'sale',
      otherOption: {
        title: {
          text: '销售额趋势'
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          containLabel: true
        }
      },
      seriesOption: [{
        name: '访问量',
        type: 'bar',
        barWidth: '65%',
        color: '#159781'
      }]
    }
  },
  computed: {
    isSale () {
      return this.activeName === 'sale'
    },
    title () {
      return this.isSale ? '销售额' : '访问量'
    },
    color () {
      return this.isSale ? '#159781' : '#7a4a85'
    },
    ...mapState({
      saleInfo: state => state.home.saleInfo,
      visitInfo: state => state.home.visitInfo,
      rankInfo: state => state.home.rankInfo
    }),
    ...mapGetters(['saleData', 'visitData', 'saleXAxisData', 'visitXAxisData']),
    chartData () {
      return this.isSale ? this.saleData : this.visitData
    },
    xAxisData () {
      return this.isSale ? this.saleXAxisData : this.visitXAxisData
    },
    rankList () {
      const { activeName, rankInfo } = this
      return Array.from(rankInfo).sort((a, b) => { return b[`${activeName}Num`] - a[`${activeName}Num`] })
    }
  },
  methods: {
    handleClick (tab, event) {
      this.chartsSetOption()
    },
    chartsSetOption () {
      const { title, color, xAxisData } = this
      this.otherOption = {
        title: {
          text: `${title}趋势`
        },
        xAxis: {
          data: xAxisData
        }
      }
      this.seriesOption = [{
        color
      }]
    },
    // 设置今天
    setDay () {
      const day = dayjs().format('YYYY-MM-DD')
      this.date = [day, day]
    },
    setWeek () {
      const weekStart = dayjs().day(1).format('YYYY-MM-DD')
      const weekEnd = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [weekStart, weekEnd]
    },
    setMonth () {
      const monthStart = dayjs().startOf('month').format('YYYY-MM-DD')
      const monthEnd = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [monthStart, monthEnd]
    },
    setYear () {
      const yearStart = dayjs().startOf('year').format('YYYY-MM-DD')
      const yearEnd = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [yearStart, yearEnd]
    },
    handleCommand (command) {
      this[`${command}`]()
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin flexJustifySP() {
  display: flex;
  justify-content: space-between;
}
.sale {
  width: 100%;
  height: 100%;
  padding: 10px 5px;
  .header {
    position: relative;
    @include flexJustifySP();
    .tab {
      width: 100%;
    }
    .right_header {
      position: absolute;
      right: 0px;
      .setDate {
        display: inline-block;
        margin-right: 10px;
        span {
          margin-right: 28px;
          font-size: 14px;
          cursor: pointer;
        }
      }
      .el-dropdown {
        margin-right: 10px;
        .el-dropdown-link {
          font-size: 16px;
        }
      }
    }
  }
}
::v-deep .el-card__header {
  border: none;
}
::v-deep .el-card__body {
  padding: 0 20px;
}
.el-row {
  .el-col {
    height: 360px;
  }
}
.right_rank {
  .rank_title {
    margin-top: 0px;
    text-align: center;
    padding: 10px;
  }
  ul {
    list-style: none;
    width: 100%;
    height: 320px;
    padding: 0;
    margin: 0;
    li {
      height: 9%;
      margin: 8px 0;
      @include flexJustifySP();
      span {
        text-align: center;
        line-height: 20px;
      }
      .rank_index {
        width: 20px;
        height: 20px;
        font-size: 14px;
      }
      .rank_num {
        width: 76px;
      }
    }
    li:nth-child(-n + 3) .rank_index {
      border-radius: 50%;
      background: black;
      color: white;
      font-size: 14px;
    }
  }
}
</style>
