<template>
    <div class="sorting" v-if="$route.path=== '/' + moduleName">
        <h2 class="sorting-title">Sortowanie po: </h2>
        <section>
            <div class="icon-container" v-for="field of sortFields">
                <p>{{field.pl}}</p>
                <v-icon name="chevron-up" scale="1.2" class="icon"
                        :class="{active: sortMethod === 'a_' + field.short}"
                        @click.native="sortTable('a_' + field.short)"/>
                <v-icon name="chevron-down" scale="1.2" class="icon"
                        :class="{active: sortMethod === 'd_' + field.short}"
                        @click.native="sortTable('d_' + field.short)"/>
            </div>
        </section>
    </div>
</template>

<script>

    export default {
        name: "Sorting",
        props:['sortFields' ,'moduleName'],
        data(){
            return {
                sortMethod: "d_ct",
            }
        },
        computed: {
            shortenedModuleName(){
                // e.g contacts => contact
                return this.moduleName.substring(0, this.moduleName.length - 1)
            },
        },
        methods: {
            sortTable(method){
                this.sortMethod = method

                // Else, search as usual
                this.axios.get(`/${this.shortenedModuleName}/list/1/` + method)
                    .then(res =>{
                        console.log(res.data[this.moduleName])
                        this.$emit('sort', {
                            activePage: 1,
                            sortMethod: method,
                            moduleData: res.data[this.moduleName]
                        })
                    })
                    .catch(err => console.log(err.response))
            },
        }
    }
</script>

<style scoped lang="scss">

    @import '../../assets/css/variables.scss';

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

    @media screen and (max-width: $tablet) {
        .sorting{
            border-radius: 0;
            padding: 13px;
        }
    }

</style>