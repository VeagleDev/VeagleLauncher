const { ipcRenderer, contextBridge } = require('electron');

console.log("preload.ts 👌");

contextBridge.exposeInMainWorld('api', {
    saveCredentials: (credentials: []) => {
        ipcRenderer.sendSync('save-credentials', credentials);
    },
    getCredentials: () => {
        return ipcRenderer.sendSync('get-credentials');
    }
});