<template>
    <div class="dropdown">
        <article class="profile">Profil</article>
        <article class="options">Ustawienia</article>
        <article class="logout" @click="logout">Wyloguj się</article>
    </div>
</template>

<script>
    export default {
        name: "Dropdown",
        methods: {
            logout(){
            }
        }
    }
</script>

<style scoped lang="scss">

    .dropdown{

        article{
            height: 50px;
            text-align: center;
            line-height: 50px;
            color: white;
            background-color: #323232;
            width: 100%;
            border-bottom: 1px solid #3b3b3b;
            transition: 150ms;
            cursor: pointer;

            &:hover{
                background-color: #232323;
            }
        }
    }

</style>