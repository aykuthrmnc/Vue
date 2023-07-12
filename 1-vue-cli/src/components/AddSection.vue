<template>
  <label for="todoText"></label>
  <input
    v-model="todoText"
    @keydown.enter="addNewTodo(todoText)"
    type="text"
    id="todoText"
    placeholder="Buraya yazınız..."
  />
  <!-- <input type="text" id="todoText" placeholder="Buraya yazınız..." /> -->
  <!-- <button class="btn btn-sm btn-success" @click="sendData">Gönder</button> -->
</template>

<script>
export default {
  inject: ["addNewTodo"],
  data() {
    return {
      todoText: null,
    };
  },
  // props: {
  //   addNewTodo: {
  //     type: Function,
  //     required: true,
  //   },
  // },
  // methods: {
  // addNewTodo() {
  //   this.$emit("add-todo", this.todoText);
  // },
  // },
};
</script>
