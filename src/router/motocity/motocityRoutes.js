const motocityRoutes = [
    {
        path: '/go',

        name: 'Go',

        meta: { requiresAuth: true },

        component: () => import("@/views/ViewGo.vue")
    },
    {
        path: '/compra-venta',

        name: 'Compraventa',

        meta: { requiresAuth: true },

        component: () => import("@/views/compraventa/ViewIndex.vue")
    },
    {
        path: '/primera-matricula',

        name: 'Primeramatricula',

        meta: { requiresAuth: true },

        component: () => import("@/views/primeramatricula/ViewIndex.vue")
    },
    {
        path: '/plantilla',

        name: 'Plantilla',

        meta: { requiresAuth: true, requiresRole: 'Tramite' },

        component: () => import("@/views/plantilla/ViewIndex.vue")
    }
]

export { motocityRoutes }