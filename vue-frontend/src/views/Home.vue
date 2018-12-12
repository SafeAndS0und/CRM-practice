<template>
    <div class="home">
        <h1 class="text">CRM - projekt stażowy</h1>
        <img alt="Vue logo" src="../assets/logo.png">
        <router-link to="/login">Zaloguj się</router-link>

    </div>
</template>

<script>
    export default {

    }
</script>
<style scoped lang="scss">
    @import '../assets/css/variables.scss';

    .home {
        text-align: center;
        margin-top: 150px;
        h1 {
            text-align: center;
            font-size: 42px;
            font-weight: lighter;
        }
        img {
            display: block;
            margin: 80px auto;
        }
        a{
            font-size: 22px;
            color: #1e5aff;
            padding: 12px 120px;
            text-decoration: none;
            transition: 280ms;
            background-color: #eeeeee;


            &:hover{
                background-color: #296aff;
                color: white;
            }
        }
    }

    @media screen and (max-width: $mobile) {
        .home {
            margin-top: 30px;
            a{
                padding: 12px 80px;
                margin-bottom: 50px;
                background-color: #2367cf;
                color: white;
            }
        }
    }
</style>
