<template>
    <div class="contacts" style="margin-bottom: 600px">
        <nav>
            <router-link to="/contacts">Lista</router-link>
            <!--<router-link to="/contacts/details/blabla">Szczegóły</router-link>-->
            <router-link to="/contacts">Edycja</router-link>
            <router-link to="/contacts">Dodaj</router-link>
        </nav>

        <div class="content" :style="{gridColumn: gridWidth }">
            <router-view v-if="$route.path !== '/contacts'"/>

            <div class="list-container">

                <List v-for="contact in contacts"
                      :contact="contact"
                      v-if="$route.path === '/contacts'"
                      class="list"
                />

            </div>

        </div>
    </div>
</template>

<script>
    import List from '../../components/modules/List.vue'

    export default {
        name: "Contacts",
        components: {
            List
        },
        data(){
            return {
                contacts: []
            }
        },
        computed: {
           gridWidth(){
               return this.$route.path === '/contacts' ? "2/11" : "2/12"
           }
        },
        created(){
            this.axios.get('/contact/list')
                .then(res => this.contacts = res.data.contacts)
                .catch(err => console.log(err.response))
        }

    }
</script>

<style scoped lang="scss">

    .contacts {
        margin-top: 140px;
        display: grid;
        grid-template-columns: repeat(12, 1fr);

        nav {
            grid-column: 1/-1;
            justify-self: center;
            align-self: center;
            height: 50px;
            margin-bottom: 30px;

            a {
                line-height: 50px;
                font-size: 16px;
                text-decoration: none;
                text-align: center;
                color: white;
                padding: 15px 40px;
                margin: auto;
                background-color: #323033;

                &:hover {
                    background-color: #3a383b;
                }
            }
        }

        .content {

            .list-container {

                .icons {
                    margin: 5px;
                    display: grid;

                    .icon {
                        grid-row: 1;
                        margin: 0;
                        transition: 100ms;
                        padding: 12px;
                        cursor: pointer;

                        &:first-child {
                            justify-self: end;
                            color: #3db132;
                        }
                        &:last-child {
                            justify-self: start;
                            color: #a50f18;
                        }

                        &:hover {
                            border-radius: 50%;
                            background-color: #ebebeb;
                        }
                    }
                }

                .list {
                    margin-bottom: 5px;

                }
            }
        }
    }

</style>