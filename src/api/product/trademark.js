import request from '@/utils/request'
export default {
  /** 根据id删除某个品牌 DELETE /admin/product/baseTrademark/remove/{id}  */
  deleteTrademark(id) {
    return request.delete(`/admin/product/baseTrademark/remove/${id}`)
  },
  addOrUpdate(trademark) {
    /** 根据id来决定这个请求函数是添加还是修改 */
    if (trademark.id) {
      return request.put('/admin/product/baseTrademark/update', trademark)
    } else {
      return request.post('/admin/product/baseTrademark/save', trademark)
    }
  },
  /** 分页 获取品牌的分页列表  GET /admin/product/baseTrademark/{page}/{limit}  */
  getPageList(page, limit) {
    return request.get(`/admin/product/baseTrademark/${page}/${limit}`)
  },
  /** 获取所有的品牌列表 GET admin/product/baseTrademark/getTrademarkList */
  getList() {
    return request.get('admin/product/baseTrademark/getTrademarkList')
  }
}
