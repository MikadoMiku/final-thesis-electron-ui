import fs from 'fs'
import { FileStats } from '../../api/api-payload-types'
import path from 'path'
import { sendMsg } from './communicator'
import fileWatcher from 'chokidar'
import { configuration } from '../main'

let audioClipsFileWatcher: fileWatcher.FSWatcher

export async function getDataOfFiles() {
  // Should come from config that can be edited by user...
  //const testFolder = "C:/Users/power/Desktop/DEMUT_WAV_CLIPS"
  const testFolder = configuration.defaultAudioClipDir
  const files = fs.readdirSync(testFolder, 'utf8')
  let res: FileStats[] = []
  for (let file of files) {
    const extension = path.extname(file)
    const fileStats = fs.statSync(testFolder + '/' + file)
    res.push({
      name: file,
      extension,
      size: fileStats.size / 1000,
      creationTime: fileStats.birthtime.toString()
    })
  }
  sendMsg({ type: 'dataOfClipFiles', payload: res })
}

export function startAudioCLipFilesDirWatcher() {
  audioClipsFileWatcher = fileWatcher.watch(configuration.defaultAudioClipDir, {
    persistent: true
  })
  audioClipsFileWatcher.on('add', (path) => {
    getDataOfFiles()
    console.log(`File ${path} has been added`)
  })
  audioClipsFileWatcher.on('change', (path) => {
    getDataOfFiles()
    console.log(`File ${path} has been changed`)
  })
  audioClipsFileWatcher.on('unlink', (path) => {
    getDataOfFiles()
    console.log(`File ${path} has been removed`)
  })
}

export function stopAudioCLipFilesDirWatcher() {
  audioClipsFileWatcher.close()
}
