import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron"
import { BackToUiEventSet, UiToBackEventSet } from "../api/api-messages"

contextBridge.exposeInMainWorld("ElectronApi", {
    msgToBack: (msg: UiToBackEventSet) =>
        ipcRenderer.send("message-from-ui", msg),
    msgToUi: (
        callback: (_event: IpcRendererEvent, msg: BackToUiEventSet) => any
    ) => ipcRenderer.on("message-from-back", callback),
})
