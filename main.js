const { app, BrowserWindow, ipcMain, contextBridge } = require("electron");

const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 940,
    minHeight: 560,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true
    },
  });

  win.loadFile("index.html");

  ipcMain.on("close", () => {
    const wind = BrowserWindow.getFocusedWindow();
    if (wind) {
      wind.close();
    }
  });

  ipcMain.on("maximize", () => {
    const wind = BrowserWindow.getFocusedWindow();
    if (wind) {
      if (wind.isMaximized == true) {
        wind.unmaximize();
        wind.isMaximized = false;
      } else {
        wind.maximize();
        wind.isMaximized = true;
      }
    }
  });

  ipcMain.on("minimize", () => {
    const wind = BrowserWindow.getFocusedWindow();
    if (wind) {
      wind.minimize();
    }
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
