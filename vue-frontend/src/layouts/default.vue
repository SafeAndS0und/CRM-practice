<template>
    <div>
        <navbar/>

        <sidebar v-if="showSidebar" class="sidebar" />
        <div @click="showSidebar = !showSidebar" class="toggleSidebar"></div>

        <div>
            <slot/>
        </div>

    </div>
</template>

<script>
    import navbar from '../components/navbar.vue'
    import sidebar from '../components/sidebar.vue'

    export default {
        name: "default",
        components:{
            navbar, sidebar
        },
        data(){
            return {
                showSidebar: false
            }
        }
    }
</script>

<style scoped lang="scss">

    @import '../assets/css/variables.scss';

    .toggleSidebar{
        position: fixed;
        top: 20px;
        left: 20px;
        padding: 15px;
        background-color: #d1d1d1;
    }

    .sidebar{
        width: 140px;
    }

    @media screen and (max-width: $mobile) {
        .sidebar{
            width: 100vw;
        }
    }

</style>