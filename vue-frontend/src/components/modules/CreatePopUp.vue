<template>
    <div class="createPopUp">
        <v-icon name="times" scale="1.7"
                @click.native="$emit('closePopUp')"
                class="icon"/>

        <div class="before" v-if="!added">
            <h1>Dodaj nowy kontakt</h1>
            <p>Po dodaniu będzie istniała możliwość uzupełnienia reszty informacji</p>
            <CustomInput placeholder="Imię"/>
            <CustomInput placeholder="Nazwisko"/>
            <button @click="added = true">Dodaj</button>
        </div>

        <div class="after" v-if="added">
            <p>Dodawanie nowego kontaktu zakończyło się pomyślnie! Chcesz teraz przejść do uzupełniania danych szczegółowych?</p>
            <button>Nie, zrobię to późnie</button>
            <button>Tak, chcę uzupełnić resztę danych</button>
        </div>
    </div>
</template>

<script>
    import CustomInput from '../partials/CustomInput.vue'

    export default {
        name: "CreatePopUp",
        props: {},
        components: {
            CustomInput
        },
        data(){
            return {
                added: false
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
        padding: 60px 20px 30px 20px;
        background-color: #23201f;

        color: white;

        .icon {
            color: white;
            position: absolute;
            top: 0;
            right: 0;
            padding: 15px 20px;
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
                color: #838085;
                text-align: center;
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

        .after{
            display: grid;

            p{
                grid-column: 1/3;
                font-size: 15px;
                text-align: center;
                color: #828282;
            }
            button{
                grid-row: 2;
            }

        }
    }

</style>