import App from "./App.vue"
import store from "./store"
import router from "./router"
import { createApp } from "vue"
import Antd from "ant-design-vue"
import VueTheMask from "vue-the-mask"

import "../public/css/antd.css"
import "../public/css/main.css"

const app = createApp(App)

app.use(store)
    .use(Antd)
    .use(router)
    .use(VueTheMask)
    .mount("#app")