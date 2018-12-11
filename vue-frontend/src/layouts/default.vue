<template>
    <div>
        <navbar/>

        <transition name="slide">
            <sidebar v-if="showSidebar" class="sidebar"/>
        </transition>

        <v-icon name="bars" @click.native="showSidebar = !showSidebar" class="toggleSidebar"></v-icon>

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
        components: {
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

    .toggleSidebar {
        position: fixed;
        padding: 5px;
        top: 20px;
        left: 20px;
        color: #353336;
        transition: 200ms;
        cursor: pointer;

        &:hover, &:active {
            color: #e7e7e7;
        }
    }

    .sidebar {
        width: 140px;
    }

    @media screen and (max-width: $mobile) {
        .sidebar {
            width: 100vw;
        }
    }



    .slide-enter-active, .slide-leave-active {
        transition: .8s;
    }
    .slide-enter{
        transform: translateX(-350px);
    }

    .slide-leave-to{
        transform: translateX(-350px);
    }

</style>