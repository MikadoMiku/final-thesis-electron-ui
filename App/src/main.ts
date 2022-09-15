import electron, {
    app,
    BrowserWindow,
    dialog,
    globalShortcut,
    shell,
} from "electron"
import path from "path"
import * as pjson from "../package.json"
import { sendMsg } from "./communicator"
import { setupUIServer } from "./UI_Server"

const addonNat = require("C:\\Git_repos\\final-thesis-audio\\build\\Release\\AudioEndpoints")
export default addonNat

let mainWindow: BrowserWindow
function createWindow() {
    // Create the browser window.
    setupUIServer()
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        autoHideMenuBar: false,
        useContentSize: true,
        resizable: true,
        icon: path.join(__dirname, "icons/icon.ico"),

        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: false,
        },
    })
    mainWindow.loadURL("http://localhost:58008/")
    mainWindow.webContents.openDevTools()
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url)
        return { action: "deny" }
    })
}

const getFileFromUser = async () => {
    const files = await dialog.showOpenDialog({
        properties: ["openFile"],
    })
    if (!files) {
        return
    }
    console.log(files)
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
    createWindow()

    /*     mainWindow.once("ready-to-show", () => {
        getFileFromUser()
    }) */

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    addonNat.startMouseListener((x: any, y: any) =>
        sendMsg("Mouse listened to: X->" + x + " | Y->" + y)
    )
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("will-quit", () => {
    // Unregister a shortcut.
    //globalShortcut.unregister("CommandOrControl+X")

    // Unregister all shortcuts.
    globalShortcut.unregisterAll()
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
