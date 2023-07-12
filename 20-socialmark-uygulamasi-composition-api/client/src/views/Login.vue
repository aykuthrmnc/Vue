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

<script setup>
import { ref, inject } from "vue";
import { useUserStore } from "@/stores";
import { useRouter } from "vue-router";
import CryptoJS from "crypto-js";

const appAxios = inject("appAxios")
const userStore = useUserStore();
const router = useRouter();

const userData = ref({
  username: null,
  password: null,
});

const onSubmit = () => {
  const password = CryptoJS.HmacSHA1(userData.value.password, userStore._saltKey).toString();
  appAxios
    .get(`/users?username=${userData.value.username}&password=${password}`)
    .then((res) => {
      if (res.data.length === 1) {
        userStore.setUser(res.data[0]);
        router.push({ name: "HomePage" });
      } else {
        alert("Böyle bir kullanıcı bulunamadı...");
      }
    })
    .catch((e) => console.log(e));
};
</script>
