import { createStore } from "vuex";
import contact from "./modules/contact";
import taskManager from "./modules/taskManager";

export default createStore({
  namespaced: true,
  state: {
    mainName: "aykuthrmnc",
  },
  modules: {
    musteri: contact,
    taskManager,
  },
});
