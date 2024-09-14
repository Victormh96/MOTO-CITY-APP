const plantillaRoutes = [
    {
        path: "/plantilla",

        name: "Plantilla",

        meta: {

            requiresAuth: true,

            requiresRole: ["Tramite", "Administrador"]
        },

        component: () => import("@/views/plantilla/ViewIndex.vue")
    }
]

export { plantillaRoutes }