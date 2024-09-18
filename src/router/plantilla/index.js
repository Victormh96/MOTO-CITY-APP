const plantillaRoutes = [
    {
        path: "/plantilla",

        name: "Plantilla",

        meta: {

            requiresAuth: true,

            requiresRole: ["Tramite", "Administrador"]
        },

        component: () => import("@/views/plantilla/View.vue")
    }
]

export { plantillaRoutes }