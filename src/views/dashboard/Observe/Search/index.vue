<template>
  <el-card>
    <div
      slot="header"
      class="search_header"
    > <span>线上热门搜索</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-more" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
    <div>
      <el-row>
        <el-col :span="12">
          <SearchChart
            title="搜索用户数"
            :num="searchUser.searchNum||0"
            :chart-data="searchUserData"
            name="searchChart_1"
          >
            <template slot="main_svg">
              {{ searchUser.day_on_year|formatPercentage }}
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
              </svg></template>
          </SearchChart>
        </el-col>
        <el-col :span="12">
          <SearchChart
            title="人均搜索次数"
            :num="averageSearch.averageNum||0"
            :chart-data="averageSearchData"
            name="searchChart_2"
          >
            <template slot="main_svg">
              {{ averageSearch.day_on_year|formatPercentage }}
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
            </template>
          </SearchChart>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        max-height="108px"
      >
        <el-table-column
          label="排名"
          width="80"
          prop="index"
        />
        <el-table-column
          label="热搜关键字"
          prop="name"
        />
        <el-table-column
          label="用户数"
          sortable
          prop="userNum"
        />
        <el-table-column
          label="周涨幅"
          sortable
        >
          <template slot-scope="{row}">
            {{ row.weekly_increase|formatPercentage }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        align="center"
        :current-page.sync="pagination.page"
        :page-size="pagination.limit"
        layout=" prev, pager, next"
        :total="pagination.totalNum"
      />
    </div>
  </el-card>
</template>
<script>
import { mapGetters } from 'vuex'
import SearchChart from './SearchChart'
export default {
  name: 'Search',
  components: {
    SearchChart
  },
  data () {
    return {
      tableData: [],
      pagination: {
        page: 1,
        totalNum: 0,
        limit: 1
      }
    }
  },
  computed: {
    ...mapGetters(['searchUser', 'averageSearch', 'searchTableData']),
    searchUserData () {
      return this.searchUser.data || []
    },
    averageSearchData () {
      return this.averageSearch.data || []
    },
    rankTableData () {
      const { searchTableData } = this
      return Array.from(searchTableData).sort((a, b) => {
        return b.userNum - a.userNum
      })
    },
    rankData () {
      return { page: this.pagination.page, data: this.rankTableData[this.pagination.page] }
    }
  },
  watch: {
    searchTableData: {
      handler (value) {
        this.pagination.totalNum = value.length
      }
    },
    rankData: {
      handler (val) {
        this.changePage(val.page)
      }
    }
  },
  methods: {
    changePage (page = 1) {
      const tableData = { ...this.rankTableData[page - 1] } || {}
      tableData.index = page
      this.tableData = [tableData]
    }
  }

}
</script>
<style lang="scss" scoped>
.search_header {
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-row {
  .el-col {
    height: 160px;
  }
}
</style>
