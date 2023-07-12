<template>
  <ul class="list-group">
    <li class="list-group-item list-group-item-action" v-for="user in userList" :key="user">{{user}}</li>
  </ul>
</template>

<script>
export default {
    inject: ["userList"]
};
</script>