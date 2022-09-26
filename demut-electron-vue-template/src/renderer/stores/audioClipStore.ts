import { defineStore } from "pinia"
import { FileStats } from "../../api/api-payload-types"
import { AudioClipStoreFunctions } from "./storeTypings/audioEndpointStoreTypes"

// https://gist.github.com/kuroski/9a7ae8e5e5c9e22985364d1ddbf3389d
type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T>
          ? "_"
          : ""}${Lowercase<T>}${CamelToSnakeCase<U>}`
    : S

type O = { [T in AudioClipStoreFunctions as T["type"]]: T["type"] }

type D = keyof O

type F = {
    [T in D as T extends string
        ? `${Uppercase<CamelToSnakeCase<Uncapitalize<T>>>}`
        : T]: T
}

// Object as an enum, the Uppercase is more readable?.
export const FUNCTIONS: F = {
    DATA_OF_CLIP_FILES: "dataOfClipFiles",
}

export const useAudioClipsStore = defineStore({
    id: "AudioClips",
    state: () => ({
        audioClipFilesData: [] as FileStats[],
    }),
    actions: {
        [FUNCTIONS.DATA_OF_CLIP_FILES](payload: FileStats[]) {
            this.audioClipFilesData = payload
        },
    },
})
