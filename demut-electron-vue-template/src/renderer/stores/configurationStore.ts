import { defineStore } from 'pinia'
import { sendMsg } from '../communication/communicator'
import { ConfigurationStoreFunctions } from './storeTypings/audioEndpointStoreTypes'

// https://gist.github.com/kuroski/9a7ae8e5e5c9e22985364d1ddbf3389d
type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelToSnakeCase<U>}`
  : S

type O = { [T in ConfigurationStoreFunctions as T['type']]: T['type'] }

type D = keyof O

type F = {
  [T in D as T extends string
    ? `${Uppercase<CamelToSnakeCase<Uncapitalize<T>>>}`
    : T]: T
}

// Object as an enum, the Uppercase is more readable?.
export const FUNCTIONS: F = {
  SEND_CURRENT_OVERLAY_HOTKEY: 'sendCurrentOverlayHotkey'
}
export const useConfigurationStore = defineStore({
  id: 'ConfigurationStore',
  state: () => ({
    currentOverlayHotkey: ''
  }),
  actions: {
    [FUNCTIONS.SEND_CURRENT_OVERLAY_HOTKEY](payload: any) {
      console.log('Setting current overlay hotkey')
      this.currentOverlayHotkey = payload
    }
  }
})
