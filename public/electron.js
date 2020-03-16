const { app, BrowserWindow, ipcMain } = require("electron")
const path = require('path')
const isDev = require("electron-is-dev")

const devUrl = "http://localhost:3000"

const localUrl = `file://${path.resolve(
  __dirname,
  '../../app.asar/build'
)}/index.html`

const appUrl = isDev ? devUrl : localUrl

let mainWindow

function createWindow() {
    // require("devtron").install()
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    })
    mainWindow.loadURL(appUrl)
    // mainWindow.webContents.openDevTools()
}

app.on("ready", createWindow)


ipcMain.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('minimize-window', () => {
    mainWindow.minimize();
});