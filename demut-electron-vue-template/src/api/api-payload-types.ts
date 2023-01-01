export interface AudioEndpoint {
  [Key: string]: string
}

export interface CopyableFile {
  filePath: string
  fileName: string
  fileType: string
}

export interface FileStats {
  creationTime: string
  name: string
  size: number
  extension: string
}

export interface NativeMouseEventData {
  mouseX: number
  mouseY: number
  sector: number
}

export interface TextSynthesizeData {
  textToSynthesize: string
  newFilename: string
}

export type ConfigWriteDataTypes = {
  section: 'pingwheel'
  value: { sector: number; clipName: string }[]
}
