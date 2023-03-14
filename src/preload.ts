const {ipcRenderer, contextBridge} = require('electron');

console.log("preload.ts 👌");

let installListener: any = () => {
    console.log("Pas de listener d'installation")
};

contextBridge.exposeInMainWorld('api', {
    saveCredentials: (credentials: []) => {
        ipcRenderer.sendSync('save-credentials', credentials);
    },
    getCredentials: () => {
        return ipcRenderer.sendSync('get-credentials');
    },
    installGame: (game: number) => {
        return ipcRenderer.sendSync('installGame', game);
    },
    setInstallListener: (callback: any) => {
        installListener = callback;
    }
});

setInterval(() => {
    installListener(ipcRenderer.sendSync('update-status'));
}, 500);