const motocityRoutes = [
    {
        path: '/go',

        name: 'Go',

        component: () => import("@/views/ViewGo.vue")
    },
    {
        path: '/compra-venta',

        name: 'Compraventa',

        component: () => import("@/views/compraventa/ViewIndex.vue")
    },
    {
        path: '/primera-matricula',

        name: 'Primeramatricula',

        component: () => import("@/views/primeramatricula/ViewIndex.vue")
    }
]

export {
    motocityRoutes
}