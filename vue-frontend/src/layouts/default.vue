<template>
    <div>
        <navbar/>


        <v-touch @swipeleft="showSidebar = false">
            <transition name="slide">
                <sidebar v-if="showSidebar" class="sidebar"/>
            </transition>
        </v-touch>


        <v-icon name="bars" @click.native="showSidebar = !showSidebar" class="toggleSidebar"></v-icon>

        <div style="margin-bottom: 70px">
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
        padding: 26px 30px;
        top: 0;
        left: 0;
        color: #353336;
        transition: 200ms;
        cursor: pointer;
        background-color: rgba(182, 89, 85, 0.95);

        &:hover, &:active {
            color: #e7e7e7;
            background-color: rgba(132, 57, 52, 0.95);
        }
    }

    .sidebar {
        width: 140px;
    }

    @media screen and (max-width: $mobile) {

        .toggleSidebar {
            padding: 26px 18px;
            opacity: 0.5;
        }

        .sidebar {
            width: 100vw;
        }

        .slide-enter-active, .slide-leave-active {
            transition: 0.8s;
        }
        .slide-enter {
            transform: translateX(-670px);
        }

        .slide-leave-to {
            transform: translateX(-670px);
        }
    }

    @media screen and (min-width: $mobile) {
        .slide-enter-active, .slide-leave-active {
            transition: .6s;
        }
        .slide-enter {
            transform: translateX(-210px);
        }

        .slide-leave-to {
            transform: translateX(-210px);
        }
    }

</style>