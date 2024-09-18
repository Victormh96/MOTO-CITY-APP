const primeramatriculaRoutes = [
    {
        path: "/primera-matricula",

        name: "Primeramatricula",

        meta: {

            requiresAuth: true,

            requiresRole: ["Tramite", "Concesionario", "Jefe", "Caja"]
        },

        component: () => import("@/views/primeramatricula/View.vue")
    }
]

export { primeramatriculaRoutes }