<template>
    <div class="contractors">
        <Sorting class="sorting"
                 module-name="contractors"
                 @sort="sort($event)"
                 :sortFields="searchFor"
        />

        <CreatePopUp v-if="showCreatePopUp"
                     name="kontakt"
                     :inputs="['Imię', 'Nazwisko']"
                     @closePopUp="showCreatePopUp = false"/>

        <v-icon name="plus-circle" class="icon-new addNew"
                v-if="$route.path.includes('contractors')"
                @click.native="showCreatePopUp = !showCreatePopUp"
                scale="1.3"/>

        <Search class="search"
                module-name="contractors"
                @search="search($event)"
                :searchFor="searchFor"
                :method="sortMethod"
        />

        <div class="content" :style="{gridColumn: gridWidth }">

            <router-view v-if="!$route.path.includes('contractors')"/>

            <div class="list-container">
                <transition-group name="list">
                    <List v-for="contractor of contractors"
                          :fields="searchFor"
                          :key="contractor._id"
                          :contact="contractor"
                          v-if="$route.path.includes('contractors')"
                          @contactDeleted="deleteFromTable"
                          class="list"
                    />
                </transition-group>
            </div>
        </div>

        <div class="pagination" v-if="$route.path.includes('contractors') && pages > 1">
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
        name: "Contractors",
        components: {
            List, CustomInput, CreatePopUp, Sorting, Search
        },

        data(){
            return {
                contractors: [],
                pages: 1,
                activePage: 1,
                sortMethod: 'd_ct',

                showCreatePopUp: false,

                searchFor: [
                    {eng: 'name', pl: 'Nazwa Kontrahenta'},
                    {eng: 'webpage', pl: 'Strona Internetowa'},
                    {eng: 'basicPhone', pl: 'Telefon'},
                    {eng: 'recordOwner', pl: 'Właściciel rek.'},

                ],
            }
        },
        computed: {
            gridWidth(){
                return this.$route.path.includes('contractors') ? "2/11" : "2/12"
            },
        },

        created(){
            this.axios.get('/contractor/list/1/d_ct')
                .then(res =>{
                    console.log(res.data)
                    this.pages = res.data.numOfPages
                    this.contractors = res.data.contractors
                })
                .catch(err => console.log(err.response))
        },
    }
</script>

<style scoped lang="scss">

    @import '../../assets/css/variables.scss';

    .contractors {
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