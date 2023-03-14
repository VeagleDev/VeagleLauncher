// GameService.ts
import IpcMainEvent = Electron.IpcMainEvent;

const {app, ipcMain} = require('electron');
const fetch = require('node-fetch').default;
const fs = require('fs');
const os = require('os');
const Seven = require('node-7z');
const {path7za} = require('7zip-bin');
const diskSpace = require('check-disk-space').default;
import "./interfaces/gamemanagerinterfaces";


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

        console.log("Adresse du serveur: " + this.userServer);

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


            console.log(this.installStatusList);

            // Check if the game is already installed
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

            this.installStatusList.push(game);

            // Get install link, size, path, etc. from the API
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
            const {id: gameId, executable, path, size} = data.game;
            const link = path;

            // Check if the available space is enough
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

            // Start downloading with fetch stream
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
            const download = os.tmpdir() + "\\" + (Math.random() + 1).toString(36).substring(2) + ".7z";
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

                    const installPath = app.getPath("documents") + "\\VeagleLauncher\\Games\\" + gameId + "\\";

                    await Seven.extractFull(download, installPath, {
                        $bin: path7za,
                    })
                        .on("progress", (progress: any) => {
                            game.progress = Math.round(progress.percent);
                        });

                    game.status = "deleting-archive";
                    game.message = "Suppression de l'archive";
                    game.progress = 0;

                    fs.unlinkSync(download);

                    game.status = "adding-to-list";
                    game.message = "Ajout du jeu à la liste";
                    game.progress = 0;

                    const executablePath = installPath + "\\" + executable;

                    const path = app.getPath('userData') + '/options.json';

                    if (fs.existsSync(path)) {
                        const read = JSON.parse(fs.readFileSync(path, 'utf8'));
                        read.games.push({
                            id: gameId,
                            path: executablePath,
                        });
                    } else {
                        game.status = "error";
                        game.message = "Impossible de trouver le fichier de configuration";
                        game.active = false;

                        throw new Error("Impossible de trouver le fichier de configuration");
                    }

                    // Create a shortcut


                    game.status = "finished";
                    game.message = "Installation terminée";
                    game.progress = 100;

                    return resolve("Installation terminée");
                });
                response2.body.on("error", () => {
                    reject(new Error("Une erreur s'est produite lors du téléchargement du jeu"));
                });
            });

            return [true, "Installation terminée avec succès"];

        } catch (error) {
            console.error(error);
            return [false, error.message];
        }
    }

    getInstallStatusById(id: number): InstallStatus | undefined {
        // TODO: implement
        return undefined;
    }

    // launch a game by ID
    async launchGameById(id: number) {
        // TODO: implement
    }

    // get the list of launched games with their status
    getLaunchedGames(): LaunchedGame[] {
        // TODO: implement
        return [];
    }


    // remove a game from the games list
    async removeGameById(id: number): Promise<undefined> {
        // TODO: implement
        return undefined;
    }
}


const path = app.getPath('userData') + '/options.json';

if (fs.existsSync(path)) {
    const read = JSON.parse(fs.readFileSync(path, 'utf8'));
    const {id, token, server} = read.credentials;
    const manager = new GameManager(id, token, server);

    ipcMain.on("installGame", async (event: any, id: number) => {
        return await manager.installGameById(id).then((status: any) => {
            event.returnValue = status;
            event.reply("installGame", status);
            return status;
        });
    });

    ipcMain.on("update-status", async (event: IpcMainEvent) => {
        event.returnValue = manager.installStatusList;
        return;
    });

}
