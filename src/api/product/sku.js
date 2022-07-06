import request from '@/utils/request'

export default {
  /**
   * 下架SKU
   * GET /admin/product/cancelSale/{skuId}
   **/
  cancelSale(skuId) {
    return request.get(`/admin/product/cancelSale/${skuId}`)
  },
  /**
   * 上架SKU
   * GET /admin/product/onSale/{skuId}
   */
  onSale(skuId) {
    return request.get(`/admin/product/onSale/${skuId}`)
  },
  /**
   * 删除指定id 的 skuId
   * DELETE /admin/product/deleteSku/{skuId}
   */
  deleteSku(skuId) {
    return request.delete(`/admin/product/deleteSku/${skuId}`)
  },
  /**
   * 根据指定的SPU的id查询所有对应的SKU的列表
   * GET /admin/product/deleteSku/{skuId}
   */
  getListBySpuId(spuId) {
    return request.get(`/admin/product/findBySpuId/${spuId}`)
  },
  /**
   * 保存修改添加SKU
   * POST /admin/product/saveSkuInfo
   * POST /admin/product/updateSkuInfo
   */
  addOrUpdSku(skuInfo) {
    return request({
      url: `/admin/product/${skuInfo.id ? 'update' : 'save'}SkuInfo`,
      method: 'POST',
      params: skuInfo
    })
  },
  /**
   * 获取指定SPU的id 对应的图片列表
   * GET /admin/product/spuImageList/{spuId}
   */
  getSpuImageList(spuId) {
    return request.get(`/admin/product/spuImageList/${spuId}`)
  },

  /**
   * 所有的spu销售属性列表: 所有的销售属性[颜色 版本 套装]
   * 某个spu的销售实行列表: [颜色,套装]
   * 获取指定SPU的id对应的销售属性列表
   * GET /admin/product/spuSaleAttrList/{spuId}
   */
  getSpuSaleAttrList(spuId) {
    return request.get(`/admin/product/spuSaleAttrList/${spuId}`)
  },
  /**
   * 获取sku的分页列表数据
   * GET /admin/product/list/{page}/{limit}
   */
  getSkuList(page, limit) {
    return request.get(`/admin/product/list/${page}/${limit}`)
  },
  /**
   * 获取sku详情
   */
  getSkuInfo(skuId) {
    return request.get(`/admin/product/getSkuById/${skuId}`)
  }
}
