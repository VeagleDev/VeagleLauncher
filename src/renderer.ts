const end = "frontend"; // or "backend"


declare const api: any;
import {setOnSuccessfulLogin} from "./lib/login";
import {Games, Login} from './page';
import tryConnect from './lib/start';

import React from 'react';
import ReactDOM from 'react-dom/client';

import './css/app.css';

import App from "./app";
import Loading from "./components/Loading";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(React.createElement(Loading));

async function Run()
{
    const value = await tryConnect();

    let loadPage = "login";

    if (value) {
        loadPage = "main";
    }

    switch (loadPage) {
        case "login":
            setOnSuccessfulLogin(Run);
            root.render(App({"connected": false}));
            break;

        case "main":
            root.render(App({"connected": true, "games": value}));
            break;
    }
}

Run();
console.log('👋 This message is being logged by "renderer.js", included via webpack');


