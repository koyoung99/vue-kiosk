<template>
    <div class="wrap">
        <!-- <img class="hostImg" src="@/assets/images/logo.png"> -->
        <div id="settingMenuBtn">
            <span class="SettingHomeImg"><router-link to="/manager/loginform" class="home">
                    <img src="@/assets/images/home_icon.png"></router-link>
                </span>
                <!--  <span class="SettingHomeImg"><router-link to="">
                            <img src="@/assets/images/home_icon.png"></router-link>
                    </span> -->
            
            <div class="MenuButtonGroup">
                <button><router-link to="/manager">메뉴등록</router-link></button>
                <button><router-link to="/chart/main">총매출</router-link></button>
                <button><router-link to="/chart/coffeeview">카테고리매출</router-link></button>
            </div>
        </div>
    </div>
</template>


<script>
import '@/assets/css/settingMenu.css'

export default {
    name: "SettingMenuView",
    components: {},
    data() {
        return {};
    },
    methods: {},
};
</script>


<style></style>
