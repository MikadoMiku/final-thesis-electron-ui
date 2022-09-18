import { defineStore } from "pinia"
import { AudioEndpoint } from "../../api/api-payload-types"
import { AudioEndpointStoreFunctions } from "./storeTypings/audioEndpointStoreTypes"

const testData: AudioEndpoint = {
    '"Speakers (FiiO K5 Pro)"': "23623yhg675u3bzfdh24",
    '"VoiceMeeter Input (VB-Audio VoiceMeeter VAIO)"': "13gfdgaweh58i456isj5",
    '"CABLE Input (VB-Audio Virtual Cable)"': "12215136asdfcfvag231",
    '"Speakers (NVIDIA Broadcast)"': "a135613afqa3",
}

// https://gist.github.com/kuroski/9a7ae8e5e5c9e22985364d1ddbf3389d
type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T>
          ? "_"
          : ""}${Lowercase<T>}${CamelToSnakeCase<U>}`
    : S

type O = { [T in AudioEndpointStoreFunctions as T["type"]]: T["type"] }

type D = keyof O

type F = {
    [T in D as T extends string
        ? `${Uppercase<CamelToSnakeCase<Uncapitalize<T>>>}`
        : T]: T
}

// Object as an enum, the Uppercase is more readable?.
export const FUNCTIONS: F = {
    AUDIO_ENDPOINTS: "audioEndpoints",
}

export const useAudioEndpointsStore = defineStore({
    id: "AudioEndpoints",
    state: () => ({
        audioEndpointList: {} as AudioEndpoint,
        gotEndpoints: true,
    }),
    actions: {
        [FUNCTIONS.AUDIO_ENDPOINTS](payload: AudioEndpoint) {
            console.table(payload)
            this.audioEndpointList = payload
            this.gotEndpoints = true
        },
    },
})
