const {ipcRenderer, contextBridge} = require('electron');

console.log("preload.ts 👌");

let installListener: any = () => {
    console.log("Pas de listener d'installation")
};

setInterval(() => {
    installListener(
        ipcRenderer.sendSync('update-status')
    );
}, 200);

contextBridge.exposeInMainWorld('api', {
    saveCredentials: (credentials: []) => {
        ipcRenderer.sendSync('save-credentials', credentials);
    },
    getCredentials: () => {
        return ipcRenderer.sendSync('get-credentials');
    },
    launchGame: (game: number) => {
        return new Promise((resolve, reject) => {
            try {
                ipcRenderer.invoke('launchGame', game)
                    .then((res: any) => {
                        console.log(res);
                        resolve(res);
                    })
                    .catch((err: any) => {
                        console.error(err);
                        reject(err);
                    });
            } catch (e) {
                reject(e);
            }
        });
    },
    installGame: (game: number) => {
        return new Promise((resolve, reject) => {
            try {
                ipcRenderer.invoke('installGame', game)
                    .then((res: any) => {
                        console.log(res);
                        resolve(res);
                    })
                    .catch((err: any) => {
                        console.error(err);
                        reject(err);
                    });
            } catch (e) {
                reject(e);
            }
        });
    },
    setInstallListener: (callback: any) => {
        installListener = callback;
    }
});

