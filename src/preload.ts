const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    saveCredentials: (credentials: []) => {
        ipcRenderer.sendSync('save-credentials', credentials);
    },
});