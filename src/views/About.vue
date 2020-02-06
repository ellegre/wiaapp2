<template>
  <div class="about container">
    <h1>This is an about page!</h1>    
    <p>{{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="openWin">Enter</button>
  </div>
</template>
<script>
//import { mapState } from 'vuex';	
export default {
	computed: {
	  count() {
		return this.$store.state.count
		},
      url() {
		return this.$store.state.url
	  }
	},
	methods: {
      increment() {
		this.$store.commit("increment")
	  },
	  decrement() {
		this.$store.commit("decrement")
	  },
      openWin() {
		this.$store.commit("openWin")
	  }
    }
};
</script>
