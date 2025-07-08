const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  goBack: () => ipcRenderer.send('go-back'),
  goHome: () => ipcRenderer.send('go-home'),
  closeApp: () => ipcRenderer.send('close-app')
});