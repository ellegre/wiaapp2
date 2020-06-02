const wialon = window.wialon;
const initialState = () => ({
  units: [],
  unit: {
    units1: [],
    icon: [],
    names: [],
    plateNumber: [],
    lastMessage: [],
    address: [],
    speed: [],
    mileage: [],
  },
  unitById: {}
});

const state = initialState();
//const unit = new schema.Entity('units')
//console.log(unit);
const getters = {

  units: state => {
    return state.units;
  },
  icon: state => {
    return state.unit.icon;
  },
  name: state => {
    return state.unit.name;
  },
  plateNumber: state => {
    return state.unit.plateNumber;
  },
  lastMessage: state => {
    return state.unit.lastMessage;
  },
  address: state => {
    return state.unit.address;
  },
  speed: state => {
    return state.unit.speed;
  },
  mileage: state => {
    return state.unit.mileage.filter;
  }
}

const actions = {
  showUnits({ commit, dispatch }) {
    const session = wialon.core.Session.getInstance();
    session.loadLibrary("itemIcon");
    session.loadLibrary("unitSensors");
    session.loadLibrary("unitEvents");
    session.loadLibrary("itemCustomFields");
    session.loadLibrary("itemProfileFields");
    session.loadLibrary("resourceReports");
    session.loadLibrary("unitTripDetector");
    const searchSpec = {
      itemsType: "avl_unit",
      propName: "sys_name",
      propValueMask: "*",
      sortType: "sys_name",
    };

    const dataFlags = wialon.item.Item.dataFlag.base |
      wialon.item.Unit.dataFlag.sensors |
      wialon.item.Unit.dataFlag.lastMessage |
      wialon.item.Unit.dataFlag.customProps |
      wialon.item.Unit.dataFlag.messageParams |
      wialon.item.Item.dataFlag.profileFields |
      wialon.item.Resource.dataFlag.reports  |
      wialon.item.Unit.dataFlag.restricted
    wialon.core.Remote.getInstance().startBatch("initBatch");
      session.searchItems(searchSpec, true, dataFlags, 0, 0, (code, data) => {
        if (code) {
          //dispatch('message/setText', null, {root:true}, `Error ${code} - ${wialon.core.Errors.getErrorText(code)}`)
          console.log(code);
          return;
        } 
        console.log(data);
        let units = data.items;
        commit('SET_UNITS', units);
        const arrayToObject = (arr, keyField) =>
          Object.assign({}, ...arr.map(item => ({[item[keyField]]: item})));
        let unitById = arrayToObject(units, "_id"); //Converting an array of units to an Object with key = unit id
        commit('ADD_UNIT__BY_ID', unitById);


        data.items.map(elem => { 
          elem.names = elem.getName(); 
            // Set unit name      
          commit('SET_NAMES', elem.names);         
          elem.icon = elem.getIconUrl(); // Set unit icon
          commit('SET_ICON', elem.icon);
          dispatch('setPlateNumber', elem); // Set plate number
          dispatch('setLastMessage', elem); // Set last message
          dispatch('setAddress', elem); // Set unit address
          dispatch('setSpeed', elem); // Set unit speed
          dispatch('setMileage', elem);
        });      
      });
    wialon.core.Remote.getInstance().finishBatch(function(){},"initBatch");
  }, 
  setPlateNumber({ commit }, elem) {            
    function getPlateNumber(profileData) {
      let plateNumbers = Object.values(profileData).find(value => value.n === "registration_plate");
      let plateNumber = "--";
      if (plateNumbers) {
        plateNumber = Object.values(plateNumbers)[2];
      }
      return plateNumber;
    }
    const profileData = elem.getProfileFields();
    elem.plateNumber = getPlateNumber(profileData);
    commit('SET_PLATE_NUMBER', elem.plateNumber);
  },
  setLastMessage({ commit }, elem) {
    elem.lastMessage = elem.getPosition() ? wialon.util.DateTime.formatTime((elem.getPosition()).t) : "--";
    commit('SET_LAST_MESSAGE', elem.lastMessage);
  },
  setAddress({ commit }, elem) {
    let pos = elem.getPosition(); // get unit position
    if (pos) { // check if position data exists
      wialon.util.Gis.getLocations([{lon:pos.x, lat:pos.y}], function(code, address){ 
        if (code) { 
          //dispatch('message/setText', `Error ${code} - ${wialon.core.Errors.getErrorText(code)}`) 
          return; // exit if error code
        } 
        elem.address = address[0];
        commit('SET_ADDRESS', elem.address)
      });
    } else elem.address = "Unknown";
  },
  setSpeed({commit}, elem) {
    elem.speed = elem.getPosition() ? elem.getPosition().s : "--";
    commit('SET_SPEED', elem.speed)
  },
  /*setMealege({commit}, elem) {
    /*
      function getMileageLevel(elem, message) {
        const mileageSensor = Object.values(elem.getSensors()).find(value => value.t === "mileage");
        let mileageLevel = "N/S";
          if (mileageSensor) {
            mileageLevel = (elem.calculateSensorValue(mileageSensor, message || elem.getLastMessage()));
            if (mileageLevel === -348201.3876) {
              mileageLevel = "N/A";
            }
            if (typeof mileageLevel == "number") {
              mileageLevel = Math.round(mileageLevel);
            }
          }
        return mileageLevel;
      }


        //Get total mileage sensor value
        const mileageLevel = getMileageLevel(elem, elem.getLastMessage());



                const sensorMileage = getMileageLevel(elem);
    
  })*/
  setMileage({commit}, elem) {
    elem.mileage = elem.getMileageCounter();
    commit('SET_MILEAGE', elem);
  },
  reset({commit}) {
    commit('RESET');
  }
}
const mutations = {
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach(key => {
      state[key] = newState[key];
    });
  },
  SET_UNITS(state, payload) {
    state.units = payload;
  },
  ADD_UNIT__BY_ID(state, payload) {
    state.unitById = payload;
  },
  SET_NAMES(state, payload) {
    state.unit.names.push(payload);
  },
  SET_ICON(state, payload) {
    state.unit.icon = payload;
  },
  SET_PLATE_NUMBER(state, payload) {
    state.unit.plateNumber = payload;
  },
  SET_LAST_MESSAGE(state, payload) {
    state.unit.lastMessage = payload;
  },
  SET_ADDRESS(state, payload) {
    state.unit.address = payload;
  },
  SET_SPEED(state, payload) {
    state.unit.speed = payload;
  },
  SET_MILEAGE(state, payload) {
    state.unit.mileage = payload;
  }
};
export default {  
  namespaced: true,
  wialon,
  state,
  getters,
  actions,
  mutations
};
