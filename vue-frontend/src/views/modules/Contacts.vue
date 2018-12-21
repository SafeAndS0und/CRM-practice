<template>
    <div class="contacts" style="margin-bottom: 600px">
        <nav>
            <router-link to="/contacts">Lista</router-link>
            <router-link to="/contacts/details">Szczegóły</router-link>
            <router-link to="/contacts">Edycja</router-link>
        </nav>

        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Contacts",

    }
</script>

<style scoped lang="scss">

    .contacts {
        margin-top: 140px;
        display: grid;
        grid-template-columns: repeat(12, 1fr);

        nav {
            grid-column: 1/-1;
            justify-self: center;
            align-self: center;
            height: 50px;
            margin-bottom: 30px;

            a {
                line-height: 50px;
                font-size: 16px;
                text-decoration: none;
                text-align: center;
                color: white;
                padding: 15px 40px;
                margin: auto;
                background-color: #4d4b4e;

                &:hover {
                    background-color: #5d5b5e;
                }
            }
        }

        .content{
            grid-column: 2/12;
        }
    }

</style>