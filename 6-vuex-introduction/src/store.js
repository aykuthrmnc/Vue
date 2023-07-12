import { createStore } from "vuex";

const store = createStore({
  state: {
    user: {
      name: "Aykut",
      lastname: "Harmancı",
      age: 24,
      address: {},
      password: 1235466465,
      tc: 11111,
    },
    fullName: "Aykut Hrmnc",
    theme: "dark",
    permissions: [1, 2, 3, 4, 5],
    userList: ["Gökhan", "Tayfun", "İlker", "Ramazan", "Defne", "Kamil", "Cemil"],
    itemList: [
      { id: 1, title: "Masa", type: "mobilya" },
      { id: 2, title: "Sandalye", type: "mobilya" },
      { id: 3, title: "TV", type: "elektronik" },
      { id: 4, title: "Monitor", type: "elektronik" },
      { id: 5, title: "Bardak", type: "plastik" },
    ],
  },
  mutations: {
    // Senkron
    newItem(state, item) {
      state.itemList.push(item);
    },
  },
  actions: {
    // Asenkron
    newItem({ commit }, item) {
      console.log("item -> ", item);
      setTimeout(() => {
        // context.commit("newItem", item);
        commit("newItem", item);
      }, 1000);
    },
  },
  getters: {
    _woodItems: (state) => state.itemList.filter((i) => i.type === "mobilya"),
    _activeUser(state) {
      const user = {
        ...state.user,
      };
      delete user.password;
      return user;
    },
  },
});

export default store;
