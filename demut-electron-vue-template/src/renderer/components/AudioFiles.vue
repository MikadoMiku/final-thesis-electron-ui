<script setup lang="ts">
import { sendMsg } from '../communication/communicator'
import { computed, onMounted, ref } from 'vue'
import { CopyableFile } from '../../api/api-payload-types'
import { useAudioClipsStore } from '../stores/audioClipStore'
import DropdownMenu from './DropdownMenu.vue'

onMounted(() => {
  sendMsg({ type: 'getDataOfClipFiles' })
})

function onFileDrop(event: DragEvent) {
  console.table(event.dataTransfer!.files)
  sendMsg({
    type: 'addClipFiles',
    payload: Array.from(event.dataTransfer!.files).map((f) => {
      const fObject: CopyableFile = {
        filePath: f.path,
        fileName: f.name,
        fileType: f.type
      }
      return fObject
    })
  })
}

function funion() {
  sendMsg({ type: 'openAudioclipFolder' })
}

const audioFilesData = computed(() => useAudioClipsStore().audioClipFilesData)
</script>
<template>
  <div class="col-24 row-24 audio-files-main-container">
    <div class="col-24 row-17 main-container-upper">
      <div class="col-24 row-24 main-container-upper-left">
        <div class="col-24 row-24 audio-clip-file-browser">
          <div class="col-24 row-24 audio-clip-file-browser-inner-container">
            <table class="table-right">
              <thead>
                <tr>
                  <th class="label">Name</th>
                  <th class="label">Extension</th>
                  <th class="label">Sector</th>
                  <th class="label">Size</th>
                </tr>
              </thead>
              <tbody>
                <TransitionGroup name="list">
                  <tr
                    class="row"
                    v-for="clipFile in audioFilesData"
                    :key="clipFile.name">
                    <td class="first-td">
                      {{ clipFile.name }}
                    </td>
                    <td class="second-td">
                      {{ clipFile.extension }}
                    </td>
                    <td class="right third-td">
                      <DropdownMenu
                        :dropdownForFile="clipFile.name"></DropdownMenu>
                    </td>
                    <td class="fourth-td">{{ clipFile.size }} KB</td>
                  </tr>
                </TransitionGroup>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="col-24 row-7 main-container-lower">
      <div
        class="col-24 row-24 drag-file-upload"
        @drop="onFileDrop"
        @dragenter.prevent
        @dragover.prevent>
        <div class="arrow-right" @click="funion">
          <span>Open</span>
        </div>
        <p class="drag-file-upload-hint">Drag & Drop files</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* https://codepen.io/alexmccabe/pen/nezONg */
.arrow-right {
  background-color: #444;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.8);
  height: 120px;
  left: -60px;
  position: absolute;
  top: -60px;
  width: 130px;

  transform: rotate(-45deg);
  z-index: 100;
  cursor: pointer;
}

.arrow-right span {
  color: #f5f5f5;
  font-size: 1.005em;
  left: 38px;
  top: 88px;
  position: absolute;
  width: 70px;
}

th {
  position: sticky;
  background: var(--component-b-color);
  top: 0; /* Don't forget this, required for the stickiness */
  z-index: 10000;
  border-bottom: 1px solid black;
}
.label-container {
  position: static;
}
.label {
  text-align: center;
}

.first-td {
  width: 50%;
}
.second-td {
  width: 10%;
  text-align: center;
}
.third-td {
  width: 5%;
}
.fourth-td {
  width: 15%;
  text-align: center;
}

.row > td {
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.right {
  text-align: right;
  table-layout: fixed;
}
.left {
  float: left;
  margin-left: 10px;
  margin-right: 10px;
}
.table-right {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

.main-container-upper-left {
  z-index: 101;
  padding: var(--component-padding);
}

.audio-clip-file-browser {
  background-color: var(--component-b-color-light);
  border-radius: var(--common-border-radius);
  box-shadow: 0px 0px 1px 1px var(--accent-color);
  padding: 5px;
}

.audio-clip-file-browser-inner-container {
  overflow-y: auto;
  overflow-x: hidden;
}

.main-container-upper-right {
  padding: var(--component-padding);
}

.audio-clip-data-window {
  background-color: var(--component-b-color-light);
  border-radius: var(--common-border-radius);
  box-shadow: 0px 0px 1px 1px var(--accent-color);
}

.main-container-lower {
  padding: var(--component-padding);
}

.drag-file-upload {
  background-color: var(--component-b-color-light);
  border-radius: var(--common-border-radius);
  box-shadow: 0px 0px 1px 1px var(--accent-color);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.drag-file-upload-hint {
  font-size: var(--L-font-size);
  color: var(--accent-color);
  text-align: center;
  width: 100%;
}

/* width */
::-webkit-scrollbar {
  width: 2px;
  border-radius: var(--common-border-radius);
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: var(--common-border-radius);
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: var(--common-border-radius);
  background: rgb(88, 86, 86);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  border-radius: var(--common-border-radius);
  background: #777;
}
</style>
