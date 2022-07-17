<template>
  <div>
    <el-row>
      <el-col :span="12">
        <Search />
      </el-col>
      <el-col :span="12">
        <Category />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Search from './Search'
import Category from './Category'
export default {
  name: 'Observe',
  components: {
    Search,
    Category
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  .el-col {
    padding: 0 5px;
    display: block;
  }
}
</style>
