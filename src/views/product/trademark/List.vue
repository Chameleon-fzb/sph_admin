<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      @click="dialogFormVisible = true"
    >添加</el-button>

    <el-dialog
      title="添加品牌"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="tmForm"
        style="width=80%"
      >
        <el-form-item
          label="品牌名称"
          label-width="100px"
        >
          <el-input
            v-model="tmForm.tmName"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="品牌LOGO"
          label-width="100px"
        >
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
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
          @click="dialogFormVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>

    <el-table
      :data="trademarkList"
      border
      style="width: 100%; margin: 20px 0"
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
            height="36px"
          >
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="操作"
      >
        <template slot-scope="{ }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
          >修改</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
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
        imgUrl: ''
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
      this.tmForm.imgUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
