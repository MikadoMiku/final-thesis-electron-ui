import { defineStore } from "pinia"

const testData = [
    '"Speakers (FiiO K5 Pro)"',
    '"VoiceMeeter Input (VB-Audio VoiceMeeter VAIO)"',
    '"CABLE Input (VB-Audio Virtual Cable)"',
    '"Speakers (NVIDIA Broadcast)"',
    '"Speakers (FiiO K5 Pro)"',
    '"VoiceMeeter Input (VB-Audio VoiceMeeter VAIO)"',
    '"CABLE Input (VB-Audio Virtual Cable)"',
    '"Speakers (NVIDIA Broadcast)"',
    '"Speakers (FiiO K5 Pro)"',
    '"VoiceMeeter Input (VB-Audio VoiceMeeter VAIO)"',
    '"CABLE Input (VB-Audio Virtual Cable)"',
    '"Speakers (NVIDIA Broadcast)"',
]

export const useAudioEndpointsStore = defineStore({
    id: "AudioEndpoints",
    state: () => ({
        // audioEndpoints: [] as string[],
        audioEndpoints: testData,
        gotEndpoints: true,
    }),
    actions: {
        setAudioEndpoints(payload: string[]) {
            this.audioEndpoints = payload
            this.gotEndpoints = true
        },
    },
})
