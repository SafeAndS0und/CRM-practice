<template>
    <div class="sidebar">
        <section>
            <article></article>
            <article></article>
            <article></article>
        </section>
    </div>
</template>

<script>
    export default {
        name: "sidebar"
    }
</script>

<style scoped lang="scss">
    @import '.././assets/css/variables.scss';

    .sidebar{
        height: calc(100vh - 68px);
        position: fixed;
        background-color: transparent;
        width: 100%;

        section{
            position: absolute;
            margin: auto 0;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);

            article{
                width: 100%;
                height: 140px;
                transition: 250ms;
                cursor: pointer;
            }
            article:nth-child(1){
                background-color: #0077cb;

                &:hover{
                    background-color: #0062b4;
                }
            }
            article:nth-child(2){
                background-color: #de5a19;

                &:hover{
                    background-color: #c35727;
                }
            }
            article:nth-child(3){
                background-color: #de3f7b;

                &:hover{
                    background-color: #be3764;
                }
            }
        }
    }



    @media screen and (max-width: $mobile) {
        .sidebar{
            margin-top: 150px;
            section{
                top: 0;


                article{
                    height: 100px;
                }
            }
        }
    }

</style>