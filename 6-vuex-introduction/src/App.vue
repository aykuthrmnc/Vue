<template>
  <div class="container">
    <!-- <ul class="list-group">
      <li class="list-group-item list-group-item-action" v-for="user in $store.state.userList" :key="user">
        {{ user }}
      </li>
    </ul> -->
    <user-list />
    <new-user />
  </div>
</template>

<script>
import UserList from "./components/UserList.vue";
import NewUser from "./components/NewUser.vue";
export default {
  components: { UserList, NewUser },
  created() {
    // console.log(this.$store.getters._woodItems);
    // console.log(this.$store.getters._activeUser);
    // console.log(this.activeUser);
  },
};
</script>
