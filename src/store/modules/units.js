//import utils from "../utils.js"
export default {  
    
  namespaced: true,
  state: {
    units: [],
    unit: {
      icon: null,
      name: "",
      plateNumber: "",
    }
  },

  getters: {
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
    }
  },

  actions: {
    showUnits({ commit, dispatch }) {
      const wialon = window.wialon;
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


      session.searchItems(searchSpec, true, dataFlags, 0, 0, (code, data) => {
        if (code) {
          //dispatch('message/setText', null, {root:true}, `Error ${code} - ${wialon.core.Errors.getErrorText(code)}`)
          console.log(code);
          return;
        } 
        console.log(data);
        commit('SET_UNITS', data.items);
        const unitData = data.items.map(elem => {
          //Get and set vehicle name 
          elem.name = elem.getName();          
          commit('SET_NAME', elem.name);

          //Set vehicle icon
          elem.icon = elem.getIconUrl();
          commit('SET_ICON', elem.icon);
          dispatch('setPlateNumber', elem)
    
        });      
        console.log(unitData)
      });
    }, 
    setPlateNumber({commit}, elem) {
            //Set vehicle plate number
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
    }  
  },

/*getPlateNumber(profileData) {

const profileData = elem.getProfileFields();

 // Get unit plate number
const plateNumber = getPlateNumber(profileData);



getPlateNumber(profileData) {
    let plateNumbers = Object.values(profileData).find(value => value.n === "registration_plate");
    let plateNumber = "--";
    if (plateNumbers) {
      plateNumber = Object.values(plateNumbers)[2];
    }
    return plateNumber;
  },

  */
  mutations: {
    SET_UNITS(state, payload) {
      state.units = payload;
    },
    SET_NAME(state, payload) {
      state.unit.name = payload;
    },
    SET_ICON(state, payload) {
      state.unit.icon = payload;
    },
    SET_PLATE_NUMBER(state, payload) {
      state.unit.plateNumber = payload;
    }
  }
};
