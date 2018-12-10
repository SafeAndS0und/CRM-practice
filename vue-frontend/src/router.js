import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,

    routes: [

        {
            name: 'home',
            path: '/',
            component: () => import('./views/Home.vue')
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('./views/Login.vue')
        }

    ]
})
