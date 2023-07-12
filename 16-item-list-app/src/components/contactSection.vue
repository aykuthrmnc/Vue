<template>
  <div>
    <heading title="Fatura Bilgileri" />
    <label for="client_name" class="flex flex-col text-gray-400 mb-2">
      <small class="mb-1">Müşteri Adı</small>
      <input v-model="contact.contact_name" autocomplete="off" id="client_name" class="input bg-gray-800 outline-none px-2 py-1 text-sm rounded-md text-gray-400 focus:bg-gray-700" type="text" />
    </label>
    <label for="client_email" class="flex flex-col text-gray-400 mb-2">
      <small class="mb-1">E-posta</small>
      <input v-model="contact.email" autocomplete="off" id="client_email" class="input bg-gray-800 outline-none px-2 py-1 text-sm rounded-md text-gray-400 focus:bg-gray-700" type="email" />
    </label>

    <div class="grid grid-cols-3 gap-5">
      <label for="city" class="flex flex-col text-gray-400 mb-2">
        <small class="mb-1">Şehir</small>
        <input v-model="contact.city" autocomplete="off" id="city" class="input bg-gray-800 outline-none px-2 py-1 text-sm rounded-md text-gray-400 focus:bg-gray-700" type="text" />
      </label>
      <label for="zip_code" class="flex flex-col text-gray-400 mb-2">
        <small class="mb-1">Posta Kodu</small>
        <input v-model="contact.zipcode" autocomplete="off" id="zip_code" class="input bg-gray-800 outline-none px-2 py-1 text-sm rounded-md text-gray-400 focus:bg-gray-700" type="text" />
      </label>
      <label for="country" class="flex flex-col text-gray-400 mb-2">
        <small class="mb-1">Ülke</small>
        <input v-model="contact.country" autocomplete="off" id="country" class="input bg-gray-800 outline-none px-2 py-1 text-sm rounded-md text-gray-400 focus:bg-gray-700" type="text" />
      </label>
    </div>
  </div>
</template>

<script setup>
defineProps({ contact: Object });
</script>
