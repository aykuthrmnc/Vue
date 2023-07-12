<script setup>
import AddSection from "./components/AddSection.vue";
import ListSection from "./components/ListSection.vue";
</script>

<template>
  <div class="container text-center">
    <h3>Todo App</h3>
    <hr />
    <AddSection />
    <ListSection />
  </div>
</template>

<script>
export default {
  components: { AddSection, ListSection },
  data() {
    return {
      provideData: {
        todoList: [
          { id: 1, text: "Vue List 1", completed: false },
          { id: 2, text: "Vue List 2", completed: false },
          { id: 3, text: "Vue List 3", completed: false },
          { id: 4, text: "Vue List 4", completed: false },
          { id: 5, text: "Vue List 5", completed: false },
          { id: 6, text: "Vue List 6", completed: false },
          { id: 7, text: "Vue List 7", completed: false },
        ],
      },
    };
  },
  methods: {
    deleteItem(todoItem) {
      this.provideData.todoList = this.provideData.todoList.filter((i) => i !== todoItem);
    },
    addNewTodo(todo) {
      this.provideData.todoList.push({
        id: new Date().getTime(),
        text: todo,
        completed: false,
      });
    },
  },
  provide() {
    return {
      provideData: this.provideData,
      deleteItem: this.deleteItem,
      addNewTodo: this.addNewTodo,
    };
  },
};
</script>