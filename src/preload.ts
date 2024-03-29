const {ipcRenderer, contextBridge} = require('electron');

let installListener: any = (): undefined => {
    return undefined;
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
                        if(!res)
                            reject(new Error("Game not launched!"));
                        else
                            resolve(res);
                    })
                    .catch((err: any) => {
                        console.error(err);
                        reject(err);
                    });
            } catch (e) {
                console.error(e);
                reject(e);
            }
        });
    },
    installGame: (game: number) => {
        return new Promise((resolve, reject) => {
            try {
                ipcRenderer.invoke('installGame', game)
                    .then((res: any) => {
                        resolve(res);
                    })
                    .catch((err: any) => {
                        console.error(err);
                        reject(err);
                    });
            } catch (e) {
                console.error(e);
                reject(e);
            }
        });
    },
    setInstallListener: (callback: any) => {
        installListener = callback;
    }
});

