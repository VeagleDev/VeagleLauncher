import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/app.css';
import {Games, Login} from './page';

import tryConnect from './lib/start';

let loadPage = "login";
const root = ReactDOM.createRoot(document.getElementById('root'));

(async () => {
    const value = await tryConnect();
    if (value) {
        loadPage = "main";
    }

    switch (loadPage) {
        case "login":
            // eslint-disable-next-line no-case-declarations
            const loginElement = React.createElement(Login, null);
            // eslint-disable-next-line no-case-declarations
            root.render(
                React.createElement(React.StrictMode, null, loginElement),
            );
            break;

        // @ts-ignore
        case "main":
            root.render(Games(value));
            break;
    }
})();


