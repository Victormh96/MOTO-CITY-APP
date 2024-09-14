const primeramatriculaRoutes = [
    {
        path: "/primera-matricula",

        name: "Primeramatricula",

        meta: {

            requiresAuth: true,

            requiresRole: ["Tramite", "Concesionario", "Jefe", "Caja"]
        },

        component: () => import("@/views/primeramatricula/ViewIndex.vue")
    }
]

export { primeramatriculaRoutes }