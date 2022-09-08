<script setup lang="ts">
import { sendMsg } from "../../communication/communicator"
import { computed, ref } from "vue"

function playSongInC() {
    sendMsg({ type: "playSong" })
}

function stopSongInC() {
    sendMsg({ type: "stopSong" })
}

function listAudioClips() {
    sendMsg({ type: "listAudioClips" })
}
</script>
<template>
    <div class="col-24 row-24 testing-dashboard-container">
        <div class="col-24 row-2 testing-dashboard-header">
            <h1 class="neonText pulsate">Testing dashboard</h1>
        </div>
        <div class="col-24 row-22 testing-dashboard-body">
            <div class="col-24 row-24 testing-module">
                <div class="col-16 row-24"></div>
                <div class="col-8 row-24">
                    <button class="col-12 row-24" @click="playSongInC()">
                        Play song
                    </button>
                    <button class="col-12 row-24" @click="stopSongInC()">
                        Stop song
                    </button>
                </div>
            </div>
            <div class="col-24 row-24 testing-module">
                <div class="col-16 row-24"></div>
                <div class="col-8 row-24">
                    <button class="col-12 row-24" @click="listAudioClips()">
                        List files in console from clip dir
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.testing-dashboard-header {
    text-align: center;
    color: white;
}

.testing-dashboard-body {
    display: grid;
    grid-gap: 10px;
    grid-auto-rows: max(5%, 15%);
}

.testing-module {
    background: white;
}
</style>
