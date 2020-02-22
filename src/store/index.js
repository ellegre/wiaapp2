import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const URL = "https://hosting.wialon.com/login.html?client_id=myApp&access_type=0xffff&activation_time=0&duration=604800&flags=0x1&redirect_uri=https://hosting.wialon.com/post_token.html"


export default new Vuex.Store({
  
  const session = wialon.core.Session.getInstance();
  state: {
    token: null,
    user: {
      name: null
    },
    authenticated: null,  
    currentMessage: null,
    objects: [],
    feature: [],
    url: URL
  },
  getters: {
    url: state => {
      return state.url
    },
    token: state => {
      return state.token;
    },
    total: state => {
      return state.count * state.token;
    },
    authenticated: state => {
      return state.authenticated;
    },
    user: state => {
      return state.user.name;
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    IS_AUTH(state){
      state.authenticated = 'done';
    },
    SET_NAME(state, payload) {
      state.user.name = payload;
    }
  },

  actions: {
    setToken(context) {
      let token;
      window.onmessage = function (e) {
        let msg = e.data;
        if (typeof msg == "string" && msg.indexOf("access_token=") >= 0) {
          token = msg.replace("access_token=", "");
          context.commit('SET_TOKEN', token)
        }
      }
    },
    setName({commit}) {
      window.onmessage = function (e) {
        let msg = e.data;
        if (typeof msg == "string" && msg.indexOf("user_name=") >= 0) {
          let name = msg.replace("user_name=", "");
          commit('SET_NAME', name)
        }
      }
    },
    loginToken({commit}) {
      
      session.initSession('https://hst-api.wialon.com');
      session.loginToken(state.token, (code) => {
       const user = session.getCurrUser()
        const aa = user.getName()
        console.log(aa)
      });

    }
    
  },

  modules: {}
});
