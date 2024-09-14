const usuarioRoutes = [
    {
        path: "/usuario",

        name: "Usuario",

        meta: {

            requiresAuth: true,

            requiresRole: ["Administrador"]
        },

        component: () => import("@/views/usuario/ViewIndex.vue")
    }
]

export { usuarioRoutes }