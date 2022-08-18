<script setup lang="ts">
import { sendMsg } from "../communication/communicator"
import { computed, ref } from "vue"
</script>
<template>
    <div class="welcome-page-container">
        <h1 class="neonText pulsate">Welcome</h1>
    </div>
</template>
<style scoped>
.welcome-page-container {
    height: 100%;
    width: 100%;
    color: white;
}

.welcome-sign {
    background: var(--accent-color);

    transform: perspective(1em) rotateX (40deg) scale(1, 0.35);
    filter: blur(1em);
}

/* https://css-tricks.com/how-to-create-neon-text-with-css/ */
.neonText {
    color: #fff;
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff,
        0 0 42px var(--accent-color), 0 0 82px var(--accent-color),
        0 0 92px var(--accent-color), 0 0 102px var(--accent-color),
        0 0 151px var(--accent-color);
}

h1 {
    text-align: center;
    text-transform: uppercase;
    font-weight: 400;
    margin-top: 10px;
}

.pulsate {
    animation: pulsate 1.5s infinite alternate;
}

@keyframes pulsate {
    100% {
        text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff,
            0 0 40px var(--accent-color), 0 0 80px var(--accent-color),
            0 0 90px var(--accent-color), 0 0 100px var(--accent-color),
            0 0 150px var(--accent-color);
    }

    0% {
        text-shadow: 0 0 2px #fff, 0 0 4px #fff, 0 0 6px #fff,
            0 0 10px var(--accent-color), 0 0 45px var(--accent-color),
            0 0 55px var(--accent-color), 0 0 70px var(--accent-color),
            0 0 80px var(--accent-color);
    }
}
</style>
