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

<script>
export default {
  data() {
    return {
      categoryList: [],
      userData: {
        title: null,
        url: null,
        categoryId: null,
        description: null,
      },
    };
  },
  mounted() {
    this.$appAxios.get("/categories").then((res) => {
      this.categoryList = res?.data || [];
    });

    // Focus Title Input
    // console.dir(this.$refs.title);
    this.$refs.title.focus();
  },
  methods: {
    onSave() {
      const saveData = {
        ...this.userData,
        userId: this.$userStore._getCurrentUser?.id,
        createdAt: new Date(),
      };
      this.$appAxios.post("/bookmarks", saveData).then((res) => {
        // Object.keys(this.userData)?.forEach((i) => (this.userData[i] = null));
        this.userData = {
          title: null,
          url: null,
          categoryId: null,
          description: null,
        };
        // this.$refs.title.focus();
        this.$router.push({ name: "HomePage" });
      });
    },
  },
};
</script>
