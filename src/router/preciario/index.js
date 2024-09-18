const preciarioRoutes = [
    {
        path: "/preciario",

        name: "Preciario",

        meta: {

            requiresAuth: true,

            requiresRole: ["Jefe"]
        },

        component: () => import("@/views/preciario/View.vue")
    }
]

export { preciarioRoutes }