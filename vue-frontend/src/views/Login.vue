<template>
    <div>
        <router-link to="/">Strona główna</router-link>
        <br/>

        <input type="text" placeholder="Nazwa użytkownika" v-model="username">
        <input type="text" placeholder="Hasło" v-model="password">
        <button class="login" @click="login">Zaloguj</button>
        <p>{{msg}}</p>

    </div>
</template>

<script>
    // import CustomInput from './partials/CustomInput.vue'
    import {url} from '../.././config/constants'


    export default {
        name: "Login",
        components:{
            // CustomInput
        },
        data(){
            return {
                username: '',
                password: '',
                msg: ''
            }
        },
        methods: {
            login(){
                this.axios.post('user/login', {
                    username: this.username,
                    password: this.password
                })
                    .then(res => this.msg = res.data.msg)
                    .catch(err => this.msg = err.response.data.msg)
            }
        }
    }
</script>

<style scoped>

</style>