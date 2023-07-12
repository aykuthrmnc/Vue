import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import InputMask from "primevue/inputmask";
import i18n from './i18n'

const app = i18n(createApp(App));
app.use(PrimeVue);
app.component("InputMask", InputMask);

app.mount("#app");
