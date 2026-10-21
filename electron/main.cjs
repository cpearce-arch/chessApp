const { app, BrowserWindow } = require('electron')
const path = require('path')

const isDev = Boolean(process.env.VITE_DEV_SERVER_URL)

function distIndexPath() {
  // Packaged: app.asar/dist/index.html — __dirname is app.asar/electron
  return path.join(__dirname, '../dist/index.html')
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 960,
    minHeight: 640,
    title: 'Pokémon Chess 3D',
    backgroundColor: '#0f1419',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  })

  win.webContents.on('did-fail-load', (_event, code, description, url) => {
    console.error('did-fail-load', code, description, url)
  })

  win.webContents.on('console-message', (_event, level, message, line, sourceId) => {
    if (level >= 2) {
      console.error(`[renderer:${level}] ${message} (${sourceId}:${line})`)
    }
  })

  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }))
  win.webContents.on('will-navigate', (event, url) => {
    if (isDev && url.startsWith(process.env.VITE_DEV_SERVER_URL)) return
    if (!isDev && url.startsWith('file://')) return
    event.preventDefault()
  })

  if (isDev) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    win.loadFile(distIndexPath())
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
