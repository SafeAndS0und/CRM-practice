<template>
    <select
            :value="value"
            @input="$emit('input', $event.target.value)">

        <option v-for="opt in options"
                v-if="fieldName !== 'contractor'"
                :value="opt.val">{{opt.name}}</option>

        <option v-for="contractor in contractors"
                v-if="fieldName === 'contractor'"
                :value="contractor._id"
                >{{contractor.name}}</option>
    </select>

</template>

<script>


    export default {
        name: "Select",
        props: ['fieldName', 'value', 'contractors'],
        data(){
            return {
                options: []
            }
        },

        created(){
            if(this.fieldName === 'status'){
                this.options = [
                    {val: '0', name: 'Status Faktury'},
                    {val: '1', name: 'Wersja Robocza'},
                    {val: '2', name: 'Wymaga Weryfikacji'},
                    {val: '3', name: 'Zatwierdzona'},
                    {val: '4', name: 'Wyksięgowana'},
                    {val: '5', name: 'Zaksięgowana'},
                    {val: '6', name: 'Anulowana'}
                ]
            }

            if(this.fieldName === 'taxes'){
                this.options = [
                    {val: '0', name: '0%'},
                    {val: '5', name: '5%'},
                    {val: '8', name: '8%'},
                    {val: '23', name: '23%'},
                ]
            }
        }
    }
</script>

<style scoped lang="scss">

    @import '../../assets/css/variables.scss';

    select {
        background-color: $inputBgC;
        color: #b7b7b7;
        border: none;
        padding: 4px 8px;

        option {
            background-color: #20242c;
            padding: 6px 0;

            &:hover, &:active, &:focus, &:checked {
                background-color: #2c3038 !important;
            }
            &:first-child {
                background-color: #141313;

                &:hover {
                    background-color: #141313;

                }
            }
        }
    }

</style>