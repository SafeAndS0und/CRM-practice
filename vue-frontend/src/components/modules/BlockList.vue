<template>
    <div class="block-list">
        <Block block-name="Informacje Podstawowe"
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

        <Comments class="comments"/>
    </div>


</template>


<script>
    import Block from '../../components/modules/Block.vue'
    import Comments from '../../components/modules/Comments.vue'
    import {values} from '../../assets/js/modules/contactData'
    import contactData from '../../assets/js/modules/contactData'



    export default {
        name: "BlockList",
        components: {
            Block, Comments
        },
        data(){
            return {
                fields: {},
                values: {}
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
        },
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