<template>
  <AppHeader />
  <div class="flex flex-row">
    <Sidebar />
    <component :is="$route.meta.componentName" :items="bookmarkList" />
    <!-- <BookmarkList v-if="bookmarkList.length > 0" :items="bookmarkList" />
    <div v-else>Bookmark bulunmamaktadır.</div> -->
  </div>
</template>

<script>
import Sidebar from "@/components/Account/Sidebar.vue";
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
  }
};
</script>
