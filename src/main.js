import { createApp } from "vue";
import "./main.css";
import App from "./App.vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";

const vuetify = createVuetify();

createApp(App).use(vuetify).mount("#app");
