<template>
  <div class="col-24 row-24 audio-files-main-container">
    <!-- ... Main content ... -->

    <!-- Configuration Field for Overlay Key -->
    <div class="config-field">
      <label
        >Overlay Toggle Key(Current:
        <span class="current-hotkey">{{ currentOverlayHotkey }}</span
        >):</label
      >
      <select
        v-model="overlayToggleKey"
        @change="updateOverlayToggleKey(overlayToggleKey)">
        <option value="" disabled>Select a key</option>
        <option v-for="key in keyboardKeys" :key="key" :value="key">
          {{ key }}
        </option>
      </select>
    </div>

    <!-- Button to Send Overlay Key to Backend -->
    <button class="send-button" @click="sendOverlayKeyToBackend">
      Send to Backend
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { sendMsg } from '../communication/communicator'
import { useConfigurationStore } from '../stores/configurationStore'

onMounted(() => {
  sendMsg({ type: 'getCurrentOverlayHotkey' })
})

const currentOverlayHotkey = computed(
  () => useConfigurationStore().currentOverlayHotkey
)

const keyboardKeys = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'Space',
  'Enter',
  'Shift',
  'Ctrl',
  'Alt',
  'Tab',
  'Esc',
  'Backspace',
  'Delete',
  'Up',
  'Down',
  'Left',
  'Right',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12'
]

const overlayToggleKey = ref('F9') // Default overlay key

function updateOverlayToggleKey(newKey: string) {
  console.log('updateoverlaytogglekey: ', newKey)
  overlayToggleKey.value = newKey
}

function sendOverlayKeyToBackend() {
  // Send overlayToggleKey.value to your backend logic here
  sendMsg({
    type: 'writeToConfig',
    payload: {
      section: 'defaultOverlayButton',
      value: overlayToggleKey.value.toString()
    }
  })
}
</script>

<style scoped>
/* Your custom styles */
/* ... */

/* Style for the configuration field */
.config-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.config-input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

/* Style for the send button */
.send-button {
  background-color: var(--accent-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-button:hover {
  background-color: var(--accent-color-dark);
}

.current-hotkey {
  color: azure;
  font-weight: bold;
}
</style>
