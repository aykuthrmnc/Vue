<template>
  <div class="form-area card">
    <div class="card-body">
      <div class="mb-3">
        <label for="title" class="form-label">Başlık</label>
        <input type="text" class="form-control" id="title" placeholder="Başlık giriniz..." v-model="userData.title" />
      </div>
      <div class="mb-3">
        <label for="url" class="form-label">Url</label>
        <input type="text" class="form-control" id="url" placeholder="https://..." v-model="userData.url" />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Açıklama</label>
        <textarea
          class="form-control"
          id="description"
          rows="3"
          placeholder="Açıklama giriniz..."
          v-model="userData.description"
        ></textarea>
      </div>
      <div class="text-end">
        <button class="btn btn-sm btn-primary me-1" @click="onSave">Kaydet</button>
        <button class="btn btn-sm btn-secondary" @click="$router.push({ name: 'homepage' })">İptal</button>
        <!-- <button class="btn btn-sm btn-warning" @click="$router.go(-1)">Önceki Sayfa</button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        title: null,
        url: null,
        description: null,
      },
    };
  },
  methods: {
    onSave() {
      console.log(this.userData);
      this.$appAxios.post("/bookmarks", this.userData).then((res) => {
        // console.log("Response: ", res);
        this.resetData();
        this.$router.push("/");
      });
    },
    resetData() {
      Object.keys(this.userData).forEach((key) => (this.userData[key] = null));
    },
  },
};
</script>
