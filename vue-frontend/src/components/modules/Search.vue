<template>
    <div class="search" v-if="$route.path === '/' +  moduleName">
        <CustomInput v-for="val of searchFor"
                     :placeholder="val.pl"
                     @keyup.native="search"
                     v-model="searchValues[val.eng]"/>
    </div>
</template>

<script>
    import CustomInput from '../partials/CustomInput.vue'
    import {bus} from '../../main'

    export default {
        name: "Search",
        props: ['searchFor', 'method', 'moduleName'],
        data(){
            return {
                searchValues: {}
            }
        },
        components: {
            CustomInput
        },
        computed: {
            isUsingFilters(){
                return Object.values(this.searchValues).filter(value => value !== "" && value !== undefined).length > 0
            },
            shortenedModuleName(){
                // e.g contacts => contact
                return this.moduleName.substring(0, this.moduleName.length - 1)
            },
        },
        created(){
            bus.$on('clearSearchValues', this.clearSearchValues)
        },
        methods: {
            search(){
                const filledInputs = []
                // Keep in the array only the filled inputs
                Object.keys(this.searchValues).forEach(key =>{
                    if(this.searchValues[key]){
                        filledInputs.push({[key]: this.searchValues[key]})
                    }
                })

                let str = ''
                filledInputs.forEach(input =>{
                    str += `&${Object.keys(input)[0]}=${Object.values(input)[0]}`
                })

                console.log(this.shortenedModuleName, this.method, str)
                this.axios.get(`/search/${this.shortenedModuleName}?sortBy=${this.method}${str}`)
                    .then(res =>{
                        console.log(res)
                        this.$emit('isUsingFilters', this.isUsingFilters)
                        this.$emit('search', {
                            sortMethod: this.method,
                            page: 1,
                            moduleData: res.data.result
                        })
                    })
                    .catch(err => console.log(err))
            },
            clearSearchValues(){
                this.searchValues = {}
            }
        }
    }
</script>

<style scoped lang="scss">

    .search {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        grid-column-gap: 12px;
        grid-row-gap: 6px;
        padding: 10px 0 10px 10px;

        input {
            background-color: #323032;
        }
    }

</style>