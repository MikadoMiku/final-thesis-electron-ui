<script setup lang="ts">
import Header from "./Header.vue"
import MainNavMenu, { type routeButton } from "./MainNavMenu.vue"
import { computed, ref } from "vue"

const navButtonsArray: routeButton[] = [
    { name: "Home", route: "/", function: "" },
    { name: "Audio endpoints", route: "/audioEndpoints", function: "" },
    { name: "Audio files", route: "/", function: "" },
    { name: "Audio macros", route: "/", function: "" },
    { name: "Testing", route: "/testing", function: "" },
    { name: "Ping wheel", route: "/pingWheel", function: "" },
]
</script>
<template>
    <div class="main-layout-container">
        <div class="row-3 col-24 header-container glow" id="header-container">
            <!-- <img height="110" src="../assets/DemutLogo1.svg" /> -->
            <Header></Header>
        </div>
        <div class="row-21 col-24 body-container glow">
            <div class="row-24 col-6 body-left">
                <MainNavMenu
                    :use-routes="true"
                    :buttons="navButtonsArray"
                ></MainNavMenu>
            </div>
            <div class="row-24 col-18 body-right">
                <div class="row-24 col-24 router-content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-layout-container {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: linear-gradient(0deg, black -5%, #171717);
}

.header-container {
    border-bottom: 1px solid var(--accent-color);
}

.body-container {
    position: relative;
}

.body-left {
    box-shadow: 5px 0px 5px -4px var(--accent-color);
}

.body-content {
    position: absolute;
    right: 4%;
    top: 12.5%;
}

.body-right {
    padding: 30px;
}

.router-content {
    background: var(--component-b-color);
    border-radius: 10px;
    box-shadow: 0px 0px 15px var(--accent-color);
    overflow: hidden;
}

.glow {
    box-shadow: 0px 2px 5px -3px var(--accent-color);
}

button {
    width: 100%;
    height: 10%;
}
</style>
