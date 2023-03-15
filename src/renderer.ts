declare const api: any;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/app.css';
import {setOnSuccessfulLogin} from "./lib/login";
import {Games, Login} from './page';

import tryConnect from './lib/start';

let loadPage = "login";
const root = ReactDOM.createRoot(document.getElementById('root'));

async function Render() {
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

Render();


