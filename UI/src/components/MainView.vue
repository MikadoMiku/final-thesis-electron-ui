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

h1 {
    text-align: center;
    text-transform: uppercase;
    font-weight: 400;
    margin-top: 10px;
}
</style>
