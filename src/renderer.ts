import ReactDOM from 'react-dom/client';
import './css/app.css';
import App from "./app";

import "./login";

// @ts-ignore
const preferences = api.getCredentials();
if(preferences)
{
    console.log(preferences);
    const { id, server, token } = preferences.credentials;
    const installedGames = preferences.games;

    fetch(server + "/games/list", {
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

            for(const game of games)
            {
                game.installed = false;
                game.path = "";
            }

            for(const installedGame of installedGames)
            {
                for(const game of games)
                {
                    if(installedGame.id === game.id)
                    {
                        game.installed = true;
                        game.path = installedGame.path;
                        break;
                    }
                }
            }

            console.log(games);

        })
        .catch(err => {
            console.error(err);
        });
}
else
{
    console.error("No preferences found");
}

console.log('👋 This message is being logged by "renderer.js", included via webpack');



