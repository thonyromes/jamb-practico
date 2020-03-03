const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const build = require('./src/build')
let win = null

ipcMain.on('notification-clicked', () => {
    win.show()
})

const createWindow = () => {
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        icon: 'icon.ico',
        center: true,
        closeable: false,
        movable: false,
        resizable: false,
        minimizable: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.maximize()

    win.loadFile('views/student/login.html')

    // win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

Menu.setApplicationMenu(null)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

app.on('ready', createWindow)