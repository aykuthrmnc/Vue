<script setup>
import TheWelcome from "@/components/TheWelcome.vue";
</script>

<template>
  <h1>Home</h1>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro sunt laudantium dolores maxime, recusandae illo
    ducimus dolorum neque magnam magni, quibTLam eius, quasi atque maiores voluptate odio cupiditate ullam officiis?
  </p>
  <input type="text" @keydown.enter="goToDetails" />
</template>

<script>
export default {
  methods: {
    goToDetails(e) {
      // this.$router.push(`/details/${e.target.value}`);
      this.$router.push({
        name: "details",
        params: {
          id: e.target.value,
        },
        query: {
          type: "DetailAuth",
          user: "aykuthrmnc",
        },
      });
    },
  },
};
</script>
