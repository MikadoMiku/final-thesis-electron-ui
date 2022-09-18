import { ipcMain, IpcMainEvent } from "electron"
import { BackToUiEventSet, UiToBackEventSet } from "../../api/api-messages"
import nativeDemutAddon, { mainWindow } from "../main"
import { copyFile } from "fs/promises"
import { AudioEndpoint } from "../../api/api-payload-types"

export function setupCommunicator() {
    console.log("SETTING UP COMMUNICATOR")
    ipcMain.on("message-from-ui", handleMessage)
}

function handleMessage(_event: IpcMainEvent, msg: UiToBackEventSet) {
    try {
        switch (msg.type) {
            case "getAudioEndpoints":
                let natObject: AudioEndpoint
                natObject = nativeDemutAddon.getAudioEndpoints()
                sendMsg({ type: "audioEndpoints", payload: natObject })
                break
            case "stopClip":
                stopSong()
                break
            case "getAudioClipNames":
                nativeDemutAddon.listAudioClips()
                break
            case "playClip":
                nativeDemutAddon.playClip(msg.payload)
                break
            case "setAudioEndpointById":
                nativeDemutAddon.setAudioEndpointDeviceId(msg.payload)
                break
            case "addClipFiles":
                const fileCopyPromise = addFilesToApp(msg.payload)
                fileCopyPromise.finally(() =>
                    sendMsg({ type: "dragAndDropAudioFilesDone" })
                )
            default:
                console.log("UNKNOWN COMMAND | CANNOT SEND TO NATIVE ADDON")
        }
    } catch (e) {
        console.error("Unable to handle WS message", msg.toString())
    }
}

async function addFilesToApp(filePaths: string[]) {
    for (const filePath of filePaths) {
        await copyFile(filePath, "C:/Users/power/Desktop/Demut_test_file_drag")
    }
}

function stopSong() {
    return nativeDemutAddon.stopSong()
}

export const sendMsg = (msg: BackToUiEventSet): void => {
    console.log("saadan UI-le", msg)
    mainWindow?.webContents.send("message-from-back", msg)
}
