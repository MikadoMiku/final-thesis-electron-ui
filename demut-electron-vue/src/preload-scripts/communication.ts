import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld("communicationApi", {
    loadPreferences: () => ipcRenderer.invoke("load-prefs"),
})
