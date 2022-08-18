<script setup lang="ts">
import { sendMsg } from "../communication/communicator"
import { computed, ref } from "vue"
import { useAudioEndpointsStore } from "../stores/audioEndpointsStore"
import type { routeButton } from "./MainNavMenu.vue"
import MainNavMenu from "./MainNavMenu.vue"
const audioEndpoints = computed(() => {
    return useAudioEndpointsStore().audioEndpoints
})

const gotAudioEndpoints = computed(() => {
    return useAudioEndpointsStore().gotEndpoints
})

function getAudioEndpoints() {
    sendMsg("PING")
}

function chooseFunction(bFunction: string) {
    switch (bFunction) {
        case "getAudioEndpoints":
            getAudioEndpoints()
            break
        default:
            console.log("ERROR HANDLING REQUEST OF: ", bFunction)
    }
}

const navButtonsArray: routeButton[] = [
    { name: "Refresh", route: "/x", function: "getAudioEndpoints" },
]
</script>
<template>
    <div class="container">
        <div class="col-6 row-24 option-menu-container">
            <MainNavMenu
                :use-routes="false"
                :buttons="navButtonsArray"
                @nav-button-click="chooseFunction"
            ></MainNavMenu>
        </div>
        <div class="col-18 row-24 audio-endpoint-container">
            <p
                class="audio-endpoint"
                v-for="(endpoint, index) in audioEndpoints"
                :key="index"
            >
                {{ index + 1 }} - {{ endpoint }}
            </p>
        </div>
    </div>
</template>
<style scoped>
.container {
    width: 100%;
    height: 100%;
    padding: 10px;
}

.audio-endpoint-container {
    display: grid;
    grid-auto-rows: min-content;
    overflow-y: auto;
    grid-gap: 6px;
    padding: 10px;
    padding-left: 50px;
}

.option-menu-container {
    background-color: rgba(0, 0, 0, 0.137);
}
</style>
