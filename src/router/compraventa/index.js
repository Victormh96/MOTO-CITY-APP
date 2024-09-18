const compraventaRoutes = [
    {
        path: "/compra-venta",

        name: "Compraventa",

        meta: {

            requiresAuth: true,

            requiresRole: ["Tramite", "Concesionario", "Jefe", "Caja"]
        },

        component: () => import("@/views/compraventa/View.vue")
    }
]

export { compraventaRoutes }