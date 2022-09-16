<script setup lang="ts">
import { sendMsg } from "../communication/communicator"
import { computed, ref } from "vue"

function onFileDrop(event: DragEvent) {
    console.log("pog")
    console.log(event.dataTransfer!.files)
    /* const filePaths: string[] = Array.from(event.dataTransfer!.files).map((file) => file.) */
    console.table([...event.dataTransfer!.files])
    const filez: FileList = event.dataTransfer!.files
    const file = filez[0] as unknown as { path: string }
    sendMsg({
        type: "addClipFiles",
        payload: file,
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
            ></div>
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
}

.main-container-upper-right {
    padding: var(--component-padding);
}

.audio-clip-data-window {
    background-color: var(--component-b-color-light);
    border-radius: 10px;
}

.main-container-lower {
    padding: var(--component-padding);
}

.drag-file-upload {
    background-color: var(--component-b-color-light);
    border-radius: 10px;
}
</style>
