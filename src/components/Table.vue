<template>
  <div class="units__container">

    <table class="units__table">
      <tr>{{getObjects}}</tr>
      <tr>
        <th>#</th>
        <th></th>
        <th>Name</th>
        <th>Plate number</th>
        <th>Last message</th>
        <th>Position</th>
        <th>Speed, km/h</th>
        <th>Total mileage, km</th>
        <th>Daily mileage, km</th>
        <th>Fuel level, l</th>
        <th>Temperature, °C</th>
        <th>Ignition, on/off</th>
        <th>Ignition first start</th>
        <th>Current idling time</th>
        <th>Moving state</th>
      </tr>
      

    </table>

    <!--<span class="units__span">Total units count: {{getTotalCount}}</span>-->
  </div>
</template>

<script>
import {mapActions } from 'vuex';
export default {
  computed: {
    getObjects() {
      return this.$store.getters['objects/objects'];
    }
  },
  methods: {
    ...mapActions([
      'showObjects'
    ]),
    loadObjects() {
      this.$store.dispatch('objects/showObjects');
    },
  },

  //created() {
    //this.loadObjects()
  //}
}

</script>

<style scoped lang="less">

li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
