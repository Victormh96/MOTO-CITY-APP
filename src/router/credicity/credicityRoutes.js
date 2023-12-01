const credicityRoutes = [
    {
        path: '/go',
        name: 'Go',
        component: () => import("@/views/ViewGo.vue")
    },

    {
        path: '/Formulario',
        name: 'Form',
        component: () => import("@/views/ViewForm.vue")
    }
]

export {
    credicityRoutes
}