<script setup lang="ts"></script>
<template>
  <div class="welcome-page-container">
    <div class="visible-separator-title">
      <div class="visible-section-separator"></div>
      <span>Welcome</span>
      <div class="visible-section-separator"></div>
    </div>
    <br />
    <div class="greeting-section">
      <p>Hello!</p>
      <br />
      <p>
        Thank you for showing interest in a proof-of-concept gaming support
        application for people with difficulties communicating.
      </p>
      <br />
      <p>
        Please continue reading for description of the functionalities
        provided!!!
      </p>
    </div>
    <br />
    <div class="visible-separator-title">
      <div class="visible-section-separator"></div>
      <span>Description</span>
      <div class="visible-section-separator"></div>
    </div>
    <br />
    <div class="program-description-section">
      <p>
        This application is meant to add added possibilites for people with
        difficulties communicating. Although it is mentioned that this is a
        gaming support application, does not mean that it is strictly for use in
        games. It is also possible to use this application in many other
        communication applications like Discord, Teams, Zoom, etc...
      </p>
    </div>
    <br />
    <div class="visible-separator-title">
      <div class="visible-section-separator"></div>
      <span>Virtual cable</span>
      <div class="visible-section-separator"></div>
    </div>
    <br />
    <div class="program-description-section">
      <p>
        This application can not work without the usage of a third party
        donationware called VB-CABLE by VB-AUDIO.
      </p>
      <br />

      <p>
        This application was tested and developed using VB-CABLE, however you
        may install whichever virtual audio software you prefer.
      </p>
      <br />
      <a
        class="vb-link"
        target="_blank"
        href="https://vb-audio.com/Cable/index.htm"
        >Visit VB-CABLE</a
      >
    </div>
    <br />
    <div class="visible-separator-title">
      <div class="visible-section-separator"></div>
      <span>Functionality</span>
      <div class="visible-section-separator"></div>
    </div>
    <br />
    <span class="sub-title">Audio endpoints</span>
    <div class="functionality-description-section">
      <p>
        Audio endpoints page allows you to see the audio endpoints set up on
        your computer. You have to choose the correct output or else your
        default is used for playback.
      </p>
    </div>
    <br />
    <span class="sub-title">Audio files</span>
    <div class="functionality-description-section">
      <p>
        Audio files shows you all of the files in the default constant audio
        clip folder. You can set which audio clip you want to set to the ping
        wheel when using mouse listener to pick one of the 8 sectors. You can
        also drag drop files to the collection.
      </p>
    </div>
    <br />
    <span class="sub-title">Generate audio files from text</span>
    <div class="functionality-description-section">
      <p>
        Generate audio files allows you to generate .WAV extension audio files
        with your custom text input.
      </p>
    </div>
    <br />
    <span class="sub-title">Ping wheel</span>
    <div class="functionality-description-section">
      <p>
        Ping wheel allows you to test the ping wheel either showing you a visual
        representation of the wheel or by just pressing the sectors. This page
        also allows you to turn the ping wheel mouse listener on or off.
      </p>
    </div>
    <br />
    <span class="sub-title">Overlay (F9)</span>
    <div class="functionality-description-section">
      <p>
        This app has a hidden feature of having an overlay pop up by using the
        F9 key. This shows an overlay that takes in text input, which will be
        synthesized to audible robotic voice data which is streamed to an output
        directly after.
      </p>
    </div>
  </div>
</template>
<style scoped>
.vb-link {
  color: var(--accent-color);
}

.sub-title {
  color: var(--accent-color);
  font-size: var(--L-font-size);
}
.welcome-page-container {
  height: 100%;
  width: 100%;
  padding: var(--component-padding);
  overflow-y: auto;
}

.visible-separator-title > * {
  display: inline-block;
}

.visible-separator-title > span {
  color: rgb(165, 165, 165);
  text-align: center;
  min-width: 20%;
  max-width: 20%;
  font-size: var(--L-font-size);
}

.visible-section-separator {
  width: 40%;
  box-shadow: 0px 0px 4px 2px var(--accent-color);
}

.greeting-section {
  font-size: var(--L-font-size);
  padding: 15px;
  background-color: var(--component-b-color-light);
  border-radius: var(--common-border-radius);
}

.program-description-section {
  font-size: var(--L-font-size);
  padding: 15px;
  background-color: var(--component-b-color-light);
  border-radius: var(--common-border-radius);
}

.functionality-description-section {
  font-size: var(--L-font-size);
  padding: 15px;
  background-color: var(--component-b-color-light);
  border-radius: var(--common-border-radius);
}

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
