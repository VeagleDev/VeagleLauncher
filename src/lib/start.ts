declare const api: any;


export default function tryConnect() {
    const preferences = api.getCredentials();

    if (preferences) {
        console.log(preferences);
        const {id, server, token} = preferences.credentials;
        const installedGames = preferences.games;

        return fetch(server + "/games/list", {
            method: "POST",
            body: JSON.stringify({
                id: id,
                token: token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {


                const games = data;

                for (const game of games) {
                    game.installed = false;
                    game.path = "";
                }

                for (const installedGame of installedGames) {
                    for (const game of games) {
                        if (installedGame.id === game.id) {
                            game.installed = true;
                            game.path = installedGame.path;
                            break;
                        }
                    }
                }

                console.log(games);
                return games;

            })
            .catch(err => {
                console.error(err);
                return false;
            });
    } else {
        console.error("No preferences found");
        return false;
    }
}

