<template>
    <footer>
        <div>
            <h3>CRM System © 2018</h3>
            <a href="https://github.com/SafeAndS0und/CRM-practice" target="_blank">
                <v-icon name="brands/github" scale="2" class="github" @click.native=""/>
            </a>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped lang="scss">

    @import '../assets/css/variables.scss';

    footer {
        width: 100%;
        margin-top: 30px;
        height: 50px;
        background-color: $blockBgC;
        position: fixed;
        bottom: 0;

        div {
            position: relative;
            height: 100%;

            h3 {
                position: absolute;
                bottom: 15px;
                right: 30px;
                font-weight: lighter;
                font-size: 16px;
                color: #767477;
            }

            .github {
                position: absolute;
                bottom: 7px;
                left: 30px;
                color: #626063;
                transition: 200ms;

                &:hover {
                    color: #ababab;
                    cursor: pointer;
                }
            }
        }
    }

</style>