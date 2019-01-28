<template>
    <div class="profile">
        <div>
            <h3>Nazwa użytkownika</h3>
            <p>{{userData['username']}}</p>
        </div>
        <div>
            <h3>Imię</h3>
            <p v-if="!editing">{{userData['firstname']}}</p>
            <CustomInput v-model="userData['firstname']" v-if="editing"/>
        </div>
        <div>
            <h3>Nazwisko</h3>
            <p v-if="!editing">{{userData['surname']}}</p>
            <CustomInput v-model="userData['surname']"  v-if="editing"/>
        </div>
        <div>
            <h3>Hasło</h3>
            <p v-if="!editing">**********</p>
            <CustomInput  type=password v-model="userData['password']" v-if="editing"/>
        </div>
        <div>
            <h3>Email</h3>
            <p v-if="!editing">{{userData['email']}}</p>
            <CustomInput v-model="userData['email']"  v-if="editing"/>
        </div>
        <div>
            <h3>Numer Telefonu</h3>
            <p v-if="!editing">{{userData['phone']}}</p>
            <CustomInput v-model="userData['phone']" v-if="editing"/>
        </div>
        <div>
            <h3>Data Urodzenia</h3>
            <p v-if="!editing">{{userData['birth']}}</p>
            <CustomInput v-model="userData['birth']" v-if="editing"/>
        </div>
        <div>
            <h3>Rola admina</h3>
            <p>{{userData['isAdmin']}}</p>
        </div>

        <p class="save" @click="save" v-if="editing">Zapisz</p>
        <p class="edit" @click="editing = !editing">Edycja</p>

    </div>
</template>

<script>
    import CustomInput from '../components/partials/CustomInput.vue'

    export default {
        name: "Profile",
        components: {
            CustomInput
        },
        data(){
            return{
                editing: false,
                userData: {}
            }
        },
        created(){
            this.axios.get('/user')
                .then(res => {
                    this.userData = res.data.userData
                })
                .catch(err => console.log(err))
        },
        methods: {
            save(){
                this.axios.put('/user', this.userData)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                this.editing = false
            }
        }
    }
</script>

<style scoped lang="scss">
    .profile{
        padding-top: 120px;
        height: 100vh;
        display: grid;
        justify-items: center;
        grid-template-rows: repeat(auto-fill, 60px);
        background-color: #f1f1f1;

        div {
            margin: auto;
            padding: 10px;
            width: 150px;

            h3{
                font-weight: normal;
                font-size: 16px;
                padding-bottom: 5px;
                color: #555555;
            }
            p{
                font-size: 14px;
                color: #737373;
                padding-bottom: 2px;
                border-bottom: 1px solid #d7d7d7;

            }

            input{
                background-color: #d7d7d7;
                height: 11px;
                color: #272528;

                &::placeholder{
                    color: #5f5b60;
                }
            }
        }

        .save{
            margin: 5px;
            font-size: 15px;
            padding: 10px 20px;
            cursor: pointer;
            color: #4ba82f;

            &:hover{
                color: #367027;
            }
        }

        .edit{
            padding: 15px 0;
            font-size: 15px;
            color: #3882ff;
            cursor: pointer;

            &:hover{
                text-decoration: underline;
                color: #326ad5;
            }
        }

    }

</style>