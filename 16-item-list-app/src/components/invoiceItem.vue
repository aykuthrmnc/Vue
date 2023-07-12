<template>
  <div class="group flex items-center mb-1 border-b border-gray-800 p-1">
    <input
      v-model="item.name"
      autocomplete="off"
      type="text"
      class="w-[200px] mr-2 bg-gray-800 outline-none px-2 py-1 text-sm rounded-md text-gray-400 focus:bg-gray-700"
    />
    <input
      v-model="item.quantity"
      autocomplete="off"
      type="text"
      class="w-[50px] mr-2 bg-gray-800 outline-none px-2 py-1 text-sm rounded-md text-gray-400 focus:bg-gray-700"
    />
    <input
      v-model="item.unit_price"
      autocomplete="off"
      type="text"
      class="w-[100px] mr-2 bg-gray-800 outline-none px-2 py-1 text-sm rounded-md text-gray-400 focus:bg-gray-700"
    />
    <span class="p-1 text-center text-gray-400">{{ totalPrice }}</span>
    <div class="text-right flex-grow">
      <button @click="DeleteInvoiceItem(item)" class="outline-none hover:text-gray-100 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, watch } from "vue";

const props = defineProps({ item: Object });
const totalPrice = computed(() => props.item.quantity * props.item.unit_price);
watch(totalPrice, (totalPrice) => {
  props.item.total_price = totalPrice;
});
const DeleteInvoiceItem = inject("DeleteInvoiceItem");
</script>
