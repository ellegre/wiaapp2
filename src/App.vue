<template>
  <div id="app">
    <section v-if="!authenticated" class="iframe">
     <iframe class="wialon__form" v-bind:src="url"></iframe> 
    </section>
    <section v-if="authenticated" class="page">
      <div>
        <Header></Header>     
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> |
          <router-link to="/geofences">Geofences</router-link> |
          <router-link to="/resources">Resources</router-link> | 
          <router-link to="/user">User</router-link>
        </div>
        <router-view></router-view> 
        <input type="text" v-model="value">
        <p>{{value}}</p>
        <Message></Message>
      </div>
    </section>
  </div>
</template>
<script>


import Header from './components/Header.vue';
import Message from './components/Message.vue';

import { mapGetters, mapActions } from 'vuex';

//инициализации сессии
//const session = wialon.core.Session.getInstance();
  
export default {
  components: {
    Header,
    Message
  },
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters([
      'url',
      'token',
      'total',
      'authenticated',
      'user',
      'value',
      'codeMessage'
    ]),
    value: {
      get() {
        return this.$store.getters.value;
      },
      set(value) {
        this.$store.dispatch('updateValue', value);
      }
    }
  },
  methods: {
    ...mapActions([
      'setToken',
      'setName',
      'loginToken',
      'updateValue',
      'showObjects',
      'actionB'
    ]),

    load() {
      this.$store.dispatch('actionB');
 
    },
  },
     
  filters: {
    
  },
  mounted() {

  },
  async created() {
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

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave {
  //opacity: 1;
}

.fade-leave-active {
  transition: opacity 0.5s;
  opacity: 0;
}
</style>
