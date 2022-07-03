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
                @click.native="toShowSpuForm(row)"
              />
              <hintBtn
                type="info"
                icon="el-icon-info"
                title="查看"
                size="mini"
                @click="showSkus(row)"
              />
              <el-popconfirm
                :title="`确定删除${row.spuName}吗？`"
                @onConfirm="deleteSpu(row.id)"
              >
                <hintBtn
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  title="删除"
                  size="mini"
                />
              </el-popconfirm>

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
        @successBack="successBack"
      />
      <SkuForm
        v-show="isShowSkuForm"
        ref="sku"
        :visible.sync="isShowSkuForm"
      />
    </el-card>
    <!--
      放在 查看按钮下 不能实现,而且每一项都会有
      对话框,后一个会覆盖前一个,最终只会显示最后一个,并不是我们要的
       :title="`${row.spuName}sku列表`"
       只显示一个
       放在结尾
       使用标识变量
      :title="`${dialogTitle}sku列表`"
      查看时传入 row
       <hintBtn
          type="info"
          icon="el-icon-info"
          title="查看"
          size="mini"
          @click="showSkus(row)"
        />
        将 row.spuName 保存到 dialogTitle
        保证只显示一项
      -->
    <el-dialog
      :title="`${dialogTitle}sku列表`"
      :visible.sync="dialogTableVisible"
      @closed="skuList=[]"
    >
      <el-table
        :data="skuList"
        border
        stripe
      >
        <el-table-column
          prop="skuName"
          label="名称"
          width="width"
        />
        <el-table-column
          prop="price"
          label="价格"
          width="width"
        />
        <el-table-column
          prop="weight"
          label="重量"
          width="width"
        />
        <el-table-column
          label="默认图片"
          width="width"
        >
          <template slot-scope="props">
            <el-image
              style="width: 100px; height: 100px"
              :src="props.row.skuDefaultImg"
              fit="fill"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
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
      dialogTableVisible: false,
      dialogTitle: '',
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
      spuList: [],
      skuList: []
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
      // 修改
      if (spu.id) {
        this.$refs.spu.initUpdSpuFormData(spu)
        return
      }
      // 添加
      this.$refs.spu.initAddSpuFormData(this.category.category3Id)
    },
    /**
    * 显示SkuForm 进行添加Sku
    */
    toShowSkuForm (spu) {
      this.isShowSkuForm = true
      this.$refs.sku.initAddSpuFormData(spu, this.category)
    },
    /**
     * 点击取消
     **/
    toShowList () {
      this.isShowSpuForm = false
      this.isShowSkuForm = false
    },
    /**
     * 成功返回后让父组件重新获取数据
     */
    successBack (isUpdate) {
      // 发请求重新获取数据
      // 修改还是添加
      this.getSpuPageList(isUpdate ? this.pagination.currentPage : 1)
    },
    /**
     *  deleteSpu(spuId) {
     *  return request.delete(`/admin/product/deleteSpu/${spuId}`)
     *  },
     * */
    async deleteSpu (spuId) {
      try {
        await this.$API.spu.deleteSpu(spuId)
        this.$message.success('删除成功')
        this.getSpuPageList(this.spuList.length > 1 ? this.pagination.currentPage : this.pagination.currentPage - 1)
      } catch (error) {
        this.$message.error('删除失败')
      }
    },
    /**
     * 查看sku列表
     */
    async showSkus (spu) {
      try {
        this.dialogTitle = spu.spuName
        const result = await this.$API.sku.getListBySpuId(spu.id)
        this.skuList = result.data
        this.dialogTableVisible = true
      } catch (error) {
        this.$message.error('获取sku列表失败')
      }
    }
  }
}
</script>
