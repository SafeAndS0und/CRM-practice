<template>
    <div class="block-list">

        <div v-if="moduleName === 'contacts' && blockData">

            <Block block-name="Informacje Podstawowe"
                   @quickUpdate="updateData($event)"
                   :blockData="blockData[0]"
                   class="block"/>
            <Block block-name="Informacje Kontaktowe"
                   @quickUpdate="updateData($event)"
                   :blockData="blockData[1]"
                   class="block"/>
            <Block block-name="Informacje Adresowe"
                   @quickUpdate="updateData($event)"
                   :blockData="blockData[2]"
                   class="block"/>
        </div>

        <div v-if="moduleName === 'contractors' && blockData">
            <Block block-name="Informacje Podstawowe"
                   @quickUpdate="updateData($event)"
                   :blockData="blockData[0]"
                   class="block"/>
            <Block block-name="Informacje Kontaktowe"
                   @quickUpdate="updateData($event)"
                   :blockData="blockData[1]"
                   class="block"/>
            <Block block-name="Informacje Rejestrowe"
                   @quickUpdate="updateData($event)"
                   :blockData="blockData[2]"
                   class="block"/>
            <Block block-name="Informacje Adresowe"
                   :blockData="blockData[3]"
                   class="block"/>
            <Block block-name="Informacje Finansowe"
            @quickUpdate="updateData($event)"
            :blockData="blockData[4]"
            class="block"/>
        </div>

        <div v-if="moduleName === 'invoices' && blockData">
            <Block block-name="Informacje Podstawowe"
                   @quickUpdate="updateData($event)"
                   :blockData="blockData[0]"
                   class="block"/>
            <Block block-name="Szczegóły Faktury"
                   @quickUpdate="updateData($event)"
                   :blockData="blockData[1]"
                   class="block"/>
            <Block block-name="Opis i Uwagi"
                   @quickUpdate="updateData($event)"
                   :blockData="blockData[2]"
                   class="block"/>
            <Block block-name="Informacje Adresowe"
                   :blockData="blockData[3]"
                   class="block"/>
        </div>

        <div class="menu">
            <v-icon name="list-ul" class="icon" scale="1.5"
                    @click.native="$router.push('/' + moduleName)"
            />
            <v-icon name="pencil-alt" class="icon" scale="1.5"
                    @click.native="$router.push(`/${moduleName}/update/` + $route.params.id)"
            />
            <v-icon name="trash" class="icon" scale="1.5"
                    @click.native="$router.push('/' + moduleName)"
            />
        </div>

        <component :is="component" :comments="comms"></component>
    </div>


</template>


<script>
    import Block from '../../components/modules/Block.vue'
    import controller from '../../assets/js/modules/controller'

    export default {
        name: "BlockList",
        components: {
            Block
        },
        data(){
            return {
                comms: [],
                component: null,
                moduleData: null,
                blockData: null

            }
        },
        computed: {
            moduleName(){
                if(this.$route.path.includes('contacts')) return 'contacts'
                if(this.$route.path.includes('contractors')) return 'contractors'
                if(this.$route.path.includes('invoices')) return 'invoices'
            },
            shortenedModuleName(){
                // e.g contacts => contact
                return this.moduleName.substring(0, this.moduleName.length - 1)
            },
            type(){
                switch(this.moduleName){
                    case 'contacts':
                        return 'c'
                    case 'contractors':
                        return 'k'
                    case 'invoices':
                        return 'f'
                }
            }
        },
        created(){
            // Dynamically load only the relevant data and assign it to a vue-data
            import(`../../assets/js/modules/${this.moduleName}Data`)
                .then(component =>{
                    this.moduleData = component
                    this.downloadData()
                })

            this.loadComments()
        },
        methods: {
            downloadData(){
                this.axios.get(`/${this.shortenedModuleName}/${this.type}/` + this.$route.params.id)
                    .then(res =>{
                        this.blockData = controller.assignValues(this.moduleData.dictionary, res.data[this.shortenedModuleName])
                    })
                    .catch(err => console.log(err))
            },

            loadComments(){
                this.axios.get('/comment/content/' + this.$route.params.id)
                    .then(res =>{
                        this.comms = res.data.result
                        //import asychronically
                        this.component = () => import('../../components/modules/Comments.vue')
                    })
                    .catch(err => console.log(err.response))

            },


            updateData(updatedContact){ //eng field, value
                const data = controller.toSimpleObj(this.blockData)
                data[updatedContact.field] = updatedContact.value

                this.axios.patch(`/${this.shortenedModuleName}/${this.type}/` + this.$route.params.id, data)
                    .then(res =>{
                        return this.axios.get(`/${this.shortenedModuleName}/${this.type}/` + this.$route.params.id)
                            .then(res =>{
                                controller.assignValues(this.moduleData.dictionary, res.data[this.shortenedModuleName])
                            })
                            .catch(err => console.log(err))

                    })
                    .catch(err => console.log(err))
            }
        }

    }
</script>
<style scoped lang="scss">
    @import '../../assets/css/variables.scss';

    .block-list {

        .menu {
            display: grid;
            width: 92%;
            margin: 30px auto 0 auto;
            grid-template-columns: 1fr 1fr 1fr;

            .icon {
                justify-self: center;
                color: #272528;
                width: 100%;
                padding: 35px 0;
                cursor: pointer;
                transition: 250ms;

                &:first-child:hover {
                    background-color: #2a80d0;
                    color: white;
                }
                &:nth-child(2):hover {
                    background-color: #d66937;
                    color: white;
                }
                &:last-child:hover {
                    background-color: #d04f50;
                    color: white;
                }

            }
        }

        .block {
            margin: 15px auto;
            width: 90%;
        }

        .comments {
            margin-top: 90px;
            margin-bottom: 50px;
        }
    }

    @media screen and (max-width: $tablet) {
        .block-list {

            .menu {
                display: grid;
                width: 100%;
                margin: 30px auto 0 auto;
                grid-template-columns: 1fr 1fr 1fr;
            }
            .block {
                margin: 0;
                width: 100%;
            }
        }

    }
</style>