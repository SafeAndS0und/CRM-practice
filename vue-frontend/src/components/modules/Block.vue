<template>
    <section>
        <h1>{{blockName}}</h1>
        <div class="info">
            <article v-for="(field, i) of fields" @click="togglePopup(i)">

                <div class="popup" v-if="showPopup[i]">
                    <div class="top"></div>
                    <div @click="makeCopy(field)">
                        <p>Kopiuj wartość</p>
                    </div>
                    <div @click="turnOnEdit(i)">
                        <p>Szybka edycja</p>
                    </div>
                    <div>
                        <p>Wyszukaj pozostałe</p>
                    </div>
                    <div class="top"></div>
                </div>

                <h5>{{field}}</h5>
                <CustomInput v-if="editing[i]"
                             placeholder="Edytuj"
                             :ref="'editInput'+i"
                             @keydown.enter.native="updateSingular(field, i, $event)" class="editInput"/>
                <p v-if="!editing[i]">{{value(field)}}</p>
            </article>
        </div>

    </section>
</template>

<script>
    import CustomInput from '../partials/CustomInput.vue'
    import {dictionary} from '../../assets/js/modules/contactData'
    import translate from '../../assets/js/modules/translator'

    export default {
        name: "Block",
        components: {CustomInput},
        props: {
            blockName: String,
            fields: Array,
            values: Array
        },
        created(){
            //initalize editing obj
            this.fields.map((field, i) =>{
                this.$set(this.editing, i, false)
            })

        },
        methods: {
            value(field){
                const element = this.values.find(el => el.f === field)
                if(element){
                    if(element.f === "Właściciel") return element.v.surname
                    else return element.v
                }
            },
            togglePopup(index){
                // JS cant detect changes on an array, so we need to make another one
                this.showPopup = this.showPopup.map((el, i) => i === index ? !el : false) //find the element and change its state

            },
            makeCopy(field){
                navigator.clipboard.writeText(this.value(field))
            },

            turnOnEdit(i){
                this.editing[i] = !this.editing[i]
                const str = 'editInput' + i
                this.$nextTick(() => {
                    this.$refs[str][0].$el.focus()
                })
            },

            updateSingular(field, i, e){
                // const contact = {}

                this.$emit('quickUpdate', {
                    field: translate(dictionary, field),
                    value: e.target.value
                })

                this.editing[i] = false
                this.showPopup[i] = false
                this.$emit('quickUpdate')
                    .then(() => {
                        this.editing[i] = false
                        this.showPopup[i] = false
                    })
                // // Make a new contact object with new data
                // this.fields.forEach(f =>{
                //     console.log(field, f)
                //     let engField = translate(dictionary, f) // make polish to english field name
                //     let ef = translate(dictionary, field)
                //     if(ef !== engField) // if the current field and the iterated field are not the same
                //         contact[engField] = this.value(f) // leave it as it was
                //     else contact[engField] = e.target.value // otherwise, change it for the value the user typed
                // })

                // this.axios.patch('/contact/c/' + this.$route.params.id, contact)
                //     .then(res =>{
                //         this.editing[i] = false
                //         this.showPopup[i] = false
                //         this.$emit('quickUpdate')
                //             .then(() => {
                //                 this.editing[i] = false
                //                 this.showPopup[i] = false
                //             })
                //     })
                //     .catch(err => console.log(err.response))
            }
        },
        data(){
            return {
                editing: {},
                showPopup: [false, false, false, false, false, false, false, false]
            }
        }
    }
</script>

<style scoped lang="scss">

    @import '../../assets/css/variables.scss';

    section {
        width: 100%;
        background-color: $blockBgC;
        display: grid;
        padding: 20px;
        color: $blockFontC;
        border-radius: 3px;
        position: relative;

        h1 {
            text-align: center;
            font-size: 17px;
            font-weight: normal;
            margin-bottom: 20px;
            letter-spacing: 3px;
        }

        .info {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            grid-gap: 5px;

            article {
                background-color: #312f32;
                padding: 5px;
                text-align: center;
                display: inline-block;
                transition: 100ms;
                cursor: pointer;
                border-radius: 2px;
                position: relative;

                .popup {
                    position: absolute;
                    right: 0;
                    top: -135px;
                    width: 100%;
                    height: 135px;
                    z-index: 10;

                    background-color: #2c2a2d;

                    display: grid;
                    grid-template-rows: 0.25fr 1fr 1fr 1fr 0.25fr;

                    .top {
                        background-color: #3b393c;
                        border: none;
                        &:hover {
                            background-color: #3b393c
                        }
                    }

                    div {
                        height: 100%;
                        display: grid;
                        border-bottom: 1px solid #282729;

                        &:hover {
                            background-color: #353436;
                        }

                        p {
                            font-size: 13px;
                            color: #cccccc;
                            align-self: center;
                        }

                    }
                }

                h5 {
                    width: 100%;
                    font-size: 14px;
                    font-weight: lighter;
                    letter-spacing: 1px;
                    margin-bottom: 5px;

                }

                p {
                    font-size: 12px;
                    margin-bottom: 5px;
                    color: #dcdcdc;
                }

                .editInput {
                    height: 12px;
                    padding: 5px;
                    font-size: 13px;
                    width: 90%;
                }

                &:hover {
                    background-color: #3b393c;
                }
            }
        }

    }

</style>