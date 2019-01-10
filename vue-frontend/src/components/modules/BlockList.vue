<template>
    <div class="block-list">
        <Block block-name="Informacje Podstawowe"
               @quickUpdate="updateData"
               :fields="fields.basic"
               :values="values.basic"
               class="block"/>
        <Block block-name="Informacje Kontaktowe"
               :fields="fields.contact"
               :values="values.contact"
               class="block"/>
        <Block block-name="Informacje Adresowe"
               :fields="fields.address"
               :values="values.address"
               class="block"/>

        <!--<Comments class="comments" :comments="comms"/>-->
        <component :is="component" :comments="comms"></component>
    </div>


</template>


<script>
    import Block from '../../components/modules/Block.vue'
    import {values} from '../../assets/js/modules/contactData'
    import contactData from '../../assets/js/modules/contactData'

    export default {
        name: "BlockList",
        components: {
            Block
        },
        data(){
            return {
                fields: {},
                values: {},
                comms: [],
                component: null
            }
        },
        created(){
            this.fields = contactData.fields
            this.values = values

            this.axios.get('/contact/c/' + this.$route.params.id)
                .then(res =>{
                    contactData.activateControllers(res.data.contact)
                    this.values = values
                })
                .catch(err => console.log(err.response))


            this.axios.get('/comment/content/' + this.$route.params.id)
                .then(res => {
                    this.comms = res.data.result
                    //import asychronically
                    this.component = () => import('../../components/modules/Comments.vue')
                })
                .catch(err => console.log(err.response))
        },
        methods: {
            updateData(){
                return this.axios.get('/contact/c/' + this.$route.params.id)
                    .then(res =>{
                        contactData.activateControllers(res.data.contact)
                        this.values = values
                    })
                    .catch(err => console.log(err.response))

            }
        }
    }
</script>
<style scoped lang="scss">
    .block-list {
        .block {
            margin: 15px auto;
            width: 90%;
        }

        .comments{
            margin-top: 90px;
            margin-bottom: 50px;
        }
    }
</style>