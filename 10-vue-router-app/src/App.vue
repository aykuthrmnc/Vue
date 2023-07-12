<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <!-- <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/newbookmark">New Bookmark</RouterLink> -->
  <div class="container">
    <h3 class="text-center">Bookmark List</h3>
    <div class="row">
      <div class="col-8 mx-auto">
        <RouterView />
      </div>
    </div>
  </div>
</template>
