import Vue from 'vue';
import Vuex from 'vuex';
//import App from '../App.vue'

Vue.use(Vuex);

const URL = "https://hosting.wialon.com/login.html?client_id=myApp&access_type=0x100&activation_time=0&duration=604800&flags=0x1&redirect_uri=https://hosting.wialon.com/post_token.html"

export default new Vuex.Store({

  state: {
    count: 5,
    token: 0,
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
    }
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    IS_AUTH(state){
      state.authenticated = 'done';
    }
  },

  actions: {
    loadToken(context) {
      let token;
      window.onmessage = function (e) {
        let msg = e.data;
        if (typeof msg == "string" && msg.indexOf("access_token=") >= 0) {
          token = msg.replace("access_token=", "");
          context.commit('SET_TOKEN', token)
        }
      }
    }      
  },

  modules: {}
});
