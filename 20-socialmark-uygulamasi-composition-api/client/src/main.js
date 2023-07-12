import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import "./assets/style.css";

import appHeader from "@/components/Shared/appHeader.vue";
import bookmarkList from "@/components/Shared/appBookmarkList/BookmarkList.vue";
import { appAxios } from "./utils/appAxios";

import io from "socket.io-client";
const socket = io("http://localhost:2022");

const app = createApp(App);
app.component("AppHeader", appHeader);
app.component("BookmarkList", bookmarkList);
app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);

app.config.globalProperties.$log = console.log;
app.provide("socket",socket)
app.provide("appAxios", appAxios)

app.mount("#app");
