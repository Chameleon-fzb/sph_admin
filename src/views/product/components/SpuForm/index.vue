<template>
  <el-form
    ref="form"
    :model="spuForm"
    label-width="100px"
  >
    <el-form-item label="SPU名称">
      <el-input
        v-model="spuForm.spuName"
        placeholder="请输入SPU名称"
      />
    </el-form-item>
    <el-form-item label="品牌">
      <el-select
        v-model="spuForm.tmId"
        placeholder="请选择品牌"
      >
        <el-option
          v-for="tm in trademarkList"
          :key="tm.id"
          :label="tm.tmName"
          :value="tm.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="spu描述">
      <el-input
        v-model="spuForm.description"
        type="textarea"
        rows="4"
      />
    </el-form-item>
    <el-form-item label="spu图片">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="spuImageList"
      >
        <!-- file-list 指示展示的图片数组 [{name:'food.ipg,url:'https://xxx.cdn.com/xxx.jpg'}]-->
        <i class="el-icon-plus" />
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img
          width="100%"
          :src="dialogImageUrl"
        >
      </el-dialog>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select
        v-model="spuSaleAttrId"
        :placeholder="unUsedSpuSaleAttrList.length>0 ? `还有${unUsedSpuSaleAttrList.length}未选择`: '没有可以选择的销售属性'"
      >
        <el-option
          v-for="unUsedSpuSaleAttr in unUsedSpuSaleAttrList"
          :key="unUsedSpuSaleAttr.id"
          :label="unUsedSpuSaleAttr.name"
          :value="unUsedSpuSaleAttr .id"
        />
      </el-select>
      <el-button
        type="primary"
        size="default"
        icon="el-icon-plus"
      >添加销售属性</el-button>

      <el-table
        :data="spuForm.spuSaleAttrList"
        border
        stripe
        style="margin:20px 0"
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="100"
        />
        <el-table-column
          prop="saleAttrName"
          label="属性名"
          width="width"
        />
        <el-table-column
          label="属性名称列表"
          width="width"
        >
          <template slot-scope="{row,$index}">
            <div>
              <!--
                @close="handleClose(tag)" -->
              <el-tag
                v-for="spuSaleAttrValue in row.spuSaleAttrValueList"
                :key="spuSaleAttrValue.id"
                closable
                :disable-transitions="false"
              >
                {{ spuSaleAttrValue.saleAttrValueName }}
              </el-tag>
              <!--  @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm" -->

              <!-- row.inputVisible是代表是否是编辑模式. 之前属性管理是把这个值定义在属性值上,因为我们
                每个属性当中所有的属性值都不能有自己的编辑模式和查看模式,而是每个属性有一个之前我们是每个属性
                值都有自己的编辑模式和查看模式,而且每个属性值都有自己的编辑模式和查看模式
                我们给每一个属性设置一个inputVisible的值  -->
              <el-input
                v-if="row.inputVisible"
                ref="saveTagInput"
                v-model="row.inputValue"
                class="input-new-tag"
                size="small"
              />
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
              >+ 添加</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="width"
        >
          <template slot-scope="{row,$index}">
            <div>
              <HintBtn
                title="删除"
                type="danger"
                size="mini"
                icon="el-icon-delete"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        size="default"
      >保存</el-button>
      <el-button
        size="default"
        @click="$emit('update:visible',false)"
      >取消</el-button>

    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'SpuForm',
  data () {
    return {
      spuForm: {
        category3Id: 0,
        spuName: '',
        description: '',
        tmId: '',
        spuImageList: [],
        spuSaleAttrList: []
      },
      spuImageList: [], // 获取的spu图片列表
      trademarkList: [], // 获取的品牌列表
      spuSaleAttrList: [], // 获取的销售属性列表
      // 销售属性id
      spuSaleAttrId: '',
      dialogImageUrl: '',
      dialogVisible: false,
      inputVisible: false,
      inputValue: ''

    }
  },
  computed: {
    // 所有的销售属性除去自身的,剩余的销售属性列表
    unUsedSpuSaleAttrList () {
      /* 从所有的销售属性列表中去过滤,过滤出销售属性列表当中每个销售属性名称都不相同的 */
      // 从所有销售属性拿一项,去和自己已有的数组每个比较,如果都不相等,就拿走,有相等就不要
      return this.spuSaleAttrList.filter(spuSaleAttr =>
        this.spuForm.spuSaleAttrList.every(mySpuSaleAttr =>
          spuSaleAttr.name !== mySpuSaleAttr.saleAttrName))
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 修改时获取初始化数据
    async initUpdSpuFormData (spu) {
      // getSpuById
      const spuResult = await this.$API.spu.getSpuInfo(spu.id)
      if (spuResult.code === 200) {
        this.spuForm = spuResult.data
      }
      // spuImageList
      const spuImageResult = await this.$API.sku.getSpuImageList(spu.id)
      if (spuImageResult.code === 200) {
        const spuImageList = spuImageResult.data
        // 整理格式 添加 name 和 url 供 图片墙使用
        spuImageList.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImageList = spuImageList
      }
      // getTrademark
      const trademarkResult = await this.$API.trademark.getList()
      if (trademarkResult.code === 200) {
        this.trademarkList = trademarkResult.data
      }
      // baseSaleAttrList
      const saleResult = await this.$API.spu.getSaleAttrList()
      if (saleResult.code === 200) {
        this.spuSaleAttrList = saleResult.data
      }
    },
    // 添加时获取初始化数据
    async initAddSpuFormData () {
      // getTrademark
      this.$API.trademark.getList()
      // baseSaleAttrList
      this.$API.spu.getSaleAttrList()
    },
    showInput (spuSaleAttr) {
      spuSaleAttr.inputVisible = true
    }
  }
}
</script>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
