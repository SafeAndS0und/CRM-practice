import axiosInstance from "../assets/js/axiosInstance";
import store from "../store";


export default {
    state: {
        firstname: '',
        surname: '',
        isAdmin: '',
        token: ''
    },
    getters: {
        authenticated: state => !!state.token,
        isAdmin: (state, getters) =>{
            return getters.authenticated ? !!state.isAdmin : false
        }
    },
    mutations: {
        clearUserData(state){
            state.firstname = ''
            state.surname = ''
            state.isAdmin = ''
            state.token = ''
        },

        fillUserData(state, payload){
            state.firstname = payload.firstname
            state.surname = payload.surname
            state.isAdmin = payload.isAdmin
            state.token = payload.token

            localStorage.setItem('token', payload.token)
            localStorage.setItem('firstname', payload.firstname)
            localStorage.setItem('surname', payload.surname)
            localStorage.setItem('isAdmin', payload.isAdmin)

            axiosInstance.defaults.headers.common['Authorization'] = state.token
        }

    },
    actions: {
        clearUserData({commit}){
            commit('clearUserData')
        },

        fillUserData({commit}, payload){
            commit('fillUserData', payload)
        }
    }
}