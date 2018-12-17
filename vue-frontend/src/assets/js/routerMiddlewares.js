import store from '../../store'

export default {
    isAdmin(to, from, next){
        if(store.getters.isAdmin){
            next()
        } else{
            next('/')
        }
    },

    isntLogged(to, from, next){
        if(!store.getters.authenticated){
            next()
        } else{
            next('/')
        }
    },

}