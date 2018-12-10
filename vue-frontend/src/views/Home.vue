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
            margin: auto;
        }
        a{
            text-decoration: none;
        }
    }
</style>
