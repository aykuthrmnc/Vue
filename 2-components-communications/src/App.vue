<template>
  <div class="container">
    <user-section />
  </div>
</template>

<script>
import UserSection from "./components/UserSection.vue";
export default {
  components: { UserSection },
  data() {
    return {
      provideData: {
        userList: ["Tayfun", "Gökhan", "Defne", "Hakan", "Aslı"],
      },
    };
  },
  methods: {
    newItem(item) {
      this.provideData.userList.push(item);
    },
  },
  provide() {
    return {
      userList: this.provideData.userList,
      newItem: this.newItem
    };
  },
};
</script>
