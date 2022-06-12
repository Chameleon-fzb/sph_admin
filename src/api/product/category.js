import request from '@/utils/request'

export default {
  // 获取所有1级分类列表
  getCategory1() {
    return request.get(`/admin/product/getCategory1`)
  },
  // 根据1级分类获取二级分类
  getCategory2(category1Id) {
    return request.get(`/admin/product/getCategory2/${category1Id}`)
  },
  // 根据二级分类获取三级分类
  getCategory3(category2Id) {
    return request.get(`/admin/product/getCategory3/${category2Id}`)
  }
}
