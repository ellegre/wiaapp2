<template>
  <div class="home container">
  	<h1>Home component</h1>
  	<LoadingAnimation />
    <Table />
  </div>
</template>

<script>
// @ is an alias to /src
import Table from "@/components/Table.vue";
import LoadingAnimation from "@/components/LoadingAnimation.vue";

export default {
  name: "home",
  components: {
    Table,
    LoadingAnimation
  }
};
</script>
