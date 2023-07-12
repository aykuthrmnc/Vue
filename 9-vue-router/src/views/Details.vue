<template>
  <!-- {{ $route.params.id }} -->
  {{ $route.query.user }}
  <h1>Details</h1>
  <p>Açıklamalar burada yer alacaktır.</p>
  <button class="btn btn-primary" @click="goBack">Geri Dön</button>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>
