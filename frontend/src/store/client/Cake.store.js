
import { createStore } from 'vuex'

export default createStore({
  
  state: {
    cake: null,
  },

  mutations: {

    detailCake(state, cake) {
      state.cake = cake
    }

  },

  actions: {

    setDetailCake ( {commit}, cake) {
      commit('detailCake', cake)
    }

  },

  getters: {
    getDetailCake: (state) => state.cake
  }
  
})
