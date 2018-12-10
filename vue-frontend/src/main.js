import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import def from  './layouts/default.vue'
import empty from  './layouts/Empty.vue'

//import axios instance and make it available globally trough 'prototype'
import axiosInstance from './assets/js/axiosInstance'

//Registering layouts globally
Vue.component('default-layout', def)
Vue.component('empty-layout', empty)

Vue.prototype.axios = axiosInstance

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
