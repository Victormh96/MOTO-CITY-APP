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
        path: '/compra-venta/create',
        name: 'CompraventaCreate',
        component: () => import("@/views/compraventa/ViewCreate.vue")
    }
]

export {
    motocityRoutes
}