export default {
    state: {
        firstname: '',
        surname: '',
        isAdmin: '',
        token: ''
    },
    mutations: {
        fillUserData(state, payload){
            state.firstname = payload.firstname
            state.surname = payload.surname
            state.isAdmin = payload.isAdmin
            state.token = payload.token
        }

        //TODO: Add a localstorage data keeping
    },
    actions: {
        fillUserData({commit}, payload){
            commit('fillUserData', payload)
        }
    }
}