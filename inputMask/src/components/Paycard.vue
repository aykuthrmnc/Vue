<template>
  <VuePaycard :value-fields="valueFields" />
</template>

<script setup>
import VuePaycard from './VuePaycard.vue';

const valueFields = {
  cardName: "Aykut Harmancı",
  cardNumber: "5282 0804 5810 8123",
  cardMonth: "08",
  cardYear: "2023",
  cardCvv: "300",
};
</script>
