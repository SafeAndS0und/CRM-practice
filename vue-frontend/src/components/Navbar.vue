<template>
    <nav>
        <CustomInput class="searchField" placeholder="Wyszukaj modułu"/>

        <div class="user">

            <!--<img v-if="$store.getters.authenticated" class="avatar" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-128.png" width="26"/>-->
            <router-link class="name" :to="$store.getters.authenticated ? '/' : '/login'">
                {{$store.state.user.firstname ? $store.state.user.firstname : "Zaloguj się"}} {{$store.state.user.surname}}
            </router-link>
            <v-icon  @click.native="$store.getters.authenticated ? $emit('toggleDropdown') : $router.push('/login')"
                    :name="$store.getters.authenticated ? 'cog' : 'sign-in-alt'"
                     scale="1.7"
                     class="options"/>

        </div>
    </nav>
</template>

<script>
    import CustomInput from './partials/CustomInput.vue'

    export default {
        name: "navbar",
        components: {
            CustomInput
        },
        data(){
            return {}
        }
    }
</script>

<style scoped lang="scss">

    @import '../assets/css/variables.scss';

    nav {
        z-index: 100;
        height: 68px;
        width: 100%;
        background-color: #181818;
        display: grid;
        grid-template-columns: repeat(12, 1fr);

        .searchField {
            align-self: center;
            background-color: #2f2f2f;
            grid-column: 5/9;
            height: 24px;

            &:focus{
                background-color: #462428;
            }
        }

        .user {
            float: right;
            height: 100%;
            grid-column: 11/13;
            position: relative;


            .avatar {
                position: absolute;
                line-height: 34px;
                display: inline-block;
                /*Centering vertically*/
                top: 50%;
                transform: translateY(-50%);
                border-radius: 50%;
            }

            .name {

                color: #d7d7d7;
                letter-spacing: 2px;
                font-size: 14px;
                line-height: 68px;
                text-decoration: none;
                transition: 150ms;
                display: inline-block;

                &:hover{
                    color: #efefef;
                }
            }

            .options{
                margin-left: 8px;
                color: #9b9b9b;
                position: absolute;
                line-height: 34px;
                top: 50%;
                transform: translateY(-50%);
                cursor: pointer;
                transition: 150ms;

                &:hover{
                    color: #da6359;
                }
            }
        }
    }

    @media screen and (min-width: $tablet){
        nav{
            top: 0;
            position: fixed;
        }
    }

    @media screen and (max-width: $tablet) {
        nav {
            .searchField {
                grid-column: 3/9;
            }

            .user {
                grid-column: 10/13;
                align-self: start;
                position: relative;

                .name {
                    font-size: 12px;
                    letter-spacing: 1px;
                    line-height: 68px;
                }
                .options{
                    transform: translateY(-50%) scale(0.8);
                }
            }
        }
    }

    @media screen and (max-width: $mobile) {
        nav {
            .searchField {
                grid-column: 3/8;
            }
            .user {
                grid-column: 8/13;

                .name{
                    margin-left: 8px;
                }
                .avatar{
                    display: none;
                }
            }
        }
    }


</style>