import { _ws } from "./UI_Server"
import { fstat } from "original-fs"
import addon from "./main"

export const handleMessage = (message: string): void => {
    console.log("from UI", message.toString())
    try {
        const msg: any = JSON.parse(message)
        //getMessageController().routeIncomingMessage(msg)
        if (msg === "PING") {
            let natObject: any
            natObject = addon.getAudioEndpoints()
            sendMsg(JSON.stringify(natObject))
        }
    } catch (e) {
        console.error("Unable to handle WS message", message.toString())
    }
}

export const sendMsg = (msg: any): void => {
    console.log("saadan UI-le", msg)
    const msgJson = JSON.stringify(msg)
    // logger.debug('toWS: ', msgJson)
    if (_ws) _ws.send(msgJson)
}
