import {
  AudioEndpoints,
  DataOfClipFiles,
  NativeMouseEvent,
  SendCurrentOverlayHotkey,
  SetConfiguredPingwheelClips
} from '../../../api/api-messages'

export type AudioEndpointStoreFunctions = AudioEndpoints

export type AudioClipStoreFunctions = DataOfClipFiles

export type PingwheelStoreFunctions =
  | NativeMouseEvent
  | SetConfiguredPingwheelClips

export type PrivatePingWheelStoreFunctions = {
  type: 'setPingwheelClip'
  payload: { sector: number; file: string }
}

export type ConfigurationStoreFunctions = SendCurrentOverlayHotkey
