<template>
    <section>
        <h1>{{blockName}}</h1>

        <div class="info">
            <article>
                <h5>Numer</h5>
                <p>C3</p>
            </article>

            <article>
                <h5>Imię</h5>
                <p>Nikodem</p>
            </article>

            <article>
                <h5>Nazwisko</h5>
                <p>Lorenz</p>
            </article>

            <article>
                <h5>Firma</h5>
                <p>Google</p>
            </article>

            <article>
                <h5>Czas Utworzenia</h5>
                <p>24.01.2017 </p>
            </article>

            <article>
                <h5>Czas Edycji</h5>
                <p>24.01.2017</p>
            </article>

        </div>

    </section>
</template>

<script>
    export default {
        name: "Block",
        props: {
            blockName: String,


        }
    }
</script>

<style scoped lang="scss">

    section {
        width: 100%;
        background-color: #232323;
        display: grid;
        padding: 15px;
        color: #dadada;
        border-radius: 3px;
        position: relative;

        h1 {
            text-align: center;
            font-size: 17px;
            font-weight: normal;
            margin-bottom: 20px;
            letter-spacing: 3px;
        }


        .info {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            grid-gap: 5px;

            article {
                background-color: #333333;
                padding: 5px;
                text-align: center;
                display: inline-block;
                transition: 100ms;
                cursor: pointer;

                h5 {
                    font-size: 15px;
                    font-weight: lighter;
                    letter-spacing: 2px;
                    margin-bottom: 5px;

                }

                p {
                    font-size: 13px;
                    margin-bottom: 5px;
                }

                &:hover{
                    background-color: #3f3f3f;
                }
            }
        }

    }

</style>