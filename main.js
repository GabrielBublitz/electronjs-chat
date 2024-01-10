const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, ipcMain, contextBridge } = require('electron');

const isDev = process.env.NODE_ENV !== 'production'
const isMac = process.platform === 'darwin';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 940,
    minHeight: 560,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, './src/js/preload.js'),
      nodeIntegration: true
    },
  });

  if(isDev){
    win.webContents.openDevTools();
  }

  win.loadFile('index.html');

  ipcMain.on('close', () => {
    const wind = BrowserWindow.getFocusedWindow();
    if (wind) {
      wind.close();
    }
  });

  ipcMain.on('maximize', () => {
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

  ipcMain.on('minimize', () => {
    const wind = BrowserWindow.getFocusedWindow();
    if (wind) {
      wind.minimize();
    }
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

ipcMain.on('save-json', (event, data) => {

  const jsonFilePath = './user-config.json';

  fs.writeFileSync(jsonFilePath, data, 'utf-8');

  console.log('Feito');
});

ipcMain.on('read-json', (event) => {
    const jsonFilePath = './user-config.json'

    try{
      const fileContent = fs.readFileSync(jsonFilePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);

      event.reply('json-data', jsonData);
      console.log(jsonData);
    }catch(error){
      console.error('Erro ao ler Json: ', error);
      event.reply('json-data', null);
    }
});
