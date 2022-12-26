<script setup lang="ts">
import { ref } from 'vue'
import { sendMsg } from '../../communication/communicator'

const stringToSynthesize = ref('')
const isTextError = ref(false)

function startSynthesizingText() {
  if (!stringToSynthesize.value) {
    isTextError.value = true
    return
  }

  sendMsg({
    type: 'synthesizeVoiceFromText',
    payload: stringToSynthesize.value
  })
  clearInputs()
}

function clearInputs() {
  stringToSynthesize.value = ''
}
</script>
<template>
  <div class="welcome-page-container">
    <div class="row-16 col-24">
      <textarea
        :maxlength="500"
        autofocus
        class="overlay-text-input"
        v-model="stringToSynthesize"></textarea>
    </div>
    <div class="overlay-input-buttons row-8 col-24">
      <button class="overlay-input-button warning" @click="clearInputs">
        Cancel
      </button>
      <button
        class="overlay-input-button success"
        @click="startSynthesizingText">
        Submit
      </button>
    </div>
  </div>
</template>
<style scoped>
.welcome-page-container {
  height: 15%;
  width: 25%;
  color: white;
  background-color: var(--component-b-color-light);
  opacity: 0.8;
  padding: 10px;
}

.overlay-text-input {
  max-height: 100%;
  max-width: 100%;
  min-height: 100%;
  min-width: 100%;
  font-size: var(--L-font-size);
  font-family: var(--system-ui);
  line-height: 35px;
  background-color: var(--component-b-color-light);
  border: none;
  resize: none;
  color: inherit;
  border-radius: var(--common-border-radius);
}

.overlay-input-buttons {
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.overlay-input-button {
  height: 70%;
  width: 140px;
  font-size: var(--M-font-size);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.096);
  cursor: pointer;
  background-color: var(--component-b-color-light);
}

.overlay-text-input:focus {
  outline: none;
  box-shadow: 0px 0px 15px var(--accent-color);
}

.overlay-input-button:hover {
  background-color: rgba(255, 255, 255, 0.274);
  opacity: 1;
}

.warning {
  box-shadow: 0px 4px 2px -2px red;
}

.success {
  box-shadow: 0px 4px 2px -2px rgba(35, 207, 35, 0.849);
}
</style>
