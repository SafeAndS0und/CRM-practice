import store from "../../store";
import axios from "./axiosInstance"


export default function(){
    // If there was a logged user
    if(localStorage.getItem('token')){

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

        // Check if the token is still valid
        console.log(localStorage.getItem('token'))
        axios.post('user/checkToken')
            .then(res => {
                console.log("res" ,res)
                // If so, add him to vuex
                // localStorage saves boolean as String so we need to parse it
                const isAdmin = localStorage.getItem('isAdmin') === 'true'
                const userData = {
                    firstname: localStorage.getItem('firstname'),
                    surname: localStorage.getItem('surname'),
                    isAdmin: isAdmin,
                    token: localStorage.getItem('token'),
                }
                store.dispatch('fillUserData', userData)
            })
            .catch(err => console.log(err.response))

    } else{

    }
}