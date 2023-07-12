export default {
  namespaced: true,
  state: {
    contactName: "aykut",
    contactAddress: "Türkiye",
    propertyList: []
  },
  mutations: {
    setItem(state, name) {
      state.contactName = name;
    },
  },
  getters: {
    _contactName: (state) => state.contactName,
    _itemList: (state) => state.propertyList,
  },
};
