//import { mapState } from 'vuex'

export default {
  
  namespaced: true,
  state: {
    user: {
      name: null,
      hostMask: "no host mask, data are available from any IP address",
      loginDate: "",
      id: null,
    }
  },

  getters: {
    userName: state => {
      return state.user.name;
    },
    userHostMask: state => {
      return state.user.hostMask;
    },
    userLoginDate: state => {
      return state.user.loginDate;
    },
    userId: state => {
      return state.user.id;
    },
  },

  actions: {
    setUserData({commit, rootGetters}) {
      const wialon = window.wialon;
      const session = rootGetters.session;
      const user = session.getCurrUser();
      const userName = user.getName();
      const userHostMask = user.getHostsMask();
      const loginDate = wialon.util.DateTime.formatTime(user.getLoginDate());
      const userId = user.getId();
    
      commit('SET_NAME', userName);             
      commit('SET_HOST_MASK', userHostMask);
      commit('SET_LOGIN_DATE', loginDate); 
      commit('SET_USER_ID', userId);
    },
    setValue({dispatch}) {
      dispatch('updateValue', null, {root: true})
    }
  },

  mutations: {
    SET_NAME(state, name) {
      state.user.name = name;
    },
    DELETE_NAME(state) {
      state.user.name = null;
    },
    SET_HOST_MASK(state, payload) {
      if (payload == "") {
        return state.user.hostMask
      } else
      return state.user.hostMask = payload;
    },
    SET_LOGIN_DATE (state, payload) {
      state.user.loginDate = payload;
    },
    SET_USER_ID (state, payload) {
      state.user.id = payload;
    },
  }
}
