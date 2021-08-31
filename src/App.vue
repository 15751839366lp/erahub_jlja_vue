<template>
    <router-view />
</template>

<script>
export default {
    name: 'app',
    created () {
        // // 在页面加载时读取sessionStorage
        // if (sessionStorage.getItem('store')) {
        //     this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
        // }
        // // 在页面刷新时将store保存到sessionStorage里
        // window.addEventListener('beforeunload', () => {
        //     sessionStorage.setItem('store', JSON.stringify(this.$store.state))
        // })

        //在页面加载时读取localStorage里的状态信息
        localStorage.getItem("store") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("store"))));

        //在页面刷新时将vuex里的信息保存到localStorage里
        window.addEventListener("beforeunload",()=>{
            localStorage.setItem("store",JSON.stringify(this.$store.state))
        })
    }
};
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
</style>
