<script setup lang="ts">
import { computed, ref } from "vue"

// Instead of using buttons and having wonky clickable corners on the circle DOM rectangle. Copy the logic from here: https://codepen.io/wheatup/pen/GbgyLY
// Use JS to calculate the x and y of the mouse movement like in C++, maybe even connect C++ to javascript instead POG?

const arcNo = ref(8)
const startingDeg = 270

function arcDegree(): number {
    return roundDeg(360 / arcNo.value)
}

function roundDeg(roundable: number): number {
    return Math.round(roundable * 10) / 10
}

function randomColor() {
    return Math.floor(Math.random() * 16777215).toString(16)
}

function segmentStyling(segmentNo: number) {
    const shiftedStartingDeg = roundDeg(startingDeg - arcDegree() / 2)
    const rotationDeg = roundDeg(shiftedStartingDeg + segmentNo * arcDegree())
    return {
        transform:
            "rotate(" + rotationDeg + "deg) skew(" + (arcDegree() + 5) + "deg)",
        backgroundColor: "#171717" /* + randomColor() */,
    }
}

function textReverseSkew(segmentNo: number) {
    const shiftedStartingDeg = roundDeg(startingDeg - arcDegree() / 2)
    const rotationDeg = roundDeg(shiftedStartingDeg + segmentNo * arcDegree())
    return {
        transform:
            "skew(-" + (arcDegree() + 5) + "deg)" + "rotate(" + 115 + "deg)",
        backgroundColor: "#171717" /* + randomColor() */,
    }
}

function al(arcNo: number) {
    alert(arcNo)
}
</script>
<template>
    <div style="height: 2.5%"></div>
    <div class="pingwheel-circle">
        <div class="pingwheel-inner-circle"></div>
        <button
            @click="al(arcIndex)"
            class="segment"
            v-for="arcIndex in arcNo"
            :key="arcIndex"
            :style="segmentStyling(arcIndex)"
        >
            <span class="segment-text" :style="textReverseSkew(arcIndex)">{{
                arcIndex
            }}</span>
        </button>
    </div>
</template>
<style scoped>
.segment-text {
    color: var(--accent-color);
    position: absolute;
    top: 13%;
    left: 21%;
    font-size: var(--M-font-size);
}
.pingwheel-circle {
    position: relative;
    height: 95%;
    aspect-ratio: 1;
    /* background: red; */
    border-radius: 50%;
    overflow: hidden;
    display: block;
    margin: auto;
    box-shadow: 0px 0px 5px 1px var(--accent-color);
}

.pingwheel-inner-circle {
    border-radius: 50%;
    position: absolute;
    background: var(--component-b-color);
    top: 15%;
    left: 15%;
    transform-origin: 0 0;
    aspect-ratio: 1;
    height: 70%;
    z-index: 10000;
    box-shadow: 0px 0px 5px 1px var(--accent-color);
}

.segment {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform-origin: 0 0;
    border: none;
}

.segment:hover {
    color: var(--accent-color);
    box-shadow: 0px 0px 5px 1px var(--accent-color);
    background: #171717;
}
</style>
