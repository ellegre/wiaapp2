import Vue from "vue";
import Vuex from "vuex";

import moduleUser from './modules/user';
import moduleObjects from './modules/objects';
import moduleMessage from './modules/message';
//import utils from './utils';


Vue.use(Vuex);
const URL = "https://hosting.wialon.com/login.html?client_id=myApp&access_type=0xffff&activation_time=0&duration=604800&flags=0x1&redirect_uri=https://hosting.wialon.com/post_token.html";

const wialon = window.wialon;
const session = wialon.core.Session.getInstance();






export default new Vuex.Store({

  state: {
    token: null,    
    authenticated: null,  
    url: URL,
    session: null,
    value: 0
  },
  getters: {
    url: state => {
      return state.url
    },
    token: state => {
      return state.token;
    },
    authenticated: state => {
      return state.authenticated;
    },    
    session: state => {
      return state.session;
    },
    value: state => {
      return state.value;
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    IS_AUTHENTICATED(state){
      state.authenticated = true;
    },
    SET_SESSION(state) {      
      session.initSession("https://hst-api.wialon.com");
      /*session.loadLibrary("itemIcon");
      session.loadLibrary("unitSensors");
      session.loadLibrary("unitEvents");
      session.loadLibrary("itemCustomFields");
      session.loadLibrary("itemProfileFields");
      session.loadLibrary("resourceReports");
      session.loadLibrary("unitTripDetector");*/
      state.session = session;      
    },
    
    updateValue(state, value) {
      state.value = value;
    }
  },
  actions: {
    setToken({commit, state}) {
      return new Promise((resolve, reject) => {
        let token;
        window.onmessage = function (e) {
          let msg = e.data;
          if (typeof msg == "string" && msg.indexOf("access_token=") >= 0) {
            token = msg.replace("access_token=", "");
            commit('SET_TOKEN', token);
            commit('SET_SESSION');
            commit('IS_AUTHENTICATED');
            session.loginToken(state.token, code => {
              if(code) {
                console.log(code);
                reject(commit('message/SET_TEXT', `Error ${code} - ${wialon.core.Errors.getErrorText(code)}`));
              }
              resolve()
            })
          }
        }
      })
    },
    actionB ({dispatch}) {
      return dispatch('setToken').then(() => {
        dispatch('user/setUserData');
      })
    },
    updateValue({commit}) {
      commit('updateValue', 100)
    },
  },
  modules: {
    user: moduleUser,
    objects: moduleObjects,
    message: moduleMessage
  }
});
