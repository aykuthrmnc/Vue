<template>
  <AppHeader />
  <div class="flex flex-row">
    <Sidebar @category-changed="updateBookmarkList" />
    <BookmarkList v-if="bookmarkList.length > 0" :items="bookmarkList" />
    <div v-else>Bookmark bulunmamaktadır.</div>
  </div>
</template>

<script>
import Sidebar from "@/components/Home/Sidebar.vue";
export default {
  components: { Sidebar },
  data() {
    return {
      bookmarkList: [],
    };
  },
  created() {
    this.$appAxios.get("/bookmarks?_expand=category&_expand=user").then((res) => {
      this.bookmarkList = res?.data || [];
    });
    this.$appAxios.get("/user_likes/?_expand=bookmark&_expand=user").then((res) => {
      this.$userStore.setLikes(res?.data);
    });
    this.$appAxios.get("/user_bookmarks/?_expand=bookmark&_expand=user").then((res) => {
      this.$userStore.setBookmarks(res?.data);
    });
  },
  methods: {
    updateBookmarkList(categoryId) {
      const url = categoryId
        ? `/bookmarks?_expand=category&_expand=user&categoryId=${categoryId}`
        : `/bookmarks?_expand=category&_expand=user`;
      this.$appAxios.get(url).then((res) => {
        this.bookmarkList = res?.data || [];
      });
    },
  },
};
</script>
