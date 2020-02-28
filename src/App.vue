<template>
  <div id="app">
    <section class="iframe">
     <iframe class="wialon__form" v-bind:src="url"></iframe> 
    </section>
    <section v-if="authenticated" class="page">
      <div>
        <Header></Header>
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> |
          <router-link to="/geofences">Geofences</router-link> |
          <router-link to="/resources">Resources</router-link>
        </div>
        <router-view></router-view> 
        <div>Loading...</div>
        <div>Total: {{token}}</div>
      </div>
    </section>
  </div>
</template>

<script>


import Header from './components/Header.vue'
import { mapGetters, mapActions } from 'vuex';


 
//инициализации сессии
//const session = wialon.core.Session.getInstance();
  
export default {
  components: {
    Header
  },
  data() {
    return {
      info: null,
      loading: true,
    };
  },
  computed: {
    ...mapGetters([
      'url',
      'token',
      'total',
      'authenticated',
      'user'
    ]),

    /*loginToken() {
      session.initSession('https://hst-api.wialon.com');      
      session.loginToken(this.$store.getters.token, (code) => {
        const user = session.getCurrUser()
        const aa = user.getName()
        console.log(aa)
      });

    }*/
  },
  methods: {
    ...mapActions([
      'setToken',
      'setName',
      'loginToken'
    ]),
    load() {
      this.$store.dispatch('setToken');
    }
  },
     
  filters: {
    
  },
  mounted() {

  },
  created() {
    this.load()
  }
}

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
  min-height: 450px;
  border: none;
  background: none;
}
</style>
