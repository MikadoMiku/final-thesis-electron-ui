<script setup lang="ts">
import { computed, ref } from 'vue'
import { sendMsg } from '../communication/communicator'
import { usePingwheelStore } from '../stores/pingwheelStore'
// https://codepen.io/wslotterback/pen/mmRrVx

const showMenu = ref(false)

const props = defineProps({
  dropdownForFile: String
})

function toggleShow() {
  showMenu.value = !showMenu.value
}

function itemClicked(sector: number) {
  toggleShow()
  if (!props.dropdownForFile) return
  const listOfFiles = Array.from(
    usePingwheelStore().configuredPingwheelAudioClips.entries()
  )
  const foundPrevious = listOfFiles.find((x) => x[1] === props.dropdownForFile)
  if (foundPrevious) {
    usePingwheelStore().configuredPingwheelAudioClips.set(
      foundPrevious[0],
      'void'
    )
  }
  usePingwheelStore().configuredPingwheelAudioClips.set(
    sector,
    props.dropdownForFile
  )
  sendMsg({
    type: 'writeToConfig',
    payload: {
      section: 'pingwheel',
      value: Array.from(
        usePingwheelStore().configuredPingwheelAudioClips.entries()
      ).map(([sector, clipName]) => ({ sector, clipName }))
    }
  })
}

const dropdownText = computed(() => {
  const audioClipConfigList = Array.from(
    usePingwheelStore().configuredPingwheelAudioClips.entries()
  )
  const findDropdownItem = audioClipConfigList.find(
    (entry) => entry[1] === props.dropdownForFile
  )
  return findDropdownItem ? `${findDropdownItem[0]}` : 'Set sector'
})
</script>
<template>
  <div>
    <button @click="toggleShow" class="anchor">{{ dropdownText }}</button>
    <div v-if="showMenu" class="menu">
      <div class="menu-item" v-for="item in 8" @click="itemClicked(item)">
        {{ item }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.anchor {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  font-size: var(--M-font-size);
  height: 100%;
  width: 100%;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: var(--component-b-color);
}

.anchor::after {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 0.5em;
  vertical-align: 0.255em;
  content: '';
  border-top: 0.3em solid;
  border-right: 0.28em solid transparent;
  border-bottom: 0;
  border-left: 0.28em solid transparent;
}

.anchor:hover {
  color: #fff;
  background-color: #229954;
  border-color: #229954;
  cursor: pointer;
}

.menu {
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  color: #212529;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  list-style: none;
  margin: 0.125rem 0 0;
  padding: 0.5rem 0;
  position: absolute;
  text-align: left;
  width: 100%;
  z-index: 10001;
}

.menu-item {
  color: #212529;
  padding: 0.25rem 1.5rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  text-align: center;
}

.menu-item:hover {
  background-color: #f4f6f6;
  cursor: pointer;
}

span {
  font-weight: bold;
  color: #229954;
  font-size: 1.25rem;
}
</style>
