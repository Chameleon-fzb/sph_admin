<template>
  <el-form
    ref="skuForm"
    v-model="skuForm"
    label-width="80px"
    :inline="false"
    size="normal"
    @submit.native.prevent
  >
    <el-form-item label="SPU 名称">
      {{ spu.spuName }}
    </el-form-item>
    <el-form-item label="SKU 名称">
      <el-input
        v-model="skuForm.skuName"
        placeholder="SKU 名称"
      />
    </el-form-item>
    <el-form-item label="价格(元)">

      <el-input
        v-model="skuForm.price"
        placeholder="SKU 价格"
        type="number"
      />
    </el-form-item>
    <el-form-item label="重量(千克)">
      <el-input
        v-model="skuForm.weight"
        placeholder="SKU 重量"
        type="number"
      />
    </el-form-item>
    <el-form-item label="规格描述">
      <el-input
        v-model="skuForm.skuDesc"
        type="textarea"
        :rows="3"
        placeholder="SKU 规格描述"
      />
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form
        :inline="true"
        label-width="100px"
        @submit.native.prevent
      >
        <el-form-item
          v-for="skuAttr in skuAttrList"
          :key="skuAttr.id"
          :label="skuAttr.attrName"
        >
          <el-select
            v-model="skuAttr.attrIdValueId"
            placeholder="请输入"
            clearable
            filterable
          >
            <el-option
              v-for="skuAttrValue in skuAttr.attrValueList"
              :key="skuAttrValue.id"
              :label="skuAttrValue.valueName"
              :value="`${skuAttr.id}:${skuAttrValue.id}`"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form
        :inline="true"
        label-width="100px"
      >
        <el-form-item
          v-for="spuSaleAttr in spuSaleAttrList"
          :key="spuSaleAttr.id"
          :label="spuSaleAttr.saleAttrName"
        >
          <el-select
            v-model="spuSaleAttr.saleAttrIdValueId"
            placeholder="请输入"
            clearable
            filterable
          >
            <el-option
              v-for="saleAttrValue in spuSaleAttr.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              :label="saleAttrValue.saleAttrValueName"
              :value="`${spuSaleAttr.id}:${saleAttrValue.id}`"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片列表">
      <el-table
        border
        stripe
        :data="spuImageList"
        @selection-change="handleSelectionChange"
      >
        >
        <el-table-column
          prop=""
          width="55"
          type="selection"
        />
        <el-table-column label="图片">
          <template slot-scope="{row}">
            <el-image
              style="width: 100px; height: 100px"
              :src="row.imgUrl"
              fit="cover"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="名称"
          prop="imgName"
        />
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button
              v-if="!row.isDefault"
              type="primary"
              size="mini"
              @click="changeDefaultImg(row)"
            >设为默认</el-button>
            <el-tag
              v-else
              type="success"
              size="small"
              disable-transitions
            >默认</el-tag>
          </template>
        </el-table-column>
      </el-table>

    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="save"
      >保存</el-button>
      <el-button @click="cancelAddOrUpd">取消</el-button>
    </el-form-item>
  </el-form>

</template>
<script>
export default {
  name: 'SkuForm',
  data () {
    return {
      skuForm: {
        category3Id: '',
        tmId: '',
        price: '',
        weight: '',
        skuName: '',
        skuDesc: '',
        skuDefaultImg: '',
        skuAttrValueList: [],
        skuImageList: [],
        skuSaleAttrValueList: []
      },
      spu: {},
      spuImageList: [],
      checkedImgList: [],
      spuSaleAttrList: [],
      skuAttrList: []
    }
  },
  methods: {
    init (spu, { category1Id, category2Id, category3Id }) {
      this.spu = spu
      // 根据选中三级分类后获取平台属性分页列表
      const attrListResult = this.$API.attr.getList(category1Id, category2Id, category3Id)
      // 根据指定spu的id 对应的销售属性列表
      const spuSaleAttrResult = this.$API.sku.getSpuSaleAttrList(spu.id)
      // 根据指定的spu的id 获取图片列表
      const imgListResult = this.$API.sku.getSpuImageList(spu.id)
      return [attrListResult, spuSaleAttrResult, imgListResult]
    },
    // 初始化请求获取动态显示的数据
    async initAddSpuFormData (spu, category) {
      const result = await Promise.all(this.init(spu, category))
      this.skuAttrList = result[0].data
      this.spuSaleAttrList = result[1].data
      const spuImageList = result[2].data
      spuImageList.forEach(item => {
        item.isDefault = false
      })
      this.spuImageList = spuImageList
    },
    async initUpdSkuFormData (spu, category) {
      // 根据指定的spu的id 获取sku信息
      const skuInfoResult = this.$API.sku.getListBySpuId(spu.id)
      const result = await Promise.all(this.init(spu, category).push(skuInfoResult))
      this.skuAttrList = result[0].data
      this.spuSaleAttrList = result[1].data
      const spuImageList = result[2].data.forEach(item => {
        item.isDefault = false
      })
      this.spuImageList = spuImageList
      this.skuForm = result[3].data
    },
    handleSelectionChange (val) {
      this.checkedImgList = val
    },
    // 修改默认图片
    changeDefaultImg (img) {
      this.spuImageList.forEach(item => (item.isDefault = false))
      img.isDefault = true
      this.skuForm.skuDefaultImg = img.imgUrl
    },
    // 取消操作
    cancelAddOrUpd () {
      this.$emit('update:visible', false)
      this.resetData()
    },
    // 重置数据
    resetData () {
      // this.skuForm = {
      //   price: '',
      //   weight: '',
      //   skuName: '',
      //   skuDesc: '',
      //   skuDefaultImg: '',
      //   skuAttrValueList: [],
      //   skuImageList: [],
      //   skuSaleAttrValueList: []
      // }
      // this.spu = {}
      // this.spuImageList = []
      // this.checkedImgList = []
      // this.spuSaleAttrList = []
      // this.skuAttrList = []
      Object.assign(this._data, this.$options.data())
    },
    // 保存
    async save () {
      const skuInfo = this.formatData()
      try {
        this.$message.success('保存成功')
        this.cancelAddOrUpd()
      } catch (error) {
        this.$message.error('保存失败')
      }
      await this.$API.sku.addOrUpdSku(skuInfo)
    },
    //
    formatData () {
      const { skuForm, spu, skuAttrList, spuSaleAttrList, checkedImgList } = this
      /* 三级id tmId */
      skuForm.category3Id = spu.category3Id
      skuForm.tmId = spu.tmId
      /* 平台属性*/
      skuAttrList.forEach(item => {
        if (item.attrIdValueId) {
          const [attrId, valueId] = item.attrIdValueId.split(':')
          skuForm.skuAttrValueList.push({
            attrId, valueId
          })
        }
      })
      /* 销售属性 */
      skuForm.skuSaleAttrValueList = spuSaleAttrList.reduce((pre, item) => {
        if (item.saleAttrIdValueId) {
          const [saleAttrId, valueId] = item.attrIdValueId.split(':')
          pre.push({
            saleAttrId, valueId
          })
        }
        return pre
      }, [])
      /*  图片列表 */
      skuForm.skuImageList = checkedImgList.map(item => ({
        imgName: item.imgName,
        imgUrl: item.imgUrl,
        isDefault: item.isDefault,
        spuImgId: item.id
      })
      )
      return skuForm
    }
  }
}
</script>
<style scoped>
.i-block {
  display: inline-block;
  margin: 0 5px;
}
</style>
