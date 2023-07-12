<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Giriş Yap</h3>
    <input v-model="userData.username" type="text" placeholder="Kullanıcı Adı" class="input mb-3" />
    <input v-model="userData.password" type="password" placeholder="Şifre" class="input mb-3" />
    <button @click="onSubmit" class="default-button">Giriş yap</button>
    <span class="text-center mt-3 text-sm">
      Üye değilim,
      <router-link :to="{ name: 'RegisterPage' }" class="text-red-900 hover:text-black"
        >Üye olmak istiyorum!</router-link
      >
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    onSubmit() {
      const password = this.$CryptoJS.HmacSHA1(this.userData.password, this.$userStore._saltKey).toString();
      this.$appAxios
        .get(`/users?username=${this.userData.username}&password=${password}`)
        .then((res) => {
          if (res.data.length === 1) {
            this.$userStore.setUser(res.data[0]);
            this.$router.push({ name: "HomePage" });
          } else {
            alert("Böyle bir kullanıcı bulunamadı...");
          }
        })
        .catch((e) => console.log(e));
      // .finally(() => this.loader = false)
    },

    // async onSubmit() { // With Fetch Api
    //   const password = this.$CryptoJS.HmacSHA1(this.userData.password, this.$userStore._saltKey).toString();
    //   const res = await fetch(`http://localhost:3001/users?username=${this.userData.username}&password=${password}`);
    //   const answer = await res.json();
    //   if (answer.length === 1) {
    //     this.$userStore.setUser(answer[0]);
    //     console.log(this.$userStore.user);
    //   } else {
    //     alert("Böyle bir kullanıcı bulunamadı...");
    //   }
    // },
  },
};
</script>
