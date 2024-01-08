const authenticationRoutes = [
    {
        path: '/',

        name: 'Inicio-Sesion',

        component: () => import("@/views/authentication/login/ViewLogin.vue")
    },
    {
        path: '/usuario',

        name: 'Usuario',

        meta: { requiresAuth: true, requiresRole: ['Administrador'] },

        component: () => import("@/views/authentication/usuario/ViewIndex")
    }
]

export { authenticationRoutes }