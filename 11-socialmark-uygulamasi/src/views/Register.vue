<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Kayıt Ol</h3>
    <input v-model="userData.fullname" type="text" placeholder="Tam Ad" class="input mb-3" />
    <input v-model="userData.username" type="text" placeholder="Kullanıcı Adı" class="input mb-3" />
    <input v-model="userData.password" type="password" placeholder="Şifre" class="input mb-3" />
    <button class="default-button" @click="onSave">Kayıt ol</button>
    <span class="text-center mt-3 text-sm">
      Zaten Üyeyim,
      <router-link :to="{ name: 'LoginPage' }" class="text-red-900 hover:text-black">Giriş yap!</router-link>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        username: null,
        fullname: null,
        password: null,
      },
    };
  },
  methods: {
    onSave() {
      const password = this.$CryptoJS.HmacSHA1(this.userData.password, this.$userStore._saltKey).toString();
      // console.log(password);

      this.$appAxios.post("/users", { ...this.userData, password }).then((res) => {
        this.$router.push("/");
      });

      // const password = this.$CryptoJS.SHA256(this.userData.password).toString();
      // console.log(password);
      // const decryptedText = this.$CryptoJS.AES.decrypt(password, "booklike123!456?").toString(this.$CryptoJS.enc.Utf8)
      // console.log(decryptedText);
    },
  },
};
</script>
