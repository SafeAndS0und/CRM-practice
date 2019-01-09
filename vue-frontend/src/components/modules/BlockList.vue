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

        <Comments class="comments" :comments="comms"/>
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
                values: {},
                comms: [
                    {
                        author: {
                            firstname: "Maciej",
                            surname: "z Dąbrowy Górniczej"
                        },
                        postedAt: "21.04.2017 14:25",
                        content: `Nie podoba mi się ten kontakt... Nie pozwala na kontakt telefoniczny, ani mailowy...
                        to jaki z niego kontakt, hm? 1/10`,
                        replies: [
                            {
                                author: {
                                    firstname: "Toxic",
                                    surname: "Ninja"
                                },
                                postedAt: "21.04.2017 15:11",
                                content: `THE FUCK YOU SAY TO ME YOU LITTLE SHIT?
                                        AHAHAHAHAHAHAH HOW ARE YOU NOT IN FUCKING SCHOOL? YOU KISS YOUR MOTHER WITH THAT MOUTH?
                                        ITS CALLED YOU KISS YOUR MOTHER WITH THAT FUCKING MOUTH? HUH HUH? AHHAHAHAHAHA
                                        "WHY ARE YOU SO" AHAHAHHA, BECAUSE THE FUCKING YOUTH OF AHAHHDGSJGDA YOU SHUT UP WHEN IM TALKING TO
                                        YOU, YOU
                                        SHUT YOUR MOUTH.`
                            },
                            {
                                author: {
                                    firstname: "Pleasant",
                                    surname: "Ninja"
                                },
                                postedAt: "21.04.2017 15:11",
                                content: `JK i love you`
                            }
                        ]
                    },
                    {
                        author: {
                            firstname: "Nikodem",
                            surname: "Lorenz"
                        },
                        postedAt: "26.02.2011 6:24",
                        content: `Everything looks damn good as for now. :)`,
                    }
                ]
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