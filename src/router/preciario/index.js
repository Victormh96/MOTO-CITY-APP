const preciarioRoutes = [
    {
        path: "/preciario",

        name: "Preciario",

        meta: {

            requiresAuth: true,

            requiresRole: ["Jefe"]
        },

        component: () => import("@/views/preciario/ViewIndex.vue")
    }
]

export { preciarioRoutes }