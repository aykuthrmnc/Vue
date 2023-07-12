<template>
  <list-section />
  <add-section />
</template>

<script>
import ListSection from "./ListSection.vue";
import AddSection from "./AddSection.vue";
export default {
  components: { ListSection, AddSection },
  inject: ["userList"],
};
</script>

<style>
</style>