import { app, BrowserWindow, ipcMain, session, shell } from 'electron'
import { join } from 'path'
import path from 'path'
import { sendMsg, setupCommunicator } from './communication/communicator'
import fs from 'fs'

const nativeDemutAddon = require('C:\\Git_repos\\final-thesis-audio\\build\\Release\\AudioEndpoints')
export default nativeDemutAddon

export let configuration

export let mainWindow: BrowserWindow | null = null

function createWindow() {
  console.log('CREATING WINDOW')
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: path.join(__dirname, 'icons/icon.ico'),
    autoHideMenuBar: false,
    useContentSize: true,
    resizable: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2]
    mainWindow.loadURL(`http://localhost:${rendererPort}`)
  } else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'))
  }
  // Automatically open chromium dev tools when opening app
  mainWindow.webContents.openDevTools()
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
        ? path.join(process?.env?.ProgramData!, '\\demut\\') // Windows specific!
        : path.join(process.cwd(), '\\config\\'),
      'app-config.json'
    )
    configuration = JSON.parse(fs.readFileSync(filepath).toString())
    if (!configuration.securityModule) {
      configuration.securityModule = {
        constants: {
          DELAYS: { default: 200, completed: 5000 }
        }
      }
    }
    console.log(`Full Config = ${JSON.stringify(configuration)}`)
  } catch (e) {
    console.log(e)
  }
}

app.whenReady().then(() => {
  console.log('LOADING CONFIGURATION')
  loadConfigurationFromJson()
  createWindow()
  setupCommunicator()
  console.log('SENDING MESSAGE TO UI')
  nativeDemutAddon.startMouseListener((x: number, y: number, s: number) =>
    sendMsg({ type: 'nativeMouseEvent', payload: { mouseX: x, mouseY: y, sector: s } })
  )
  /* mainWindow?.webContents.on("did-finish-load", () => {
        mainWindow?.webContents.send("message-from-back", { type: "poop" })
    }) */

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
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('message', (event, message) => {
  console.log(message)
})
