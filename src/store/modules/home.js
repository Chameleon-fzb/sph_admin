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
    console.log(homeList.saleInfo)
    Object.keys(state).forEach((key) => {
      state[key] = homeList[key]
    })
  }
}

export default {
  state,
  mutations,
  actions
}
