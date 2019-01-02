<template>
    <div class="list">
        <router-link :to="`/contacts/details/${contact._id}`">
            <article>
                <h5>Imię</h5>
                <p>{{contact.firstname}}</p>
            </article>
            <article>
                <h5>Nazwisko</h5>
                <p>{{contact.surname}}</p>
            </article>
            <article>
                <h5>Firma</h5>
                <p>{{contact.business}}</p>
            </article>
            <article>
                <h5>Właściciel rekordu</h5>
                <p>{{contact.recordOwner.surname}}</p>
            </article>
            <article>
                <h5>Telefon</h5>
                <p>{{contact.basicPhone}}</p>
            </article>
            <article>
                <h5>Email</h5>
                <p>{{contact.basicEmail}}</p>
            </article>
        </router-link>

        <div class="icons">
            <v-icon name="trash" scale="1.2" @click.native="del(contact._id)" class="icon"/>
            <v-icon name="pencil-alt" scale="1.2" class="icon" @click.native="$router.push('/contacts/update/' + contact._id)"/>
            <v-icon name="check-square" scale="1.2" class="icon"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "List",
        props: {
            contact: Object,
        },
        methods: {
            del(id){

                this.axios.delete('/contact/c/' + id)
                    .then(res => {
                       this.$emit('contactDeleted', id)
                    })
                    .catch(err => console.log(err.response))
            }
        }
    }
</script>

<style scoped lang="scss">

    @import '../../assets/css/variables';

    .list {
        position: relative;

        a {
            border-radius: 6px;
            text-decoration: none;
            display: grid;
            width: 100%;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            background-color: #222023;
            padding: 6px;
            grid-gap: 5px;
            transition: 120ms;

            article {
                border-radius: 3px;
                color: #dadada;
                text-align: center;
                padding: 5px;
                background-color: #323033;
                display: inline-block;
                cursor: pointer;
                transition: 150ms;

                h5 {
                    font-size: 14px;
                    font-weight: lighter;
                    letter-spacing: 2px;
                    margin-bottom: 5px;
                }

                p {
                    font-size: 13px;
                    margin-bottom: 0;
                }

            }


            &:hover {
                background-color: #1d1c1d;
                /*transform: translateX(8px);*/

                article {
                    background-color: rgba(59, 58, 60, 0.95);
                    ;
                }
            }
        }

        .icons {
            padding: 5px;
            position: absolute;
            top: 10px;
            right: -120px;
            border-radius: 10px;

            .icon {
                grid-row: 1;
                justify-self: center;
                align-self: center;
                padding: 5px;
                transition: 200ms;
                cursor: pointer;
                /*border-radius: 50%;*/
                color: #2f2f2f;

                &:first-child:hover {
                    color: #ab1a2a;
                }
                &:nth-child(2):hover {
                    color: #125ac8;
                }
                &:last-child:hover {
                    color: #575657;
                }
            }
        }
    }

</style>