import electron, { app, BrowserWindow, nativeImage, Tray } from 'electron'
import { enableLiveReload } from 'electron-compile';
import path from 'path';
import url from 'url'

import TrayWindowManager from './trayWindowManager';

enableLiveReload();
app.dock.hide();

let mainWindow;
let tray;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 600,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    useContentSize: true,
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './app/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

function createTray () {
  const image = nativeImage.createFromPath(path.join(__dirname, '/images/trayTemplate.png'))
  tray = new Tray(image)
}

app.on('ready', function() {
  createWindow();
  createTray();

  const trayManager = new TrayWindowManager(tray, mainWindow);
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
