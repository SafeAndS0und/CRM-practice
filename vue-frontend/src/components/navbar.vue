<template>
    <nav>
        <CustomInput class="searchField" placeholder="Wyszukaj modułu"/>

        <div class="user">

            <img class="avatar" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-128.png" width="34"/>
            <p>Nikodem Lorenz</p>

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
        height: 68px;
        width: 100%;
        background-color: $navbarC;
        display: grid;
        grid-template-columns: repeat(12, 1fr);

        .searchField {
            align-self: center;
            grid-column: 6/8;
            height: 24px;
        }

        .user {
            grid-column: 11/13;
            align-self: center;
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

            p {
                margin-left: 51px;
                color: white;
                font-size: 16px;
                line-height: 34px;
                display: inline-block;
            }
        }
    }

    @media screen and (max-width: $tablet) {
        nav {
            .searchField {
                grid-column: 3/9;
            }

            .user {
                grid-column: 10/13;
                align-self: center;
                position: relative;

                p {
                    line-height: 1em;
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
                grid-column: 9/13;
            }
        }
    }


</style>