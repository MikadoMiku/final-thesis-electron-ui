export interface ICommunicationApi {
    loadPreferences: () => Promise<void>
}

declare global {
    interface Window {
        communicationApi: ICommunicationApi
    }
}
