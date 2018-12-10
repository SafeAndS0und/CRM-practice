<template>
    <div>
        <router-link to="/">Strona główna</router-link>
        <br/>

        <input type="text" placeholder="Nazwa użytkownika" v-model="username">
        <input type="text" placeholder="Hasło" v-model="password">
        <button class="login" @click="login">Zaloguj</button>

    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login(){
                this.axios.get('')
                    .then(res => {})
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style scoped>

</style>