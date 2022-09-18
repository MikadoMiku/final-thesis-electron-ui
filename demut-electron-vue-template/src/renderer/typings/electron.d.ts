import { BackToUiEventSet, UiToBackEventSet } from "../../api/api-messages"
import { IpcRendererEvent } from "electron"
/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
    msgToBack: (msg: UiToBackEventSet) => any
    msgToUi: (
        callback: (_event: IpcRendererEvent, msg: BackToUiEventSet) => any
    ) => any
}

declare global {
    interface Window {
        ElectronApi: ElectronApi
    }
}
