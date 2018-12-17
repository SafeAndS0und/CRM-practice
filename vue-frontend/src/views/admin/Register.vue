<template>
    <div class="register">

        <section class="register-form">
            <h3 class="form-title">Dodaj nowego użytkownika</h3>
            <CustomInput placeholder="Nazwa Użytkownika" class="form-item" v-model="username"/>
            <CustomInput placeholder="Hasło" type="password" class="form-item" v-model="password"/>
            <CustomInput placeholder="Imię" class="form-item" v-model="firstname"/>
            <CustomInput placeholder="Nazwisko" class="form-item" v-model="surname"/>
            <p>Uprawnienia Administratora</p>
            <input type="checkbox" title="admin" id="admin" v-model="isAdmin"/>

            <v-icon name="arrow-circle-right" scale="1.8" class="register" @click.native="register"/>

            <p class="msg"><span v-html="msg"></span></p>

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
                isAdmin: false,
                msg: ''
            }
        },
        methods: {
            register(){
                this.msg = ''
                this.axios({
                        method: 'post',
                        url: 'user/register',
                        data: {
                            username: this.username,
                            password: this.password,
                            firstname: this.firstname,
                            surname: this.surname,
                            isAdmin: this.isAdmin
                        }
                    })
                    .then(res =>{
                        this.msg = res.data.msg
                    })
                    .catch(err =>{
                        err.response.data.errors.forEach((err, index) => {
                            this.msg += `${++index}.  ${ err}  <br/>`
                        })
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
            .form-title{
                font-weight: lighter;
                text-align: center;
                font-size: 18px;
            }

            input {
                display: block;
                margin: 10px;
                width: 220px;
                height: 22px;

            }
            #admin{
                display: inline;
                width:22px;
            }
            p {
                display: inline-block;
                padding: 14px 16px;
                font-size: 14px;
            }

            .register {
                color: #2c5bc5;
                cursor: pointer;
                width: 90%;
                padding: 10px 0;
                display: block;
                margin: auto;
                transition: 250ms;
                height: 40px;

                &:hover {
                    background-color: #3274f3;
                    color: white;
                }

                &:active {
                    transform: translateX(18px);
                }
            }

            .msg{
                max-width: 215px;
                word-break: break-word;
                font-size: 14px;
                height: 40px;
                padding: 10px 12px;
            }
        }
    }

</style>