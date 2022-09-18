<script setup lang="ts">
import { sendMsg } from "../communication/communicator"
import { computed, ref } from "vue"
import { useAudioEndpointsStore } from "../stores/audioEndpointsStore"
import type { routeButton } from "./MainNavMenu.vue"
import MainNavMenu from "./MainNavMenu.vue"
const audioEndpoints = computed(() => {
    return useAudioEndpointsStore().audioEndpointList
})

const gotAudioEndpoints = computed(() => {
    return useAudioEndpointsStore().gotEndpoints
})

function getAudioEndpoints() {
    sendMsg({ type: "getAudioEndpoints" })
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
    { name: "Get endpoints", route: "/x", function: "getAudioEndpoints" },
]

function setUsedAudioEndpointById(endpointId: string) {
    sendMsg({ type: "setAudioEndpointById", payload: endpointId })
}
</script>
<template>
    <div class="container">
        <div class="col-6 row-24 option-menu-container">
            <div class="col-24 row-3 current-endpoint-container">
                <div class="col-24 row-24 current-endpoint">
                    <p class="current-endpoint-text neonText pulsate">
                        VoiceMeeter Input (VB-Audio VoiceMeeter VAIO)
                    </p>
                </div>
            </div>
            <div class="col-24 row-21">
                <MainNavMenu
                    :use-routes="false"
                    :buttons="navButtonsArray"
                    @nav-button-click="chooseFunction"
                ></MainNavMenu>
            </div>
        </div>
        <div class="col-18 row-24 audio-endpoint-container">
            <div
                class="endpoint-button-container"
                v-for="(endpointId, endpointName, index) in audioEndpoints"
                :key="index"
            >
                <div class="col-1 row-24 endpoint-button-index">
                    <div class="col-24 row-24 endpoint-button-index-text">
                        <p class="neonText pulsate">{{ index + 1 }}</p>
                    </div>
                </div>
                <button
                    class="col-23 row-24 endpoint-button"
                    @click="setUsedAudioEndpointById(endpointId)"
                >
                    {{ endpointName }}
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.endpoint-button-index-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.endpoint-button-index {
    color: white;
}
.current-endpoint-container {
    background-color: rgb(14, 13, 13);
}
.current-endpoint {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.current-endpoint-text {
    color: white;
    font-size: var(--S-font-size);
    text-align: center;
}
.endpoint-button {
    background-color: #171717;
    color: white;
    color: var(--accent-color);
    font-size: var(--M-font-size);
}

.endpoint-button:hover {
    box-shadow: 0px 0px 5px 1px var(--accent-color);
    background: #050505;
}

.container {
    width: 100%;
    height: 100%;
    padding: 10px;
}

.audio-endpoint-container {
    display: grid;
    grid-auto-rows: max(5%, 10%);
    overflow-y: auto;
    grid-gap: 10px;
    padding: 10px;
    padding-left: 50px;
}

.option-menu-container {
    background: rgba(0, 0, 0, 0.247);
}

/* width */
::-webkit-scrollbar {
    width: 2px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #171717;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: var(--accent-color);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: rgb(177, 106, 0);
}
</style>
