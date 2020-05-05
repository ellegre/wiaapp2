export default {  
  namespaced: true,
  state: {
    text: null
  },

  getters: {
    codeMessage: state => {
      return state.text;
    }
  },

  actions: {
    setText ({commit}, payload) {
      commit('SET_TEXT', payload);
    },
    closeMessage({commit}) {
      commit('CLOSE_MESSAGE');
    }
  },

  mutations: {
    SET_TEXT(state, text) {
      state.text = text;
    },
    CLOSE_MESSAGE(state) {
      state.text = null;
    }
  }
}
