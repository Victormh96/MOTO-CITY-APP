import store from "../store"
import { createRouter, createWebHistory } from "vue-router"
import { credicityRoutes } from "@/router/credicity/credicityRoutes"
import { authenticationRoutes } from "@/router/authentication/authenticationRoutes"

const routes = [

    ...credicityRoutes,

    ...authenticationRoutes,

    {
        path: "/:pathMatch(.*)*",

        name: "Notfound",

        meta: { requiresAuth: true },
        
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

router.beforeEach((to, from, next) => {

    if (to.meta.requiresAuth && !store.state.authentication?.cuenta?.access_token && !store.state.authentication?.cuenta?.key_security) {

        next('/')

    } else if (to.path === '/' && store.state.authentication?.cuenta?.access_token && store.state.authentication?.cuenta?.key_security) {

        next('/go')

    } else {

        if (to.meta.requiresRole) {

            roleAccess(to, store, to.meta.requiresRole, next)

        } else {

            next()
        }
    }
})

function roleAccess(to, store, requiredRole, next) {

    if (store.state.authentication?.cuenta?.roluser === requiredRole) {

        next('/404')

    } else {

        next()
    }
}

export default router