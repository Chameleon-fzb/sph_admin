/*
角色管理相关的API请求函数
*/
import request from '@/utils/request'

const api_prefix = '/admin/acl/role'

export default {
  /*
  获取角色分页列表(带搜索)
  */
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_prefix}/${page}/${limit}`,
      method: 'get',
      params: searchObj // url查询字符串或表单键值对
    })
  },

  /*
  获取某个角色
  */
  getById(id) {
    return request({
      url: `${api_prefix}/get/${id}`,
      method: 'get'
    })
  },

  /*
  保存一个新角色
  */
  save(role) {
    return request({
      url: `${api_prefix}/save`,
      method: 'post',
      data: role
    })
  },

  /*
  更新一个角色
  */
  updateById(role) {
    return request({
      url: `${api_prefix}/update`,
      method: 'put',
      data: role
    })
  },

  /*
  获取一个角色的所有权限列表
  */
  getAssign(roleId) {
    return request({
      url: `${api_prefix}/toAssign/${roleId}`,
      method: 'get'
    })
  },

  /*
  删除某个角色
  */
  removeById(id) {
    return request({
      url: `${api_prefix}/remove/${id}`,
      method: 'delete'
    })
  },

  /*
  批量删除多个角色
  */
  removeRoles(ids) {
    return request({
      url: `${api_prefix}/batchRemove`,
      method: 'delete',
      data: ids
    })
  }
}
