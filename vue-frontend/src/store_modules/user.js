export default {
    state: {
        firstname: '',
        surname: '',
        isAdmin: '',
    },
    mutations: {
        fillUserData(state, payload){
            state.firstname = payload.firstname
            state.surname = payload.surname
            state.isAdmin = payload.isAdmin
        }

        //TODO: Add a localstorage data keeping
    },
    actions: {
        fillUserData({commit}, payload){
            commit('fillUserData', payload)
        }
    }
}