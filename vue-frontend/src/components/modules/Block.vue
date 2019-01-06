<template>
    <section>
        <h1>{{blockName}}</h1>
        <div class="info">
            <article v-for="(field, i) of fields" @click="togglePopup(i)">

                <div class="popup" v-if="showPopup[i]">
                    <div class="top"></div>
                    <div>
                        <p>Kopiuj</p>
                    </div>
                    <div>
                        <p>Edytuj</p>
                    </div>
                    <div>
                        <p>Wyszukaj pozostałe</p>
                    </div>
                    <div class="top"></div>
                </div>

                <h5>{{field}}</h5>
                <p>{{value(field)}}</p>
            </article>
        </div>

    </section>
</template>

<script>
    export default {
        name: "Block",
        props: {
            blockName: String,
            fields: Array,
            values: Array
        },
        methods: {
            value(field){
                const element = this.values.find(el => el.f === field)
                if(element) {
                    if(element.f === "Właściciel") return element.v.surname
                    else return element.v
                }
            },
            togglePopup(index){
                // JS cant detect changes on an array, so we need to make another one
                this.showPopup = this.showPopup.map((el, i) => i === index ? !el : false) //find the element and change its state

            }
        },
        data(){
            return {
                showPopup: [false,false,false,false,false,false,false,false]
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

                .popup{
                    position: absolute;
                    right: 0;
                    top: -135px;
                    width: 100%;
                    height: 135px;
                    z-index: 10;

                    background-color: #2c2a2d;

                    display: grid;
                    grid-template-rows: 0.25fr 1fr 1fr 1fr 0.25fr;

                    .top{
                        background-color: #3b393c;
                        border: none;
                        &:hover{background-color: #3b393c}
                    }

                    div{
                        height: 100%;
                        display: grid;
                        border-bottom: 1px solid #282729;

                        &:hover{
                            background-color: #353436;
                        }

                        p{
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

                &:hover {
                    background-color: #3b393c;
                }
            }
        }

    }

</style>