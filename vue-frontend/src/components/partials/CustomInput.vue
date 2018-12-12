<template>
    <input type="text" :placeholder="placeholder" v-model="content" @input="$emit('input', content)">
</template>

<script>
    export default {
        name: "CustomInput",
        props:{
            placeholder: String,
            value: String
        },
        data(){
            return {
                content: this.value
            }
        }
    }
</script>

<style scoped lang="scss">

    @import '../../assets/css/variables.scss';

    input{
        color: #e7e7e7;
        border: none;
        background-color: $inputBgC;
        padding: 6px 10px;
        transition: 250ms;
        border-radius: 2px;

        &:focus{
            outline: none;
            background-color: #343538;

          }

        &::placeholder{
            color: #b4b4b4;
        }
    }



</style>