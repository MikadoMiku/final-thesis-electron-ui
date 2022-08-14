import { defineStore } from "pinia"

export const useAudioEndpointsStore = defineStore({
    id: "AudioEndpoints",
    state: () => ({
        audioEndpoints: [] as string[],
        gotEndpoints: false,
    }),
    actions: {
        setAudioEndpoints(payload: string[]) {
            this.audioEndpoints = payload
            this.gotEndpoints = true
        },
    },
})
