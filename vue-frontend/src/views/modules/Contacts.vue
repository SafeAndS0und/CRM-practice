<template>
    <div class="contacts">
        <nav>
            <router-link to="/contacts">Lista</router-link>
            <!--<router-link to="/contacts/details/blabla">Szczegóły</router-link>-->
            <router-link to="/contacts/new">Dodaj Nowy</router-link>
            <router-link to="/contacts">Komentarze</router-link>
        </nav>

        <div class="sorting" v-if="$route.path === '/contacts'">
            <h2 class="sorting-title">Sortowanie po: </h2>
            <section>
                <div class="icon-container">
                    <p>Imieniu</p>
                    <v-icon name="sort-alpha-up" scale="1.2" class="icon" @click.native="sortTable('a_fn')"/>
                    <v-icon name="sort-alpha-down" scale="1.2" class="icon" @click.native="sortTable('d_fn')"/>
                </div>

                <div class="icon-container">
                    <p>Nazwisku</p>
                    <v-icon name="sort-alpha-up" scale="1.2" class="icon" @click.native="sortTable('a_sn')"/>
                    <v-icon name="sort-alpha-down" scale="1.2" class="icon" @click.native="sortTable('d_sn')"/>
                </div>

                <div class="icon-container">
                    <p>Firmie</p>
                    <v-icon name="sort-alpha-up" scale="1.2" class="icon" @click.native="sortTable('a_b')"/>
                    <v-icon name="sort-alpha-down" scale="1.2" class="icon" @click.native="sortTable('d_b')"/>
                </div>

                <div class="icon-container">
                    <p>Właść. rek.</p>
                    <v-icon name="sort-alpha-up" scale="1.2" class="icon" @click.native="sortTable('a_ro')"/>
                    <v-icon name="sort-alpha-down" scale="1.2" class="icon" @click.native="sortTable('d_ro')"/>
                </div>

                <div class="icon-container">
                    <p>Telefonie</p>
                    <v-icon name="sort-numeric-up" scale="1.2" class="icon" @click.native="sortTable('a_n')"/>
                    <v-icon name="sort-numeric-down" scale="1.2" class="icon" @click.native="sortTable('d_n')"/>
                </div>

                <div class="icon-container">
                    <p>Emailu</p>
                    <v-icon name="sort-alpha-up" scale="1.2" class="icon"/>
                    <v-icon name="sort-alpha-down" scale="1.2" class="icon"/>
                </div>
            </section>
        </div>

        <div class="content" :style="{gridColumn: gridWidth }">

            <router-view v-if="$route.path !== '/contacts'"/>

            <div class="list-container">
                <List v-for="contact in contacts"
                      :contact="contact"
                      v-if="$route.path === '/contacts'"
                      @contactDeleted="filterTable"
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
            this.axios.get('/contact/list/1/a_fn')
                .then(res => this.contacts = res.data.contacts)
                .catch(err => console.log(err.response))
        },
        methods: {
            filterTable(id){
                this.contacts.find((item, index) =>{
                    if(item._id === id){
                        this.contacts.splice(index, 1)
                    }
                })
            },
            sortTable(method){
                this.axios.get('/contact/list/1/' + method)
                    .then(res =>{
                        this.contacts = res.data.contacts
                    })
                    .catch(err => console.log(err.response))
            }
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

        .sorting {
            grid-row: 2;
            grid-column: 2/11;

            .sorting-title {
                margin-left: 20px;
                font-weight: normal;
                margin-bottom: 15px;
                font-size: 17px;
            }

            section {
                display: grid;

                .icon-container {
                    grid-row: 2;
                    display: grid;

                    p {
                        grid-row: 1;
                        grid-column: 1/3;
                        font-size: 14px;
                        text-align: center;
                    }
                    .icon {
                        grid-row: 2;
                        padding: 12px;
                        align-self: center;
                        cursor: pointer;
                        color: #7b7b7b;
                        transition: 150ms;
                        margin: 6px 0;

                        &:hover {
                            background-color: #dcdcdc;
                        }

                        &:nth-child(2) {
                            justify-self: end;
                        }

                        &:last-child {
                            justify-self: start;
                        }
                    }
                }
            }
        }

        .content {
            grid-row: 3;

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