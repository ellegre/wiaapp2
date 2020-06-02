<template>
  <div class="about container">
    <h1>This is a resources page</h1>
    <button @click="goHome">Go home</button>
  </div>
</template>
<script>
	export default {
		methods: {
			goHome() {
				this.$router.push({name: 'home'});
			}
		}
	}
</script>