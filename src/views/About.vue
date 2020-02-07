<template>
  <div class="about container">
    <h1>This is an about page!</h1>    
    
  </div>
</template>
<script>
//import { mapState } from 'vuex';	
export default {
	computed: {
      url() {
		return this.$store.state.url
	  }
	},
	methods: {
      openWin() {
		this.$store.commit("openWin")
	  }
    }
};
</script>
