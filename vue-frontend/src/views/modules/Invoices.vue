<template>
    <div class="invoices">

        <Sorting class="sorting"
                 @sort="sort($event)"
                 module-name="invoices"
                 :sortFields="sortFields"
        />

        <Search class="search"
                @search="search($event)"
                module-name="invoices"
                :searchFor="searchFor"
                :method="sortMethod"/>

        <CreatePopUp v-if="showCreatePopUp"
                     name="Fakturę"
                     moduleName="invoice"
                     :inputs="[{pl: 'Status', eng: 'status'}, {pl: 'Kontrahent', eng: 'contractor'}]"
                     @closePopUp="showCreatePopUp = false"/>

        <v-icon name="plus-circle" class="icon-new addNew"
                v-if="$route.path === '/invoices'"
                @click.native="showCreatePopUp = !showCreatePopUp"
                scale="1.3"/>

        <div class="content" :style="{gridColumn: gridWidth }">

            <router-view v-if="$route.path !== '/invoices'" class="routerview"/>

            <div class="list-container">
                <transition-group name="list">
                    <List v-for="invoice in invoices"
                          :fields="searchFor"
                          :key="invoice._id"
                          moduleName="invoices"
                          :moduleObj="invoice"
                          v-if="$route.path === '/invoices'"
                          @deleted="deleteFromTable"
                          class="list"
                    />
                </transition-group>
            </div>
        </div>


        <div class="pagination" v-if="$route.path === '/invoices' && pages > 1">
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
                invoices: [],
                searchValues: {},

                pages: 1,
                activePage: 1,
                sortMethod: 'd_ct',

                showCreatePopUp: false,

                searchFor: [
                    {eng: 'contractor', pl: 'Kontrahent'},
                    {eng: 'postDate', pl: 'Data Wystawienia'},
                    {eng: 'status', pl: 'Status'},
                    {eng: 'recordOwner', pl: 'Właściciel rek.'},
                    {eng: 'signingPlace', pl: 'Miejsce Wystawienia'},
                ],

                sortFields: [
                    {pl: "Data Wyst.", short: 'postDate'},
                    {pl: "Miejsce Wyst.", short: 'sp'},
                    {pl: "Status", short: 'b'},
                    {pl: "Właśc. rek.", short: 'ro'},
                    {pl: "Czasie dod.", short: 'ct'},
                ]
            }
        },
        computed: {
            gridWidth(){
                return this.$route.path === '/invoices' ? "2/11" : "2/12"
            },
        },
        created(){
            this.axios.get('/invoice/list/1/d_ct')
                .then(res =>{
                    this.pages = res.data.numOfPages
                    this.invoices = res.data.invoices
                })
                .catch(err => console.log(err.response))
        },
        methods: {

            deleteFromTable(id){
                console.log(id)
                this.invoices.find((item, index) =>{
                    if(item)
                        if(item._id === id){
                            this.invoices.splice(index, 1)
                        }
                })
            },

            sort(payload){
                this.activePage = payload.activePage
                this.sortMethod = payload.sortMethod
                this.invoices = payload.moduleData

                bus.$emit('clearSearchValues')
            },

            changePage(page){
                this.activePage = page
                this.axios.get(`/invoice/list/${page}/${this.sortMethod}`)
                    .then(res =>{
                        this.invoices = res.data.invoices
                    })
                    .catch(err => console.log(err.response))
            },

            search(payload){
                this.sortMethod = payload.sortMethod
                this.pages = 1 //disable pagination for filtering search
                this.invoices = payload.moduleData
            }
        }

    }
</script>

<style scoped lang="scss">

    @import '../../assets/css/variables.scss';

    .invoices {
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

    @media screen and (max-width: $tablet) {
        .invoices {
            .sorting {
                grid-column: 1/13;
            }

            .content {
                grid-row: 5;
                grid-column: 1/13 !important;

                .list {
                    margin-bottom: 0;
                }
            }

            .addNew {
                grid-column: 2/12;
                grid-row: 4;
                width: 100%;
            }
            .icon-new {
                background-color: #1e64ca;
                /*box-sizing: border-box;*/
                border-radius: 0;
                color: white;
                padding: 12px 0;
                transition: 200ms;
                margin-bottom: 15px;

                &:hover {
                    padding: 12px 0;
                }
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