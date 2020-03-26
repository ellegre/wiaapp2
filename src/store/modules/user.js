export default {
  namespaced: true,
  state: {
    user: {
      name: null
    }
  },

  getters: {
    user: state => {
      return state.user.name;
    }
  },

  actions: {
  },

  mutations: {
    SET_NAME(state, name) {
      state.user.name = name;
    }
  }
}
