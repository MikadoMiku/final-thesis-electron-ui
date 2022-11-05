import { defineStore } from 'pinia'
import {
  AudioEndpoint,
  NativeMouseEventData
} from '../../api/api-payload-types'
import { sendMsg } from '../communication/communicator'
import { PingwheelStoreFunctions } from './storeTypings/audioEndpointStoreTypes'

// https://gist.github.com/kuroski/9a7ae8e5e5c9e22985364d1ddbf3389d
type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelToSnakeCase<U>}`
  : S

type O = { [T in PingwheelStoreFunctions as T['type']]: T['type'] }

type D = keyof O

type F = {
  [T in D as T extends string
    ? `${Uppercase<CamelToSnakeCase<Uncapitalize<T>>>}`
    : T]: T
}

// Object as an enum, the Uppercase is more readable?.
export const FUNCTIONS: F = {
  NATIVE_MOUSE_EVENT: 'nativeMouseEvent'
}
/* const arcAudioClipMap = new Map<number, string>([
    [1, "jellybeans"],
    [2, "kanker"],
    [3, "magnumDong"],
    [4, "shitYourself"],
    [5, "suck_my_ass"],
    [6, "urARtrd"],
    [7, "void"],
    [8, "void"],
]) */
export const usePingwheelStore = defineStore({
  id: 'PingwheelStore',
  state: () => ({
    configuredPingwheelAudioClips: new Map<number, string>([
      [1, 'jellybeans'],
      [2, 'kanker'],
      [3, 'magnumDong'],
      [4, 'shitYourself'],
      [5, 'suck_my_ass'],
      [6, 'urARtrd'],
      [7, 'void'],
      [8, 'void']
    ]) as Map<number, string>
  }),
  actions: {
    [FUNCTIONS.NATIVE_MOUSE_EVENT](payload: NativeMouseEventData) {
      console.table(payload)
      let sectoredClip: string | undefined =
        this.configuredPingwheelAudioClips.get(payload.sector)
      if (sectoredClip) {
        sendMsg({
          type: 'playClip',
          payload: sectoredClip
        })
      }
    }
  }
})
