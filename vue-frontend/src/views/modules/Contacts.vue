<template>
    <div class="contacts">
        <div class="sorting" v-if="$route.path === '/contacts'">
            <h2 class="sorting-title">Sortowanie po: </h2>
            <section>
                <div class="icon-container">
                    <p>Imieniu</p>
                    <v-icon name="chevron-up" scale="1.2" class="icon"
                            :class="{active: sortMethod === 'a_fn'}"
                            @click.native="sortTable('a_fn')"/>
                    <v-icon name="chevron-down" scale="1.2" class="icon"
                            :class="{active: sortMethod === 'd_fn'}"
                            @click.native="sortTable('d_fn')"/>
                </div>

                <div class="icon-container">
                    <p>Nazwisku</p>
                    <v-icon name="chevron-up" scale="1.2" class="icon"
                            :class="{active: sortMethod === 'a_sn'}"
                            @click.native="sortTable('a_sn')"/>
                    <v-icon name="chevron-down" scale="1.2" class="icon"
                            :class="{active: sortMethod === 'd_sn'}"
                            @click.native="sortTable('d_sn')"/>
                </div>

                <div class="icon-container">
                    <p>Firmie</p>
                    <v-icon name="chevron-up" scale="1.2" class="icon"
                            :class="{active: sortMethod === 'a_b'}"
                            @click.native="sortTable('a_b')"/>
                    <v-icon name="chevron-down" scale="1.2" class="icon"
                            :class="{active: sortMethod === 'd_b'}"
                            @click.native="sortTable('d_b')"/>
                </div>

                <div class="icon-container">
                    <p>Właść. rek.</p>
                    <v-icon name="chevron-up" scale="1.2" class="icon"
                            :class="{active: sortMethod === 'a_ro'}"
                            @click.native="sortTable('a_ro')"/>
                    <v-icon name="chevron-down" scale="1.2" class="icon"
                            :class="{active: sortMethod === 'd_ro'}"
                            @click.native="sortTable('d_ro')"/>
                </div>

                <div class="icon-container">
                    <p>Czasie dod.</p>
                    <v-icon name="chevron-up" scale="1.2" class="icon"
                            :class="{active: sortMethod === 'a_ct'}"
                            @click.native="sortTable('a_ct')"/>
                    <v-icon name="chevron-down" scale="1.2" class="icon"
                            :class="{active: sortMethod === 'd_ct'}"
                            @click.native="sortTable('d_ct')"/>
                </div>

            </section>
        </div>

        <v-icon name="arrow-left" class="back" scale="1.8"
                v-if="$route.path !== '/contacts'"
                @click.native="$router.push('/contacts')"
        />

        <div class="search" v-if="$route.path === '/contacts'">
            <CustomInput placeholder="Imię" @keyup.native="search"
                         v-model="searchValues['firstname']"></CustomInput>
            <CustomInput placeholder="Nazwisko" @keyup.native="search"
                         v-model="searchValues['surname']"></CustomInput>
            <CustomInput placeholder="Firma" @keyup.native="search"
                         v-model="searchValues['business']"></CustomInput>
            <CustomInput placeholder="Właściciel" @keyup.native="search"
                         v-model="searchValues['recordOwner']"></CustomInput>
            <CustomInput placeholder="Telefon" @keyup.native="search"
                         v-model="searchValues['basicPhone']"></CustomInput>
            <CustomInput placeholder="Email" @keyup.native="search"
                         v-model="searchValues['basicEmail']"></CustomInput>
        </div>

        <CreatePopUp v-if="showCreatePopUp"
                     name="kontakt"
                     :inputs="['Imię', 'Nazwisko']"
                     @closePopUp="showCreatePopUp = false"/>

        <v-icon name="plus-circle" class="icon-new addNew"
                v-if="$route.path === '/contacts'"
                @click.native="showCreatePopUp = !showCreatePopUp"
                scale="1.3"/>

        <div class="content" :style="{gridColumn: gridWidth }">

            <router-view v-if="$route.path !== '/contacts'"/>

            <div class="list-container">
                <transition-group name="list">
                    <List v-for="contact in contacts"
                          :key="contact._id"
                          :contact="contact"
                          v-if="$route.path === '/contacts'"
                          @contactDeleted="filterTable"
                          class="list"
                    />
                </transition-group>
            </div>
        </div>

        <div class="pagination" v-if="$route.path === '/contacts' && pages > 1">
            <p v-for="(page, index) of pages" :class="{active: index + 1 === activePage}" @click="changePage(index)">
                {{++index}}</p>
        </div>
    </div>
</template>

<script>
    import List from '../../components/modules/List.vue'
    import CustomInput from '../../components/partials/CustomInput.vue'
    import CreatePopUp from '../../components/modules/CreatePopUp.vue'

    export default {
        name: "Contacts",
        components: {
            List, CustomInput, CreatePopUp
        },
        data(){
            return {
                contacts: [],
                searchValues: {},
                pages: '',
                activePage: 1,
                sortMethod: 'd_ct',
                showCreatePopUp: false
            }
        },
        computed: {
            gridWidth(){
                return this.$route.path === '/contacts' ? "2/11" : "2/12"
            }
        },
        created(){
            this.axios.get('/contact/list/1/d_ct')
                .then(res =>{
                    this.pages = res.data.numOfPages
                    this.contacts = res.data.contacts
                })
                .catch(err => console.log(err.response))
        },
        methods: {
            filterTable(id){
                this.contacts.find((item, index) =>{
                    if(item)
                        if(item._id === id){
                            this.contacts.splice(index, 1)
                        }
                })
            },
            sortTable(method){
                this.axios.get('/contact/list/1/' + method)
                    .then(res =>{
                        this.sortMethod = method //
                        this.contacts = res.data.contacts
                    })
                    .catch(err => console.log(err.response))
            },
            changePage(page){
                this.activePage = page
                this.axios.get(`/contact/list/${page}/${this.sortMethod}`)
                    .then(res =>{
                        this.contacts = res.data.contacts
                    })
                    .catch(err => console.log(err.response))
            },
            search(){

            }
        }

    }
</script>

<style scoped lang="scss">

    .contacts {
        margin-top: 140px;
        display: grid;
        grid-template-columns: repeat(12, 1fr);

        .back {
            grid-column: 1/2;
            grid-row: 4;
            margin-right: 15px;
            color: #272528;
            padding: 15px;
            justify-self: end;
            cursor: pointer;
            transition: 250ms;

            &:hover {
                background-color: #d04f50;
                color: white;
            }

        }

        nav {
            grid-column: 1/-1;
            height: 60px;
            padding: 0;
            margin-bottom: 30px;
            background-color: #373332;
            display: grid;
            grid-template-columns: 1fr 1fr;

            a {
                align-self: center;
                justify-self: center;

                grid-row: 1;
                width: 100%;
                height: 100%;

                font-size: 16px;
                text-decoration: none;
                text-align: center;
                color: white;
                line-height: 60px;
                background-color: #282523;

                &:hover {
                    background-color: #264f9b;
                    color: white;
                }
            }
        }

        .sorting {
            grid-row: 2;
            grid-column: 2/11;
            background-color: #272528;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 40px;
            color: #cacaca;

            .sorting-title {
                text-align: center;
                margin-left: 20px;
                font-weight: normal;
                padding: 0 0 6px 0;
                font-size: 16px;
            }

            section {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
                grid-gap: 10px;

                .icon-container {
                    display: grid;
                    background-color: #312f32;
                    grid-template-columns: 1fr 0.4fr 0.4fr;

                    p {
                        font-size: 12px;
                        text-align: center;
                        padding: 7px 0;
                    }
                    .icon {
                        height: 100%;
                        width: 65%;
                        justify-self: end;
                        align-self: center;
                        cursor: pointer;
                        color: #7b7b7b;
                        transition: 150ms;
                        padding: 0 8px;

                        &:hover {
                            background-color: #93393d;
                            color: white;
                        }
                    }

                    .active {
                        background-color: #93393d;
                        color: white;
                    }
                }
            }
        }

        .search {
            grid-row: 3;
            display: grid;
            grid-column: 2/11;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            grid-column-gap: 12px;
            grid-row-gap: 6px;
            padding: 10px 0 10px 10px;

            input {
                background-color: #323032;
            }
        }

        .addNew {
            grid-row: 3;
            grid-column: 11/12;
            justify-self: end;
            align-self: center;
            cursor: pointer;
        }
        .icon-new {
            border-radius: 15px;
            color: white;
            background-color: #2f353e;
            padding: 10px 12px;
            transition: 200ms;

            &:hover {
                background-color: #2b75e4;
                padding: 10px 33px;
                border-radius: 0;
            }
        }

        .content {
            grid-row: 4;

            .list {
                margin-bottom: 5px;
            }
        }

        .pagination {
            margin: 25px 4px;
            display: grid;
            grid-row: 5;
            grid-column: 2/11;
            grid-gap: 10px;
            grid-template-columns: repeat(auto-fill, 30px);
            grid-template-rows: 30px;

            p {
                color: #5e5c5f;
                background-color: #e4e1e6;
                border: 1px solid #d5d2d7;
                text-align: center;
                line-height: 30px;
                transition: 150ms;
                cursor: pointer;

                &:hover {
                    background-color: #d5d2d7;
                }

                &.active {
                    background-color: #ec5a5b;
                    color: white;
                }
            }
        }
    }

    /* TRANSITIONS */

    .list-item {
        display: inline-block;

    }

    .list-enter-active, .list-leave-active {
        transition: 400ms;
    }

    .list-enter {
        filter: blur(5px);
        opacity: 0.5;
    }

    .list-leave-to {
        filter: blur(6px);
        opacity: 0.5;
    }

</style>