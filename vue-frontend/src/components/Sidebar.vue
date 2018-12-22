<template>
    <div class="sidebar">
        <section>
            <article @click="$router.push('/contacts')">
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
        name: "Sidebar"
    }
</script>

<style scoped lang="scss">
    @import '.././assets/css/variables.scss';

    .sidebar {
        z-index: 101;
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
                border-top-right-radius: 5px;
                background-color: #1e64cb;

                &:hover {
                    background-color: #1e5cb8;
                }
            }
            article:nth-child(2) {
                background-color: #de6b3e;

                &:hover {
                    background-color: #ca5e34;
                }
            }
            article:nth-child(3) {
                background-color: #cf4371;
                border-bottom-right-radius: 5px;
                &:hover {
                    background-color: #b22f65;
                }
            }
        }
    }

    @media screen and (min-width: $tablet) {
        .sidebar{
            top: 0;
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