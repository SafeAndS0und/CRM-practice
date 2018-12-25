<template>
    <div class="block-list">
        <Block block-name="Informacje Podstawowe"
               :fields="fields.basic"
               :values="values.basic"
               class="block"/>
        <Block block-name="Informacje Kontaktowe" class="block"/>
        <Block block-name="Informacje Adresowe" class="block"/>
    </div>
</template>

<script>
    import Block from '../../components/modules/Block.vue'

    export default {
        name: "BlockList",
        components: {
            Block
        },
        data(){
            return {
                fields: {
                    basic: ["Numer", "Imię", "Nazwisko", "Firma", "Czas Utworzenia", "Właściciel"]
                },
                values: {
                    basic: []
                }
            }
        },
        created(){
            this.axios.get('/contact/c/' + this.$route.params.id)
                .then(res =>{
                    this.assignBasicValues(res.data.contact)
                })
                .catch(err => console.log(err.response))
        },
        methods: {
            assignBasicValues({firstname, surname, number, business, creationTime, recordOwner}){
                const arr = [
                    {f: "Imię", v: firstname},
                    {f: "Nazwisko", v: surname},
                    {f: "Numer", v: number},
                    {f: "Firma", v: business},
                    {f: "Czas Utworzenia", v: creationTime},
                    {f: "Właściciel", v: recordOwner},
                    ]
                this.values.basic = [].concat(arr)
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
    }
</style>