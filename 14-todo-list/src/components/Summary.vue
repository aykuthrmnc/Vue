<template>
  <div class="text-primary">{{ completed }} adet tamamlanmış taskınız bulunuyor</div>
  <div class="text-danger">{{ uncompleted }} adet tamamlanmamış taskınız bulunuyor</div>
  <button @click="getir">saddsa</button>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    todoList: Array,
  },
  setup(props) {
    const completed = computed(() => props.todoList.filter((i) => i.completed).length);
    const uncompleted = computed(() => props.todoList.filter((i) => !i.completed).length);

    const getir = () => {
      console.log(props.todoList);
    }
    return {
      completed,
      uncompleted,
      getir
    };
  },
};
</script>
