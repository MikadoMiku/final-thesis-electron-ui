import { useAudioEndpointsStore } from "../stores/audioEndpointsStore"

let connection: WebSocket

export const setupComminucator = (): void => {
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

export const sendMsg = (msg: any) => {
    console.log(
        "%cSending Message to MiddleWare -------> ",
        "color: limegreen;",
        JSON.stringify(msg)
    )
    if (connection) connection.send(JSON.stringify(msg))
}
