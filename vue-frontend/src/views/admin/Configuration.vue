<template>
    <div class="configuration">
        <h2>Lista Użytkowników CRM</h2>

        <section class="users">

            <article v-for="(user, index) of users">
                <div>
                    <h3>Nazwa użytkownika</h3>
                    <p>{{user.username}}</p>
                </div>
                <div>
                    <h3>Imię</h3>
                    <p>{{user.firstname}}</p>
                </div>
                <div>
                    <h3>Nazwisko</h3>
                    <p>{{user.surname}}</p>
                </div>
                <div>
                    <h3>Rola Administratora</h3>
                    <p>{{user.isAdmin ? 'tak' : 'nie'}}</p>
                </div>

                <v-icon name="trash" class="icon" @click.native="remove(user._id)"/>
                <v-icon name="pencil-alt" @click.native="toggleEditing(index)" class="icon"/>


                <section class="popup" v-if="editing[index]">
                    <p>Imię</p>
                    <CustomInput v-model="user['firstname']"/>
                    <p>Nazwisko</p>
                    <CustomInput v-model="user['surname']"/>
                    <p>Hasło</p>
                    <CustomInput type='password' v-model="user['password']"/>
                    <p>Email</p>
                    <CustomInput v-model="user['email']"/>
                    <p>Nr telefonu</p>
                    <CustomInput v-model="user['phone']"/>

                    <button @click='edit(user._id)' class="add">Potwierdź</button>
                </section>
            </article>


        </section>
    </div>
</template>

<script>
    import CustomInput from '../../components/partials/CustomInput.vue'

    export default {
        name: "Configuration",
        components: {
            CustomInput
        },
        data(){
            return {
                users: [],
                editing: {},
            }
        },
        created(){
            this.axios.get('/user/users')
                .then(res =>{
                    this.users = res.data.usersList

                    //initalize editing object so it will be reactive
                    Object.keys(this.users).forEach((user, index) =>{
                        this.$set(this.editing, index, false)
                    })

                })
                .catch(err => console.log(err))
        },
        methods: {
            remove(id){
                this.axios.delete('/user/' + id)
                    .then(res =>{
                        this.axios.get('/user/users')
                            .then(res => this.users = res.data.usersList)
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            },
            toggleEditing(index){
                this.editing[index] = !this.editing[index]
                console.log(this.editing)
            },
            edit(id){
                const user = Object.values(this.users).filter(user => user._id === id)
                this.axios.put('/user/' + id, user[0])
                    .then(res =>{
                        Object.keys(this.editing).forEach(bool => this.editing[bool] = false)
                        this.axios.get('/user/users')
                            .then(res => this.users = res.data.usersList)
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err.response))
            }
        }
    }
</script>

<style scoped lang="scss">
    .configuration {
        margin-top: 120px;
        padding: 10px;
        display: grid;
        justify-items: center;

        h2 {
            font-size: 18px;
            font-weight: normal;
        }

        .users {
            padding: 10px;
            width: 80%;

            article {
                margin: 20px auto;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
                grid-gap: 10px;

                div {
                    padding: 3px 6px;

                    h3 {
                        color: #424242;
                        font-weight: normal;
                        padding-bottom: 2px;
                        font-size: 16px;
                    }

                    p {
                        color: #6e6e6e;
                        font-size: 14px;
                    }
                }

                .icon {
                    display: block;
                    margin: auto;
                    color: white;
                    width: 100%;
                    height: 60%;
                    padding: 6px 0;
                    cursor: pointer;

                    background-color: #950000;

                    &:last-child {
                        background-color: #346fff;
                    }
                }

                .popup{
                    position: fixed;
                    top: 120px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: grid;
                    padding: 20px 60px;
                    z-index: 10;
                    background-color: #1e1a1d;


                    p{
                        color: #706d71;
                        padding: 6px;
                        font-size: 15px;
                    }

                    .add{
                        border: none;
                        width: 100%;
                        padding: 12px 0;
                        background-color: #2059a7;
                        color: white;
                        margin: 20px auto;
                        cursor: pointer;
                    }
                }

            }
        }
    }

</style>