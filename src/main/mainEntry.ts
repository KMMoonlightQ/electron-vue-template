import { app, BrowserWindow } from 'electron'
import { CustomScheme } from './customScheme'
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

let mainWindow: BrowserWindow

app.whenReady().then(() => {
  const config = {
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      webviewTag: true,
      spellcheck: true,
      disableHtmlFullscreenWindowResize: true
    }
  }

  mainWindow = new BrowserWindow(config)

  if (process.argv[2]) {
    mainWindow.loadURL(process.argv[2])
    mainWindow.webContents.openDevTools({ mode: 'undocked' })
  } else {
    CustomScheme.registerScheme()
    mainWindow.loadURL('app://index.html')
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
