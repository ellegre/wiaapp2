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

  mutations: {
    SET_TEXT(state, text) {
      state.text = text;
    },
    CLOSE_MESSAGE(state) {
      state.text = null;
    }
  }
}
