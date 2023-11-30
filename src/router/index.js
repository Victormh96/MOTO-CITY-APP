import { createRouter, createWebHistory } from "vue-router"
import { credicityRoutes } from "@/router/credicity/credicityRoutes"

const routes = [

    ...credicityRoutes,

    {
        path: "/:pathMatch(.*)*",
        name: "Notfound",
        component: () => import("@/views/error/ViewNotFound.vue")
    }
]

const router = createRouter({

    history: createWebHistory(process.env.BASE_URL),

    routes,

    scrollBehavior() {

        return { top: 0 }
    }
})

export default router