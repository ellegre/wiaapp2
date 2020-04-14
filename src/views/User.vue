<template>
  <div class="user">
    <h1>User properties</h1>
    <p class="user__p">Host mask: <span class="user__span">{{userHostMask}}</span></p>
    <p class="user__p">Login time: <span class="user__span">{{userLoginDate}}</span></p>
    <p class="user__p">User id: <span class="user__span">{{userId}}</span></p>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  
  computed: {
   ...mapGetters('user',[
      'userHostMask',
      'userLoginDate',
      'userId'
    ]),

  },
  methods: {
    getValue() {
      this.$store.dispatch('user/setValue');
    }
  },
  mounted() {
    this.getValue();
  }
}
</script>
<style scoped>
.user {
	margin: 20px;
	margin-left: 30px;
	padding: 15px;
	width: 600px; 
	border: 1px solid #777; 
	border-radius:30px; 
	-webkit-border-radius: 30px; 
	-moz-border-radius: 30px;
	box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
	-webkit-box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
	-moz-box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
	}
.user__p {
	font-weight: 700;
}
.user__span {
	font-weight: 400;
}
    
</style>