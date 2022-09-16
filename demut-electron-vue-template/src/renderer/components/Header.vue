<script setup lang="ts">
import { sendMsg } from "../communication/communicator"
import { computed, ref } from "vue"
</script>
<template>
    <div class="header-content">
        <img src="../assets/DemutLogo1.svg" class="app-logo" />
        <a
            href="https://github.com/MikadoMiku/final-thesis-electron-ui"
            target="_blank"
            class="github-link"
        >
            <img src="../assets/GitHub-Mark-Light-64px.png" />
        </a>
    </div>
</template>
<style scoped>
.header-content {
    height: 100%;
    width: 100%;
    position: relative;
}

.app-logo {
    position: absolute;
    left: 6%;
    top: 7.5%;
    height: 85%;
}

.github-link {
    position: absolute;
    right: 16px;
    top: calc(50% - 32px);
}

.github-link:hover {
    filter: drop-shadow(0px 0px 20px var(--accent-color));
}
</style>
