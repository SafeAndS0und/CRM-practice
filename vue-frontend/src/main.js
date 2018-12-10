import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

//import axios instance and make it available globally trough 'prototype'
import axiosInstance from './assets/js/axiosInstance'

Vue.prototype.axios = axiosInstance

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
