// GameService.ts

import "./interfaces/gamemanagerinterfaces";

class GameManager {
    private games: Game[] = [];
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
        // TODO: Check if the game is already downloading

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

        // Get install link, size, path, etc from the API
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
            .then(res => res.json())
            .then(data => {
                const {id, executable, path, size} = data;
                // TODO: Check if the available space is enough

                game.status = "Vérification de l'espace disque";

                // Start downloading with fetch stream

                game.status = "Début du téléchargement";

                // Decompress the archive

                game.status = "Installation du jeu";

                // Add the game to the games list

                game.status = "Ajout du jeu à la bibliothèque";

                // Finish the installation

                game.status = "Installation réussie";
                game.progress = 100;

                return [true, "Installation réussie"];
            })
            .catch(err => {
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
