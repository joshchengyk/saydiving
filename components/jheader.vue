<template>
    <div>
        <header>
            <div class='container header-container'>
                <div>
                    <b-navbar toggleable="lg" >
                        <b-navbar-brand href=""><nuxt-link to='/'><img src='/pictures/logo.png' width='155'></nuxt-link></b-navbar-brand>
                        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>    
                        <b-collapse id="nav-collapse" is-nav>
                        <b-navbar-nav>
                            <b-nav-item class='header-nav'><nuxt-link to='/news'>最新活動</nuxt-link></b-nav-item>
                            <b-nav-item class='header-nav'><nuxt-link to='/lessons'>課程報名</nuxt-link></b-nav-item>
                            <b-nav-item class='header-nav'><nuxt-link to='/photos'>精彩回顧</nuxt-link></b-nav-item>
                            <b-nav-item class='header-nav'><nuxt-link to='/faq'>常見問題</nuxt-link></b-nav-item>
                            <b-nav-item class='header-nav'><nuxt-link to='/aboutus'>關於我們</nuxt-link></b-nav-item>
                        </b-navbar-nav>

                        <!-- Right aligned nav items -->
                        <b-navbar-nav class="ml-auto">

                            <b-nav-item-dropdown v-if='getuserjwt' right class='mt8' >
                                <!-- Using 'button-content' slot -->
                                <template #button-content>
                                    {{getfirstname}}
                                </template>
                                <b-dropdown-item href=""><nuxt-link to='/users/my-account'> 我的帳號{{getuserjwt}}</nuxt-link></b-dropdown-item>
                                <b-dropdown-item @click='logout' >登出 </b-dropdown-item>
                            </b-nav-item-dropdown>
                            <b-nav-item v-if='!getuserjwt' class='mt8'><nuxt-link to='/users/login'><svg class='someright' width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M13.033 2v-2l10 3v18l-10 3v-2h-9v-7h1v6h8v-18h-8v7h-1v-8h9zm1 20.656l8-2.4v-16.512l-8-2.4v21.312zm-3.947-10.656l-3.293-3.293.707-.707 4.5 4.5-4.5 4.5-.707-.707 3.293-3.293h-9.053v-1h9.053z"/></svg> 登入</nuxt-link></b-nav-item>
                            <b-nav-item><nuxt-link class="btn btnnew" to='/'>馬上報名</nuxt-link></b-nav-item>
                        </b-navbar-nav>
                        </b-collapse>
                    </b-navbar>
                </div>
                
            </div>
        </header>
    </div>
</template>

<script>
import { mapMutations} from 'vuex'
export default {
    computed:{
        getuserjwt(){
            return this.$store.getters['auth/getuserjwt']
        },

        getfirstname(){
            return this.$store.getters['auth/getfirstname']
        }
    },

    methods:{
        ...mapMutations({
            logout: 'auth/logout'
        })
    }
}
</script>
<style>
    a:hover{
        text-decoration: none;
    }
</style>