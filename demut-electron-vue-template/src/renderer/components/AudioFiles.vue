<script setup lang="ts">
import { sendMsg } from '../communication/communicator'
import { computed, onMounted, ref } from 'vue'
import { CopyableFile } from '../../api/api-payload-types'
import { useAudioClipsStore } from '../stores/audioClipStore'

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
const audioFilesData = computed(() => useAudioClipsStore().audioClipFilesData)
</script>
<template>
  <div class="col-24 row-24 audio-files-main-container">
    <div class="col-24 row-17 main-container-upper">
      <div class="col-24 row-24 main-container-upper-left">
        <div class="col-24 row-24 audio-clip-file-browser">
          <div class="col-24 row-24 audio-clip-file-browser-inner-container">
            <!--                       <table class="label-container">
                            <tbody>
                                <tr>
                                    <td class="second-td label">name</td>
                                    <td class="third-td label">extension</td>
                                    <td class="fourth-td label">size</td>
                                </tr>
                            </tbody>
                        </table> -->
            <table class="table-right">
              <thead>
                <tr>
                  <th class="label">Name</th>
                  <th class="label">Extension</th>
                  <th class="label">Size</th>
                </tr>
              </thead>
              <tbody>
                <TransitionGroup name="list">
                  <tr
                    class="row"
                    v-for="clipFile in audioFilesData"
                    :key="clipFile.name">
                    <td class="second-td">
                      {{ clipFile.name }}
                    </td>
                    <td class="right third-td">
                      {{ clipFile.extension }}
                    </td>
                    <td class="right fourth-td">{{ clipFile.size }} KB</td>
                  </tr>
                </TransitionGroup>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--             <div class="col-8 row-24 main-container-upper-right">
                <div class="col-24 row-24 audio-clip-data-window"></div>
            </div> -->
    </div>
    <div class="col-24 row-7 main-container-lower">
      <div
        class="col-24 row-24 drag-file-upload"
        @drop="onFileDrop"
        @dragenter.prevent
        @dragover.prevent>
        <p class="drag-file-upload-hint">Drag & Drop files</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
  width: 5%;
}
.second-td {
  width: 20%;
}
.third-td {
  width: 5%;
}
.fourth-td {
  width: 15%;
}
.fifth-td {
  width: 55%;
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

.audio-files-main-container {
  --component-padding: 2%;
}

.main-container-upper-left {
  padding: var(--component-padding);
}

.audio-clip-file-browser {
  background-color: var(--component-b-color-light);
  border-radius: 10px;
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
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px var(--accent-color);
}

.main-container-lower {
  padding: var(--component-padding);
}

.drag-file-upload {
  background-color: var(--component-b-color-light);
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px var(--accent-color);
  display: flex;
  align-items: center;
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
  border-radius: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgb(88, 86, 86);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  border-radius: 10px;
  background: #777;
}
</style>
