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
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
    <div>
      <el-row>
        <el-col :span="12">
          <lineChart
            title="搜索用户数"
            num="124465"
          >
            <template slot="main_svg">
              17.1
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
          </lineChart>
        </el-col>
        <el-col :span="12">
          <lineChart
            title="人均搜索次数"
            num="2.7"
          >

            <template slot="main_svg">
              20.3
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
          </lineChart>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column
          label="排名"
          type="index"
          width="80"
        />
        <el-table-column
          label="热搜关键字"
          width="180"
        />
        <el-table-column
          label="用户数"
          sortable
        />
        <el-table-column
          label="周涨幅"
          sortable
        />
      </el-table>
      <el-pagination
        align="center"
        :current-page.sync="pagination.page"
        :page-size="pagination.limit"
        layout=" prev, pager, next"
        :total="pagination.totalNum"
        @current-change="currentChange"
      />
    </div>
  </el-card>
</template>
<script>
import lineChart from './LineChart'
export default {
  name: 'Search',
  components: {
    lineChart
  },
  data () {
    return {
      tableData: [{}],
      pagination: {
        page: 1,
        totalNum: 100,
        limit: 1
      }
    }
  },
  methods: {
    formatter (row, column) {
      return row.address
    }
  }
}
</script>
<style lang="scss" scoped>
.search_header {
  display: flex;
  justify-content: space-between;
}
.el-row {
  .el-col {
    height: 160px;
  }
}
</style>
