import { useAudioEndpointsStore } from "../stores/audioEndpointsStore"

// Need to make an API folder, THIS IS BAD IM LAZYYY
type GenericEvent = { type: string; payload?: any }

let connection: WebSocket

export const setupCommunicator = (): void => {
    connection = new WebSocket("ws://" + window.location.host)
    connection.onmessage = (event) => {
        console.log("%cRECEIVED MESSAGE: ", "font-weight: bold; color: orange")
        console.log(event.data)

        let parsedData: string = (event.data as string).replace(
            /\[|\]|\\|\//g,
            ""
        )

        const array: string[] = parsedData
            .substring(1, parsedData.length - 1)
            .split(",")
        useAudioEndpointsStore().setAudioEndpoints(array)
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
