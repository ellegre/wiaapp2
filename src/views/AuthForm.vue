<template>
  <div class="auth container">
    <iframe class="wialon__form" v-bind:src="url"></iframe>
  </div>
</template>
<script>
//import { mapState } from 'vuex';	
export default {
	computed: {
      url() {
		return this.$store.state.url
	  },
	  token() {
	  	return this.$store.state.token
	  }
	},
	methods: {
      getToken() {
  		  this.$store.commit("getToken")
  	  },
  }
};
</script>
<style >
iframe {
    position: absolute;
    content: "";
    top: 250%;
    left: 50%;
    margin-left: -300px;
    margin-top: -220px;
    width: 600px;
    min-height: 470px;
    border: 1px solid gray;
  }


  .wialon__form {
    background-color: #fff;
  }

 #auth-form input[type="submit"] {
    background-color: green;
  }

</style>