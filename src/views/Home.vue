<template>
  <div class="home container">
  	<h1>Home component</h1>
    <Table />
  </div>
</template>

<script>
// @ is an alias to /src
import Table from "@/components/Table.vue";

export default {
  name: "home",
  components: {
    Table
  }
};
</script>
