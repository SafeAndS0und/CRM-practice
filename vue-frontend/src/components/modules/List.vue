<template>
    <div class="list">
        <router-link :to="`/${moduleName}/details/${moduleObj._id}`">
            <article v-for="field of fields">
                <h5>{{field.pl}}</h5>
                <p>{{refactorValue(moduleObj[field.eng], field.eng)}}</p>
            </article>

        </router-link>

        <div class="icons">
            <v-icon name="trash" scale="1.2" @click.native="del(moduleObj._id)" class="icon"/>
            <v-icon name="pencil-alt" scale="1.2" class="icon" @click.native="$router.push(`/${moduleName}/update/` + moduleObj._id)"/>
            <v-icon name="check-square" scale="1.2" class="icon" :class="{active: selected}" @click.native="select"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "List",
        props: ['moduleObj', 'fields', 'moduleName'],
        computed: {
            type(){
                switch(this.moduleName){
                    case 'contacts':
                        return 'c'
                    case 'contractors':
                        return 'k'
                    case 'invoices':
                        return 'f'
                }
            },
            shortenedModuleName(){
                // e.g contacts => contact
                return this.moduleName.substring(0, this.moduleName.length - 1)
            },
        },
        methods: {

            refactorValue(value, field){
                if(value === false || value === true) return ''
                else if(field === 'recordOwner') return value.firstname + ' ' + value.surname
                else if(field === 'creationTime') return new Date(value).toLocaleString()
                else if(field === 'contractor') return value.name
                else if(field === 'status') return this.translateStatus(value)
                else return value
            },

            translateStatus(status){
                switch(status){
                    case '1':
                        return 'Wersja Robocza'
                    case '2':
                        return 'Wymaga Weryfikacji'
                    case '3':
                        return 'Zatwierdzona'
                    case '4':
                        return 'Wyksięgowana'
                    case '5':
                        return 'Zaksięgowana'
                    case '6':
                        return 'Anulowana'
                }
            },


            del(id){
                this.axios.delete(`/${this.shortenedModuleName}/${this.type}/` + id)
                    .then(res => {

                       this.$emit('deleted', id)
                    })
                    .catch(err => console.log(err.response))
            },
            select(){
                this.selected = !this.selected
            }
        },
        data(){
            return {
                selected: false
            }
        }
    }
</script>

<style scoped lang="scss">

    @import '../../assets/css/variables';

    .list {
        position: relative;

        a {
            border-radius: 4px;
            text-decoration: none;
            display: grid;
            width: 100%;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            background-color: #222023;
            padding: 5px;
            grid-gap: 4px;
            transition: 120ms;

            article {
                border-radius: 3px;
                color: #dadada;
                text-align: center;
                padding: 4px;
                background-color: #323033;
                display: inline-block;
                cursor: pointer;
                transition: 150ms;

                h5 {
                    font-size: 13px;
                    font-weight: lighter;
                    letter-spacing: 1px;
                    margin-bottom: 3px;
                }

                p {
                    font-size: 12px;
                    margin-bottom: 0;
                }

            }


            &:hover {
                background-color: #1d1c1d;
                /*transform: translateX(8px);*/

                article {
                    background-color: rgba(59, 58, 60, 0.95);
                }
            }
        }

        .icons {
            padding: 5px;
            position: absolute;
            top: 10px;
            right: -120px;
            border-radius: 10px;

            .icon {
                /*box-sizing: border-box;*/
                grid-row: 1;
                justify-self: center;
                align-self: center;
                padding: 10px 5px;
                transition: 200ms;
                cursor: pointer;
                color: #2f2f2f;

                &:first-child:hover {
                    color: #ab1a2a;
                }
                &:nth-child(2):hover {
                    color: #c87356;
                }
                &:last-child:hover {
                    color: #285897;
                }
            }
        }

        .active {
            color: #2776e2 !important;
        }
    }

    @media screen and (max-width: $tablet) {
        .list {
            position: relative;

            a {
                box-sizing: border-box;
                border-radius: 0;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                padding: 8px 6px;
                grid-gap: 1px;


                article {
                    border-radius: 0;
                    color: #dadada;
                    text-align: center;
                    padding: 4px;
                    background-color: #323033;
                    display: inline-block;
                    cursor: pointer;
                    transition: 150ms;

                    h5 {
                    }

                    p {
                    }

                }
            }

            .icons {
                padding: 0;
                box-sizing: border-box;
                width: 100%;
                position: static;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                .icon {
                    color: white;
                    width: 100%;

                    &:first-child {
                        background-color: #1d1d1d;
                    }
                    &:nth-child(2) {
                        background-color: #252525;
                    }
                    &:last-child {
                        background-color: #1d1d1d;
                    }

                }
            }
        }
    }

</style>