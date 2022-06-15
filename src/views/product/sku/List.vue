<template>
  <div>
    <el-card>
      <CategorySelector
        :is-show-list="true"
        @changeCategory="changeCategory"
      />
    </el-card>
    <el-card style="margin-top:20px">
      <el-pagination
        :current-page.sync="pagination.currentPage"
        :page-sizes="[3, 5, 8,10]"
        :page-size="pagination.limit"
        layout="prev, pager, next, jumper,sizes,total"
        :total="pagination.total"
        align="center"
        @current-change="changeCurrentPage"
      />

    </el-card>
  </div>

</template>
<script>
export default {
  name: 'Sku',
  data () {
    return {
      isShowList: true,
      category: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      },
      pagination: {
        currentPage: 1,
        limit: 5,
        total: 0
      },
      spuList: []
    }
  },
  methods: {
    changeCategory ({ category1Id, category2Id, category3Id }) {
      if (category1Id) {
        this.category = { category1Id, category2Id: '', category3Id: '' }
        return
      }
      if (category2Id) {
        this.category.category2Id = category2Id
        this.category.category3Id = ''
        return
      }
      if (category3Id) {
        this.category.category3Id = category3Id
        this.getSpuPageList()
      }
    },
    /**
     * 获取spu分页列表
     */
    async getSpuPageList () {
      const { currentPage, limit } = this.pagination
      const { category3Id } = this.category
      const result = await this.$API.spu.getSpuList(currentPage, limit, category3Id)
      if (result.code === 200) {
        this.spuList = result.data.records
        this.pagination.total = result.data.total
        return
      }
      this.$message.error('获取spu分页列表错误')
    },
    changeCurrentPage () { }
  }
}
</script>
<style lang="scss" scoped>
</style>
