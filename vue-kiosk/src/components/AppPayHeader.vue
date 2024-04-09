<template>
<div class="pays-logo">
    <img src="../assets/images/test2.png" v-on:click="goHome">
</div>
</template>

<script>
import '@/assets/css/payment/payend.css'

export default{
    name : "AppPayHeader",
    components : {},
    data (){
        return {

        };
    },
    methods : {
        goHome(){
            this.$router.push("/");
        }
    },
    created (){

    }    
}
</script>

<style>

</style>