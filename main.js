import electron, { app, BrowserWindow, nativeImage, Tray } from 'electron'
import { enableLiveReload } from 'electron-compile';
import path from 'path';
import url from 'url'

enableLiveReload();

let mainWindow;
let tray;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', function() {
  createWindow();
  createTray();
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

function getIconCenter() {
  const windowBounds = mainWindow.getBounds()
  const trayBounds = tray.getBounds()

  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  const y = Math.round(trayBounds.y + trayBounds.height)

  return { x, y };
}

function showWindow() {
  const position = getIconCenter()
  mainWindow.setPosition(position.x, position.y, false)
  mainWindow.show()
  mainWindow.focus()
}

function toggleWindow() {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    showWindow();
  }
}

function createTray () {
  const image = nativeImage.createFromPath(path.join(__dirname, '/images/trayTemplate.png'))
  tray = new Tray(image)

  tray.on('click', toggleWindow);
}
