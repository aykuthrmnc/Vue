<template>
  <div class="bg-secondary rounded shadow-md text-white w-50 mx-auto p-3 mt-5">
    <h5 class="text-center">Todo List</h5>
    <add-section :AddTodo="AddTodo" />
    <todo-list @delete-event="deleteItem" :todoList="todoList" />
  </div>
</template>

<script>
import { ref } from "vue";
import AddSection from "./components/addSection.vue";
import TodoList from "./components/todoList.vue";
export default {
  components: { AddSection, TodoList },
  setup() {
    const todoList = ref([]);

    const AddTodo = (todoText) => {
      todoList.value.push({
        id: new Date().getTime(),
        title: todoText,
        // completed: false // Eklenmese bile v-model uzerinden geliyor.
      });
    };

    const deleteItem = (todo) => {
      todoList.value = todoList.value.filter((i) => i.id !== todo.id);
    };

    return {
      todoList,
      AddTodo,
      deleteItem,
    };
  },
};
</script>
