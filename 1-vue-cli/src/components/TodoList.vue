<template>
  <ul>
    <todo-list-item v-for="todoItem in provideData.todoList" :key="todoItem.id" :item="todoItem" />
  </ul>
</template>

<script>
import TodoListItem from './TodoListItem.vue';
export default {
  components: { TodoListItem },
  inject: ["provideData"],
  // props: ["myData"],
  // props: {
  //   myData: {
  //     type: String,
  //     required: false,
  //     default: "",
  //   },
  // },
};
</script>