<script setup lang="ts"></script>
<template>
  <div class="tts-page-container">
    <div class="tts-text-container row-5 col-24">
      <p class="functionality-desc row-24 col-24">
        Here you can synthesize text input into WAV format audio files. Below
        you can write the text you want to be converted into a robotic voice.
      </p>
    </div>
    <div class="row-3 col-24"></div>
    <div class="tts-input-container row-12 col-24">
      <div class="tts-input-box row-24 col-24">
        <textarea :maxlength="300" class="tts-input-area"></textarea>
      </div>
    </div>
    <div class="tts-input-buttons row-2 col-24">
      <button class="tts-button warning">Clear</button>
      <button class="tts-button success">Synthesize</button>
    </div>
  </div>
</template>
<style scoped>
.tts-page-container {
  height: 100%;
  width: 100%;
}

.tts-input-area {
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

.tts-input-area:focus {
  outline: none;
  box-shadow: 0px 0px 15px var(--accent-color);
}

.functionality-desc {
  font-size: var(--font-size);
  padding: 15px;
  background-color: var(--component-b-color-light);
  border-radius: var(--common-border-radius);
}

.tts-text-container {
  padding: 15px;
  border-radius: var(--common-border-radius);
}

.tts-input-container {
  padding: 15px;
}

.tts-input-box {
  background-color: var(--component-b-color-light);
  border-radius: var(--common-border-radius);
}

.tts-input-buttons {
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  justify-content: space-between;
}

.tts-button {
  height: 100%;
  width: 140px;
  font-size: var(--M-font-size);
  color: white;
  border: none;
  cursor: pointer;
  background-color: var(--component-b-color-light);
}

.tts-button:hover {
  background-color: var(--component-b-color-light);
  opacity: 1;
}

.warning {
  box-shadow: 0px 4px 2px -2px red;
}

.success {
  box-shadow: 0px 4px 2px -2px rgba(36, 236, 36, 0.849);
}

/* width */
::-webkit-scrollbar {
  width: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #171717;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--accent-color);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(177, 106, 0);
}
</style>