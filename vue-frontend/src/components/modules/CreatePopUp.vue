<template>
    <div class="createPopUp">
        <v-icon name="times" scale="1.7"
                @click.native="$emit('closePopUp')"
                class="icon"/>

        <transition name="t_before">
            <div class="before" v-if="!hide">
                <h1>Dodawanie {{name}}</h1>
                <p>Po dodaniu będzie istniała możliwość uzupełnienia reszty informacji</p>

                <CustomInput :placeholder="input.pl"
                             v-if="moduleName !== 'invoice'"
                             v-model="moduleData[input.eng]"
                             v-for="input of inputs"
                />

                <Select v-model="moduleData[input.eng]"
                        :fieldName=input.eng
                        v-for="input of inputs"
                        v-if="moduleName === 'invoice'"
                        class="select"
                        :contractors="searchedContractors"
                />

                <CustomInput placeholder="Wyszukaj Kontrahenta"
                             v-if="moduleName === 'invoice'"
                             @input.native="lookForContractor"
                             v-model="contractorInput"/>

                <button @click="addContact">Dodaj</button>
            </div>
        </transition>

        <transition name="t_after">
            <div class="after" v-if="added">
                <p>Dodawanie zakończyło się pomyślnie! Chcesz teraz przejść do uzupełniania danych
                    szczegółowych?</p>
                <button @click="$emit('closePopUp')">Nie, zrobię to później</button>
                <button @click="goToEdit">Tak, chcę uzupełnić resztę danych</button>
            </div>
        </transition>
    </div>
</template>

<script>
    import CustomInput from '../partials/CustomInput.vue'
    import Select from '../partials/Select.vue'
    import {dictionary} from "../../assets/js/modules/contactsData";
    import translator from '../../assets/js/modules/translator'

    export default {
        name: "CreatePopUp",
        props: ['name', 'inputs', 'moduleName'],
        components: {
            CustomInput, Select
        },
        data(){
            return {
                moduleData: {},
                added: false,
                hide: false,
                id: '',
                contractorInput: '',
                searchedContractors: null
            }
        },
        methods: {
            addContact(){

                const obj = {}
                this.inputs.forEach(field =>{
                    obj[field.eng] = this.moduleData[field.eng]
                })
                console.log(obj)
                this.axios.post(`/${this.moduleName}`, obj)
                    .then(res =>{
                        this.id = res.data._id
                        this.hide = true
                        setTimeout(() => this.added = true, 500)
                    })
                    .catch(err => console.log(err.response))
            },
            goToEdit(){
                this.$router.push(`/${this.moduleName}s/update/` + this.id)
                this.$emit('closePopUp')
            },

            lookForContractor(){
                this.axios.get('/search/contractor?sortBy=a_ct&name=' + this.contractorInput)
                    .then(res => this.searchedContractors = res.data.result)
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style scoped lang="scss">


    .createPopUp {
        position: fixed;
        top: 120px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 101;
        padding: 60px 20px 20px 20px;
        background-color: #23201f;

        color: white;

        .icon {
            color: white;
            position: absolute;
            top: 0;
            right: 0;
            padding: 12px 16px;
            cursor: pointer;

            &:hover {
                background-color: #b22d38;
            }
        }

        .before {
            display: grid;
            grid-template-columns: 50vw;
            grid-gap: 15px;

            h1 {
                font-weight: normal;
                font-size: 18px;
                letter-spacing: 2px;
                text-align: center;
            }
            p {
                font-size: 13px;
                color: #8a878c;
                text-align: center;
            }

            select {
                width: 100%;
            }

            button {
                color: white;
                border: none;
                background-color: #44a946;
                height: 40px;
                transition: 200ms;
                cursor: pointer;

                &:hover {
                    background-color: #3d923f;
                }
            }
        }

        .after {
            display: grid;
            grid-row-gap: 30px;
            grid-template-columns: 1fr 1fr;

            p {
                grid-column: 1/3;
                font-size: 15px;
                text-align: center;
                color: #9b9b9b;
            }
            button {
                grid-row: 2;
                color: white;
                border: none;
                height: 150px;
                transition: 200ms;
                cursor: pointer;

                &:nth-child(2) {
                    background-color: #2d76d2;
                    &:hover {
                        background-color: #2c6ac3;
                    }
                }

                &:last-child {
                    background-color: #42a130;
                    &:hover {
                        background-color: #3d902b;
                    }
                }
            }

        }
    }

    /* Transitions */

    .t_before-leave-active {
        transition: .5s;
    }

    .t_before-leave-to {
        opacity: 0;
    }

    .t_after-enter-active {
        opacity: 0;
        transition: opacity .5s;
    }

    .t_after-enter-to {
        opacity: 1;
    }

</style>