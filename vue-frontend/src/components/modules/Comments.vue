<template>
    <div class="comments">
        <textarea placeholder="Zostaw komentarz..." v-model="commentValue"></textarea>

        <article>
            <h3>{{$store.state.user.firstname}} {{$store.state.user.surname}}</h3>
            <p>{{commentValue}}</p>
            <button class="send">
                Dodaj komentarz
            </button>
        </article>

        <article>
            <h3>Maciej z Dąbrowy Górniczej</h3>
            <span class="date">12.04.2018 14:10</span>
            <p>
                Nie podoba mi się ten kontakt... Nie pozwala na kontakt telefoniczny, ani mailowy...
                To jaki z niego kontakt, hm?
                1/10
            </p>

            <textarea placeholder="Odpowiedz" v-if="showResponseInput" v-model="response"></textarea>


            <div class="interact" >
                <button @click="showResponseInput = !showResponseInput">Odpowiedz</button>
                <button>Zgłoś</button>
            </div>

            <article class="answer">
                <h3>Ninja</h3>
                <span class="date">21.03.2018 17:54</span>
                <p>
                    THE FUCK YOU SAY TO ME YOU LITTLE SHIT?
                    AHAHAHAHAHAHAH HOW ARE YOU NOT IN FUCKING SCHOOL? YOU KISS YOUR MOTHER WITH THAT MOUTH?
                    ITS CALLED YOU KISS YOUR MOTHER WITH THAT FUCKING MOUTH? HUH HUH? AHHAHAHAHAHA
                    "WHY ARE YOU SO" AHAHAHHA, BECAUSE THE FUCKING YOUTH OF AHAHHDGSJGDA YOU SHUT UP WHEN IM TALKING TO
                    YOU, YOU
                    SHUT YOUR MOUTH.
                </p>

                <div class="interact">
                    <button>Odpowiedz</button>
                    <button>Zgłoś</button>
                </div>
            </article>

        </article>


        <article>
            <h3>Michał z Wawelu</h3>
            <span class="date">16.01.2018 12:02</span>
            <p>
                Wszystko super, towar zgodny z opisem! :)
            </p>
        </article>


    </div>
</template>

<script>
    export default {
        name: "Comments",
        data(){
            return {
                commentValue: '',
                showResponseInput: false
            }
        }
    }
</script>

<style scoped lang="scss">

    @import '../../assets/css/variables.scss';

    .comments {
        width: 100%;
        margin: auto;

        textarea {
            margin: auto auto 25px auto;
            display: block;
            width: 90%;
            padding: 12px;
            resize: vertical;

            font-size: 15px;
            background-color: #232323;
            color: #7d7776;
            outline: none;
            transition: 300ms;
            border: 5px solid #4f4f4f;
            height: 60px;

            &:focus {
                border-color: #2a68b1;
                background-color: #191818;
            }
        }

        article {
            width: 88%;
            margin: 20px auto 20px auto;
            padding: 16px 16px 25px 16px;
            background-color: #191919;
            position: relative;

            h3 {
                font-weight: normal;
                font-size: 15px;
                margin-bottom: 2px;
                color: #9b9b9b;
            }

            .send {

                display: block;
                margin: 35px auto 5px auto;
                width: 100%;
                border: none;
                background-color: #2d2d2d;
                color: #696969;
                padding: 10px;
                transition: 250ms;
                cursor: pointer;

                &:hover {
                    color: #cbcbcb;
                    background-color: #1e5fc0;
                }
            }

            .interact {
                position: relative;
                float: right;
                padding: 5px;
                margin-bottom: 15px;

                button{
                    background-color: transparent;
                    border: none;
                    color: #413f42;
                    cursor: pointer;
                    padding: 0 5px;

                    &:hover {
                        color: #545255;
                    }

                }


            }

            .date {
                display: block;
                font-size: 12px;
                color: #555555;
            }

            p {
                margin-top: 12px;
                padding-bottom: 15px;
                font-size: 14px;
                color: #7d7d7d;
            }

            textarea{
                height: 30px;
                border: 2px solid #4f4f4f;
                margin-bottom: 10px;

                &:focus{
                    border-color: #2a68b1;
                    background-color: #191818;
                }
            }

            .answer {
                clear: both;
                width: 95%;
                margin: 20px auto 15px 35px;
                padding: 10px 0 15px 10px;
                border-top: 1px solid #2d2d2d;

            }
        }
    }

</style>