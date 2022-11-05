import { useAudioEndpointsStore } from '../stores/audioEndpointsStore'

import {
  AudioClipStoreFunctions,
  AudioEndpointStoreFunctions,
  PingwheelStoreFunctions
} from '../stores/storeTypings/audioEndpointStoreTypes'
import { BackToUiEventSet } from '../../api/api-messages'
import { IpcRendererEvent } from 'electron'
import { useAudioClipsStore } from '../stores/audioClipStore'
import { usePingwheelStore } from '../stores/pingwheelStore'

export function handleMessage(_event: IpcRendererEvent, msg: BackToUiEventSet) {
  console.log(
    '%cRECEIVED MESSAGE: ' + JSON.stringify(msg),
    'font-weight: bold; color: orange'
  )

  if (msg.type in useAudioEndpointsStore()) {
    const store = useAudioEndpointsStore()
    msg = msg as AudioEndpointStoreFunctions
    store[msg.type](msg.payload)
  } else if (msg.type in useAudioClipsStore()) {
    const store = useAudioClipsStore()
    msg = msg as AudioClipStoreFunctions
    store[msg.type](msg.payload)
  } else if (msg.type in usePingwheelStore()) {
    const store = usePingwheelStore()
    msg = msg as PingwheelStoreFunctions
    store[msg.type](msg.payload)
  }
}
