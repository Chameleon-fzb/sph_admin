import request from '@/utils/request'

export default {
  /**
   * 获取所有的spu销售属性列表
   * GET /admin/product/baseSaleAttrList
   */
  getSaleAttrList() {
    return request.get('/admin/product/baseSaleAttrList')
  },
  /**
   * 删除指定的SPU
   * DELETE /admin/product/deleteSpu/{spuId}
   */
  deleteSpu(spuId) {
    return request.delete(`/admin/product/deleteSpu/${spuId}`)
  },

  /**
   * 根据id获取SPU详情信息
   * GET /admin/product/getSpuById/{spuId}
   * spuList: 包含多个spu简单信息的数组, 数组里面放了很多spu对象,但每个spu对象里面信息不全
   * spuInfo
   */
  getSpuInfo(spuId) {
    return request.get(`/admin/product/getSpuById/${spuId}`)
  },
  /**
   * 添加或修改详情信息
   * POST /admin/product/saveSpuInfo
   * POST /admin/product/updateSpuInfo
   */
  addOrUpd(spuInfo) {
    return request({
      url: `/admin/product/${spuInfo.id ? 'update' : 'save'}SpuInfo`,
      method: 'POST',
      data: spuInfo
    })
  },
  /**
   * 获取spu的分页列表数据
   * GET /admin/product/{page}/{limit}
   * query 参数: category3Id
   */
  getSpuList(page, limit, category3Id) {
    /* return request.get(`/admin/product/${page}/${limit}`, {
      params: { category3Id }
    }) */
    return request({
      url: `/admin/product/${page}/${limit}`,
      method: 'GET',
      params: { category3Id }
    })
  }
}
