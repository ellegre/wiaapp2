<template>
  <div class="units__container">
    <table class="units__table">
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
      <tr v-for="(unit, index) in units" v-bind:key="unit.id" >
        <td>{{ index + 1 }}</td>
        <td><img v-bind:src="unit.icon" width="25" height="25"></td>
        <td>{{ unit.name }}</td>
        <td>{{ unit.plateNumber }}</td>
      </tr>      
    </table>

    <!--<span class="units__span">Total units count: {{getTotalCount}}</span>-->
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      units: 'units/units',
      icon: 'units/icon',
      name: 'units/name',
      plateNumber: 'units/plateNumber',
    })
  },
  methods: {
    ...mapActions([
    ]),

    ...mapMutations([
      'SET_TEXT'
    ]) 
  },
};

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
