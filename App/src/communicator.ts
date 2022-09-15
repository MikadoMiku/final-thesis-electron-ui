import { _ws } from "./UI_Server"
import addon from "./main"
import fs from "fs"
import { copyFile } from "fs/promises"

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
                sendMsg(natObject)
                break
            case "playSong":
                playSong()
                break
            case "stopSong":
                stopSong()
                break
            case "listAudioClips":
                addon.listAudioClips()
                break
            case "playClip":
                addon.playClip(msg.payload)
                break
            case "setAudioEndpointById":
                addon.setAudioEndpointDeviceId(msg.payload)
                break
            case "addClipFiles":
                const fileCopyPromise = addFilesToApp(msg.payload)
                fileCopyPromise.finally(() => sendMsg({ type: "fileCopyDone" }))
            default:
                console.log("UNKNOWN COMMAND | CANNOT SEND TO NATIVE ADDON")
        }
    } catch (e) {
        console.error("Unable to handle WS message", message.toString())
    }
}

async function addFilesToApp(filePaths: string[]) {
    for (const filePath of filePaths) {
        await copyFile(filePath, "C:/Users/power/Desktop/Demut_test_file_drag")
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
