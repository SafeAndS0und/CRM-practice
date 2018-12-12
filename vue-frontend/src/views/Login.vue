<template>
    <div class="login-page">
        <router-link to="/" class="back">
            <v-icon name="arrow-left" scale="1.5"/>
        </router-link>

        <section class="login-form">
            <h1 class="form-title">Zaloguj się</h1>
            <CustomInput placeholder="Nazwa Użytkownika" class="form-item" v-model="username"/>
            <CustomInput placeholder="Hasło" type="password" class="form-item" v-model="password"/>

            <v-icon name="arrow-circle-right" scale="2.2" :class="{logged: isLogged, error: hasError}" class="login" @click.native="login"/>

            <p class="msg">{{msg}}</p>
        </section>
    </div>
</template>

<script>
    import CustomInput from '.././components/partials/CustomInput.vue'

    export default {
        name: "Login",
        components: {
            CustomInput
        },
        data(){
            return {
                username: '',
                password: '',
                msg: '',
                isLogged: false,
                hasError: false,
            }
        },
        methods: {
            login(){
                this.msg = ''
                this.axios.post('user/login', {
                    username: this.username,
                    password: this.password
                })
                    .then(res => {
                        console.log(res.data)
                        this.hasError = false
                        this.isLogged = true
                        this.msg = res.data.msg

                        this.$store.dispatch('fillUserData', res.data.userData)

                        setTimeout(() => {
                            this.$router.push('/')
                        }, 800)
                    })
                    .catch(err => {
                        console.log(err)
                        err.response.data.errors.forEach(err => {
                            this.hasError = true
                            this.isLogged = false
                            this.msg += err + "\n"
                        })
                    })
            }
        }
    }
</script>

<style scoped lang="scss">

    .login-page {
        display: grid;
        width: 100%;
        height: 100vh;

        justify-items: center;
        align-items: center;

        .back{
            position: fixed;
            padding: 35px 40px;
            color: #a7a7a7;
            transition: 250ms;


            &:hover{
                color: white;
                background-color:  rgba(213, 94, 90, 0.95);
            }
        }

        .login-form {


            .form-title {
                text-align: center;
                font-weight: lighter;
                font-size: 22px;
                letter-spacing: 3px;
                margin-bottom: 16px;
            }

            .form-item {
                display: block;
                margin: 12px;
                width: 250px;
                height: 24px;
            }

            .login{
                color: #2c5bc5;
                cursor: pointer;
                padding: 6px 119px;
                display: block;
                margin: auto;
                transition: 250ms;

                &:hover{
                    background-color: #3274f3;
                    color: white;
                }

                &:active{
                    transform: translateX(18px);
                }
            }

            .msg{
                max-width: 215px;
                word-break: break-word;
                font-size: 15px;
                height: 20px;
                padding: 10px 12px;
            }

            .logged{
                color: white;
                background-color: #66b642;
                transition: 500ms;
                height: 200px;
                &:hover{
                    background-color: #66b642;
                }
                &:active{
                    transform: translateX(0);
                }
            }


            .error{
                color: white;
                background-color: #9c2624;
                &:hover{
                    background-color: #9c2624;
                }
            }
        }
    }


</style>