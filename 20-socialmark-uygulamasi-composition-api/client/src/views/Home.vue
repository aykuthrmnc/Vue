<template>
  <AppHeader />
  <div class="flex flex-row">
    <Sidebar @category-changed="updateBookmarkList" />
    <BookmarkList v-if="bookmarkList.length > 0" :items="bookmarkList" />
    <div v-else>Bookmark bulunmamaktadır.</div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Home/Sidebar.vue";
import { inject, onMounted, ref } from "vue";
import { useUserStore } from "@/stores";
const appAxios = inject("appAxios");
const socket = inject("socket");
const userStore = useUserStore();

const bookmarkList = ref([]);

onMounted(() => {
  socket.on("NEW_BOOKMARK_ADDED", (bookmark) => {
    bookmarkList.value.push(bookmark);
  });
});

const updateBookmarkList = (categoryId) => {
  const url = categoryId
    ? `/bookmarks?_expand=category&_expand=user&categoryId=${categoryId}`
    : `/bookmarks?_expand=category&_expand=user`;
  appAxios.get(url).then((res) => {
    bookmarkList.value = res?.data || [];
  });
};

const fetchData = () => {
  appAxios.get("/bookmarks?_expand=category&_expand=user").then((res) => {
    bookmarkList.value = res?.data || [];
  });
  appAxios.get("/user_likes/?_expand=bookmark&_expand=user").then((res) => {
    userStore.setLikes(res?.data);
  });
  appAxios.get("/user_bookmarks/?_expand=bookmark&_expand=user").then((res) => {
    userStore.setBookmarks(res?.data);
  });
};

fetchData();
</script>
