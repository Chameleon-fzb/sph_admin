import request from '@/utils/request'

export default {
  // 根据选中三级分类后获取平台属性列表
  getList(category1Id, category2Id, category3Id) {
    return request.get(
      `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`
    )
  },
  // 删除属性
  deleteAttr(attrId) {
    return request.delete(`admin/product/deleteAttr/${attrId}`)
  },
  // 添加或修改属性
  /*
  数据结构
  {
    "attrName":"string",
    "attrValueList" : [
      {
        "attrId":0,
        "id":0,
        "valueName":"string"
      }
    ],
    "categoryId":0,
    "categoryLevel":0
    "id":0
  }
   */
  addOrUpdAttr(attr) {
    return request.post(`/admin/product/saveAttrInfo`, attr)
  }
}
