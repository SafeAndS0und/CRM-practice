<template>
    <footer>
        <h3>CRM System © 2018</h3>
        <a href="https://github.com/SafeAndS0und/CRM-practice" target="_blank">
            <v-icon name="brands/github" scale="2" class="github" @click.native=""/>
        </a>
    </footer>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped lang="scss">

    footer {
        width: 100%;
        margin-top: 30px;
        height: 60px;
        background-color: #323232;
        position: relative;

        h3 {
            position: absolute;
            bottom: 19px;
            right: 30px;
            font-weight: lighter;
            font-size: 16px;
            color: #767477;
        }

        .github {
            position: absolute;
            bottom: 12px;
            left: 30px;
            color: #626063;
            transition: 200ms;

            &:hover {
                color: #ababab;
                cursor: pointer;
            }
        }
    }

</style>