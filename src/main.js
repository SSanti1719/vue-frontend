import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import setupAxiosInterceptors from "./js/interceptor";
import router from "./router";

const app = createApp(App);
app.use(router);
setupAxiosInterceptors();
app.mount("#app");
