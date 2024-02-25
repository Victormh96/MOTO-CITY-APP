const authenticationRoutes = [
    {
        path: "/",

        name: "Inicio-Sesion",

        component: () => import("@/views/authentication/ViewLogin.vue")
    }
]

export { authenticationRoutes }