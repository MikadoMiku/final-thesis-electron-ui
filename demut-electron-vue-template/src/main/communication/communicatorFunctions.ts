import fs from 'fs'
import { FileStats } from '../../api/api-payload-types'
import path from 'path'
import { sendMsg } from './communicator'
import fileWatcher from 'chokidar'
import { exec } from 'child_process'

let audioClipsFileWatcher: fileWatcher.FSWatcher

export async function getDataOfFiles() {
  // Should come from config that can be edited by user...
  //const testFolder = "C:/Users/power/Desktop/DEMUT_WAV_CLIPS"
  // const testFolder = configuration.defaultAudioClipDir
  let testFolder
  if (process.env.NODE_ENV === 'development') {
    testFolder = 'C:/Users/power/Desktop/DEMUT_WAV_CLIPS'
  } else {
    testFolder = path.join(
      path.join(process?.env?.ProgramData!, '\\Demut'),
      '\\DEMUT_WAV_CLIPS'
    )
  }
  const files = fs.readdirSync(testFolder, 'utf8')
  let res: FileStats[] = []
  for (let file of files) {
    const extension = path.extname(file)
    const fileStats = fs.statSync(testFolder + '/' + file)
    res.push({
      name: path.parse(file).name,
      extension,
      size: fileStats.size / 1000,
      creationTime: fileStats.birthtime.toString()
    })
  }
  sendMsg({ type: 'dataOfClipFiles', payload: res })
}

export function startAudioCLipFilesDirWatcher() {
  let watchedFolder
  if (process.env.NODE_ENV === 'development') {
    watchedFolder = 'C:/Users/power/Desktop/DEMUT_WAV_CLIPS'
  } else {
    watchedFolder = path.join(
      path.join(process?.env?.ProgramData!, '\\Demut'),
      '\\DEMUT_WAV_CLIPS'
    )
  }
  audioClipsFileWatcher = fileWatcher.watch(watchedFolder, {
    persistent: true
  })
  audioClipsFileWatcher.on('add', (path) => {
    getDataOfFiles()
  })
  audioClipsFileWatcher.on('change', (path) => {
    getDataOfFiles()
  })
  audioClipsFileWatcher.on('unlink', (path) => {
    getDataOfFiles()
  })
}

export function stopAudioCLipFilesDirWatcher() {
  audioClipsFileWatcher.close()
}

export function openAudioclipFolder() {
  let openFolder
  if (process.env.NODE_ENV === 'development') {
    openFolder = 'C:/Users/power/Desktop/DEMUT_WAV_CLIPS'
  } else {
    openFolder = path.join(
      path.join(process?.env?.ProgramData!, '\\Demut'),
      '\\DEMUT_WAV_CLIPS'
    )
  }
  exec(`start ${openFolder}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`)
      return
    }
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  })
}
