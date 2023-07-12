<template>
  <div class="container">
    <button class="btn btn-sm btn-danger" @click="activeComponent='Red'">Red</button>
    <button class="btn btn-sm btn-success" @click="activeComponent='Green'">Green</button>
    <button class="btn btn-sm btn-primary" @click="activeComponent='Blue'">Blue</button>
    <!-- <red v-if="activeComponent == 'Red'" />
    <green v-if="activeComponent == 'Green'" />
    <blue v-if="activeComponent == 'Blue'" /> -->
    <keep-alive>
      <component :is="activeComponent" msg="Red Component">
      <h3 class="bg-success text-white">Green Component</h3>
      </component>
    </keep-alive>
  </div>
</template>

<script>
import Blue from "./components/Blue.vue";
import Green from "./components/Green.vue";
import Red from "./components/Red.vue";
export default {
  components: { Red, Blue, Green },
  data() {
    return {
      activeComponent: "Red",
    };
  },
};
</script>