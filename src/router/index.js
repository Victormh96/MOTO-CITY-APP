import {
    createRouter,
    createWebHistory
} from "vue-router"

import {
    toolsRoutes
} from "@/router/tools"

import {
    pagareRoutes
} from "@/router/pagare"

import {
    reciboRoutes
} from "@/router/recibo"

import {
    usuarioRoutes
} from "@/router/usuario"

import {
    plantillaRoutes
} from "@/router/plantilla"

import {
    preciarioRoutes
} from "@/router/preciario"

import {
    compraventaRoutes
} from "@/router/compraventa"

import {
    authenticationRoutes
} from "@/router/authentication"

import {
    primeramatriculaRoutes
} from "@/router/primeramatricula"

import {
    authentication
} from "@/store/modules/authentication"

const routes = [

    ...toolsRoutes,

    ...reciboRoutes,

    ...pagareRoutes,

    ...usuarioRoutes,

    ...plantillaRoutes,

    ...preciarioRoutes,

    ...compraventaRoutes,

    ...authenticationRoutes,

    ...primeramatriculaRoutes,

    {
        path: "/:pathMatch(.*)*",

        redirect: "/",

        meta: {

            requiresAuth: true
        }
    }
]

const router = createRouter({

    history: createWebHistory(import.meta.env.BASE_URL),

    routes,

    scrollBehavior() {

        return { top: 0 }
    }
})

router.beforeEach((to, from, next) => {

    if (to.meta.requiresAuth && !authentication()?.cuenta?.token) {

        next("/")

    } else if (to.path === "/" && authentication()?.cuenta?.token) {

        next("/go")

    } else {

        if (to.meta.requiresRole) {

            roleAccess(to, authentication(), to.meta.requiresRole, next)

        } else {

            next()
        }
    }
})

function roleAccess(to, store, requiredRole, next) {

    if (requiredRole.includes(store?.cuenta?.rol)) {

        next()

    } else {

        next("/")
    }
}

export default router