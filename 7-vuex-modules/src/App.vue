<template>
  <p>
    {{ $store.state.mainName }}
  </p>
  <p>
    {{ $store.state.musteri.contactName }}
  </p>
  <p>
    {{ musteriAdi }}
  </p>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  created() {
    console.log(this.$store.getters["musteri/_contactName"]);
  },
  computed: {
    ...mapGetters({
      musteriAdi: "musteri/_contactName",
    }),
  },
};
</script>
