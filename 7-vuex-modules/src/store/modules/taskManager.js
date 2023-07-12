export default {
  namespaced: true,
  state: {
    itemList: [],
    userList: [],
  },
  setName(state, item) {
    state.itemList.push(item);
  },
  getters: {
    _itemList: (state) => state.itemList,
  },
};
