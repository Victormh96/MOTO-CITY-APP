const pagareRoutes = [
    {
        path: "/pagare",

        name: "Pagare",

        meta: {

            requiresAuth: true,

            requiresRole: ["Jefe"]
        },

        component: () => import("@/views/pagare/ViewIndex.vue")
    }
]

export { pagareRoutes }