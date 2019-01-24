import Vue from 'vue'
import Router from 'vue-router'
import middlewares from './assets/js/routerMiddlewares'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,

    routes: [
        {
          path: "*",
          redirect: '/'
        },

        {
            name: 'home',
            path: '/',
            component: () => import('./views/Home.vue')
        },

        {
            name: 'login',
            path: '/login',
            component: () => import('./views/Login.vue'),
            meta: {layout: 'none'},
            beforeEnter: middlewares.isntLogged
        },

        {
            name: 'register',
            path: '/admin/register',
            component: () => import('./views/admin/Register.vue'),
            beforeEnter: middlewares.isAdmin
        },

        {
            name: 'contacts',
            path: '/contacts',
            component: () => import('./views/modules/Contacts.vue'),
            beforeEnter: middlewares.isLogged,
            children: [
                {
                    path: "details/:id",
                    component: () => import('./components/modules/BlockList.vue')
                },
                {
                    path: "update/:id",
                    component: () => import('./components/modules/Form.vue')
                },

            ]
        },

        {
            name: 'contractors',
            path: '/contractors',
            component: () => import('./views/modules/Contractors.vue'),
            beforeEnter: middlewares.isLogged,
            children: [
                {
                    path: "details/:id",
                    component: () => import('./components/modules/BlockList.vue')
                },
                {
                    path: "update/:id",
                    component: () => import('./components/modules/Form.vue')
                },

            ]
        },

        {
            name: 'invoices',
            path: '/invoices',
            component: () => import('./views/modules/Invoices.vue'),
            beforeEnter: middlewares.isLogged,
            children: [
                {
                    path: "details/:id",
                    component: () => import('./components/modules/BlockList.vue')
                },
                {
                    path: "update/:id",
                    component: () => import('./components/modules/Form.vue')
                },

            ]
        }

    ]
})
