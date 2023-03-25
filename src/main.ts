import {app, BrowserWindow} from 'electron';
import './lib/optionsIpcHandler';
import './lib/gamemanager';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    show: false,
    height: 800,
    width: 1000,
    title: "Griff Launcher",
    icon: "src/assets/icon.png",
    titleBarStyle: 'hiddenInset',
    minWidth: 700,
    minHeight: 500,
    backgroundColor: "#333333",
    darkTheme: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.hide();
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
    .then(() => {
        mainWindow.show();
    });
};

app.on('ready', createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});