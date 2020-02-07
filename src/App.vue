<template>
  <div id="app">
    <section v-if="errored">
      <p>The information is not available at the moment, please try back later</p>
    </section>
    <section v-else>
      <div v-if="loading">Loading...</div>
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
//import axios from "axios";
//import VueAxios from "vue-axios";

export default {
  components: {
    Header
  },
  data() {
    return {
      info: null,
      loading: false,
      errored: false
    };
  },
  computed: {
     
  },

  filters: {
    
  },
  mounted() {
    
  }
}

</script>

<style lang="less">
#app {
  
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
</style>
