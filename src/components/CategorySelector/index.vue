<template>
  <div>
    <el-form
      :inline="true"
      :model="cFrom"
      class="demo-form-inline"
      :disabled="!isShowList"
    >
      <el-form-item label="一级分类">
        <el-select
          v-model="cFrom.category1Id"
          placeholder="请选择"
          @change="changeSelectC1"
        >
          <el-option
            v-for="c1 in category1List"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          ref="c2Select"
          v-model="cFrom.category2Id"
          placeholder="请选择"
          @change="changeSelectC2"
        >
          <el-option
            v-for="c2 in category2List"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          ref="c3Select"
          v-model="cFrom.category3Id"
          placeholder="请选择"
          @change="changeSelectC3"
        >
          <el-option
            v-for="c3 in category3List"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'CategorySelector',
  props: {
    isShowList: {
      type: Boolean,
      require: true
    }
  },
  data () {
    return {
      cFrom: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      },
      category1List: [],
      category2List: [],
      category3List: []
    }
  },
  mounted () {
    this.getCategory1List()
  },
  methods: {
    async getCategory1List () {
      const result = await this.$API.category.getCategory1()
      if (result.code === 200) {
        this.category1List = result.data
        return
      }
      console.log('获取一级分类失败')
    },
    async getCategory2List () {
      const result = await this.$API.category.getCategory2(this.cFrom.category1Id)
      if (result.code === 200) {
        this.category2List = result.data
        return
      }
      console.log('获取二级分类失败')
    },
    async getCategory3List () {
      const result = await this.$API.category.getCategory3(this.cFrom.category2Id)
      if (result.code === 200) {
        this.category3List = result.data
        return
      }
      console.log('获取三级分类失败')
    },
    changeSelectC1 () {
      this.cFrom.category2Id = ''
      this.cFrom.category3Id = ''
      this.category2List = []
      this.category3List = []
      this.getCategory2List()
      this.$emit('changeCategory', { category1Id: this.cFrom.category1Id })
    },
    changeSelectC2 () {
      this.cFrom.category3Id = ''
      this.category3List = []
      this.getCategory3List()
      this.$emit('changeCategory', { category2Id: this.cFrom.category2Id })
    },
    changeSelectC3 () {
      this.$emit('changeCategory', { category3Id: this.cFrom.category3Id })
    }

  }
}
</script>
