import { reqHome } from '@/api/home'

const state = {
  saleInfo: {},
  visitInfo: {},
  paymentInfo: {},
  activityEffect: {},
  rankInfo: {},
  search: {}
}
const actions = {
  async getHomeList({ commit }) {
    const result = await reqHome()
    if (result.code === 200) {
      commit('RECEIVE_HOME_LIST', result.data)
    }
  }
}
const mutations = {
  RECEIVE_HOME_LIST(state, homeList) {
    Object.keys(state).forEach((key) => {
      state[key] = homeList[key]
    })
  }
}
const getters = {
  saleData: (state) => state.saleInfo.saleData || [],
  saleXAxisData: (state) => state.saleInfo.xAxisData || [],
  visitData: (state) => state.visitInfo.visitData || [],
  visitXAxisData: (state) => state.visitInfo.xAxisData || [],
  saleClass: (state) => state.saleInfo.saleClass || [],
  searchUser: (state) => state.search.searchUser || {},
  averageSearch: (state) => state.search.averageSearch || [],
  searchTableData: (state) => state.search.searchTableData || []
}

export default {
  state,
  mutations,
  actions,
  getters
}
