<template>
  <div class="units__container">
    <p>{{}}</p>
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
      <tr v-for="(unit, index) in units" v-bind:key="unit.id">
        <td>{{ index + 1 }}</td>
        <td><img v-bind:src="unit.icon" width="25" height="25"></td>
        <td>{{ unit.names }}</td>
        <td>{{ unit.names }}</td>
        <td>{{ unit.plateNumber }}</td>
        <td>{{ unit.lastMessage }}</td>
        <td>{{ unit.address }}</td>
        <td>{{ unit.speed }}</td>
        <td>{{unit.mileage}}</td>
      </tr>    
    </table>

    <!--<span class="units__span">Total units count: {{getTotalCount}}</span>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      units: 'Units/units',
      icon: 'units/icon',
      names: 'units/names',
      plateNumber: 'units/plateNumber',
      lastMessage: 'units/lastMessage',
      address: 'units/address',
      speed: 'units/speed',
      mileage: 'units/mileage',
    })
  },
  methods: {

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
