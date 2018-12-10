<template>
    <div id="app">
        <component :is="layout">
            <router-view/>
        </component>
    </div>
</template>

<script>
    export default {
        computed: {
            layout(){
                if(this.$route.meta.layout === 'none') return 'empty-layout'
                return (this.$route.meta.layout || 'default') + '-layout'
            }
        }
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Chivo');

    body, * {
        margin: 0;
        padding: 0;
        font-family: 'Chivo', sans-serif;
    }

</style>
