import React, {Component} from 'react';
import './css/app.css';
import {Start} from "./lib/login";
import {Begin, InstallGame} from "./lib/install";


export class Login extends Component {
    componentDidMount() {
        Start();
    }

    render() {
        // Render le composant Login
        return (
            <div className="flex flex-col bg-gray-800 content-center items-center">
                <input type="text" id="pseudo" placeholder="Pseudo"
                       className="bg-gray-200 text-black caret-blue w-64 m-4 p-4"/>
                <input type="password" id="password" placeholder="Password"
                       className="bg-gray-200 text-black caret-blue w-64 m-4 p-4"/>
                <input type="text" id="server" placeholder="Server" value={"http://localhost:3333"}
                       className="bg-gray-200 text-black caret-blue w-64 m-4 p-4"/>
                <button id="submit" className="bg-gray-200 text-black caret-blue w-64 m-4 p-4">Submit</button>
                <span id="errorDisplay"></span>
            </div>
        );
    }
}

export class Games extends Component {
    componentDidMount() {
        Begin();
    }

    handleGameClick(gameId: number, installed: boolean) {
        if (installed) {
            console.log('Jouer au jeu ' + gameId);
        } else {
            console.log('Installer le jeu ' + gameId);
            InstallGame(gameId);
        }
    }


    render() {
        console.log(this.props)
        const infos = Object.values(this.props);
        return (
                <div className="w-full flex flex-wrap justify-center">
                    {infos.map((game: any) => (
                        <div key={game.id} className="w-72 m-4 rounded-lg shadow-lg game-card relative overflow-hidden">
                            <img src={game.icon} alt={game.name}
                                 className="w-full rounded-t-lg transition-transform duration-500 transform hover:scale-110"/>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{game.name}</h2>
                                <p className="text-gray-500">{game.description}</p>
                                <div className="mt-4 flex justify-between">
                                    <button onClick={() => this.handleGameClick(game.id, game.installed)}
                                            className={`bg-blue-500 text-white py-2 px-4 rounded ${game.installed ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                                            disabled={game.installed}>
                                        {game.installed ? 'Jouer' : 'Installer'}
                                    </button>
                                    <span className="text-gray-500">{game.installations} installations</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
        );
    }
}

