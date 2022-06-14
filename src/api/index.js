export { default as trademark } from './product/trademark'
export { default as attr } from './product/attr'
export { default as category } from './product/category'
export { default as spu } from './product/spu'
export { default as sku } from './product/sku'

// 引入并且暴露
/**
 * 第一步:引入
 * import {default as trademark} from './product/trademark'
 * {getPageList(){},delete(){},addOrUpdate(){}}
 * 第二步: 并暴露(部分暴露)
 * export trademark
 **/
