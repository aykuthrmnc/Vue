<template>
  <AppHeader />
  <div class="flex flex-row">
    <Sidebar />
    <component :is="$route.meta.componentName" :items="bookmarkList" />
    <!-- <BookmarkList v-if="bookmarkList.length > 0" :items="bookmarkList" />
    <div v-else>Bookmark bulunmamaktadır.</div> -->
  </div>
</template>

<script setup>
import Sidebar from "@/components/Account/Sidebar.vue";
import { inject, ref } from "vue";

const appAxios = inject("appAxios");

const bookmarkList = ref([]);

appAxios.get("/bookmarks?_expand=category&_expand=user").then((res) => {
  bookmarkList.value = res?.data || [];
});
</script>
