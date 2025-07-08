const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    frame: false,
    icon: path.join(__dirname, "../build/icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("go-back", () => {
  if (mainWindow && mainWindow.webContents.canGoBack()) {
    mainWindow.webContents.goBack();
  }
});

ipcMain.on("go-home", () => {
  if (mainWindow) {
    mainWindow.webContents.loadURL("https://administrador.perrosenmexico.com");
  }
});

ipcMain.on("close-app", () => {
  if (mainWindow) {
    mainWindow.close();
  }
});