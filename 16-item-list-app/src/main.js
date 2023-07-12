import { createApp } from 'vue'
import App from './App.vue'
import appHeading from './components/ui/appHeading.vue';

createApp(App).component("heading",appHeading).mount('#app')
