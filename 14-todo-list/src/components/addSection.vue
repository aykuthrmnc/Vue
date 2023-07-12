<template>
  <section>
    <input @keydown.enter="newItem" type="text" placeholder="Nedir?" class="w-100" />
  </section>
</template>

<script>
export default {
  props: {
    AddTodo: Function,
  },
  setup(props) {
    const newItem = (event) => {
      props.AddTodo(event.target.value)
    }
    return { newItem };
  },
};
</script>
