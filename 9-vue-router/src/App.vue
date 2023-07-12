<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <ul class="nav nav-tabs">
      <RouterLink to="/" active-class="active" class="nav-link">Home</RouterLink>
      <RouterLink to="/about" active-class="active" class="nav-link">About</RouterLink>
      <RouterLink to="/details/123" active-class="active" class="nav-link">Details</RouterLink>
    </ul>
    <RouterView />
  </div>
</template>
