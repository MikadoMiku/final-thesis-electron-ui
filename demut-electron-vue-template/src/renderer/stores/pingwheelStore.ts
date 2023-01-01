import { defineStore } from 'pinia'
import {
  ConfigWriteDataTypes,
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
  NATIVE_MOUSE_EVENT: 'nativeMouseEvent',
  SET_CONFIGURED_PINGWHEEL_CLIPS: 'setConfiguredPingwheelClips'
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
      [1, 'void'],
      [2, 'void'],
      [3, 'void'],
      [4, 'void'],
      [5, 'void'],
      [6, 'void'],
      [7, 'void'],
      [8, 'void']
    ]) as Map<number, string>,
    toggled: false
  }),
  actions: {
    [FUNCTIONS.NATIVE_MOUSE_EVENT](payload: NativeMouseEventData) {
      console.log(JSON.stringify(payload))
      let sector = payload.sector == 0 ? 8 : payload.sector
      let sectoredClip: string | undefined =
        this.configuredPingwheelAudioClips.get(sector)
      if (sectoredClip) {
        sendMsg({
          type: 'playClip',
          payload: sectoredClip
        })
      }
    },
    [FUNCTIONS.SET_CONFIGURED_PINGWHEEL_CLIPS](payload: any) {
      console.log('Setting configured ping wheel clips')
      payload.forEach((x: { sector: number; clipName: string }) =>
        this.configuredPingwheelAudioClips.set(x.sector, x.clipName)
      )
    }
    /*     [FUNCTIONS.SET_PINGWHEEL_CLIP](payload: { sector: number; clip: string }) {
      this.configuredPingwheelAudioClips.set(payload.sector, payload.clip)
    } */
  }
})
