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
import { setupCommunicator } from './communication/communicator'
import fs from 'fs'
import { BackToUiEventSet } from '../api/api-messages'

const nativeDemutAddon = require('C:\\Program Files (x86)\\Demut\\AudioEndpoints')
// const nativeDemutAddon = require('C:\\Git_repos\\final-thesis-audio\\build\\Release\\AudioEndpoints')
export default nativeDemutAddon

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
    const filepath = path.join(
      process.env.NODE_ENV !== 'development'
        ? path.join(process?.env?.ProgramData!, '\\Demut\\') // Windows specific!
        : path.join(process.cwd(), '\\config\\'),
      process.env.NODE_ENV !== 'development' ? 'config.json' : 'app-config.json'
    )
    configuration = JSON.parse(fs.readFileSync(filepath).toString())

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

  globalShortcut.register('f9', () => {
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
