import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
import { useUserStore } from "./stores";

import "./assets/style.css";

import appHeader from "@/components/Shared/appHeader.vue";
import bookmarkList from "@/components/Shared/appBookmarkList/BookmarkList.vue";
import { appAxios } from "./utils/appAxios";

import VueCryptojs from "vue-cryptojs";

const app = createApp(App);
app.component("AppHeader", appHeader);
app.component("BookmarkList", bookmarkList);
app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);
app.use(VueCryptojs);
app.config.globalProperties.$userStore = useUserStore();
app.config.globalProperties.$appAxios = appAxios;
app.mount("#app");
