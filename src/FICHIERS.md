# Utilité de chaque fichier

---

C'est un peu compliqué parce que avec toutes les technologies ajoutées les fichiers se multiplient.

Voici un fichier qui détaille les fonctions de chaque ficher TypesSript :

- `main.ts` : Le processus principal de l'application qui créé la fenêtre Electron et à partir de laquelle on a accès à toutes les ressources de l'ordinateur.


- `preload.ts` : Le fichier de préchargement qui fait l'interface entre la page de rendu et le processus principal. Il a accès au processus principal avec `ipcRenderer` et au rendu avec `contextBridge`.


- `renderer.ts` : Le fichier qui est connecté à la page HTML, il se charge di'mporter le fichier CSS ainsi que de lancer le chargement de React.


- `app.tsx` : Le fichier qui supporte la syntaxe React et qui est exécuté lors du chargement de la page


Pour information, tous les fichiers TypeScript sont convertis en JavaScript lors de la compilation de l'application car TypeScript n'est pas lancable comme ça donc on utilise un transpilateur comme TSC ou Babbel. Dans notre cas, Webpack s'occupe d'exporter tous les fichiers de l'application une fois convertis dans le bon fichier.

Dans le dossier `css` sont les feuilles de style.
Dans le dossier `static` sont les images et les documents HTML.