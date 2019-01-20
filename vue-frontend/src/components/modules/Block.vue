<template>
    <section>
        <h1>{{blockName}}</h1>
        <div class="info">
            <article v-for="(field, i) of blockData.data"
                     @click="!isCheckbox(field.pl) ? togglePopup(i) : checkBoxActive[i] = !checkBoxActive[i]"
                     :class="{'checkF': isCheckbox(field.pl), 'checkT': checkBoxActive[i] && isCheckbox(field.pl)}">

                <div class="popup" v-if="showPopup[i]">
                    <div class="top"></div>
                    <div @click="makeCopy(field.value)">
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

                <h5>{{field.pl}}</h5>
                <p v-if="!editing[i]">{{(field.value === false || field.value === true) ? '' : field.value}}</p>
                <CustomInput v-if="editing[i]"
                             placeholder="Edytuj"
                             :ref="'editInput'+i"
                             @keydown.enter.native="updateSingular(field.eng, i, $event)" class="editInput"/>
            </article>
        </div>

    </section>
</template>

<script>
    import CustomInput from '../partials/CustomInput.vue'
    import {dictionary} from '../../assets/js/modules/contactsData'
    import translate from '../../assets/js/modules/translator'

    export default {
        name: "Block",
        components: {CustomInput},
        props: ['blockName', 'blockData'],
        data(){
            return {
                editing: {},
                showPopup: [],
                checkBoxActive: {}
            }
        },
        created(){
            //initalize editing obj and showPopup array so vue could 'react' to them
            this.blockData.data.map((field, i) =>{
                this.$set(this.checkBoxActive, i, false)
                this.$set(this.editing, i, false)
                this.showPopup.push(false)
            })

        },
        methods: {
            isCheckbox(fieldName){
                return fieldName === 'Zgoda na kont. mail.' || fieldName === 'Zgoda na kont. tel.'
            },

            togglePopup(index){
                console.log(this.showPopup)
                // JS cant detect changes on an array, so we need to make another one
                this.showPopup = this.showPopup.map((el, i) => i === index ? !el : false) //find the element and change its state

            },
            makeCopy(field){
                navigator.clipboard.writeText(field.value)
            },

            turnOnEdit(i){
                this.editing[i] = !this.editing[i]
                const str = 'editInput' + i
                this.$nextTick(() =>{
                    this.$refs[str][0].$el.focus()
                })
            },

            updateSingular(field, i, e){
                this.$emit('quickUpdate', {
                    field: field,
                    value: e.target.value
                })
                this.editing[i] = false
                this.showPopup[i] = false

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