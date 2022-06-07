<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      @click="showAddDialog"
    >添加</el-button>

    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌' "
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="tmForm"
        :model="tmForm"
        style="width=80%"
        :rules="rules"
      >
        <el-form-item
          label="品牌名称"
          label-width="100px"
          prop="tmName"
        >
          <el-input
            v-model="tmForm.tmName"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="品牌LOGO"
          label-width="100px"
          prop="logoUrl"
        >
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="tmForm.logoUrl"
              :src="tmForm.logoUrl"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
            <div
              slot="tip"
              class="el-upload__tip"
            >只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addOrUpd"
        >确 定</el-button>
      </div>
    </el-dialog>

    <el-table
      :data="trademarkList"
      border
      style="width: 100%; margin: 20px 0"
      :row-style="{height:'60px'}"
      :cell-style="{padding:'5px 0'}"
    >
      <el-table-column
        prop=""
        label="序号"
        type="index"
        width="150"
        align="center"
      />
      <el-table-column
        prop="tmName"
        label="品牌名称"
      />
      <el-table-column
        prop="logoUrl"
        label="品牌LOGO"
      >
        <!--只要有结构的改变就要使用作用域插槽 -->
        <template slot-scope="{ row }">
          <img
            :src="row.logoUrl"
            alt=""
            height="40px"
          >
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="操作"
      >
        <template slot-scope="{row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="showUpdDialog(row)"
          >修改</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="delTrademark (row) "
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      align="center"
      small
      :current-page="page"
      :page-sizes="[3,5,7]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="getTrademarkList"
      @size-change="handleSizeChange"
    />
  </div>
</template>
<script>
export default {
  name: 'Trademark',
  data () {
    return {
      page: 1,
      limit: 5,
      trademarkList: [],
      total: 0,
      dialogFormVisible: false,
      tmForm: {
        tmName: '',
        logoUrl: ''
      },
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        logoUrl: [
          { required: true, message: '请选择图片', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.getTrademarkList()
  },
  methods: {
    async getTrademarkList (page = 1) {
      this.page = page
      const result = await this.$API.trademark.getPageList(this.page, this.limit)
      if (result.code === 200) {
        this.trademarkList = result.data.records
        this.total = result.data.total
      }
    },
    handleSizeChange (size) {
      this.size = size
      this.getTrademarkList()
    },
    handleAvatarSuccess (res, file) {
      console.log(res, file)
      this.tmForm.logoUrl = res.data
      // this.tmForm.imgUrl = file.response.data
    },
    // 上传前的回调 可以限定大小和格式
    beforeAvatarUpload (file) {
      const typeArr = ['image/jpeg', 'image/png']
      const isJPGOrPNG = typeArr.indexOf(file.type) !== -1// 是不是jpg或者png
      const isLt2M = file.size / 1024 / 1024 < 2 // 判断上传的图片大小是不是小于2m

      if (!isJPGOrPNG) {
        this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPGOrPNG && isLt2M
    },
    showAddDialog () {
      this.dialogFormVisible = true
      this.tmForm = {
        tmName: '',
        logoUrl: ''
      }
      this.$nextTick(() => {
        this.$refs.tmForm.clearValidate()
      })
    },
    showUpdDialog (row) {
      this.dialogFormVisible = true
      // this.tmForm = row// 直接赋值修改会影响原数据
      this.tmForm = { ...row }
      this.$nextTick(() => {
        this.$refs.tmForm.clearValidate()
      })
    },
    addOrUpd () {
      this.$refs.tmForm.validate(async (valid) => {
        if (valid) {
          const trademark = this.tmForm
          try {
            const result = await this.$API.trademark.addOrUpdate(trademark)
            console.log(result)
            this.$message.success(trademark.id ? '修改品牌成功' : '添加品牌成功')
            this.getTrademarkList(trademark.id ? this.page : 1)
            this.dialogFormVisible = false
          } catch (error) {
            this.$message.error(trademark.id ? '修改品牌失败' : '添加品牌失败')
            alert(error.message)
          }
        } else {
          console.log('error')
          return false
        }
      })
    },
    // 点击删除按钮后删除某个品牌
    delTrademark (row) {
      this.$confirm(`是否删除${row.tmName}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        try {
          await this.$API.trademark.deleteTrademark(row.id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 如果当前页只有一条数据,就返回前一页 若不止一条
          this.getTrademarkList(this.trademarkList.length > 1 ? this.page : (this.page - 1))
        } catch (error) {
          this.$message.error('删除品牌失败')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}

</script>
<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
