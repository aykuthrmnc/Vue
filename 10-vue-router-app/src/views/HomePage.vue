<template>
  <div class="card">
    <div class="card-body">
      <div class="text-end">
        <button class="btn btn-sm btn-primary" @click="$router.push({ name: 'newbookmark' })">Yeni Ekle</button>
      </div>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Başlık</th>
            <th>Url</th>
            <th>Açıklama</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(bookmark, index) in bookmarkList" :key="bookmark">
            <th>{{ index + 1 }}</th>
            <td>{{ bookmark.title }}</td>
            <td>
              <a :href="bookmark.url" target="_blank">{{ bookmark.url }}</a>
            </td>
            <td>{{ bookmark.description }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteBookmark(bookmark)">Sil</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookmarkList: [],
    };
  },
  created() {
    this.$appAxios.get("/bookmarks").then((res) => {
      console.log(res);
      this.bookmarkList = res.data || [];
    });
  },
  methods: {
    deleteBookmark(bookmark) {
      this.$appAxios.delete(`/bookmarks/${bookmark.id}`).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.bookmarkList = this.bookmarkList.filter((i) => i.id !== bookmark.id);
        }
      });
    },
  },
};
</script>
