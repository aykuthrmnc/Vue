<template>
  <h3>{{ title }}</h3>
  <input type="text" v-model="title" />
  <button @click="inc">{{ counter }}</button>
  <odd-or-even :counter="counter" @odd-event="alertMe" />

  <hr />
  <h1>User App</h1>
  <input type="text" v-model="state.personal.name" />
  <input type="text" v-model="state.personal.lname" />
  {{ name }} {{ lname }}
</template>

<script setup>
//! before beforeCreate() created() ve data()
import oddOrEven from "@/components/oddOrEven.vue";
import { ref, reactive, watch } from "vue";
import Utils from "./composable/Utils.js";
const { title, counter, inc, alertMe } = Utils();

const state = reactive({
  personal: {
    name: "Aykut",
    lname: null,
  },
  itemList: [],
});

watch(
  () => JSON.parse(JSON.stringify(state.personal)),
  (newPersonal, oldPersonal) => {
    console.log(oldPersonal, "=>", newPersonal);
  }
);
</script>
