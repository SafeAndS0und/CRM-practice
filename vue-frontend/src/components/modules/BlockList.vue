<template>
    <div class="block-list">
        {{$route.params.id}}
        <Block block-name="Informacje Podstawowe" class="block"/>
        <Block block-name="Informacje Kontaktowe" class="block"/>
    </div>
</template>

<script>
    import Block from '../../components/modules/Block.vue'

    export default {
        name: "BlockList",
        components:{
            Block
        }
    }
</script>

<style scoped lang="scss">
    .block-list{

        .block{
            margin: 15px auto;
            width: 90%;
        }
    }
</style>