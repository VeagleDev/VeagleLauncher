/** Ce fichier permet d'installer un jeu sur le client depuis le front-end et s'occupe de la communication avec le back-end **/
declare const api: any;

export function Begin() {
    const tiles = document.getElementsByClassName("game-card");
    console.log(`${tiles.length} tiles found`);

    api.setInstallListener((adv: any) => {
        console.log("Progressions: ", adv);
    });
}

export function InstallGame(id: number) {
    console.log("Installing game " + id);
    return;
}

