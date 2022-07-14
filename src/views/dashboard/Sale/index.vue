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
          <span>今日</span>
          <span>本周</span>
          <span>本月</span>
          <span>本年</span>
          <el-date-picker
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
          <el-col :span="18">
            <div
              ref="charts"
              class="charts"
            />
          </el-col>
          <el-col :span="6">
            <div class="right_rank">
              <h4>门店{{ title }}排名</h4>
              <ul>
                <li>
                  <span class="rank_index">1</span>
                  <span class="rank_name">蛙小侠</span>
                  <span class="rank_num">2342342</span>
                </li>
                <li>
                  <span class="rank_index">2</span>
                  <span class="rank_name">肯德基</span>
                  <span class="rank_num">2100342</span>
                </li>
                <li>
                  <span class="rank_index">3</span>
                  <span class="rank_name">麦当劳</span>
                  <span class="rank_num">1942342</span>
                </li>
                <li>
                  <span class="rank_index">4</span>
                  <span class="rank_name">海底捞</span>
                  <span>1742342</span>
                </li>
                <li><span class="rank_index">5</span>
                  <span class="rank_name">椒王火锅</span>
                  <span class="rank_num">1502342</span>
                </li>
                <li>
                  <span class="rank_index">6</span>
                  <span class="rank_name">真功夫</span>
                  <span class="rank_num">1462342</span>
                </li>
                <li>
                  <span class="rank_index">7</span>
                  <span class="rank_name">汉堡王</span>
                  <span class="rank_num">1342342</span>
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
import * as echarts from 'echarts'
export default {
  name: 'Sale',
  data () {
    return {
      activeName: 'sale',
      charts: null,

      sale: [180, 52, 200, 334, 390, 330, 220, 130, 49, 120, 122, 290],
      visit: [450, 352, 520, 634, 890, 530, 420, 330, 149, 200, 300, 500]
    }
  },
  computed: {
    title () {
      return this.activeName === 'sale' ? '销售额' : '访问量'
    },
    arr () {
      return this.activeName === 'sale' ? this.sale : this.visit
    }
  },
  mounted () {
    this.charts = echarts.init(this.$refs.charts)
    this.chartsSetOption()
  },
  methods: {
    handleClick (tab, event) {
      this.chartsSetOption()
    },
    chartsSetOption () {
      const { title
        // arr: data
      } = this
      this.charts.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        title: {
          text: `${title}趋势`
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: title,
            type: 'bar',
            barWidth: '60%',
            data: this[`${this.activeName}`],
            color: '#159781'
          }
        ]
      })
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
      span {
        margin-right: 28px;
        font-size: 14px;
      }
    }
  }
}
::v-deep .el-card__header {
  border: none;
}

.charts {
  width: 100%;
  height: 300px;
}
.right_rank {
  ul {
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0;
    margin: 0;
    li {
      height: 8%;
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
