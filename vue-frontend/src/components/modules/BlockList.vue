<template>
    <div class="block-list">

        <Block block-name="Informacje Podstawowe"
               @quickUpdate="updateData($event)"
               :fields="fields.basic"
               :values="values.basic"
               class="block"/>
        <Block block-name="Informacje Kontaktowe"
               @quickUpdate="updateData($event)"
               :fields="fields.contact"
               :values="values.contact"
               class="block"/>
        <Block block-name="Informacje Adresowe"
               @quickUpdate="updateData($event)"
               :fields="fields.address"
               :values="values.address"
               class="block"/>

        <div class="menu">
            <v-icon name="list-ul" class="icon" scale="1.5"
                    @click.native="$router.push('/contacts')"
            />
            <v-icon name="pencil-alt" class="icon" scale="1.5"
                    @click.native="$router.push('/contacts/update/' + $route.params.id)"
            />
            <v-icon name="trash" class="icon" scale="1.5"
                    @click.native="$router.push('/contacts')"
            />
        </div>

        <component :is="component" :comments="comms"></component>
    </div>


</template>


<script>
    import Block from '../../components/modules/Block.vue'
    import {dictionary, values} from '../../assets/js/modules/contactData'
    import contactData from '../../assets/js/modules/contactData'
    import translate from '../../assets/js/modules/translator'

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
                .then(res =>{
                    this.comms = res.data.result
                    //import asychronically
                    this.component = () => import('../../components/modules/Comments.vue')
                })
                .catch(err => console.log(err.response))
        },
        methods: {
            updateData(updatedContact){ //eng field, value
                const contactArr = []
                //Make sorted array for an all-in-one array
                Object.keys(this.values).forEach(type =>{
                    this.values[type].forEach(value =>{
                        contactArr.push(value)
                    })
                })

                const updatedContactData = {}
                contactArr.map(contact =>{
                    //if eng field doesnt equal the field given from the quick update
                    if(translate(dictionary, contact.f) !== updatedContact.field){
                        //Just translate the field on english and leave the value as it was
                        updatedContactData[translate(dictionary, contact.f)] = contact.v

                    } else{
                        updatedContactData[updatedContact.field] = updatedContact.value
                    }
                })

                this.axios.patch('/contact/c/' + this.$route.params.id, updatedContactData)
                    .then(res =>{

                        return this.axios.get('/contact/c/' + this.$route.params.id)
                            .then(res =>{
                                contactData.activateControllers(res.data.contact)
                                this.values = values
                            })
                            .catch(err => console.log(err.response))

                    })
                    .catch(err => console.log(err))


            }
        }
    }
</script>
<style scoped lang="scss">
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
</style>