import store from "../../store";

export default function(){
    // If there was a logged user
    if(localStorage.getItem('token')){

        // Check if the token is still valid

        // If so, add him to vuex
        // localStorage saves boolean as String so we need to check it one more time
        const isAdmin = localStorage.getItem('isAdmin') === 'true'
        const userData = {
            firstname: localStorage.getItem('firstname'),
            surname: localStorage.getItem('surname'),
            isAdmin: isAdmin,
            token: localStorage.getItem('token'),
        }
        store.dispatch('fillUserData', userData)



    } else{

    }

    console.log(store.getters.authenticated)
    console.log(store.getters.isAdmin)
}