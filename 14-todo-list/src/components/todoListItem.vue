<template>
  <div class="d-flex justify-content-between align-items-center">
    <label :for="`todo_${todo.id}_completed`">
      <input v-model="todo.completed" type="checkbox" :id="`todo_${todo.id}_completed`" class="me-2" />
      <span>{{ todo.title }}</span>
    </label>
    <button @click="deleteItem" class="btn btn-primary">Sil</button>
  </div>
</template>

<script>
export default {
  props: {
    todo: Object,
  },
  setup(props, { emit }) {
    const deleteItem = () => {
      emit("delete-event", props.todo);
    };
    return {
      deleteItem,
    };
  },
};
</script>
