<template>
    <div class="comments">

        <h1>Komentarze</h1>

        <article style="border-radius: 3px; margin-bottom: 50px">
            <h3 style="font-size: 17px">{{$store.state.user.firstname}} {{$store.state.user.surname}}</h3>
            <p>{{commentValue}}</p>

            <textarea placeholder="Zostaw komentarz..." v-model="commentValue"></textarea>
            <button class="send" @click="addComment">
                Dodaj komentarz
            </button>
        </article>

        <article v-for="(comment, index) of commentsSorted">
            <h3>{{comment.author.firstname}} {{comment.author.surname}}</h3>
            <span class="date">{{comment.postedAt}}</span>
            <p>
                {{comment.content}}
            </p>

            <textarea placeholder="Odpowiedz" v-if="showResponseInput[index]" @keyup.enter="reply(comment._id, index)"
                      v-model="replyMsg[index]"></textarea>

            <div class="interact">
                <button @click="toggleReplyInput(index)">Odpowiedz</button>
                <button>Zgłoś</button>
            </div>

            <article class="answer" v-for="reply of comment.replies">
                <h3>{{reply.author.firstname}} {{reply.author.surname}}</h3>
                <span class="date">{{reply.postedAt}}</span>
                <p>
                    {{reply.content}}
                </p>

                <div class="interact">
                    <button>Zgłoś</button>
                </div>
            </article>
        </article>


    </div>
</template>

<script>
    export default {
        name: "Comments",
        props: ['comments'],
        data(){
            return {
                replyMsg: {},
                commentValue: '',
                showResponseInput: {}
            }
        },
        created(){
            // initialize showResponseInput
            this.comments.forEach((comment, index) => {
                // THIS MAKES VUE OBJECTS PROPERTIES REACTIVE!
                this.$set(this.showResponseInput, index, false)
            })
        },
        computed: {
            commentsSorted(){
                return this.comments.reverse()
            }
        },
        methods: {
            loadComments(){
                this.axios.get('/comment/content/' + this.$route.params.id)
                    .then(res => {
                        this.comments = res.data.result
                    })
                    .catch(err => console.log(err.response))
            },

            addComment(){
                this.axios.post('/comment', {
                    "content_id": this.$route.params.id,
                    "content": this.commentValue
                })
                    .then(res => {
                        //Show it after adding
                        this.loadComments()

                    })
                    .catch(err => console.log(err))
            },
            reply(id, index){
                console.log('asd', id)
                this.axios.post('/comment/reply', {
                    "comment_id": id,
                    "content": this.replyMsg[index]
                })
                    .then(res => this.loadComments())
                    .catch(err => console.log(err))
            },

            toggleReplyInput(index){
                this.showResponseInput[index] = !this.showResponseInput[index]
            }
        }

    }
</script>

<style scoped lang="scss">

    @import '../../assets/css/variables.scss';

    .comments {
        width: 100%;
        margin: auto;

        h1 {
            font-weight: normal;
            text-align: center;
            margin-bottom: 35px;
            font-size: 25px;
            letter-spacing: 4px;
            text-transform: uppercase;
        }

        article {
            width: 88%;
            margin: 20px auto 15px auto;
            padding: 16px 16px 35px 16px;
            background-color: #191919;
            position: relative;
            border-radius: 2px;

            textarea {
                margin: 15px auto 15px auto;
                display: block;
                width: 95%;
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

                button {
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

            textarea {
                height: 30px;
                border: 2px solid #4f4f4f;
                margin-bottom: 10px;

                &:focus {
                    border-color: #2a68b1;
                    background-color: #191818;
                }
            }

            .answer {
                clear: both;
                width: 95%;
                margin: 20px auto 0 35px;
                padding: 10px 0 10px 10px;
                border-top: 1px solid #2d2d2d;

            }
        }
    }

</style>