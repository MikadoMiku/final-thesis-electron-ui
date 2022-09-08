import { _ws } from "./UI_Server"
import addon from "./main"

type GenericEvent = { type: string; payload?: any }

export const handleMessage = (message: string): void => {
    console.log("from UI", message.toString())
    try {
        const msg: GenericEvent = JSON.parse(message)
        //getMessageController().routeIncomingMessage(msg)

        switch (msg.type) {
            case "PING":
                let natObject: any
                natObject = addon.getAudioEndpoints()
                sendMsg(JSON.stringify(natObject))
                break
            case "playSong":
                playSong()
                break
            case "stopSong":
                stopSong()
                break
            case "listAudioClips":
                addon.listAudioClips()
                break;
            case "playClip":
                addon.playClip(msg.payload)
                break;
            default:
                console.log("UNKNOWN COMMAND | CANNOT SEND TO NATIVE ADDON")
        }
    } catch (e) {
        console.error("Unable to handle WS message", message.toString())
    }
}

function playSong() {
    return addon.playSong()
}

function stopSong() {
    return addon.stopSong()
}

export const sendMsg = (msg: any): void => {
    console.log("saadan UI-le", msg)
    const msgJson = JSON.stringify(msg)
    // logger.debug('toWS: ', msgJson)
    if (_ws) _ws.send(msgJson)
}
