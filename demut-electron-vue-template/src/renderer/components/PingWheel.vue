<script setup lang="ts">
import { sendMsg } from '../communication/communicator'
import { computed, ref } from 'vue'
import { usePingwheelStore } from '../stores/pingwheelStore'

// Instead of using buttons and having wonky clickable corners on the circle DOM rectangle. Copy the logic from here: https://codepen.io/wheatup/pen/GbgyLY
// Use JS to calculate the x and y of the mouse movement like in C++, maybe even connect C++ to javascript instead POG?

const arcNo = ref(8)
const startingDeg = 270
// const audioFilesData = computed(() => useAudioClipsStore().audioClipFilesData)

const arcAudioClipMap = computed<Map<number, string>>(
  () => usePingwheelStore().configuredPingwheelAudioClips
)

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
      'rotate(' + rotationDeg + 'deg) skew(' + (arcDegree() + 5) + 'deg)'
  }
}

function textReverseSkew(segmentNo: number) {
  const shiftedStartingDeg = roundDeg(startingDeg - arcDegree() / 2)
  const rotationDeg = roundDeg(shiftedStartingDeg + segmentNo * arcDegree())
  return {
    transform: 'skew(-' + (arcDegree() + 5) + 'deg)' + 'rotate(' + 115 + 'deg)'
  }
}

function playClip(arcNo: number) {
  const clipName = arcAudioClipMap.value.get(arcNo)
  if (clipName) sendMsg({ type: 'playClip', payload: clipName })
}

const toggle = computed(() => usePingwheelStore().toggled)

function togglePingwheelUsage() {
  if (toggle.value) {
    sendMsg({ type: 'stopMouseListener' })
    usePingwheelStore().toggled = false
    return
  }
  sendMsg({ type: 'startMouseListener' })
  usePingwheelStore().toggled = true
}
</script>
<template>
  <div style="height: 2.5%"></div>
  <div class="pingwheel-circle">
    <button
      class="toggle-switch"
      :class="[toggle ? 'toggle-on' : 'toggle-off']"
      @click="togglePingwheelUsage">
      {{ toggle ? 'ON' : 'OFF' }}
    </button>
    <div class="pingwheel-inner-circle"></div>
    <button
      @click="playClip(arcIndex)"
      class="segment"
      v-for="arcIndex in arcNo"
      :key="arcIndex"
      :style="segmentStyling(arcIndex)">
      <span class="segment-text" :style="textReverseSkew(arcIndex)">{{
        arcIndex
      }}</span>
    </button>
  </div>
</template>
<style scoped>
/*   transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff; */
.toggle-switch {
  position: absolute;
  height: 150px;
  width: 150px;
  color: white;
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  z-index: 2000;
  border: none;
  top: calc(50% - 75px);
  left: calc(50% - 75px);
  font-size: var(--M-font-size);
  cursor: pointer;
}

.toggle-off {
  background-color: rgb(184, 42, 42);
  box-shadow: 0 0 50px rgba(184, 42, 42);
}

.toggle-on {
  background-color: rgb(27, 126, 27);
  box-shadow: 0 0 50px rgba(27, 126, 27);
}

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
  z-index: 1000;
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
