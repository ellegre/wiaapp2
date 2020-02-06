<template>
  <div id="app">
    <router-link to="/login">AuthForm</router-link>
    <Header></Header>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/geofences">Geofences</router-link> |
      <router-link to="/resources">Resources</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  components: {
    Header
  },
  computed: {

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
