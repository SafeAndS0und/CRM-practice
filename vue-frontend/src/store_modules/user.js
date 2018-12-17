import axiosInstance from "../assets/js/axiosInstance";
import store from "../store";

//TODO: Make getters: one for if the user is logged in, and the other one if it's an admin
export default {
    state: {
        firstname: '',
        surname: '',
        isAdmin: '',
        token: ''
    },
    getters: {
        authenticated: state =>{
            return localStorage.getItem('token') ? !!state.token : false
        },
        isAdmin: (state, getters) =>{
            return getters.authenticated ? !!state.isAdmin : false
        }
    },
    mutations: {
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

        //TODO: Add a localstorage data keeping
    },
    actions: {
        fillUserData({commit}, payload){
            commit('fillUserData', payload)
        }
    }
}