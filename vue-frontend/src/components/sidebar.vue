<template>
    <div class="sidebar">
        <section>
            <article>
                <v-icon name="regular/address-book" scale="2.6" class="icon"/>
                <h3>Kontakty</h3>
            </article>
            <article>
                <v-icon name="regular/handshake" scale="2.6" class="icon"/>
                <h3>Kontrahenci</h3>
            </article>
            <article>
                <v-icon name="file-alt" scale="2.6" class="icon"/>
                <h3>Faktury</h3>
            </article>
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

    .sidebar {
        height: calc(100vh - 68px);
        position: fixed;
        background-color: transparent;
        width: 100%;

        section {
            position: absolute;
            margin: auto 0;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);

            article {
                width: 100%;
                height: 140px;
                transition: 250ms;
                cursor: pointer;
                display: grid;
                align-items: center;
                justify-items: center;
                grid-template-rows: 25% 36% 25%;

                .icon {
                    grid-row: 2;
                    color: #ffffff;

                }

                h3 {
                    font-weight: lighter;
                    grid-row: 3;
                    color: #e6e6e6;
                    letter-spacing: 3px;
                    font-size: 16px;
                }
            }
            article:nth-child(1) {
                border-top-right-radius: 6px;
                background-color: #0077cb;

                &:hover {
                    background-color: #0062b4;
                }
            }
            article:nth-child(2) {
                background-color: #de5a19;

                &:hover {
                    background-color: #c35727;
                }
            }
            article:nth-child(3) {
                background-color: #de3f7b;
                border-bottom-right-radius: 6px;
                &:hover {
                    background-color: #be3764;
                }
            }
        }
    }

    @media screen and (max-width: $tablet) {
        .sidebar {
            section {
                article:nth-child(1) {
                    border-top-right-radius: 0;
                }
                article:nth-child(3) {
                    border-bottom-right-radius: 0;
                }
            }
        }
    }

    @media screen and (max-width: $mobile) {
        .sidebar {
            margin-top: 150px;
            section {
                top: 0;

                article {
                    height: 100px;

                }
            }
        }
    }

</style>