<script setup lang="ts">
import { sendMsg } from "../communication/communicator"
import { computed, ref } from "vue"
import { CopyableFile } from "../../api/api-payload-types"

function onFileDrop(event: DragEvent) {
    console.table(event.dataTransfer!.files)
    sendMsg({
        type: "addClipFiles",
        payload: Array.from(event.dataTransfer!.files).map((f) => {
            const fObject: CopyableFile = {
                filePath: f.path,
                fileName: f.name,
                fileType: f.type,
            }
            return fObject
        }),
    })
}
</script>
<template>
    <div class="col-24 row-24 audio-files-main-container">
        <div class="col-24 row-17 main-container-upper">
            <div class="col-16 row-24 main-container-upper-left">
                <div class="col-24 row-24 audio-clip-file-browser"></div>
            </div>
            <div class="col-8 row-24 main-container-upper-right">
                <div class="col-24 row-24 audio-clip-data-window"></div>
            </div>
        </div>
        <div class="col-24 row-7 main-container-lower">
            <div
                class="col-24 row-24 drag-file-upload"
                @drop="onFileDrop"
                @dragenter.prevent
                @dragover.prevent
            >
                <p class="drag-file-upload-hint">Drag & Drop files</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
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
</style>
