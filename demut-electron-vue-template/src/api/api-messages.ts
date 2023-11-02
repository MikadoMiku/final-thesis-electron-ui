import {
  AudioEndpoint,
  ConfigWriteDataTypes,
  CopyableFile,
  FileStats,
  NativeMouseEventData,
  TextSynthesizeData
} from './api-payload-types'

export type PlayClip = { type: 'playClip'; payload: string }

export type StopClip = { type: 'stopClip' }

export type GetAudioEndpoints = { type: 'getAudioEndpoints' }

export type SetAudioEndpointId = {
  type: 'setAudioEndpointById'
  payload: string
}

export type DragAndDropAudioFiles = {
  type: 'addClipFiles'
  payload: CopyableFile[]
}

export type GetDataOfClipFiles = { type: 'getDataOfClipFiles' }

export type SynthesizeTextToAudioFile = {
  type: 'synthesizeTextToAudioFile'
  payload: TextSynthesizeData
}

export type SynthesizeVoiceFromText = {
  type: 'synthesizeVoiceFromText'
  payload: string
}

export type StartMouseListener = {
  type: 'startMouseListener'
}

export type StopMouseListener = { type: 'stopMouseListener' }

export type OpenAudioclipFolder = { type: 'openAudioclipFolder' }

export type WriteToConfig = {
  type: 'writeToConfig'
  payload: ConfigWriteDataTypes
}

export type StopOverlay = { type: 'stopOverlay' }

export type GetCurrentOverlayHotkey = { type: 'getCurrentOverlayHotkey' }

export type UiToBackEventSet =
  | PlayClip
  | GetAudioEndpoints
  | SetAudioEndpointId
  | DragAndDropAudioFiles
  | StopClip
  | GetDataOfClipFiles
  | SynthesizeTextToAudioFile
  | SynthesizeVoiceFromText
  | StartMouseListener
  | StopMouseListener
  | OpenAudioclipFolder
  | WriteToConfig
  | StopOverlay
  | GetCurrentOverlayHotkey

/* --------------------------------------------- To UI ------------------------------------------------------- */

export type DataOfClipFiles = { type: 'dataOfClipFiles'; payload: FileStats[] }

export type AudioClipNames = {
  type: 'GetListOfAudioClipNames'
  payload: string[]
}

export type AudioEndpoints = {
  type: 'audioEndpoints'
  payload: AudioEndpoint
}

export type DragAndDropAudioFilesDone = { type: 'dragAndDropAudioFilesDone' }

export type NativeMouseEvent = {
  type: 'nativeMouseEvent'
  payload: NativeMouseEventData
}

export type OverlayRouterPush = {
  type: 'overlayRouterPush'
}

export type SetConfiguredPingwheelClips = {
  type: 'setConfiguredPingwheelClips'
  payload: ConfigWriteDataTypes
}

export type SendCurrentOverlayHotkey = {
  type: 'sendCurrentOverlayHotkey'
  payload: string
}

export type BackToUiEventSet =
  | AudioClipNames
  | AudioEndpoints
  | DragAndDropAudioFilesDone
  | NativeMouseEvent
  | DataOfClipFiles
  | OverlayRouterPush
  | SetConfiguredPingwheelClips
  | SendCurrentOverlayHotkey
