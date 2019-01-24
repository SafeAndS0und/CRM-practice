<template>
    <div class="new-container">

        <div v-for="(kind, i) of moduleData">
            <p>{{kind.kind}}</p>
            <section>
                <article v-for="(field, j) of kind.data">
                    <CustomInput
                            @click.native="isCheckbox(field.pl) ? toggleCheckbox(field.pl, j) : '' "

                            :class="{'checkF': isCheckbox(field.pl) && !checkBoxActive[j],
                            'checkT': checkBoxActive[j] && isCheckbox(field.pl)}"

                            :placeholder="field.pl"
                            v-model="polishOutput[field.pl]"/>
                </article>
            </section>

            <!--Make fields object into an array, take the last item and see if it matches with the current one from iteration -->
            <button v-if="moduleData.length - 1 === i " @click="addContact">Zapisz
            </button>
        </div>
        <p v-if="added" style="text-align: center; color: #518a57">Zapisano zmiany</p>


        <div class="menu">
            <v-icon name="list-ul" class="icon" scale="1.2"
                    @click.native="$router.push('/' + moduleName)"
            />
            <v-icon name="address-card" class="icon" scale="1.35"
                    @click.native="$router.push(`/${moduleName}/details/` + $route.params.id)"
            />
            <v-icon name="trash" class="icon" scale="1.2"
                    @click.native="$router.push('/' + moduleName)"
            />
        </div>
    </div>
</template>

<script>
    import CustomInput from '../partials/CustomInput.vue'
    import translate from '../../assets/js/modules/translator'

    export default {
        name: "New",
        components: {CustomInput},
        data(){
            return {
                blackList: null,
                moduleData: [],
                polishOutput: {Nazwisko: '', Nazwa: '', Opis: ''}, // Keeps polish fields and values
                added: false,
                checkBoxActive: {},
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
            import(`../../assets/js/modules/${this.moduleName}Data`)
                .then(module =>{
                    this.blackList = module.blackList
                    this.moduleData = JSON.parse(JSON.stringify(module.dictionary)) // copying so we would not change the source object

                    // Delete useless inputs
                    this.blackList.forEach(field =>{
                        let index = this.moduleData[0].data.findIndex(obj => obj.eng === field)
                        if(index !== -1) this.moduleData[0].data.splice(index, 1)
                    })
                })
                .catch(err => console.log(err.response))

            this.axios.get(`/${this.shortenedModuleName}/${this.type}/` + this.$route.params.id)
                .then(res =>{
                    // Replace polishOutput with requested data
                    let index = 0
                    this.moduleData
                        .forEach(kind =>{
                            kind.data.forEach((item, i) =>{
                                this.$set(this.checkBoxActive, index, item.value)
                                index++

                                if(!this.blackList.find(el => el === item.pl)){ // if the iterated item isnt in the black list
                                    this.polishOutput[item.pl] = res.data[this.shortenedModuleName][item.eng] //Fill the inputs with data from server
                                }
                            })
                        })
                })
                .catch(err => console.log(err))


        },
        methods: {

            refactorValue(value, field){
                console.log(value, field)
                if(value === false || value === true) return ''
                else if(field === 'recordOwner') return value.firstname + ' ' + value.surname
                else if(field === 'creationTime') return new Date(value).toLocaleString()
                else if(field === 'contractor') return value.name
                else if(field === 'status') return this.translateStatus(value)
                else return value
            },

            translateStatus(status){
                switch(status){
                    case '1':
                        return 'Wersja Robocza'
                    case '2':
                        return 'Wymaga Weryfikacji'
                    case '3':
                        return 'Zatwierdzona'
                    case '4':
                        return 'Wyksięgowana'
                    case '5':
                        return 'Zaksięgowana'
                    case '6':
                        return 'Anulowana'
                }
            },




            addContact(){
                const englishOutput = {}
                Object
                    .entries(this.polishOutput)
                    .forEach(field =>{
                        this.moduleData.forEach(kind =>{
                            kind.data.forEach(dataObj =>{
                                if(dataObj.pl === field[0]){
                                    englishOutput[dataObj.eng] = field[1]
                                }
                            })
                        })
                    })
                this.axios.patch(`/${this.shortenedModuleName}/${this.type}/` + this.$route.params.id, englishOutput)
                    .then(res => this.added = true)
                    .catch(err => console.log(err))
            },

            isCheckbox(fieldName){
                return fieldName === 'Zgoda na kont. mail.' || fieldName === 'Zgoda na kont. tel.'
            },

            toggleCheckbox(field, index){
                this.checkBoxActive[index] ? this.polishOutput[field] = false : this.polishOutput[field] = true
                return !this.isCheckbox(field) ? '' : this.checkBoxActive[index] = !this.checkBoxActive[index]
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

        .checkF {
            color: white;
            background-color: #55242b;
            &:hover {
                background-color: #5d242a;
            }
        }
        .checkT {
            color: white;
            background-color: #3164ac;
            &:hover {
                background-color: #3072b8;
            }
        }

        .menu {
            display: grid;
            width: 92%;
            margin: 10px auto 0 auto;
            grid-template-columns: 1fr 1fr 1fr;

            .icon {
                justify-self: center;
                color: #cdc5d1;
                width: 100%;
                padding: 15px 0;
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

    @media screen and (max-width: $tablet) {
        .new-container {
            border-radius: 0;
        }
    }

</style>