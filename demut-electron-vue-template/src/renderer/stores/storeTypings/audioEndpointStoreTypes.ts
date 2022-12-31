import {
  AudioEndpoints,
  DataOfClipFiles,
  NativeMouseEvent
} from '../../../api/api-messages'

export type AudioEndpointStoreFunctions = AudioEndpoints

export type AudioClipStoreFunctions = DataOfClipFiles

export type PingwheelStoreFunctions = NativeMouseEvent
export type PrivatePingWheelStoreFunctions = {
  type: 'setPingwheelClip'
  payload: { sector: number; file: string }
}
