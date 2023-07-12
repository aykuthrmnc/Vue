<template>
  <li class="d-flex align-items-center justify-content-between">
    <span>{{ item.text }}</span>
    <button class="btn btn-sm btn-danger" @click="deleteItem(item)">
        Sil
      </button>
  </li>
</template>

<script>
export default {
  props: ["item"],
  inject: ["deleteItem"]
};
</script>
