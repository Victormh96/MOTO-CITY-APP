const reciboRoutes = [
    {
        path: "/recibo",

        name: "Recibo",

        meta: {

            requiresAuth: true,

            requiresRole: ["Caja"]
        },

        component: () => import("@/views/recibo/View.vue")
    },
    {
        path: "/recibo/download",

        name: "ReciboDownload",

        meta: {

            requiresAuth: true,

            requiresRole: ["Contabilidad"]
        },

        component: () => import("@/views/recibo/ViewDownload.vue")
    }
]

export { reciboRoutes }