import ReactDOM from 'react-dom/client';
import './css/app.css';
import App from "./app";

import "./login";

const preferences = api.getCredentials();
if(preferences)
{
    console.log(preferences);
    const { id, server, token } = preferences.credentials;

    //fetch()
}
else
{
    console.error("No preferences found");
}

console.log('👋 This message is being logged by "renderer.js", included via webpack');



