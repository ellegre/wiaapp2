export default {  
  namespaced: true,
  state: {
    objects: [],
    object: {
      icon: null,
    }
  },

  getters: {
    objects: state => {
      return state.objects;
    },
  },

  actions: {
    showObjects({commit, rootGetters}) {
      const wialon = window.wialon;
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


      rootGetters.session.searchItems(searchSpec, true, dataFlags, 0, 0, (code, data) => {
        console.log(1)
        if (code) {
          this.showMessage(`Error ${code} - ${wialon.core.Errors.getErrorText(code)}`);
          console.log(code)
          return;
        }
        console.log(data);
        commit('SET_OBJECTS', data)
      })
    }     
  },

  mutations: {
    SET_OBJECTS (state, payload) {
      state.objects = payload;
    }
  }
}
