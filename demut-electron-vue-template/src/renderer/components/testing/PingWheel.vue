<script setup lang="ts">
import { sendMsg } from "../../communication/communicator"
import { computed, ref } from "vue"

// Instead of using buttons and having wonky clickable corners on the circle DOM rectangle. Copy the logic from here: https://codepen.io/wheatup/pen/GbgyLY
// Use JS to calculate the x and y of the mouse movement like in C++, maybe even connect C++ to javascript instead POG?

const arcNo = ref(8)
const startingDeg = 270

const arcAudioClipMap = new Map<number, string>([
    [1, "jellybeans"],
    [2, "kanker"],
    [3, "magnumDong"],
    [4, "shitYourself"],
    [5, "suck_my_ass"],
    [6, "urARtrd"],
    [7, "void"],
    [8, "void"],
])

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
    }
}

function textReverseSkew(segmentNo: number) {
    const shiftedStartingDeg = roundDeg(startingDeg - arcDegree() / 2)
    const rotationDeg = roundDeg(shiftedStartingDeg + segmentNo * arcDegree())
    return {
        transform:
            "skew(-" + (arcDegree() + 5) + "deg)" + "rotate(" + 115 + "deg)",
    }
}

function playClip(arcNo: number) {
    const clipName = arcAudioClipMap.get(arcNo)
    if (clipName) sendMsg({ type: "playClip", payload: clipName })
}
</script>
<template>
    <div style="height: 2.5%"></div>
    <div class="pingwheel-circle">
        <div class="pingwheel-inner-circle"></div>
        <button
            @click="playClip(arcIndex)"
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
    background-color: var(--component-b-color-light);
}
</style>
