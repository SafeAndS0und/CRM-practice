<template>
    <div class="products">
        <h1>produkty</h1>

        <section class="new">
            <button @click="addingNew = !addingNew" v-if="!addingNew">Dodaj nowy produkt</button>

            <div class="form" v-if="addingNew">
                <CustomInput placeholder="Nazwa Pozycji" v-model="newProductValues['positionName']"/>
                <CustomInput placeholder="Opis" v-model="newProductValues['description']"/>
                <CustomInput placeholder="Ilość" v-model="newProductValues['amount']"/>
                <CustomInput placeholder="Jednostka" v-model="newProductValues['unit']"/>
                <Select placeholder="Podatek" field-name="taxes" v-model="newProductValues['tax']"/>
                <CustomInput placeholder="Cena jednostkowa net." v-model="newProductValues['netUnitPrice']"/>
                <v-icon name="long-arrow-alt-right" class="addIcon" scale="2" @click.native="addNew"/>
            </div>
        </section>

        <section class="existing">
            <article v-for="(product, i) of products">
                <h3>{{product.positionName}}</h3>
                <p class="description">{{product.description}}</p>

                <div class="finance">
                    <p class="amount">Ilość: <span>{{product.amount}}</span></p>
                    <p>Jednostka: <span>{{product.unit}}</span></p>
                    <p>Podatek: <span>{{product.tax}}%</span></p>
                    <p>Cena jednostkowa: <span>{{product.netUnitPrice}}</span></p>
                    <p>Cena netto: <span>{{product.netPrice}}</span></p>
                    <p>Cena brutto: <span>{{product.grossPrice}}</span></p>
                    <v-icon name="trash" class="remove" scale="1.5"
                            @click.native="remove(product._id, i)"
                    />
                </div>

            </article>
        </section>
    </div>
</template>

<script>
    import CustomInput from '../partials/CustomInput.vue'
    import Select from '../partials/Select.vue'

    export default {
        name: "Products",
        components: {CustomInput, Select},
        props: ['products', 'invoice_id'],
        data(){
            return {
                addingNew: false,
                newProductValues: {}
            }
        },
        methods: {
            addNew(){
                this.newProductValues['invoice_id'] = this.invoice_id
                this.axios.post('/product', this.newProductValues)
                    .then(res => {
                        this.products.push(this.newProductValues)
                        this.addingNew = !this.addingNew
                    })
                    .catch(err => console.log(err))
            },
            remove(id, index){
                this.axios.delete('/product/p/' + id)
                    .then(res => {
                        this.products.splice(index, 1)
                    })
                    .catch(err => console.log(err.response))
            }
        }
    }
</script>

<style scoped lang="scss">

    .products {
        margin: 40px 0;

        h1 {
            font-weight: lighter;
            text-align: center;
            font-size: 25px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #373737;
        }

        .new {

            button {
                display: block;
                width: 70%;
                margin: 20px auto;
                border: none;
                padding: 10px 0;
                background-color: #ebebeb;
                letter-spacing: 2px;
                color: #373538;
                cursor: pointer;
                transition: 250ms;

                &:hover {
                    width: 68%;
                    background-color: #e3dee6;
                }
            }

            .form {
                padding: 10px;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                grid-gap: 5px;

                input, select {
                    background-color: #ebebeb;
                    color: #737373;
                }

                .addIcon {
                    justify-self: center;
                    align-self: center;
                    width: 100%;
                    background-color: #3882ee;
                    color: white;
                    cursor: pointer;

                    &:hover {
                        background-color: #3972e0;
                    }
                }
            }

        }

        .existing {
            margin-top: 20px;
            padding: 10px;
            background-color: #ebebeb;

            article {
                margin-bottom: 25px;

                h3 {
                    font-weight: normal;
                    font-size: 20px;
                    letter-spacing: 3px;
                }

                .description {
                    padding-top: 3px;
                    font-size: 14px;
                    color: #686669;
                    margin-bottom: 12px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid #d7d7d7;
                }

                .finance {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                    grid-column-gap: 4px;
                    grid-row-gap: 15px;

                    p {
                        font-size: 13px;
                        padding: 6px;
                        background-color: #dcdcdc;
                        color: #49454b;

                        &:hover {
                            background-color: #d2d2d2;
                            cursor: pointer;
                        }

                        span {
                            font-size: 14px;
                            color: #131314;
                        }

                        &:nth-child(even){
                            background-color: #e1e1e1;
                        }
                    }

                    .remove {
                        justify-self: center;
                        align-self: center;
                        padding: 9px 0;
                        width: 90%;
                        background-color: #7a2b2b;
                        color: white;
                        cursor: pointer;

                        &:hover {
                            background-color: #8e3030;
                        }

                    }
                }
            }
        }
    }

</style>