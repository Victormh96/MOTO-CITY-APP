import {
    createApp
} from "vue"

import {
    getRole
} from "./utils/global"

import App from "./App.vue"

import pinia from "./store"

import router from "./router"

import Antd from "ant-design-vue"

import VueTheMask from "vue-the-mask"

import VueFroala from "vue-froala-wysiwyg"

import "@/assets/css/antd.css"

import "@/assets/css/main.css"

import "@/assets/css/bootstrap.css"

import "froala-editor/js/plugins.pkgd.min.js"

import "froala-editor/css/froala_style.min.css"

import "froala-editor/css/froala_editor.pkgd.min.css"

const app = createApp(App)

app.config.globalProperties.getRole = getRole

app.use(pinia)

    .use(Antd)

    .use(router)

    .use(VueFroala)

    .use(VueTheMask)

    .mount("#app")
