<template>
    <div class="new-container">

        <div v-for="(value, key) of fields">
            <p>{{key}}</p>
            <section>
                <article v-for="field of value">
                    <CustomInput :placeholder="field" v-model="formOutput[field]"/>
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

    export default {
        name: "New",
        components: {CustomInput},
        data(){
            return {
                fields: [],
                formOutput: {}
            }
        },
        computed:{
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
                        .then(module => this.fields = module.default.fields)
                        .catch(err => console.log(err.response))

                    if(this.action === 'update'){
                        this.axios.get('/contact/c/' + this.$route.params.id)
                            .then(res => console.log(res.data))
                    }
                break;
            }
        },
        methods: {
            addContact(){
                console.log(this.action)
                switch(this.action)
                {
                    case 'new':
                        this.axios.post('/contact/addContact', {
                            firstname: this.formOutput["Imię"],
                            surname: this.formOutput['Nazwisko'],
                            business: this.formOutput['Firma'],
                            basicPhone: this.formOutput['Telefon podstawowy'],
                            basicEmail: this.formOutput['Email podstawowy']
                        })
                        break;
                    case 'update':
                        this.axios.patch('/contact/c/' + this.$route.params.id, {
                            firstname: this.formOutput["Imię"],
                            surname: this.formOutput['Nazwisko'],
                            business: this.formOutput['Firma'],
                            basicPhone: this.formOutput['Telefon podstawowy'],
                            basicEmail: this.formOutput['Email podstawowy']
                        })
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
                grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
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