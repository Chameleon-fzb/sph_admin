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
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
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
        v-model="spuSaleAttrIdName"
        :placeholder="unUsedSpuSaleAttrList.length>0 ? `还有${unUsedSpuSaleAttrList.length}未选择`: '没有可以选择的销售属性'"
      >
        <el-option
          v-for="unUsedSpuSaleAttr in unUsedSpuSaleAttrList"
          :key="unUsedSpuSaleAttr.id"
          :label="unUsedSpuSaleAttr.name"
          :value="`${unUsedSpuSaleAttr.id}:${unUsedSpuSaleAttr.name}`"
        />
      </el-select>
      <el-button
        type="primary"
        size="default"
        icon="el-icon-plus"
        @click="addSaleAttr"
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
          <template slot-scope="{row}">
            <div>
              <el-tag
                v-for="(spuSaleAttrValue,index) in row.spuSaleAttrValueList"
                :key="spuSaleAttrValue.id"
                closable
                :disable-transitions="false"
                @close="handleClose(spuSaleAttrValue,row.spuSaleAttrValueList,index)"
              >
                {{ spuSaleAttrValue.saleAttrValueName }}
              </el-tag>
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
                placeholder="名称"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
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
            <el-popconfirm
              :title="`是否删除${row.saleAttrName}销售属性`"
              @onConfirm="deleteSaleAttr($index)"
            >
              <HintBtn
                slot="reference"
                title="删除"
                type="danger"
                size="mini"
                icon="el-icon-delete"
              />
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        size="default"
        @click="save"
      >保存</el-button>
      <el-button
        size="default"
        @click="cancelAddOrUpd"
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
      isUpdate: false, // 添加还是修改
      category3Id: 0,
      spuImageList: [], // 获取的spu图片列表
      trademarkList: [], // 获取的品牌列表
      baseSpuSaleAttrList: [], // 获取的销售属性列表
      // 销售属性id
      spuSaleAttrIdName: '',
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
      return this.baseSpuSaleAttrList.filter(baseSpuSaleAttr =>
        this.spuForm.spuSaleAttrList.every(mySpuSaleAttr =>
          baseSpuSaleAttr.name !== mySpuSaleAttr.saleAttrName))
    }
  },
  methods: {
    // 保存
    async save () {
      // 获取收集数据
      const { spuForm, spuImageList, category3Id, isUpdate } = this
      // 整理参数
      // 1 整理图片列表
      spuForm.spuImageList = this.formatImageList(spuImageList)
      // 2 添加三级列表id
      spuForm.category3Id = category3Id
      // 3 删除属性当中的inputVisible inputValue
      spuForm.spuSaleAttrList.forEach(item => {
        delete item.inputVisible
        delete item.inputValue
      })
      // 发请求
      try {
        await this.$API.spu.addOrUpd(spuForm)
        // 成功
        this.$message.success('保存成功')
        this.cancelAddOrUpd()
        // 通知父组件重新获取数据
        this.$emit('successBack', isUpdate)
      } catch (error) {
        // 失败
        this.$message.error('保存失败')
      }
    },
    // 整理图片列表
    formatImageList (spuImageList) {
      // 老图
      /* {
        id:'',
        imgName:'',
        name:'',
        spuId:'',
        status:"success",
        uid:4564654654,
        url:''
      } */
      // 新图
      /*
      {
        name:'',
        percentage:100,
        raw:File,
        response:{code:201,message:"失败",data:null,ok:false},
        size:488486,
        status:'success',
        uid:4564654654,
        url:''本地的url
      }
      */
      return spuImageList.map(item => ({
        imgName: item.name,
        imgUrl: item.imgUrl || item.response.data
      })
      )
    },
    // 删除属性
    deleteSaleAttr (index) {
      this.spuForm.spuSaleAttrList.splice(index, 1)
    },
    // 删除当前属性值
    handleClose (spuSaleAttrValue, spuSaleAttrValueList, index) {
      this.$confirm(`是否删除${spuSaleAttrValue.saleAttrValueName}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            spuSaleAttrValueList.splice(index, 1)
          }
          done()
        }
      }).then(() => {
        this.$message.success('删除属性值成功')
      }).catch(() => {
        this.$message.info('取消删除')
      })
    },
    // input 的失去焦点和回车的事件添加属性值
    handleInputConfirm (spuSaleAttr) {
      const saleAttrValueName = spuSaleAttr.inputValue.trim()
      const baseSaleAttrId = spuSaleAttr.baseSaleAttrId
      if (saleAttrValueName === '') {
        spuSaleAttr.inputValue = ''
        return
      }
      // 判断不能和存在的重复
      const isRepeat = spuSaleAttr.spuSaleAttrValueList.some(item => item.saleAttrValueName === saleAttrValueName)
      if (isRepeat) {
        this.$message.info('输入的属性值不能重复')
        spuSaleAttr.inputValue = ''
        return
      }
      spuSaleAttr.spuSaleAttrValueList.push({
        baseSaleAttrId,
        saleAttrValueName
      })
      spuSaleAttr.inputValue = ''
      spuSaleAttr.inputVisible = false
    },
    // 添加销售属性值
    showInput (spuSaleAttr) {
      // 显示当前的input
      this.$set(spuSaleAttr, 'inputVisible', true)
      // spuSaleAttr.inputVisible = true
      // 自动获取焦点
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus()
      })
    },
    // 添加销售属性
    addSaleAttr () {
      const [baseSaleAttrId, saleAttrName] = this.spuSaleAttrIdName.split(':')
      const spuSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
      }
      this.spuForm.spuSaleAttrList.push(spuSaleAttr)
      // 清空
      this.spuSaleAttrIdName = ''
    },
    // 上传成功的回调
    handleSuccess (response, file, fileList) {
      console.log(response, file, fileList)
      this.spuImageList = fileList
    },
    // 删除图片
    handleRemove (file, fileList) {
      this.spuImageList = fileList
    },
    // 预览大图
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 修改时获取初始化数据
    async initUpdSpuFormData (spu) {
      this.isUpdate = true
      this.category3Id = spu.category3Id
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
    async initAddSpuFormData (category3Id) {
      this.isUpdate = false
      this.category3Id = category3Id
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
    // 取消添加或修改 保存成功返回列表页
    cancelAddOrUpd () {
      this.$emit('update:visible', false)
      this.resetData()
    },
    //  清空数据
    resetData () {
      this.spuForm = {
        category3Id: 0,
        spuName: '',
        description: '',
        tmId: '',
        spuImageList: [],
        spuSaleAttrList: []
      }
      this.category3Id = ''
      this.spuImageList = []
      this.trademarkList = []
      this.baseSpuSaleAttrList = []
      this.spuSaleAttrIdName = ''
      this.dialogImageUrl = ''
      this.dialogVisible = false
      this.inputVisible = false
      this.inputValue = ''
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
