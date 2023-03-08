const { ipcMain, app } = require('electron');
const fs = require('fs');

console.log("IPC Handler loaded");
ipcMain.on('save-credentials', (event, credentials) => {
   const path = app.getPath('userData') + '/options.json';
   const savedCredentials = {
        id: credentials.id,
        pseudo: credentials.pseudo,
        token: credentials.token,
        server: credentials.server
   };
   let returnVal: any;
   if(fs.existsSync(path)) {
       const read = JSON.parse(fs.readFileSync(path, 'utf8'));
       read.credentials = savedCredentials;
       returnVal = read;
   }
   else {
       returnVal = {
           "games": [],
           "credentials": savedCredentials
       };
   }

   fs.writeFileSync(path, JSON.stringify(returnVal));
   console.log("Saved credentials : " + JSON.stringify(returnVal) + " to " + path);
   event.returnValue = true;
   return;
});

ipcMain.on("get-credentials", (event) => {
    const path = app.getPath('userData') + '/options.json';

    if(fs.existsSync(path)) {
        const read = JSON.parse(fs.readFileSync(path, 'utf8'));
        event.returnValue = read;
    }
    else
        event.returnValue = false;

    return;
});