<template>
    <div class="dropdown">
        <article class="profile" @click="$router.push('/profile')">Profil</article>
        <article class="options" @click="$router.push('/admin/configuration')">Ustawienia</article>
        <article class="logout" @click="logout">Wyloguj się</article>
    </div>
</template>

<script>
    export default {
        name: "Dropdown",
        methods: {
            logout(){
                localStorage.clear()
                this.$store.dispatch('clearUserData')
                this.$emit('hideDropdown')
            }
        }
    }
</script>

<style scoped lang="scss">

    @import '../assets/css/variables.scss';

    .dropdown{
        z-index: 101;

        article{
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 15px;
            color: white;
            background-color: $blockBgC;
            width: 100%;
            border-bottom: 1px solid #3b3b3b;
            transition: 150ms;
            cursor: pointer;

            &:hover{
                background-color: #1b1b1b;
            }
        }
    }

</style>