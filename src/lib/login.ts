const log = (message: string) => {
    console.log("[LOG] " + message);
}
const warn = (message: string) => {
    console.warn("[WARN] " + message);
}
const err = (message: string) => {
    console.error("[ERROR] " + message);
}


const pseudoRegex = new RegExp("^[a-zA-Z0-9_]{3,16}$");
const serverRegex = new RegExp("^(https?://)?([a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*.[a-zA-Z]{2,5}|localhost)(:[0-9]{1,5})?(/.*)?$");

let onSuccessfulLogin = () => {
    console.log("No callback on successful login")
};

export function setOnSuccessfulLogin(callback: any) {
    onSuccessfulLogin = callback;
}


let pseudo: HTMLInputElement
let server: HTMLInputElement
let password: HTMLInputElement
let submit: HTMLInputElement
let errorDisplay: HTMLInputElement

const isValid = () => {
    try {
        if (!pseudo.value) throw "Le pseudo est vide";
        if (!server.value) throw "Le serveur est vide";
        if (!password.value) throw "Le mot de passe est vide";
        if (!pseudoRegex.test(pseudo.value)) throw "Le pseudo est invalide";
        if (!serverRegex.test(server.value)) throw "Le serveur est invalide";
        //if(!passwordRegex.test(password.value)) throw "Password is invalid";
        return true;
    } catch (err) {
        if (errorDisplay !== null) errorDisplay.innerText = err;
        else alert(err);
        errorDisplay.style.color = "red";
        return false;
    }
}

export function Start() {
    pseudo = document.getElementById("pseudo") as HTMLInputElement;
    server = document.getElementById("server") as HTMLInputElement;
    password = document.getElementById("password") as HTMLInputElement;
    submit = document.getElementById("submit") as HTMLInputElement;
    errorDisplay = document.getElementById("errorDisplay") as HTMLInputElement;
}

export function onTheClick() {

    if (isValid()) {
        let gameServer = server.value + "/api";
        if (!gameServer.startsWith("http")) {
            gameServer = "http://" + gameServer;
        }

        console.log("Serveur: " + gameServer)

        const credentials = {
            pseudo: pseudo.value,
            password: password.value,
            server: gameServer,
            token: "",
            id: 0
        }

        fetch(credentials.server + "/login", {
            method: "POST",
            body: JSON.stringify({
                pseudo: credentials.pseudo,
                password: credentials.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(res => res.json())
            .then(data => {
                log(data);
                try {
                    if (data === null) throw "La réponse est vide, veuillez réessayer";
                    if (data.success === false) throw "Le pseudo ou le mot de passe est incorrect";

                    const token = data.token;
                    if (!token) throw "Le token est vide, veuillez réessayer";

                    credentials.token = data.token;
                    credentials.id = data.id;

                    // @ts-ignore
                    api.saveCredentials(credentials);

                    errorDisplay.innerText = "Connexion réussie";
                    errorDisplay.style.color = "green";

                    /** We now need to redirect to the main page **/
                    onSuccessfulLogin();


                } catch (error) {
                    log(error);
                    err(data.statusText);


                    errorDisplay.style.color = "red";
                    errorDisplay.innerText = error;
                }

            })
            .catch((error) => {
                err(error.stack);
                err(error);
                errorDisplay.innerText = "Une erreur est survenue lors de la connexion au serveur, veuillez regarder la console pour plus de détails";
            });
    } else {
        console.log("Invalid");
    }

}

