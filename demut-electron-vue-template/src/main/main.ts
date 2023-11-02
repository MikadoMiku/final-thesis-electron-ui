import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  session,
  shell
} from 'electron'
import { join } from 'path'
import path from 'path'
import { sendMsg, setupCommunicator } from './communication/communicator'
import fs from 'fs'
import { BackToUiEventSet } from '../api/api-messages'
const os = require('os')

const isDev = process.env.NODE_ENV === 'development'
export let currentOverlayKey = 'f9'
let addonPath
if (isDev) {
  addonPath =
    'C:\\Git_repos\\final-thesis-audio\\build\\Release\\AudioEndpoints'
} else {
  addonPath = path.join(app.getAppPath(), '..', '..', 'AudioEndpoints.node')
}

const nativeDemutAddon: any = require(addonPath)

// const nativeDemutAddon = require('C:\\Program Files (x86)\\Demut\\AudioEndpoints')
// const nativeDemutAddon = require('C:\\Git_repos\\final-thesis-audio\\build\\Release\\AudioEndpoints')
export default nativeDemutAddon

const EventEmitter = require('events')

// Create an instance of EventEmitter
export const ConfigurationChangesEmitter = new EventEmitter()

export let configuration

export let mainWindow: BrowserWindow | null = null
export let overlayWindow: BrowserWindow | null = null
let overlayWindowShown = false

function createWindow() {
  if (process.env.NODE_ENV === 'development') {
    mainWindow = new BrowserWindow({
      width: 1400,
      height: 900,
      autoHideMenuBar: false,
      title: 'Demut',
      useContentSize: true,
      resizable: false,
      webPreferences: {
        preload: join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true
      }
    })
  } else {
    mainWindow = new BrowserWindow({
      width: 1400,
      height: 900,
      title: 'Demut',
      autoHideMenuBar: true,
      useContentSize: true,
      resizable: false,
      webPreferences: {
        preload: join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true
      }
    })
  }

  overlayWindow = new BrowserWindow({
    height: 200,
    width: 600,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    resizable: false,
    transparent: true,
    frame: false,
    kiosk: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  mainWindow.on('close', () => {
    overlayWindow?.close()
  })

  overlayWindow.hide()
  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2]
    overlayWindow.loadURL(`http://localhost:${rendererPort}/#/overlay`)
    mainWindow.loadURL(`http://localhost:${rendererPort}`)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'))
    overlayWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'))
    // overlayWindow.loadURL(join(app.getAppPath(), 'renderer', 'index.html?route=overlay'))
  }
  // Automatically open chromium dev tools when opening app
  // When opening an external link in the app, use pc default browser instead of opening it in the app.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })
}

function loadConfigurationFromJson() {
  try {
    const configFileName =
      process.env.NODE_ENV !== 'development' ? 'config.json' : 'app-config.json'
    const documentsPath = path.join(
      os.homedir(),
      'Documents',
      'Demut',
      'Config'
    )
    // Ensure the directory exists, creating it if needed
    if (!fs.existsSync(documentsPath)) {
      fs.mkdirSync(documentsPath, { recursive: true })
    }
    const filepath = path.join(documentsPath, configFileName)

    configuration = JSON.parse(fs.readFileSync(filepath).toString())
    console.log('configuration loaded')
    //console.log(`Full Config = ${JSON.stringify(configuration)}`)
  } catch (e) {
    console.log(e)
  }
}

app.whenReady().then(() => {
  loadConfigurationFromJson()
  createWindow()
  setupCommunicator()
  mainWindow?.webContents.once('dom-ready', () =>
    mainWindow?.webContents.send('message-from-back', {
      type: 'setConfiguredPingwheelClips',
      payload: configuration.pingwheel
    } as BackToUiEventSet)
  )
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["script-src 'self'"]
      }
    })
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  let overlayKey = 'f9'
  if (configuration.defaultOverlayButton) {
    overlayKey = configuration.defaultOverlayButton?.toLowerCase()
    console.log(
      'setting overlayKey to: ',
      configuration.defaultOverlayButton?.toLowerCase()
    )
  }
  if (!overlayKey) {
    overlayKey = 'f9'
  }
  currentOverlayKey = overlayKey
  const globalShortcutFunc = () => {
    // make f9 configurable
    overlayWindow?.webContents.send('message-from-back', {
      type: 'overlayRouterPush'
    } as BackToUiEventSet)
    if (!overlayWindowShown) {
      overlayWindow?.show()
      overlayWindow?.focus()
      overlayWindowShown = true
      return
    }
    overlayWindow?.hide()

    overlayWindowShown = false
  }
  globalShortcut.register(overlayKey, globalShortcutFunc)

  // Define an event handler
  ConfigurationChangesEmitter.on('overlayKeyChanged', (arg) => {
    console.log('henlo')
    loadConfigurationFromJson()
    globalShortcut.unregister(currentOverlayKey)
    let overlayKey = 'f9'
    if (configuration.defaultOverlayButton) {
      overlayKey = configuration.defaultOverlayButton?.toLowerCase()
    }
    if (!overlayKey) {
      overlayKey = 'f9'
    }
    currentOverlayKey = overlayKey
    globalShortcut.register(overlayKey, globalShortcutFunc)
    sendMsg({
      type: 'sendCurrentOverlayHotkey',
      payload: currentOverlayKey
    })
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
  return
})

ipcMain.on('message', (event, message) => {
  console.log(message)
})

ipcMain.on('synthesizeVoice', () => {
  if (!overlayWindowShown) {
    return
  }
  overlayWindow?.hide()
  overlayWindowShown = false
})
