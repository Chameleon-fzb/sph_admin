import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import {
  resetRouter,
  constantRoutes,
  allAsyncRoutes,
  anyRoutes
} from '@/router'
import router from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '', // 用户名字
    avatar: '', // 头像.
    roles: [], // 角色信息
    buttons: [], // 按钮权限
    routes: [], // 保存要注册的路由 包含常量路由,异步路由 任意路由
    asyncRoutes: [] // 保存异步路由名称的数组
  }
}
const filterAsyncRoutes = (allAsyncRoutes, routeNames) => {
  const asyncRoutes = allAsyncRoutes.filter((item) => {
    if (routeNames.includes(item.name)) {
      if (item.children && item.children.length) {
        item.children = filterAsyncRoutes(item.children, routeNames)
      }
      return true
    }
    return false
  })
  return asyncRoutes
}
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_INFO(state, userInfo) {
    state.name = userInfo.name
    state.avatar = userInfo.avatar
    state.buttons = userInfo.buttons
    state.roles = userInfo.roles
  },
  SET_ROUTES(state, asyncRoutes) {
    state.asyncRoutes = asyncRoutes
    state.routes = constantRoutes.concat(asyncRoutes, anyRoutes)
    // 动态添加路由
    // 动态给路由器添加路由,必须是符合路由格式的数组
    router.addRoutes([...asyncRoutes, ...anyRoutes])
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response

          if (!data) {
            return reject('验证失败,请重新登录')
          }
          const asyncRoutes = filterAsyncRoutes(allAsyncRoutes, data.routes)
          commit('SET_ROUTES', asyncRoutes)
          commit('SET_USER_INFO', data)

          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken() // 删除token
          resetRouter() // 重新设置路由
          commit('RESET_STATE')
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
