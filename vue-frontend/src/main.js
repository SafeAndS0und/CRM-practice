import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// font awesome
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'


// layouts
import def from  './layouts/default.vue'
import empty from  './layouts/Empty.vue'


// import axios instance and make it available globally trough 'prototype'
import axiosInstance from './assets/js/axiosInstance'

// Registering layouts globally
Vue.component('default-layout', def)
Vue.component('empty-layout', empty)

//Registering v-icon

Vue.component('v-icon', Icon)

// use a gesture plugin
const VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})

Vue.prototype.axios = axiosInstance

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
