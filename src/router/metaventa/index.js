const metaventaRoutes = [
    {
        path: "/meta-venta",

        name: "Metaventa",

        meta: {

            requiresAuth: true,

            requiresRole: ["RRHH"]
        },

        component: () => import("@/views/metaventa/View.vue")
    }
]

export { metaventaRoutes }