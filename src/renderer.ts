import ReactDOM from 'react-dom/client';

import './css/app.css';

import App from "./app";

//import "./login";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(App());


console.log('👋 This message is being logged by "renderer.js", included via webpack');


