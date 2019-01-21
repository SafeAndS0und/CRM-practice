<template>
    <div class="contacts">

        <Sorting class="sorting"
                 @sort="sort($event)"
                 module-name="contacts"
                 :sortFields="sortFields"
        />

        <Search class="search"
                @search="search($event)"
                module-name="contacts"
                :searchFor="searchFor"
                :method="sortMethod"/>

        <CreatePopUp v-if="showCreatePopUp"
                     name="kontakt"
                     moduleName="contact"
                     :inputs="[{pl: 'Imię', eng: 'firstname'}, {pl: 'Nazwisko', eng: 'surname'}]"
                     @closePopUp="showCreatePopUp = false"/>

        <v-icon name="plus-circle" class="icon-new addNew"
                v-if="$route.path === '/contacts'"
                @click.native="showCreatePopUp = !showCreatePopUp"
                scale="1.3"/>

        <div class="content" :style="{gridColumn: gridWidth }">

            <router-view v-if="$route.path !== '/contacts'" class="routerview"/>

            <div class="list-container">
                <transition-group name="list">
                    <List v-for="contact in contacts"
                          :fields="searchFor"
                          :key="contact._id"
                          moduleName="contacts"
                          :moduleObj="contact"
                          v-if="$route.path === '/contacts'"
                          @contactDeleted="deleteFromTable"
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
    import Sorting from '../../components/modules/Sorting.vue'
    import Search from '../../components/modules/Search.vue'
    import {bus} from '../../main'

    export default {
        name: "Contacts",
        components: {
            List, CustomInput, CreatePopUp, Sorting, Search
        },
        data(){
            return {
                contacts: [],
                searchValues: {},

                pages: 1,
                activePage: 1,
                sortMethod: 'd_ct',

                showCreatePopUp: false,

                searchFor: [
                    {eng: 'firstname', pl: 'Imię'},
                    {eng: 'surname', pl: 'Nazwisko'},
                    {eng: 'business', pl: 'Firma'},
                    {eng: 'recordOwner', pl: 'Właściciel rek.'},
                    {eng: 'basicPhone', pl: 'Telefon'},
                    {eng: 'basicEmail', pl: 'Email'},
                ],

                sortFields: [
                    {pl: "Imieniu", short: 'fn'},
                    {pl: "Nazwisku", short: 'sn'},
                    {pl: "Firmie", short: 'b'},
                    {pl: "Właśc. rek.", short: 'ro'},
                    {pl: "Czasie dod.", short: 'ct'},
                ]
            }
        },
        computed: {
            gridWidth(){
                return this.$route.path === '/contacts' ? "2/11" : "2/12"
            },
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

            deleteFromTable(id){
                this.contacts.find((item, index) =>{
                    if(item)
                        if(item._id === id){
                            this.contacts.splice(index, 1)
                        }
                })
            },

            sort(payload){
                this.activePage = payload.activePage
                this.sortMethod = payload.sortMethod
                this.contacts = payload.moduleData

                bus.$emit('clearSearchValues')
            },

            changePage(page){
                this.activePage = page
                this.axios.get(`/contact/list/${page}/${this.sortMethod}`)
                    .then(res =>{
                        this.contacts = res.data.contacts
                    })
                    .catch(err => console.log(err.response))
            },

            search(payload){
                this.sortMethod = payload.sortMethod
                this.pages = 1 //disable pagination for filtering search
                this.contacts = payload.moduleData
            }
        }

    }
</script>

<style scoped lang="scss">

    @import '../../assets/css/variables.scss';

    .contacts {
        margin-top: 140px;
        display: grid;
        grid-template-columns: repeat(12, 1fr);

        .sorting {
            grid-row: 2;
            grid-column: 2/11;
        }

        .search {
            grid-row: 3;
            grid-column: 2/11;
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

    @media (max-width: $tablet) {
        .contacts {
            .sorting {
                grid-column: 2/12;
            }

            .content {
                grid-column: 1/13;

            }
        }
    }

    /* TRANSITIONS */

    .list-item {
        display: inline-block;

    }

    .list-enter-active, .list-leave-active {
        transition: 150ms;
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