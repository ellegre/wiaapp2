import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


export default new Vuex.Store({

  state: {
  	count: 0,
  	token: null,
      user: {
        name: null
      },
    currentMessage: null,
    objects: [],
    feature: [],
    url: "https://hosting.wialon.com/login.html?client_id=myApp&access_type=0x100&activation_time=0&duration=604800&flags=0x1&redirect_uri=https://hosting.wialon.com/post_token.html" + "&css_url="
        + encodeURIComponent("http://localhost:8080/src/assets/css/login-form.css"),
  },
  getters: {

  },
  mutations: {
  	increment: state => state.count++,
  	decrement: state => state.count-- ,
    openWin: state => {
      window.open(state.url, "_blank", "width=760, height=500, top=300, left=500");
    },
    // Get token message, which is sent from auth window to parent window
    // when redirect_uri is set to hosting.wialon.com/post_token.html
    getToken(state) {
      window.onmessage = function (e) {
        let msg = e.data;
        if (typeof msg == "string" && msg.indexOf("access_token=") >= 0) {
          state.token = msg.replace("access_token=", "");
        return state.token;
        }
      }
    }
  },

  actions: {
  	

  },

  modules: {}
});
