import Vue from 'vue'
import Vuex from 'vuex'

import user from './store_modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        user: user
    },
    state: {},
    mutations: {},
    actions: {}
})
