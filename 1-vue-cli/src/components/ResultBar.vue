<template>
  <small class="d-flex justify-content-end"
    >{{ provideData.todoList.length }} adet todo vardır.</small
  >
</template>

<script>
export default {
  inject: ["provideData"],
  // props: ["itemCount"],
};
</script>