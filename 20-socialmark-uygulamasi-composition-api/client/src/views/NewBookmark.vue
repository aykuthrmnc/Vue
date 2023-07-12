<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Yeni Ekle</h3>
    <input ref="title" v-model="userData.title" type="text" placeholder="Başlık" class="input mb-3" />
    <input v-model="userData.url" type="text" placeholder="URL" class="input mb-3" />
    <select v-model="userData.categoryId" class="input mb-3">
      <option disabled value="" selected>Kategori</option>
      <option v-for="category in categoryList" :key="category.id" :value="category.id">{{ category.name }}</option>
    </select>
    <textarea v-model="userData.description" placeholder="Açıklama" class="input mb-3" cols="30" rows="10"></textarea>
    <div class="flex items-center justify-end gap-x-1">
      <button @click="$router.push({ name: 'HomePage' })" class="secondary-button">İptal</button>
      <button @click="onSave" class="default-button">Kaydet</button>
    </div>
  </div>
</template>

//
<script setup>
import { ref, inject, onMounted } from "vue";
import { useUserStore } from "@/stores";
import { useRouter } from "vue-router";

const appAxios = inject("appAxios");
const userStore = useUserStore();
const router = useRouter();
const socket = inject("socket");

const categoryList = ref([]);
const userData = ref({
  title: null,
  url: null,
  categoryId: null,
  description: null,
});

onMounted(() => {
  appAxios.get("/categories").then((res) => {
    categoryList.value = res?.data || [];
  });
  // this.$refs.title.focus();
});

const onSave = () => {
  const saveData = {
    ...userData.value,
    userId: userStore._getCurrentUser?.id,
    createdAt: new Date(),
  };
  appAxios.post("/bookmarks", saveData).then((res) => {
    Object.keys(userData.value)?.forEach((i) => (userData.value[i] = null));
    // this.userData = {
    //   title: null,
    //   url: null,
    //   categoryId: null,
    //   description: null,
    // };

    // const socketData = {
    //   ...res.data,
    //   user: userStore._getCurrentUser,
    //   category: categoryList.value.find(i => i.id === saveData.categoryId)
    // }
    socket.emit("NEW_BOOKMARK_EVENT", res.data);

    router.push({ name: "HomePage" });
  });
};
</script>
