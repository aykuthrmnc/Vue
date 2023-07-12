<template>
  <ul class="list-group">
    <li class="list-group-item list-group-item-action" v-for="item in agacElemanlari" :key="item.id">
      {{ item.title }}
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    // ...mapGetters(["woodItems", "activeUser"]),
    ...mapGetters({
      agacElemanlari: "_woodItems",
      activeUser: "_activeUser",
    }),
  },
};
</script>
