// GameService.ts
const diskSpace = require('check-disk-space').default;
const fetch = require('node-fetch');
const {app, ipcMain} = require('electron');

import "./interfaces/gamemanagerinterfaces";
import * as os from "os";
import fs from "fs";

class GameManager {
    private installStatusList: InstallStatus[] = [];
    private launchedGames: LaunchedGame[] = [];

    private userID: number;
    private userToken: string;
    private userServer: string;

    constructor(id: number, token: string, server: string) {
        this.userID = id;
        this.userToken = token;
        this.userServer = server;
    }

    // install a game by ID
    async installGameById(id: number): Promise<[boolean, string]> {
        // TODO: Check if the game is already installed

        for (const installingGame of this.installStatusList) {
            if (installingGame.gameId === id) {
                return [false, "Le jeu est déjà en cours d'installation"];
            }
        }

        const game: InstallStatus = {
            gameId: id,
            status: "Récupération des informations",
            progress: 0
        }

        this.installStatusList.push(game);

        // Get install link, size, path, etc. from the API
        const status = await fetch(this.userServer + "/games/install", {
            method: "POST",
            body: JSON.stringify({
                id: this.userID,
                token: this.userToken,
                gameId: id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res: { json: () => any; }) => res.json())
            .then(async (data: any) => {
                const {id, executable, path, size} = data.game;
                const link = path;

                // TODO: Check if the available space is enough

                game.status = "Vérification de l'espace disque";

                const availableGB = await diskSpace(os.tmpdir()).then((diskSpace: any) => {
                    return diskSpace.free / 1000000000;
                });

                if (availableGB - 1 < 0) {
                    game.status = "Espace disque insuffisant";
                    return [false, "Espace disque insuffisant"];
                }

                // Start downloading with fetch stream

                game.status = "Début du téléchargement";

                await fetch(this.userServer + link, {
                    method: "GET"
                })
                    .then((res: any) => {
                        // Get temp directory path
                        const download = os.tmpdir() + (Math.random() + 1).toString(36).substring(2) + ".7z";

                        const dest = fs.createWriteStream(download); // Créer un flux d'écriture

                        const totalLength = res.headers.get('content-length');  // Récupérer la taille du fichier
                        let currentLength = 0; // Initialiser la taille actuelle à 0

                        setInterval(() => {
                            console.log("[PROGRESS] " + currentLength + "/" + totalLength + " (" + Math.round(currentLength / totalLength * 100) + "%)");
                        }, 300);

                        res.body.pipe(dest); // Écrire les données dans le flux d'écriture

                        res.body.on("end", () => { // Quand le téléchargement est terminé
                            dest.close(); // Fermer le flux d'écriture
                            currentLength = totalLength; // Mettre la taille actuelle à la taille totale
                        });
                        res.body.on("data", (chunk: any) => { // Quand un chunk est téléchargé
                            currentLength += chunk.length; // Ajouter la taille du chunk à la taille actuelle
                        });
                    })
                    .catch((err: any) => {
                        console.error(err);
                        return [false, "Une erreur est survenue durant le téléchargement"];
                    });

                // Decompress the archive

                game.status = "Installation du jeu";

                // Add the game to the games list

                game.status = "Ajout du jeu à la bibliothèque";

                // Finish the installation

                game.status = "Installation réussie";
                game.progress = 100;

                return [true, "Installation réussie"];
            })
            .catch((err: any) => {
                console.error(err);
                return [false, "Une erreur est survenue durant le téléchargement"];
            }) as [boolean, string];

        if (!status[0]) return [false, status[1]];


        return [true, "Installation réussie"];
    }

    // get the status of an installation by game ID
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

}
