<template>
  <ul class="list-group" v-if="user.itemList.length > 0">
    <li
      class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      v-for="item in user.itemList"
      :key="item.id"
    >
      <span>{{ item.title }}</span>
      <button @click="user.onDelete(item)" class="btn btn-danger">Sil</button>
    </li>
  </ul>
  <div class="alert alert-warning" role="alert" v-else>Herhangi bir ürün yoktur.</div>
</template>

<script>
import { useUserStore } from "@/stores/user";
export default {
  setup() {
    const user = useUserStore();
    return { user };
  },
  mounted() {
    this.user.getItems();
  },
};
</script>
