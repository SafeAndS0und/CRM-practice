import store from '../../store'

export default {
    //TODO: Change it on getter depending on localstorage
    isAdmin(to, from, next){
        if(store.state.user.isAdmin){
            next()
        } else{
            next('/')
        }
    },

    isntLogged(to, from, next){
        if(!store.state.user.token){
            next()
        } else{
            next('/')
        }
    },

}