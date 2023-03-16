const end = "backend"; // or "backend"


declare const api: any;
import {setOnSuccessfulLogin} from "./lib/login";
import {Games, Login} from './page';
import tryConnect from './lib/start';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/app.css';
import App from "./app";

const root = ReactDOM.createRoot(document.getElementById('root'));

async function Render() {
    let loadPage = "login";
    const value = await tryConnect();
    if (value) {
        loadPage = "main";
    }

    const renderLogin = () => {
        const loginElement = React.createElement(Login, null);
        root.render(React.createElement(React.StrictMode, null, loginElement),
        );
    }
    const renderMain = (value: any) => {
        const mainElement = React.createElement(Games, value);
        root.render(React.createElement(React.StrictMode, null, mainElement),
        );
    }

    switch (loadPage) {
        case "login":
            setOnSuccessfulLogin(Render);
            renderLogin();
            break;

        // @ts-ignore
        case "main":
            renderMain(value);
            break;
    }
}

// @ts-ignore
if (end === "frontend")
    root.render(App());
else
    Render();


console.log('👋 This message is being logged by "renderer.js", included via webpack');


