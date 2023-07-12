import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    return {
      contactName: "Aykut",
      contactLastName: "Harmancı",
      contactAddress: "Türkiye",
      propertyList: [],
      itemList: [],
    };
  },
  actions: {
    addItem(name) {
      this.propertyList.push(name);
    },
    getItems() {
      axios.get("http://localhost:3001/items").then((i) => {
        this.itemList = i.data || [];
      });
    },
    onSave(e) {
      const saveObject = {
        title: e.target.value,
        created_at: new Date(),
        completed: false,
      };
      axios.post("http://localhost:3001/items", saveObject).then((save_response) => {
        this.itemList.push(save_response.data);
        e.target.value = "";
        e.target.focus();
      });
    },
    onDelete(item) {
      axios.delete(`http://localhost:3001/items/${item.id}`).then((delete_response) => {
        this.itemList = this.itemList.filter((i) => i.id !== item.id);
      });
    },
  },
  getters: {
    _contactName: (state) => state.contactName,
    _itemList: (state) => state.itemList,
  },
});
