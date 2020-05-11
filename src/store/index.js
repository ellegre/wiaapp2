import Vue from "vue";
import Vuex from "vuex";

import moduleUser from "./modules/user";
import moduleUnits from "./modules/units";
import moduleMessage from "./modules/message";


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
      return state.url;
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
    DELETE_TOKEN(state) {
      state.token = null;
    },
    IS_AUTHENTICATED(state){
      state.authenticated = true;
    },
    NOT_AUTENTICATED(state) {
      state.authenticated = false;
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
    DELETE_SESSION(state) {
      state.session = {};
    },
    updateValue(state, value) {
      state.value = value;
    }
  },
  actions: {
    setToken({ commit, dispatch, state }) {
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
                reject(dispatch('message/setText', `Error ${code} - ${wialon.core.Errors.getErrorText(code)}`));
              }
              resolve()
            })
          }
        }
      })
    },
    setAuthData ({ dispatch }) {
      return dispatch('setToken').then(() => {
        dispatch('user/setUserData').then(() => 
          dispatch('units/showUnits'));
      })
    },
    updateValue({commit}) {
      commit('updateValue', 100)
    },
    clearSessionData ({commit}) {
      commit('DELETE_TOKEN');
      commit('NOT_AUTENTICATED');
      commit('user/DELETE_NAME');
      commit('DELETE_SESSION');
    },
    logout ({ dispatch }) {  
      return new Promise((resolve, reject) => {
        wialon.core.Session.getInstance().logout(
          function (code) { // logout callback
            const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
            if (code) {
              reject(dispatch('message/setText', `Error ${code} - ${wialon.core.Errors.getErrorText(code)}`)); // logout failed, print error
            } else {
            dispatch('message/setText', "Logout successfully!");
            resolve(wait(2000).then(() => dispatch('message/closeMessage')));                                
            }
          }
        ) 
      })
    },
    appLogout ({ dispatch }) {
    return dispatch('logout').then(() => {
      dispatch('clearSessionData').catch(error => console.log(error));
      });
    }
  },
  modules: {
    user: moduleUser,
    units: moduleUnits,
    message: moduleMessage
  }
});
