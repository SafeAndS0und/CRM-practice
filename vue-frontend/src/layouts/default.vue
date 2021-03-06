<template>
    <div>
        <transition name="hideNav">
            <Navbar @toggleDropdown="showDropdown = !showDropdown" v-if="showNavbar"/>
        </transition>

        <v-touch @swipeleft="showSidebar = false">
            <transition name="slide">
                <Sidebar v-if="showSidebar" class="sidebar"/>
            </transition>
        </v-touch>


        <v-icon name="bars" @click.native="showSidebar = !showSidebar" class="toggleSidebar"></v-icon>

        <div style="margin-bottom: 70px">
            <slot/>
        </div>

        <transition name="slideRight">
            <Dropdown v-if="showDropdown" @hideDropdown="showDropdown = false" class="dropdown"/>
        </transition>

        <transition name="hideFooter">
            <Footer v-if="showFooter"/>
        </transition>

    </div>
</template>

<script>
    import Navbar from '../components/Navbar.vue'
    import Footer from '../components/Footer.vue'
    import Dropdown from '../components/Dropdown.vue'
    import Sidebar from '../components/Sidebar.vue'

    export default {
        name: "default",
        components: {
            Navbar, Sidebar, Dropdown, Footer
        },
        created(){
            window.addEventListener('scroll', this.changeYOffset)
        },
        data(){
            return {
                showSidebar: false,
                showDropdown: false,
                pageYOffset: 0
            }
        },
        computed: {
            showNavbar(){
                return this.pageYOffset <= 30
            },

            showFooter(){
                return this.pageYOffset + window.innerHeight >= document.documentElement.offsetHeight
            }
        },
        methods: {
            changeYOffset(){
                this.pageYOffset = window.pageYOffset
            }
        }
    }
</script>

<style scoped lang="scss">

    @import '../assets/css/variables.scss';

    .toggleSidebar {
        z-index: 102;
        position: fixed;
        padding: 26px 30px;
        top: 0;
        left: 0;
        color: #b5acb9;
        transition: 200ms;
        cursor: pointer;

        &:hover, &:active {
            color: #ffffff;
            background-color: rgb(203, 63, 72);
        }
    }

    .sidebar {
        width: 140px;
    }

    .dropdown {
        position: fixed;
        top: 68px;
        right: 0;
        width: 250px;
    }

    @media screen and (max-width: $mobile) {

        .toggleSidebar {
            padding: 26px 18px;
            background-color: transparent;
            opacity: 1;
        }

        .sidebar {
            width: 50%;
        }

        .dropdown {
            position: fixed;
            top: 68px;
            right: 0;
            width: 50%;
        }

        .slide-enter-active, .slide-leave-active {
            transition: 0.8s;
        }
        .slide-enter {
            transform: translateX(-470px);
        }

        .slide-leave-to {
            transform: translateX(-470px);
        }
    }

    @media screen and (min-width: $mobile) {
        /* Menu Slide */
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

    /* Dropdown Slide*/

    .slideRight-enter-active, .slideRight-leave-active {
        transition: 0.8s;
    }

    .slideRight-enter {
        transform: translateX(400px);
    }

    .slideRight-leave-to {
        transform: translateX(400px);
    }




    /* TRANSITIONS */

    /* Nav */
    .hideNav-enter-active{
        transition: 300ms;
    }
    .hideNav-leave-active{
        transition: 300ms;
    }

    .hideNav-enter{
        transform: translateY(-70px);
    }
    .hideNav-enter-to{
        transform: translateY(0px);;
    }

    .hideNav-leave-to{
        transform: translateY(-70px);
    }


    /* Footer */
    .hideFooter-enter-active{
        transition: 300ms;
    }
    .hideFooter-leave-active{
        transition: 300ms;
    }

    .hideFooter-enter{
        transform: translateY(60px);
    }
    .hideFooter-enter-to{
        transform: translateY(0px);;
    }

    .hideFooter-leave-to{
        transform: translateY(60px);
    }

</style>