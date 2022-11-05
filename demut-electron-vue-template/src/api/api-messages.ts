import {
  AudioEndpoint,
  CopyableFile,
  FileStats,
  NativeMouseEventData
} from './api-payload-types'

export type PlayClip = { type: 'playClip'; payload: string }

export type StopClip = { type: 'stopClip' }

export type GetAudioEndpoints = { type: 'getAudioEndpoints' }

export type SetAudioEndpointId = {
  type: 'setAudioEndpointById'
  payload: string
}

export type GetAudioClipNames = { type: 'getAudioClipNames' }

export type DragAndDropAudioFiles = {
  type: 'addClipFiles'
  payload: CopyableFile[]
}

export type GetDataOfClipFiles = { type: 'getDataOfClipFiles' }

export type UiToBackEventSet =
  | PlayClip
  | GetAudioEndpoints
  | SetAudioEndpointId
  | DragAndDropAudioFiles
  | StopClip
  | GetAudioClipNames
  | GetDataOfClipFiles

/* ---------------------------------------------------------------------------------------------------- */

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

export type BackToUiEventSet =
  | AudioClipNames
  | AudioEndpoints
  | DragAndDropAudioFilesDone
  | NativeMouseEvent
  | DataOfClipFiles
