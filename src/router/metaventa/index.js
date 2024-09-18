const metaventaRoutes = [
    {
        path: "/meta-venta",

        name: "Metaventa",

        meta: {

            requiresAuth: true,

            requiresRole: ["RRHH"]
        },

        component: () => import("@/views/metaventa/ViewIndex.vue")
    }
]

export { metaventaRoutes }