const motocityRoutes = [
    {
        path: "/go",

        name: "Go",

        meta: { requiresAuth: true },

        component: () => import("@/views/ViewGo.vue")
    },
    {
        path: "/compra-venta",

        name: "Compraventa",

        meta: { requiresAuth: true, requiresRole: ["Tramite", "Concesionario", "Jefe", "Caja"] },

        component: () => import("@/views/compraventa/ViewIndex.vue")
    },
    {
        path: "/primera-matricula",

        name: "Primeramatricula",

        meta: { requiresAuth: true, requiresRole: ["Tramite", "Concesionario", "Jefe", "Caja"] },

        component: () => import("@/views/primeramatricula/ViewIndex.vue")
    },
    {
        path: "/plantilla",

        name: "Plantilla",

        meta: { requiresAuth: true, requiresRole: ["Tramite", "Administrador"] },

        component: () => import("@/views/plantilla/ViewIndex.vue")
    },
    {
        path: "/recibo",

        name: "Recibo",

        meta: { requiresAuth: true, requiresRole: ["Caja"] },

        component: () => import("@/views/recibo/ViewIndex.vue")
    },
    {
        path: "/recibo/download",

        name: "ReciboDownload",

        meta: { requiresAuth: true, requiresRole: ["Contabilidad"] },

        component: () => import("@/views/recibo/ViewDownload.vue")
    },
    {
        path: "/dte",

        name: "DTE",

        meta: { requiresAuth: true, requiresRole: ["Contabilidad", "Administrador"] },

        component: () => import("@/views/dte/ViewIndex.vue")
    },
    {
        path: "/pagare",

        name: "Pagare",

        meta: { requiresAuth: true, requiresRole: ["Jefe"] },

        component: () => import("@/views/pagare/ViewIndex.vue")
    },
    {
        path: "/preciario",

        name: "Preciario",

        meta: { requiresAuth: true, requiresRole: ["Jefe"] },

        component: () => import("@/views/preciario/ViewIndex.vue")
    },
    {
        path: "/pedidos",

        name: "Pedidos",

        meta: { requiresAuth: true, requiresRole: ["Logistica"] },

        component: () => import("@/views/pedido/ViewDownload.vue")
    },
    {
        path: "/usuario",

        name: "Usuario",

        meta: { requiresAuth: true, requiresRole: ["Administrador"] },

        component: () => import("@/views/usuario/ViewIndex")
    }
]

export { motocityRoutes }