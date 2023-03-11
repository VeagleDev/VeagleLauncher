import React, {Component} from 'react';
import './css/app.css';
import {Start} from "./lib/login";


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


interface Game {
    id: number;
    name: string;
    description: string;
    icon: string;
    background: string;
    installations: number;
    installed: boolean;
    path: string;
}


export function Games(props: any) {
    console.log(props.games);
    return (
        <div className="flex flex-wrap justify-center">
            {props.map((game: any) => (
                <div key={game.id} className="w-72 m-4 rounded-lg shadow-lg">
                    <img src={game.icon} alt={game.name} className="w-full rounded-t-lg"/>
                    <div className="p-4">
                        <h2 className="text-lg font-semibold">{game.name}</h2>
                        <p className="text-gray-500">{game.description}</p>
                        <div className="mt-4 flex justify-between">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
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
