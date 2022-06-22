<template>
  <div>
    <el-card>
      <CategorySelector
        :is-show-list="true"
        @changeCategory="changeCategory"
      />
    </el-card>
    <el-card style="margin-top:20px">
      <div v-show="!isShowSkuForm&&!isShowSpuForm">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category.category3Id"
          @click="toShowSpuForm"
        >添加SPU</el-button>
        <el-table
          :data="spuList"
          border
          stripe
          style="margin:20px 0;"
        >
          <el-table-column
            label="序号"
            width="80"
            type="index"
            align="center"
          />
          <el-table-column
            label="SPU名称"
            width="width"
            prop="spuName"
          />
          <el-table-column
            label="SPU描述"
            width="width"
            prop="description"
          />
          <el-table-column
            label="操作"
            width="width"
          >
            <template slot-scope="{row}">
              <hintBtn
                type="primary"
                icon="el-icon-plus"
                title="添加SKU"
                size="mini"
                @click="toShowSkuForm(row)"
              />
              <hintBtn
                type="warning"
                icon="el-icon-edit"
                title="修改SPU"
                size="mini"
                @click="toShowSpuForm(row)"
              />
              <hintBtn
                type="info"
                icon="el-icon-info"
                title="查看"
                size="mini"
              />
              <hintBtn
                type="danger"
                icon="el-icon-delete"
                title="删除"
                size="mini"
              />

            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          :current-page.sync="pagination.currentPage"
          :page-sizes="[3, 5, 8,10]"
          :page-size="pagination.limit"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="pagination.total"
          align="center"
          @current-change="changeCurrentPage"
          @size-change="handelSizeChange"
        />
      </div>
      <SpuForm
        v-show="isShowSpuForm"
        ref="spu"
        :visible.sync="isShowSpuForm"
      />
      <SkuForm v-show="isShowSkuForm" />
    </el-card>
  </div>

</template>
<script>
import SpuForm from '@/views/product/components/SpuForm'
import SkuForm from '@/views/product/components/SkuForm'

export default {
  name: 'Spu',
  components: {
    SpuForm,
    SkuForm
  },
  data () {
    return {
      isShowList: true,
      isShowSpuForm: false,
      isShowSkuForm: false,
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
    async getSpuPageList (page = 1) {
      this.pagination.currentPage = page
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
    /**
     * 改变当前页码
     */
    changeCurrentPage (page) {
      this.getSpuPageList(page)
    },
    /**
     * 每页显示条数改变
     */
    handelSizeChange (size) {
      this.pagination.limit = size
      this.getSpuPageList(this.pagination.currentPage)
    },
    /**
    * 显示SpuForm 进行添加和修改Spu
    */
    toShowSpuForm (spu) {
      this.isShowSpuForm = true
      // 拿到子组件对象,可以使用组件中的数据也可以调用子组件
      if (spu) {
        this.$refs.spu.initUpdSpuFormData(spu)
        return
      }
      this.$refs.spu.initAddSpuFormData()
    },
    /**
    * 显示SkuForm 进行添加Sku
    */
    toShowSkuForm () {
      this.isShowSkuForm = true
    },
    /**
     * 点击取消
     **/
    toShowList () {
      this.isShowSpuForm = false
      this.isShowSkuForm = false
    }
  }
}
</script>
