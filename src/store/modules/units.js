export default {  
  namespaced: true,
  state: {
    units: [],
    unit: {
      icon: null,
    }
  },

  getters: {
    units: state => {
      return state.units;
    },
  },

  actions: {
    showUnits({commit}) {
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
        itemsType:"avl_unit",
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
          //dispatch('message/setText', `Error ${code} - ${wialon.core.Errors.getErrorText(code)}`, null, {root:true})
          console.log(code)
          return;
        } 
        console.log(data);
        commit('SET_UNITS', data)
      })
    }     
  },

  mutations: {
    SET_UNITS (state, payload) {
      state.units = payload;
    }
  }
}
