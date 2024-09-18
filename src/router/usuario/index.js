const usuarioRoutes = [
    {
        path: "/usuario",

        name: "Usuario",

        meta: {

            requiresAuth: true,

            requiresRole: ["Administrador"]
        },

        component: () => import("@/views/usuario/View.vue")
    }
]

export { usuarioRoutes }