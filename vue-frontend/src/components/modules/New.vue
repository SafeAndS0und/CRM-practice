<template>
    <div class="new-container">

        <div v-for="(value, key) of fields">
            <p>{{key}}</p>
            <section>
                <article v-for="field of value">
                    <CustomInput :placeholder="field" v-if="module === 'contact'"/>
                </article>
            </section>

            <!-- Make fields object into an array, take the last item and see if it matches with the current one from iteration -->
            <button v-if="Object.keys(fields)[Object.keys(fields).length - 1] === key" @click="addContact">Zapisz</button>
        </div>
    </div>
</template>

<script>
    import CustomInput from '../partials/CustomInput.vue'

    export default {
        name: "New",
        components: {CustomInput},
        data(){
            return {
                // TODO: change to dynamic module
                module: 'contact',
                fields: []
            }
        },
        created(){
            // TODO: Change if to switch
            if(this.module === 'contact'){
                import('../../assets/js/modules/contactData')
                    .then(module =>{
                        this.fields = module.default.fields
                        console.log()
                    })
            }
        },
        methods: {
            addContact(){

            }
        }
    }
</script>

<style scoped lang="scss">

    .new-container {
        display: grid;
        background-color: #272528;
        border-radius: 5px;
        color: #d7d7d7;
        padding: 15px;

        div {

            p {
                text-align: center;
                grid-column: 1/-1;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: #949196;
            }

            section {
                margin-bottom: 20px;
                padding: 10px;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                grid-gap: 8px;
                justify-items: center;

                article {

                }

            }

            button {
                display: block;
                border: none;
                width: 95%;
                margin: 30px auto 20px auto;
                height: 50px;
                color: #a4a4a4;
                background-color: #353336;
                cursor: pointer;
                transition: 150ms;

                &:hover{
                    background-color: #403e41;
                }

            }
        }
    }

</style>