// GameService.ts
import IpcMainEvent = Electron.IpcMainEvent;

const {app, ipcMain} = require('electron');
const fetch = require('node-fetch').default;
const fs = require('fs');
const os = require('os');
const Seven = require('node-7z');
const {path7za} = require('7zip-bin');
const ws = require('windows-shortcuts');
const spawn = require('child_process').spawn;
const diskSpace = require('check-disk-space').default;
const pathModule = require('path');
import InstallStatus, {LaunchedGame} from "./interfaces/gamemanagerinterfaces";



class GameManager {
    public installStatusList: InstallStatus[] = [];
    private launchedGames: LaunchedGame[] = [];

    private userID: number;
    private userToken: string;
    private userServer: string;

    constructor(id: number, token: string, server: string) {
        this.userID = id;
        this.userToken = token;
        this.userServer = server;
    }
    async installGameById(id: number): Promise<[boolean, string]> {
        try {
            const game: InstallStatus = {
                gameId: id,
                status: "getting-info",
                message: "Récupération des informations",
                active: true,
                progress: 0
            }
            for (const installingGame of this.installStatusList) {
                if (installingGame.gameId === id) {
                    if (installingGame.active === false)
                        continue;
                    if (installingGame.status === "error")
                        continue;
                    if (installingGame.status === "finished")
                        return [false, "Le jeu est déjà installé"];
                    return [false, "Le jeu est déjà en cours d'installation"];
                }
            }
            // check if the game is already installed
            const file = app.getPath('userData') + '/options.json';
            if (fs.existsSync(file)) {
                const read = JSON.parse(fs.readFileSync(file, 'utf8'));
                for(const game of read.games) {
                    if(game.id == id) {
                        return [false, "Le jeu est déjà installé"];
                    }
                }
            }

            this.installStatusList.push(game);
            const response = await fetch(this.userServer + "/games/install", {
                method: "POST",
                body: JSON.stringify({
                    id: this.userID,
                    token: this.userToken,
                    gameId: id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {

                game.status = "error";
                game.message = "Impossible de récupérer les informations du jeu. Code d'erreur : " + response.status;
                game.active = false;
                throw new Error("Impossible de récupérer les informations du jeu. Code d'erreur : " + response.status);
            }
            const data = await response.json();
            const {id: gameId, executable, path, size, name} = data.game;
            const link = path;

            game.status = "checking-space";
            game.message = "Vérification de l'espace disque";

            const availableGB = await diskSpace(os.tmpdir()).then((diskSpace: any) => {
                return diskSpace.free / 1000000000;
            });
            if (availableGB - 1 < 0) {
                game.status = "error";
                game.message = "Espace disque insuffisant";
                game.active = false;
                return [false, "Espace disque insuffisant"];
            }

            game.status = "downloading";
            game.message = "Téléchargement du jeu";
            const response2 = await fetch(link);
            if (!response2.ok) {
                game.status = "error";
                game.message = "Impossible de télécharger le jeu. Code d'erreur : " + response2.status;
                game.active = false;
                throw new Error("Impossible de télécharger le jeu. Code d'erreur : " + response2.status);
            }
            const totalLength = response2.headers.get('content-length');  // Récupérer la taille du fichier
            let currentLength = 0; // Initialiser la taille actuelle à 0
            const download = os.tmpdir() + "/" + (Math.random() + 1).toString(36).substring(2) + ".7z";
            const dest = fs.createWriteStream(download); // Créer un flux d'écriture

            const interval = setInterval(() => {
                game.progress = Math.round((currentLength / totalLength) * 100);
            }, 200);

            await new Promise((resolve, reject) => {
                response2.body.pipe(dest); // Écrire les données dans le flux d'écriture
                response2.body.on("end", async (): Promise<any> => { // Quand le téléchargement est terminé
                    dest.close(); // Fermer le flux d'écriture
                    currentLength = totalLength; // Mettre la taille actuelle à la taille totale
                    clearInterval(interval);
                    game.status = "unzipping";
                    game.message = "Décompression du jeu";
                    game.progress = 0;
                    const installPath = app.getPath("documents") + "\\VeagleLauncher\\Games\\" + id + "\\";
                    await new Promise((resolve, reject) => {
                        const extractStream = Seven.extractFull(download, installPath, {
                            $bin: path7za,
                            $progress: true
                        })
                        extractStream.on("progress", (progress: any) => {
                            game.progress = progress.percent;
                        });
                        extractStream.on("error", (err: any) => {
                            game.status = "error";
                            game.message = "Impossible de décompresser le jeu";
                            game.active = false;
                            reject(new Error("Impossible de décompresser le jeu"));
                        });
                        extractStream.on("end", () => {
                            resolve("ok");
                        });
                    })
                        .catch((err: any) => {
                            game.status = "error";
                            game.message = "Impossible de décompresser le jeu";
                            game.active = false;

                            reject(new Error("Impossible de décompresser le jeu"));
                            throw new Error("Impossible de décompresser le jeu");
                            return [false, "Impossible de décompresser le jeu"];
                        });

                    game.status = "deleting-archive";
                    game.message = "Suppression de l'archive";
                    game.progress = 0;

                    fs.unlinkSync(download);

                    game.status = "adding-to-list";
                    game.message = "Ajout du jeu à la liste";
                    game.progress = 0;

                    const executablePath = installPath + executable;
                    const path = app.getPath('userData') + '/options.json';

                    if (fs.existsSync(path)) {
                        const read = JSON.parse(fs.readFileSync(path, 'utf8'));
                        read.games.push({
                            id: gameId,
                            path: executablePath,
                        });
                        fs.writeFileSync(path, JSON.stringify(read));
                    } else {
                        game.status = "error";
                        game.message = "Impossible de trouver le fichier de configuration";
                        game.active = false;
                        throw new Error("Impossible de trouver le fichier de configuration");
                    }

                    game.status = "creating-shortcut";
                    game.message = "Création du raccourci";
                    game.progress = 0;
                    const shortcutPath = app.getPath("desktop") + "/" + name + ".lnk";
                    await ws.create(shortcutPath, {
                        target: executablePath,
                        desc: "Griff : " + name,
                        icon: executablePath,
                        workingDir: installPath
                    }, (err: any) => {
                        if (err) {
                            console.error(err);
                            game.status = "error";
                            game.message = "Impossible de créer le raccourci";
                            game.active = false;

                            throw new Error("Impossible de créer le raccourci");
                        }
                    });
                    game.status = "finished";
                    game.message = "Installation terminée";
                    game.progress = 100;

                    return resolve("Installation terminée");
                });
                response2.body.on("error", () => {
                    game.status = "error";
                    game.message = "Une erreur s'est produite lors du téléchargement du jeu";
                    game.active = false;

                    reject(new Error("Une erreur s'est produite lors du téléchargement du jeu"));
                });
                response2.body.on("data", (chunk: any) => {
                    currentLength += chunk.length;
                });
            });
            return [true, "Installation terminée avec succès"];
        } catch (error) {
            console.log(`[ERROR] Nouvelle exception : ${error.message}`);
            console.error(error);
            return [false, error.message];
        }
    }

    // launch a game by ID
    async launchGameById(id: number) {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            const status: LaunchedGame = {gameId: id, status: "launching"};
            this.launchedGames.push(status);

            const path = app.getPath('userData') + '/options.json';
            if (fs.existsSync(path)) {
                const read = JSON.parse(fs.readFileSync(path, 'utf8'));
                const games = read.games;

                for(const game of games)
                {
                    if(game.id == id)
                    {
                        const executable = game.path;
                        const lastAntiSlash = executable.lastIndexOf('\\');
                        const runPath = executable.substring(0, lastAntiSlash);
                        const process = spawn(executable, [], {detached: true, stdio: 'ignore', cwd: runPath});

                        process.on('error', () => {
                            status.status = "runerror";
                            reject(new Error("Impossible de lancer le jeu"));
                        });

                        process.on('exit', (code: number) => {
                            if (code === 0) {
                                status.status = "exit";
                                resolve(true);
                            } else {
                                status.status = "apperror";
                                reject(new Error("Une erreur s'est produite lors du lancement du jeu"));
                            }
                        });
                    }
                }
            }
        });

    }

    // remove a game from the games list
    async removeGameById(id: number): Promise<any> {
        const path = app.getPath('userData') + '/options.json';
        if (fs.existsSync(path)) {
          const read = JSON.parse(fs.readFileSync(path, 'utf8'));
          const games = read.games;
      
          for (const game of games) {
            if (game.id == id) {
              const executable = game.path;
              const parentDir = pathModule.dirname(executable); // obtenir le chemin du dossier parent
              const parentId = pathModule.basename(parentDir); // obtenir le nom du dossier parent
      
              if (parentId !== String(id)) {
                throw new Error(`Le nom du dossier parent ne correspond pas à l'ID du jeu ${id}`);
              }
      
              try {
                fs.accessSync(parentDir, fs.constants.W_OK); // vérifier que le dossier n'est pas protégé
              } catch (err) {
                throw new Error(`Le dossier parent ${parentDir} est protégé contre la suppression`);
              }
      
              fs.rmSync(parentDir, { recursive: true }); // supprimer le dossier récursivement
              console.log(`Dossier ${parentDir} supprimé`);            
            }
          }
        }
        return true;
      }
}


function Start() {
    const path = app.getPath('userData') + '/options.json';
    if (fs.existsSync(path)) {
        const read = JSON.parse(fs.readFileSync(path, 'utf8'));
        const {id, token, server} = read.credentials;
        const manager = new GameManager(id, token, server);

        ipcMain.removeHandler("installGame");

        ipcMain.handle("installGame", async (event: any, id: number) => {
            return await manager.installGameById(id).then((status: any) => {
                return status;
            });
        });

        ipcMain.removeAllListeners("update-status");

        ipcMain.on("update-status", async (event: IpcMainEvent) => {
            event.returnValue = manager.installStatusList;
            return;
        });

        ipcMain.removeHandler("launchGame");
        ipcMain.handle("launchGame", async (event: IpcMainEvent, id: number) => {
            return await manager.launchGameById(id).then((status: any) => {
                return status;
            });
        });
    }
    else {
        ipcMain.on("update-status", async (event: IpcMainEvent) => {
            event.returnValue = [];
            return;
        });
    }
}

Start();

module.exports = {
    Start
}

