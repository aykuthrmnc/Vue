<template>
  <TodoList />
  <ResultBar />
</template>

<script>
import TodoList from "./TodoList.vue";
import ResultBar from "./ResultBar.vue";
export default {
  components: {
    TodoList,
    ResultBar,
  },
  // inject: ["provideData"],
  // props: {
  // todoList: {
  //     type: Array,
  //     required: true,
  //   },
  // },
};
</script>