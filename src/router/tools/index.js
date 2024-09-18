const toolsRoutes = [
    {
        path: "/go",

        name: "Go",

        meta: {

            requiresAuth: true
        },

        component: () => import("@/views/ViewGo.vue")
    },
    {
        path: "/dte",

        name: "DTE",

        meta: {

            requiresAuth: true,

            requiresRole: ["Contabilidad", "Administrador"]
        },

        component: () => import("@/views/dte/View.vue")
    },
    {
        path: "/pedidos",

        name: "Pedidos",

        meta: {

            requiresAuth: true,

            requiresRole: ["Logistica"]
        },

        component: () => import("@/views/pedido/ViewDownload.vue")
    }
]

export { toolsRoutes }