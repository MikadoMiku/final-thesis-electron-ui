import { useAudioEndpointsStore } from "../stores/audioEndpointsStore"

// Need to make an API folder, THIS IS BAD IM LAZYYY
type GenericEvent = { type: string; payload?: any }

let connection: WebSocket

export const setupCommunicator = (): void => {
    connection = new WebSocket("ws://" + window.location.host)
    connection.onmessage = (event) => {
        console.log("%cRECEIVED MESSAGE: ", "font-weight: bold; color: orange")
        let msgData = JSON.parse(event.data)
        useAudioEndpointsStore().setAudioEndpoints(msgData)
    }
}

export function sendMsg(msg: GenericEvent) {
    console.log(
        "%cSending Message to MiddleWare -------> ",
        "color: limegreen;",
        JSON.stringify(msg)
    )
    if (connection) connection.send(JSON.stringify(msg))
}
