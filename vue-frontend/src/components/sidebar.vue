<template>
    <div class="sidebar">I'm a menu</div>
</template>

<script>
    export default {
        name: "sidebar"
    }
</script>

<style scoped lang="scss">
    .sidebar{
        height: calc(100vh - 65px);
        position: fixed;
        background-color: #575356;
        width: 100%;
    }

</style>