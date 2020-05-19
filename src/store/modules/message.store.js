const initialState = () => ({
  text: null
});

const state = initialState();

const  getters = {
  codeMessage: state => {
    return state.text;
  }
}

const actions = {
  setText ({ commit }, payload) {
    commit('SET_TEXT', payload);
  },
  closeMessage({commit}) {
    commit('CLOSE_MESSAGE');
  },
  reset({commit}) {
    commit('RESET');
  }
}

const  mutations = {
  SET_TEXT(state, text) {
    state.text = text;
  },
  CLOSE_MESSAGE(state) {
    state.text = null;
  },
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach(key => {
      state[key] = newState[key]
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions  
}
