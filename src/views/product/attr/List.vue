<template>
  <div>
    <el-card>
      <CategorySelector @changeCategory="changeCategory" />
    </el-card>
    <el-card style="margin-top:20px">
      <div v-show="isShowList">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category.category3Id"
          @click="showAddDiv"
        >添加属性</el-button>
        <el-table
          :data="
            attrList"
          stripe
          style="width: 100%;margin-top: 20px;"
          border
        >
          <el-table-column
            type="index"
            label="序号"
            width="180"
          />
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="180"
          />
          <el-table-column label="属性值列表">
            <template slot-scope="{row }">
              <el-tag
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                type="info"
              >{{ attrValue.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row}">
              <HintBtn
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改"
                @click="showUpdDiv(row)"
              />
              <HintBtn
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性显示-->
      <div v-show="!isShowList">
        <el-form
          :ref="attrForm"
          :model="attrForm"
          :inline="true"
        >
          <el-form-item
            label="属性名"
            :inline="true"
          >
            <el-input
              v-model="attrForm.attrName"
              placeholder="请输入属性名"
            />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrForm.attrName"
          @click="addAttrValue"
        >添加属性值</el-button>
        <el-button @click="isShowList=true">取消</el-button>
        <el-table
          :data="attrForm.attrValueList"
          border
          stripe
          style="margin:20px 0;"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80px"
          />
          <el-table-column
            prop=""
            label="属性值名称"
          >
            <template slot-scope="{row,$index}">
              <el-input
                v-if="row.isEdit"
                :ref="$index"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                clearable
                size="mini"
                @blur="toLook(row)"
                @keyup.enter.native="toLook(row)"
              />
              <span
                v-else
                style="display:block;height:100%;width:100%;"
                @click="toEdit(row,$index)"
              >
                {{ row.valueName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
              <el-popconfirm
                :title="`你确定要删除${row.valueName}吗？`"
                @onConfirm="deleteAttrValue($index)"
              >
                <HintBtn
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
        <el-button
          type="primary"
          @click="saveAttrValue"
        >保存</el-button>
        <el-button @click="isShowList=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash'
export default {
  name: 'Attr',
  data () {
    return {
      // 收集三级分类
      category: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      },
      // 属性列表
      attrList: [],
      // 控制是否显示列表
      isShowList: true,
      // 收集属性表单对象
      attrForm: {
        attrName: '',
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3
      }
    }
  },
  methods: {
    // 根据子组件 CategorySelect 传入的分类id做出相应的操作
    changeCategory ({ category1Id, category2Id, category3Id }) {
      if (category3Id) {
        this.category.category3Id = category3Id
        this.getAttrList()
        return
      }
      if (category2Id) {
        this.category.category2Id = category2Id
        this.category.category3Id = ''
        this.attrList = []
        return
      }
      if (category1Id) {
        this.category = {
          category1Id,
          category2Id: '',
          category3Id: ''
        }
        this.attrList = []
      }
    },
    /* 获取属性列表  */
    async getAttrList () {
      const { category1Id, category2Id, category3Id } = this.category
      const result = await this.$API.attr.getList(category1Id, category2Id, category3Id)
      if (result.code === 200) {
        this.attrList = result.data
        return
      }
      console.log('获取列表出错')
    },
    /* 展示添加属性div */
    showAddDiv () {
      this.isShowList = false
      // 清空上一次的数据
      this.attrForm = {
        attrName: '',
        attrValueList: [],
        categoryId: this.category.category3Id,
        categoryLevel: 3
      }
    },
    /* 添加属性值 */
    async addAttrValue () {
      // 给表格添加一行，添加空对象
      this.attrForm.attrValueList.push({
        attrId: this.attrForm.id, // 属性值所属的属性id
        valueName: '',
        isEdit: true
      })
      this.$nextTick(() => {
        this.$refs[this.attrForm.attrValueList.length - 1].focus()
      })
    },
    // 删除属性
    deleteAttrValue (i) {
      this.attrForm.attrValueList.splice(i, 1)
    },
    // 修改属性
    showUpdDiv (attr) {
      this.isShowList = false
      const attrForm = cloneDeep(attr)// 深拷贝
      attrForm.attrValueList.forEach(attrValue => {
        // 标识是否为编辑模式
        this.$set(attrValue, 'isEdit', false)// 响应式数据
        // attrValue.isEdit = false
      })
      // 展示该项的值
      this.attrForm = attrForm
    },
    toEdit (row, i) {
      row.isEdit = true
      this.$nextTick(() => {
        this.$refs[i].focus()
      })
    },
    toLook (row) {
      const valueName = row.valueName
      // y用户输入的数据不能为空 空格或重复

      if (!valueName.trim()) {
        this.$message.info('输入属性值名称不能为空')
        row.valueName = ''
        return
      }
      const isRepeat = this.attrForm.attrValueList.some(item => {
        if (item !== row) {
          return item.valueName === valueName
        }
      })
      if (isRepeat) {
        this.$message.info('输入属性值名称不能重复')
        row.valueName = ''
        return
      }
      row.isEdit = false
    },
    saveAttrValue () { }

  }
}
</script>
<style lang="scss" scoped>
</style>
