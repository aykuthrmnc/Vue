<template>
  {{ title }}
  <input type="text" v-model="title" />
  {{ titleLengthMessage }}
  <button @click="toggleIt">Toggle</button>
  <p v-if="show">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora obcaecati nihil pariatur vel, rerum voluptatibus
    alias exercitationem beatae blanditiis ducimus quaerat quas consequatur est modi reiciendis esse aliquid fugit odio?
  </p>
  <hr />
  <button @click="counter++">{{ counter }} {{ oddOrEven }}</button>
  <hr />
  <input type="text" v-model="searchText" />
  <p v-if="isTyping">Şu an yazıyor...</p>
</template>

<script>
import Counter from "./composables/Counter";
import Header from "./composables/Header";
import Search from "./composables/Search";
import Toggle from "./composables/Toggle";
export default {
  setup() {
    const { counter, oddOrEven } = Counter();
    const { title, titleLengthMessage } = Header();
    const { searchText, isTyping } = Search();
    const { show, toggleIt } = Toggle();

    return {
      title,
      show,
      toggleIt,
      titleLengthMessage,
      counter,
      oddOrEven,
      searchText,
      isTyping,
    };
  },
};
</script>
