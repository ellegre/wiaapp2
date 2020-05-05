<template>
  <div class="home container">
    <h1>Home component</h1>
    <LoadingAnimation />
    <Units/>
  </div>
</template>

<script>
// @ is an alias to /src
import Units from "@/components/Units.vue";

import LoadingAnimation from "@/components/LoadingAnimation.vue";

export default {
  name: "home",
  components: {
    Units,
    LoadingAnimation
  }
};
</script>
