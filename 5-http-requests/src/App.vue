<template>
  <div class="container">
    <h3>Alışveriş Listesi</h3>
    <div>
      <input type="text" placeholder="Ne alacaksın?" @keydown.enter="onSave" />
    </div>
    <item-list />
    <ul class="list-group" v-if="itemList.length > 0">
      <li
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        v-for="item in itemList"
        :key="item.id"
      >
        <span>{{ item.title }}</span>
        <button @click="onDelete(item)" class="btn btn-danger">Sil</button>
      </li>
    </ul>
    <div class="alert alert-warning" role="alert" v-else>Herhangi bir ürün yoktur.</div>
    <small class="text-primary d-block text-end">{{ itemCount }} adet alınacak ürün vardır.</small>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      itemList: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3001/items").then((items_response) => {
      //   console.log(items_response);
      this.itemList = items_response.data || [];
    });
  },
  methods: {
    onSave(e) {
      const saveObject = {
        title: e.target.value,
        created_at: new Date(),
        completed: false,
      };
      axios.post("http://localhost:3001/items", saveObject).then((save_response) => {
        // console.log(save_response);
        this.itemList.push(save_response.data);
        e.target.value = "";
        e.target.focus();
      });
    },
    onDelete(item) {
      axios.delete(`http://localhost:3001/items/${item.id}`).then((delete_response) => {
        // console.log(delete_response);
        this.itemList = this.itemList.filter((i) => i.id !== item.id);
      });
    },
  },
  computed: {
    itemCount() {
      return this.itemList.length;
    },
  },
};
</script>
