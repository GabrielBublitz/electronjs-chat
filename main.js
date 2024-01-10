const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const { setupHandlers } = require("./src/js/configHandle.js");

const isDev = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 940,
    minHeight: 560,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "./src/js/preload.js"),
      nodeIntegration: true,
    },
  });

  if (isDev) {
    win.webContents.openDevTools();
  }

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
  setupHandlers();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      setupHandlers();
    }
  });
});

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
