import path from "path";
import url from "url";
import { app, BrowserWindow, nativeImage, ipcMain, Tray } from "electron";
import { enableLiveReload } from "electron-compile";
import { autoUpdater } from "electron-updater";
import Store from "electron-store";
import isDev from "electron-is-dev";

import TrayWindowManager from "./lib/trayWindowManager";

app.dock.hide();
enableLiveReload();

const store = new Store();
let mainWindow;
let settingsWindow;
let tray;

function createWindows() {
  mainWindow = new BrowserWindow({
    width: 300,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    useContentSize: true,
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "./menu.html"),
      protocol: "file:",
      slashes: true,
    }),
  );

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

function createTray() {
  const image = nativeImage.createFromPath(
    path.join(__dirname, "/images/trayTemplate.png"),
  );
  tray = new Tray(image);
}

app.on("ready", function() {
  createWindows();
  createTray();
  autoUpdater.checkForUpdatesAndNotify();

  const trayManager = new TrayWindowManager(tray, mainWindow);
});

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("openSettings", function() {
  if (settingsWindow) {
    settingsWindow.show();
    return;
  }

  settingsWindow = new BrowserWindow({
    width: 600,
    height: 600,
    fullscreenable: false,
    resizable: false,
  });

  if (isDev) {
    settingsWindow.webContents.openDevTools();
  }

  settingsWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "./settings.html"),
      protocol: "file:",
      slashes: true,
    }),
  );

  settingsWindow.on("close", function() {
    app.dock.hide();
    settingsWindow = null;
  });

  app.dock.show();
});

const savedCoins = store.get("savedCoins") || {
  BTC: {
    enabled: true,
    total: 0,
  },
  ETH: {
    enabled: true,
    total: 0,
  },
  BCH: {
    enabled: false,
    total: 0,
  },
};

ipcMain.on("getSavedCoins", function(event) {
  event.sender.send("coinsUpdated", savedCoins);
});

ipcMain.on("toggleCoin", function(event, name) {
  const coin = savedCoins[name];

  if (coin) {
    coin.enabled = !coin.enabled;
  } else {
    savedCoins[name] = { enabled: true, total: 0 };
  }

  store.set("savedCoins", savedCoins);
  mainWindow.webContents.send("coinsUpdated", savedCoins);
  event.sender.send("coinsUpdated", savedCoins);
});

ipcMain.on("updateTotal", function(event, name, total) {
  const coin = savedCoins[name];

  if (coin) {
    coin.total = total;
  } else {
    savedCoins[name] = { enabled: false, total };
  }

  store.set("savedCoins", savedCoins);
  mainWindow.webContents.send("coinsUpdated", savedCoins);
  event.sender.send("coinsUpdated", savedCoins);
});
