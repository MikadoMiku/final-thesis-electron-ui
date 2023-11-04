import { ipcMain, IpcMainEvent, ipcRenderer } from 'electron'
import { BackToUiEventSet, UiToBackEventSet } from '../../api/api-messages'
import nativeDemutAddon, {
  configuration,
  currentOverlayKey,
  getUserDocumentsFolderOnedriveWorkaround,
  mainWindow
} from '../main'
import { copyFile } from 'fs/promises'
import { AudioEndpoint, CopyableFile } from '../../api/api-payload-types'
import {
  getDataOfFiles,
  openAudioclipFolder,
  startAudioCLipFilesDirWatcher,
  writeToConfiguration
} from './communicatorFunctions'
import path from 'path'
const os = require('os')

export function setupCommunicator() {
  ipcMain.on('message-from-ui', handleMessage)
}

function handleMessage(_event: IpcMainEvent, msg: UiToBackEventSet) {
  try {
    switch (msg.type) {
      case 'getAudioEndpoints':
        let natObject: AudioEndpoint
        natObject = nativeDemutAddon.getAudioEndpoints()
        sendMsg({ type: 'audioEndpoints', payload: natObject })
        break
      case 'stopClip':
        stopSong()
        break
      case 'playClip':
        nativeDemutAddon.playClip(msg.payload)
        break
      case 'setAudioEndpointById':
        nativeDemutAddon.setAudioEndpointDeviceId(msg.payload)
        break
      case 'addClipFiles':
        const fileCopyPromise = addFilesToApp(msg.payload)
        fileCopyPromise.finally(() =>
          sendMsg({ type: 'dragAndDropAudioFilesDone' })
        )
        break
      case 'getDataOfClipFiles':
        getDataOfFiles()
        startAudioCLipFilesDirWatcher()
        break
      case 'synthesizeTextToAudioFile':
        nativeDemutAddon.synthesizeTextToAudioFile(
          msg.payload.textToSynthesize,
          msg.payload.newFilename
        )
        break
      case 'synthesizeVoiceFromText':
        nativeDemutAddon.simulateVoice(msg.payload)
        ipcMain.emit('synthesizeVoice')
        break
      case 'stopOverlay':
        ipcMain.emit('synthesizeVoice')
        break
      case 'startMouseListener':
        nativeDemutAddon.startMouseListener((x: number, y: number, s: number) =>
          sendMsg({
            type: 'nativeMouseEvent',
            payload: { mouseX: x, mouseY: y, sector: s }
          })
        )
        break
      case 'stopMouseListener':
        nativeDemutAddon.stopMouseListener()
        break
      case 'openAudioclipFolder':
        openAudioclipFolder()
        break
      case 'writeToConfig':
        writeToConfiguration(msg.payload)
        break
      case 'getCurrentOverlayHotkey':
        sendMsg({
          type: 'sendCurrentOverlayHotkey',
          payload: currentOverlayKey
        })
        break
      default:
        console.log('UNKNOWN COMMAND | CANNOT SEND TO NATIVE ADDON')
    }
  } catch (e) {
    console.error('Unable to handle WS message', msg.toString())
  }
}

async function addFilesToApp(filePaths: CopyableFile[]) {
  let testDragFolder
  if (process.env.NODE_ENV === 'development') {
    testDragFolder = 'C:/Users/power/Desktop/Demut_test_file_drag/'
  } else {
    testDragFolder = path.join(
      getUserDocumentsFolderOnedriveWorkaround(),
      'Demut',
      'DEMUT_WAV_CLIPS'
    )
  }
  try {
    for (const file of filePaths) {
      await copyFile(file.filePath, testDragFolder + '/' + file.fileName)
    }
  } catch (e) {
    console.log(e)
  }
}

function stopSong() {
  return nativeDemutAddon.stopSong()
}

export const sendMsg = (msg: BackToUiEventSet): void => {
  mainWindow?.webContents.send('message-from-back', msg)
}
