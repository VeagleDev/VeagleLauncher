
const maxRows = 10;



const addressServer = document.getElementById("address-server");
const masterPass = document.getElementById("master-pass");

const username = document.getElementById("username");
const password = document.getElementById("password");
const submit = document.getElementById("submit");
const infoUser = document.getElementById("info-user");

const load = document.getElementById("load");
const tabBody = document.getElementById("list-body");
const tabInfo = document.getElementById("info-list");
submit.addEventListener("click", () => {
    const sendAddr = addressServer.value + "/api/signup";

    console.log("Inscription en cours de", username.value);

    fetch(sendAddr, {
        method: "POST",
        body: JSON.stringify({
            pseudo: username.value,
            password: password.value,
            master: masterPass.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            console.log(res);
            return res;
        })
        .then(res => res.json())
        .then((data) => {
            console.log('data');
            if(data.success)
            {
                infoUser.innerText = `L'utilisateur ${username.value} a bien été ajouté !`;
                infoUser.style.color = "green";
                console.log("Inscrit");
            }
            else
            {
                infoUser.innerText = `Le serveur n'a pas réussi à ajouter ${username.value}`;
                infoUser.style.color = "red";
                console.log("Erreur serveur");
            }
        })
        .catch((e) => {
            console.log("Erreur serveur :", e);
            infoUser.innerText = `Erreur durant la requête, allez voir la console`;
            infoUser.style.color = "red";
        })
});

load.addEventListener("click", () => {
   // récupérer la liste des utilisateurs
    const sendAddr = addressServer.value + "/api/list";

    fetch(sendAddr, {
        method: "POST",
        body: JSON.stringify({
            master: masterPass.value,
            max: maxRows
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then((data) => {
            if(!data.success)
                throw new Error("Erreur");
            const users = data.list;
            tabBody.innerHTML = "";
            for(let el of users)
            {
                const tr = document.createElement("tr");
                const td = document.createElement("td");
                const td2 = document.createElement("td");
                const td3 = document.createElement("td");
                const td4 = document.createElement("td");

                td.innerText = el.pseudo;
                td2.innerText = formatDateTime(el.createdAt);
                td3.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 96 960 960\" width=\"24\"><path d=\"M280 936q-33 0-56.5-23.5T200 856V336h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680 936H280Zm400-600H280v520h400V336ZM360 776h80V416h-80v360Zm160 0h80V416h-80v360ZM280 336v520-520Z\"/></svg>";
                td4.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 96 960 960\" width=\"24\"><path d=\"M280 659.587q-34.435 0-59.011-24.576T196.413 576q0-34.435 24.576-59.011T280 492.413q34.435 0 59.011 24.576T363.587 576q0 34.435-24.576 59.011T280 659.587Zm0 163.826q-102.87 0-175.141-72.272Q32.587 678.87 32.587 576q0-102.87 72.272-175.141Q177.13 328.587 280 328.587q69.63 0 125.924 34.435 56.294 34.434 88.294 89.391h350.804L968.848 576 783.826 761.022l-80.239-60.478-79.761 59.76-86.196-60.717h-43.412q-31.761 54.717-88.174 89.272Q349.63 823.413 280 823.413ZM280 736q56.957 0 99.696-34.717 42.739-34.718 56.021-88.87h129.066l56.804 40.043 82-61 70.761 54.522 71.174-69.021-37.131-37.37H435.478q-12.565-53.435-55.663-88.511Q336.717 416 280 416q-66 0-113 47t-47 113q0 66 47 113t113 47Z\"/></svg>";

                td.addEventListener("dblclick", (event) => {
                    event.preventDefault();
                    const element = document.createElement("input");
                    element.type = "text";
                    element.value = el.pseudo;

                    element.addEventListener("keydown", (event) => {
                        if(event.key === "Enter")
                        {
                            td.innerHTML = element.value;
                            console.log(masterPass.value);
                            const sendAddr = addressServer.value + "/api/update/pseudo";
                            fetch(sendAddr, {
                                method: "POST",
                                body: JSON.stringify({
                                    master: masterPass.value,
                                    id: el.id,
                                    newPseudo: element.value
                                }),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                                .then(res => res.json())
                                .then((data) => {
                                    if(!data.success)
                                        throw new Error("Erreur");

                                    console.log("Pseudo modifié");
                                    td.innerHTML = element.value;

                                    tabInfo.style.display = "block";
                                    tabInfo.innerText = `Le pseudo de ${el.pseudo} a bien été modifié !`;
                                    tabInfo.style.color = "green";

                                    el.pseudo = element.value;
                                })
                                .catch((e) => {
                                   console.error("Erreur : ", e);
                                   td.innerHTML = el.pseudo;
                                   tabInfo.style.display = "block";
                                   tabInfo.innerText = `Erreur lors de la modification du pseudo de ${el.pseudo}`;
                                   tabInfo.style.color = "red";
                                });
                        }
                        if(event.key === "Escape")
                        {
                            td.innerHTML = el.pseudo;
                        }
                    });



                    td.innerHTML = "";
                    td.appendChild(element);

                    element.focus();
                    element.select();

                    console.log("Double click sur ", el.pseudo);
                });

                td3.addEventListener("click", () => {
                    console.log("Deleting user ", el.pseudo);
                    showConfirmationDialog(el.pseudo)
                        .then((ok) => {
                            if(ok)
                            {
                                deleteUser(el.id)
                                    .then((ok) => {
                                        if(ok)
                                        {
                                            tr.parentNode.removeChild(tr);
                                            tabInfo.style.display = "block";
                                            tabInfo.innerText = `L'utilisateur ${el.pseudo} a bien été supprimé !`;
                                            tabInfo.style.color = "green";
                                        }
                                        else
                                        {
                                            console.log("Erreur lors de la suppression de l'utilisateur");
                                            tabInfo.style.display = "block";
                                            tabInfo.innerText = `Erreur lors de la suppression de l'utilisateur ${el.pseudo}`;
                                            tabInfo.style.color = "red";
                                        }
                                    })
                                    .catch(() => {
                                        console.log("erreur, oops");

                                    });
                            }
                        })
                        .catch(() => {
                            console.log("erreur, oops");
                        });
                });

                tr.appendChild(td);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tabBody.appendChild(tr);
            }
            tabInfo.style.display = "none";
        })
        .catch((e) => {
            console.error("erreur : ", e);
            tabInfo.style.display = "block";
            tabInfo.innerText = "Erreur lors de la récupération de la liste";
            tabInfo.style.color = "red";
        });
});

const deleteUser = (userId) => {
    const sendAddr = addressServer.value + "/api/delete";
    return fetch(sendAddr, {
        method: "POST",
        body: JSON.stringify({
            master: masterPass.value,
            userId: userId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then((data) => {
            return data.success;
        })
        .catch((e) => {
            console.log("error", e);
            return false;
        });

};


const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);
    const formattedTime = new Intl.DateTimeFormat('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(date);
    return `${formattedDate} à ${formattedTime}`;
};


const showConfirmationDialog = (pseudo) => {
    return new Promise((resolve, reject) => {
        const dialog = document.createElement('div');
        dialog.classList.add('confirmation-dialog');

        const message = document.createElement('div');
        message.classList.add('message');
        message.textContent = 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?';
        dialog.appendChild(message);

        const buttons = document.createElement('div');
        buttons.classList.add('buttons');

        const confirmButton = document.createElement('button');
        confirmButton.classList.add('confirm-button');
        confirmButton.textContent = 'Confirmer';
        confirmButton.addEventListener('click', () => {
            dialog.remove();
            resolve(true);
        });
        buttons.appendChild(confirmButton);

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel-button');
        cancelButton.textContent = 'Annuler';

        cancelButton.addEventListener('click', () => {
            dialog.remove();
            resolve(false);
        });

        buttons.appendChild(cancelButton);

        dialog.appendChild(buttons);

        document.body.appendChild(dialog);
    });

};
