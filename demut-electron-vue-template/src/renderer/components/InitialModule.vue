<script setup lang="ts">
import { sendMsg } from "../communication/communicator"
import { computed, ref } from "vue"
import { useAudioEndpointsStore } from "../stores/audioEndpointsStore"

const audioEndpoints = computed(() => {
    return useAudioEndpointsStore().audioEndpoints
})

const gotAudioEndpoints = computed(() => {
    return useAudioEndpointsStore().gotEndpoints
})

function getEndpoints() {
    sendMsg({type: "getAudioEndpoints"})
}

//getMapSize
</script>
<template>
    <div class="container">
        <div class="nested-button-container" v-if="!gotAudioEndpoints">
            <button class="counter-button" @click="getEndpoints()">
                Get audio endpoints
            </button>
        </div>
        <div class="audio-endpoint-container" v-else>
            <p
                class="audio-endpoint"
                v-for="(endpoint, index) in audioEndpoints"
                :key="index"
            >
                {{ index }} - {{ endpoint }}
            </p>
        </div>
    </div>
</template>
<style scoped>
.nested-button-container {
    height: 20%;
    width: 100%;
}
.container {
    height: 400px;
    width: 600px;
    position: absolute;
    top: calc(50% - 200px);
    left: calc(50% - 300px);
    background-color: hsla(160, 100%, 37%, 1);
}

.audio-endpoint-container {
    height: 100%;
    width: 100%;
    display: grid;
    grid-auto-rows: min-content;
    overflow-y: auto;
    grid-gap: 6px;
}

.audio-endpoint {
    color: rgb(192, 155, 51);
    height: 100%;
    width: 100%;
    color: black;
    font-weight: bold;
    font-size: 19px;
    text-align: center;
}
.counter-button {
    position: absolute;
    height: 40px;
    width: 100px;
    top: 40px;
    left: calc(50% - 50px);
}

.counter {
    position: absolute;
    height: 40px;
    width: 100px;
    top: 80px;
    left: calc(50% - 50px);
    color: black;
    text-align: center;
}
</style>
