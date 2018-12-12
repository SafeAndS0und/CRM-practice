<template>
    <div class="register">

        <section class="register-form">
            <CustomInput placeholder="Nazwa Użytkownika" class="form-item" v-model="username"/>
            <CustomInput placeholder="Hasło" type="password" class="form-item" v-model="password"/>
            <CustomInput placeholder="Imię" class="form-item" v-model="firstname"/>
            <CustomInput placeholder="Nazwisko" class="form-item" v-model="surname"/>
            <label for="admin">Uprawnienia administratora</label>
            <input type="checkbox" id="admin"/>

            <button @click="register">Dodaj użytkownika</button>
        </section>
    </div>
</template>

<script>
    import CustomInput from '../.././components/partials/CustomInput.vue'

    export default {
        name: "Register",
        components: {
            CustomInput
        },
        data(){
            return {
                username: '',
                surname: '',
                password: '',
                firstname: '',
                isAdmin: false
            }
        },
        methods: {
            register(){
                console.log(this.$store.state.user.token)
                this.axios({
                        method: 'post',
                        url: 'user/register',
                        data: {
                            username: this.username,
                            password: this.password,
                            firstname: this.firstname,
                            surname: this.surname,
                            isAdmin: true
                        }
                    })
                    .then(res =>{
                        console.log(res)
                    })
                    .catch(err =>{
                        console.log(err.response)
                    })
            }
        }
    }
</script>

<style scoped lang="scss">

    .register {
        display: grid;
        width: 100%;
        height: 100vh;
        justify-items: center;
        align-items: center;

        .register-form {
            input {
                display: block;
                margin: 10px;
                width: 250px;
                height: 22px;
            }
            label {
                padding: 12px;
            }
        }
    }

</style>