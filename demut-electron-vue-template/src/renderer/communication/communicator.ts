import { IpcRendererEvent } from "electron"
import { BackToUiEventSet, UiToBackEventSet } from "../../api/api-messages"
import { useAudioEndpointsStore } from "../stores/audioEndpointsStore"
import { handleMessage } from "./message-handler"

// Need to make an API folder, THIS IS BAD IM LAZYYY
type GenericEvent = { type: string; payload?: any }

let connection: WebSocket

export const setupCommunicator = (): void => {
    window.ElectronApi.msgToUi(handleMessage)
}

export function sendMsg(msg: UiToBackEventSet) {
    console.log(
        "%cSending Message to MiddleWare -------> ",
        "color: limegreen;",
        JSON.stringify(msg)
    )

    window.ElectronApi.msgToBack(msg)
}
