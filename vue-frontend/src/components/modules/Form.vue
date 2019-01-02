<template>
    <div class="new-container">

        <div v-for="(value, key) of fields">
            <p>{{key}}</p>
            <section>
                <article v-for="field of value">
                    <CustomInput :placeholder="field" v-model="polishOutput[field]"/>
                </article>
            </section>

            <!-- Make fields object into an array, take the last item and see if it matches with the current one from iteration -->
            <button v-if="Object.keys(fields)[Object.keys(fields).length - 1] === key" @click="addContact">Zapisz
            </button>
        </div>
    </div>
</template>

<script>
    import CustomInput from '../partials/CustomInput.vue'
    import {dictionary, blackList} from "../../assets/js/modules/contactData";

    export default {
        name: "New",
        components: {CustomInput},
        data(){
            return {
                fields: {},
                polishOutput: {Nazwisko: ''}, // Keeps polish fields and values
                englishOutput: {surname: ''} // Keeps english fields and values

            }
        },
        computed: {
            action(){
                return this.$route.path.includes('update') ? 'update' : 'new'
            },

            module(){
                if(this.$route.path.includes('contacts')) return 'contacts'
            }
        },
        created(){

            switch(this.module){
                case 'contacts' :
                    import('../../assets/js/modules/contactData')
                        .then(module => {

                            this.fields = JSON.parse(JSON.stringify(module.default.fields)) // copying so we would not change the source object

                            // Delete useless inputs
                            blackList.forEach(field => {
                                let index = this.fields.basic.findIndex(f => f === field)
                                if(index !== -1) this.fields.basic.splice(index, 1)
                            })

                        })
                        .catch(err => console.log(err.response))

                    if(this.action === 'update'){
                        this.axios.get('/contact/c/' + this.$route.params.id)
                            .then(res =>{
                                // Replace polishOutput with requested data
                                Object.keys(dictionary).forEach(item =>{
                                    if(!blackList.find(el => el === item)){ // if the iterated item isnt in the black list
                                        this.polishOutput[dictionary[item]] = res.data.contact[item] //Fill the inputs with data from server
                                    }
                                })
                                console.log(this.polishOutput)
                            })
                            .catch(err => console.log(err.response))
                    }
                    break;
            }
        },
        methods: {
            addContact(){
                Object.keys(dictionary).forEach(item =>{
                    this.englishOutput[item] = this.polishOutput[dictionary[item]] // create english field-value pair, for the server
                })

                switch(this.action){
                    case 'new':
                        this.axios.post('/contact/addContact', this.englishOutput)
                            .catch(err => console.log(err.response))
                        break;
                    case 'update':
                        this.axios.patch('/contact/c/' + this.$route.params.id, this.englishOutput)
                        break;
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    @import '../../assets/css/variables.scss';

    .new-container {
        display: grid;
        background-color: $blockBgC;
        border-radius: 5px;
        color: $blockFontC;
        padding: 15px;

        div {

            p {
                text-align: center;
                grid-column: 1/-1;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: $blockFontC;
            }

            section {
                margin-bottom: 20px;
                padding: 10px;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                grid-gap: 8px;
                justify-items: center;

                article {

                }

            }

            button {
                display: block;
                border: none;
                width: 95%;
                margin: 30px auto 20px auto;
                height: 50px;
                color: #a4a4a4;
                background-color: #353336;
                cursor: pointer;
                transition: 150ms;
                font-size: 16px;

                &:hover {
                    background-color: #403e41;
                }

            }
        }
    }

</style>