<template>
    <textarea type="text"
           :placeholder="placeholder"
           v-bind:value="value"
           v-on:input="$emit('input', $event.target.value)">
    </textarea>
</template>

<script>
    export default {
        name: "CustomInput",
        props:['placeholder','value'],

    }
</script>

<style scoped lang="scss">

    @import '../../assets/css/variables.scss';

    textarea{
        resize: vertical;
        color: #e7e7e7;
        border: none;
        background-color: $inputBgC;
        padding: 6px 10px;
        transition: 250ms;
        border-radius: 2px;
        height: 100px;
        min-height: 40px;
        max-height: 250px;
        justify-self: center;

        &:focus{
            outline: none;
            background-color: #343538;

        }

        &::placeholder{
            color: #b4b4b4;
        }
    }



</style>