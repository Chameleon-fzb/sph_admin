<template>
  <div>
    <el-card>
      <el-table
        :data="skuList"
        border
        stripe
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80"
        />
        <el-table-column
          label="名称"
          align="center"
          prop="skuName"
          width="width"
        />
        <el-table-column
          label="描述"
          align="center"
          prop="skuDesc"
          width="width"
        />
        <el-table-column
          label="默认图片"
          align="center"
          width="110"
        >
          <template slot-scope="{row}">
            <el-image
              style="wight:80px;height:80px;"
              :src="row.skuDefaultImg"
              fit="fill"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="重量"
          align="center"
          prop="weight"
          width="80"
        />
        <el-table-column
          label="价格"
          align="center"
          prop="price"
          width="80"
        />
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="{row}">
            <span v-if="$HasBtn('btn.Sku.updown')">
              <hintBtn
                v-if="row.isSale"
                type="success"
                size="mini"
                title="下架"
                icon="el-icon-sort-down"
                @click="pullOffShelves(row)"
              />
              <hintBtn
                v-else
                type="info"
                size="mini"
                title="上架"
                icon="el-icon-sort-up"
                @click="putOnShelves(row)"
              />
            </span>

            <hintBtn
              v-if="$HasBtn('btn.Sku.update')"
              type="primary"
              size="mini"
              title="修改"
              icon="el-icon-edit"
              @click="updateSku"
            />
            <hintBtn
              v-if="$HasBtn('btn.Sku.detail')"
              type="info"
              size="mini"
              title="查看"
              icon="el-icon-info"
              @click="showSkuInfo(row)"
            />
            <el-popconfirm
              :title="`确认删除${row.skuName}sku吗?`"
              @onConfirm="deleteSku(row.id)"
            >
              <hintBtn
                v-if="$HasBtn('btn.Sku.remove')"
                slot="reference"
                type="danger"
                size="mini"
                title="删除"
                icon="el-icon-delete"
              />
            </el-popconfirm>

          </template>

        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="pagination.currentPage"
        :page-sizes="[3, 5, 10]"
        :page-size="pagination.limit"
        layout=" prev, pager, next, jumper,->,total, sizes"
        :total="pagination.total"
        background
        align="center"
        @size-change="changeSize"
        @current-change="changeCurrentPage"
      />
    </el-card>
    <el-drawer
      :visible.sync="isShowSkuInfo"
      size="50%"
      :show-close="false"
      @closed="handleClose"
    >
      <div v-loading="loading">
        <el-row>
          <el-col
            :span="5"
            :offset="0"
            align="center"
          >名称:</el-col>
          <el-col
            :span="16"
            :offset="0"
          >{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row>
          <el-col
            :span="5"
            :offset="0"
            align="center"
          >描述:</el-col>
          <el-col
            :span="16"
            :offset="0"
          >{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row>
          <el-col
            :span="5"
            :offset="0"
            align="center"
          >价格:</el-col>
          <el-col
            :span="16"
            :offset="0"
          >{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row>
          <el-col
            :span="5"
            :offset="0"
          >平台属性:</el-col>
          <el-col
            :span="16"
            :offset="0"
          >
            <el-tag
              v-for="skuAttrValue in skuInfo.skuAttrValueList "
              :key="skuAttrValue.id"
              style="margin:5px;"
              type="success"
              size="mini"
              closable
            >{{ skuAttrValue.attrId }}-{{ skuAttrValue.valueId }}</el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="5"
            :offset="0"
            align="center"
          >图片列表:</el-col>
          <el-col
            :span="16"
            :offset="0"
          >
            <el-carousel
              height="300px"
              type="default"
              direction="horizontal"
              :initial-index="0"
              :autoplay="true"
              :interval="3000"
              :loop="true"
              trigger="hover"
              indicator-position="outside"
              arrow="hover"
            >
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.key"
              >
                <el-image
                  style="width:100%;height: 100%;"
                  :src="item.imgUrl"
                  fit="cover"
                />

              </el-carousel-item>
            </el-carousel>

          </el-col>
        </el-row>
      </div>

    </el-drawer>
  </div>
</template>
<script>
export default {
  name: 'Sku',
  data () {
    return {
      isShowSkuInfo: false,
      loading: true,
      skuList: [],
      skuInfo: {},
      pagination: {
        currentPage: 0,
        total: 0,
        limit: 3
      }
    }
  },
  mounted () {
    this.getSkuList()
  },
  methods: {
    /** 获取sku列表*/
    async getSkuList (page = 1) {
      const { limit } = this.pagination
      const result = await this.$API.sku.getSkuList(page, limit)
      if (result.code === 200) {
        this.pagination.currentPage = page
        this.skuList = result.data.records
        this.pagination.total = result.data.total
        return
      }
      this.$message.error('获取sku分页列表错误')
    },
    /**
     * 改变当前页码
     */
    changeCurrentPage (page) {
      this.getSkuList(page)
    },
    /**
     * 每页显示条数改变
     */
    changeSize (size) {
      this.pagination.limit = size
      this.getSkuList(this.pagination.currentPage)
    },
    /** 上架 */
    async putOnShelves (sku) {
      try {
        await this.$API.sku.onSale(sku.id)
        this.$message.success('上架成功')
        this.getSkuList(this.pagination.currentPage)
      } catch (error) {
        this.$message.error('上架失败')
      }
    },
    /** 下架 */
    async pullOffShelves (sku) {
      try {
        await this.$API.sku.cancelSale(sku.id)
        this.$message.success('下架成功')
        this.getSkuList(this.pagination.currentPage)
      } catch (error) {
        this.$message.error('下架失败')
      }
    },
    /** 获取sku详情  */
    async showSkuInfo (sku) {
      this.isShowSkuInfo = true
      const result = await this.$API.sku.getSkuInfo(sku.id)
      if (result.code === 200) {
        this.skuInfo = result.data
        this.loading = false
        return
      }
      this.$message.error('获取sku详情失败')
    },
    /**
     * 关闭抽屉
    */
    handleClose () {
      this.skuInfo = {}
      this.loading = true
    },
    updateSku () {
      this.$message.info('此功能正在开发中')
    },
    async deleteSku (skuId) {
      const result = await this.$API.sku.deleteSku(skuId)
      if (result.code === 200) {
        this.$message.success('删除成功')
        this.getSkuList(this.skuList.length > 1 ? this.pagination.currentPage : ((this.pagination.currentPage - 1) || 1))
        return
      }
      this.$message.error('删除失败')
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px;
}

::v-deep .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

::v-deep .el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
::v-deep .el-carousel__button {
  width: 10px;
  height: 10px;
  background: #393939;
  border-radius: 50%;
}

/* 样式穿透的方法
vue中针对不同的样式类型(css,less,scss)有不用的样式穿透方法。
css 使用 >>>
less  使用 /deep/
scss::v-deep */
</style>
