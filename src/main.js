import App from "./App.vue"
import store from "./store"
import router from "./router"
import { createApp } from "vue"
import Antd from "ant-design-vue"
import VueTheMask from "vue-the-mask"
import VueFroala from "vue-froala-wysiwyg"

import "../public/css/antd.css"
import "../public/css/main.css"
import "froala-editor/js/plugins.pkgd.min.js"
import "froala-editor/css/froala_style.min.css"
import "froala-editor/css/froala_editor.pkgd.min.css"

const app = createApp(App)

app.use(store)
    .use(Antd)
    .use(router)
    .use(VueTheMask)
    .use(VueFroala)
    .mount("#app")