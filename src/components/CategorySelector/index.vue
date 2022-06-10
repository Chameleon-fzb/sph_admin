<template>
  <div>
    <el-form
      :inline="true"
      :model="cFrom"
      class="demo-form-inline"
    >
      <el-form-item label="一级分类">
        <el-select
          v-model="cFrom.category1Id"
          placeholder="请选择"
        >
          <el-option
            label="一"
            value=""
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="cFrom.category2Id"
          placeholder="请选择"
        >
          <el-option
            label="二"
            value=""
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="cFrom.category3Id"
          placeholder="请选择"
        >
          <el-option
            label="三"
            value=""
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'CategorySelector',
  data () {
    return {
      cFrom: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  }
}
</script>
