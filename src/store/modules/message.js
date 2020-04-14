export default {  
  namespaced: true,
  state: {
    code: null
  },

  getters: {
    codeMessage: state => {
      return state.code;

    },
   

  },

  actions: {
  },

  mutations: {
    SET_CODE(state, text) {
      state.code = text;
    },
    CLOSE_MESSAGE(state) {
      state.message = null;
    }

  }
}