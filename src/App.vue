<template>
  <div id="app">
    <span id="success"></span>
    <div>Total: {{token}}</div>
    <button @click="setToken">{{token}}</button>
    <section v-if="errored">
      <p>The information is not available at the moment, please try back later</p>
    </section>
    <section v-else>
      <iframe v-if="starting" class="wialon__form" v-bind:src="url"></iframe>
      <div v-else-if="loading">Loading...</div>
      <div v-else>
        <Header></Header>
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> |
          <router-link to="/geofences">Geofences</router-link> |
          <router-link to="/resources">Resources</router-link>
        </div>
        <router-view></router-view> 
      </div>
    </section>
  </div>
</template>

<script>


import Header from './components/Header.vue'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    Header
  },
  data() {
    return {
      info: null,
      starting: true,
      loading: true,
      errored: false
    };
  },
  computed: {
    ...mapGetters([
      'url',
      'token',
      'total',
      'authenticated',
    ])  
  },
  methods: {
    ...mapMutations([
      'plusToken',
      'isAuth'
      ]),
    setToken() {
      
      this.$store.commit('setToken', token)
    },
    ...mapActions([
      'loadToken'
      ])
  },
     
  filters: {
    
  },
  mounted() {
    
  },
  created() {
    this.$store.dispatch('loadToken');
  }
}

/*let token;
window.onmessage = function (e) {
  var msg = e.data;
  if (typeof msg == "string" && msg.indexOf("access_token=") >= 0) {
    token = msg.replace("access_token=", "");
    console.log('первый вывод', token)
  var el = document.getElementById("success");
    if (el) {
      el.innerHTML = "Your token: " + token;
    }
  }
};
      
store.dispatch
*/
   
</script>

<style lang="less">
#app {
  position: relative;
  width: 100%;
  height: 100%;
}

#nav {
  padding: 10px 30px;
  background-color: #333;
  color: #fff;

  a {
    font-size: 20px;
    color: #fff;
    text-decoration: none;

    &.router-link-exact-active {
      color: #43853d;
      text-decoration: underline;
    }
  }
}

iframe {
  position: absolute;
  content: "";
  top: 10%;
  left: 50%;
  margin-left: -300px;
  width: 600px;
  min-height: 470px;
  border: none;
  background: none;
}
</style>
