<template>
  <div class="bg-gray-800 flex flex-row text-white items-start justify-center">
    <app-sidebar :invoices="invoiceList" :editInvoice="editInvoice" />
    <invoice-content :saveInvoice="saveInvoice" :activeInvoice="state.activeInvoice" />
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import appSidebar from "./components/appSidebar.vue";
import invoiceContent from "./components/invoiceContent.vue";
const invoiceList = ref([]);
const state = reactive({activeInvoice: null});

const saveInvoice = (invoice) => {
  invoiceList.value.push(invoice);
};
const editInvoice = (invoice) => {
  state.activeInvoice = invoice
};
</script>
