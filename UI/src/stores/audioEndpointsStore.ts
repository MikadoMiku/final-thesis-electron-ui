import { defineStore } from "pinia"

const testData: audioEndpoints = {
    '"Speakers (FiiO K5 Pro)"': "23623yhg675u3bzfdh24",
    '"VoiceMeeter Input (VB-Audio VoiceMeeter VAIO)"': "13gfdgaweh58i456isj5",
    '"CABLE Input (VB-Audio Virtual Cable)"': "12215136asdfcfvag231",
    '"Speakers (NVIDIA Broadcast)"': "a135613afqa3",
}
type audioEndpoints = { [Key: string]: string }

export const useAudioEndpointsStore = defineStore({
    id: "AudioEndpoints",
    state: () => ({
        // audioEndpoints: [] as string[],
        audioEndpoints: testData,
        gotEndpoints: true,
    }),
    actions: {
        setAudioEndpoints(payload: audioEndpoints) {
            this.audioEndpoints = payload
            this.gotEndpoints = true
        },
    },
})
