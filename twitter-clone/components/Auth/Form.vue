<template>
  <div>
    <div class="pt-5 space-y-6">
      <h2>{{ data.username }}</h2>
      <UIInput v-model="data.username" label="Username" placeholder="@username" />
      <h2>{{ data.password }}</h2>
      <UIInput v-model="data.password" label="Password" placeholder="********" type="password" />

      <div>
        <button @click="handleLogin">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const data = reactive({
  username: "",
  password: "",
  loading: false,
});

const handleLogin = async () => {
  const { login } = userAuth();
  data.loading = true;
  try {
    await login({
      username: data.username,
      password: data.password,
    });
  } catch (error) {
    console.log(error);
  } finally {
    data.loading = false;
  }
};
</script>
