const authenticationRoutes = [
    {
        path: "/",

        name: "Inicio-Sesion",

        component: () => import("@/views/authentication/View.vue")
    }
]

export { authenticationRoutes }