Griff Launcher
==============

Griff est un lanceur de jeu à bibliothèques privées créé par Griff. C'est une application Electron codée en TypeScript et utilisant React. Le projet est encore en développement et les Pull Requests ou suggestions sont les bienvenues!

<div style="display: flex; flex-direction: row; justify-content: space-between;">
<img src="https://user-images.githubusercontent.com/83456236/231248378-34b38078-253e-42b8-b9ce-249d9d02a758.png"></img>
<img src="https://user-images.githubusercontent.com/83456236/231248429-ccce33e9-4307-4163-9d6e-daaac8b57db7.png"></img>
<img src="https://user-images.githubusercontent.com/83456236/231248587-5e625089-d817-44ea-aa90-b7017d6f909d.png"></img>
</div>

Installation
------------

Pour installer Griff Launcher, vous pouvez cloner le projet et exécuter les commandes suivantes:
```bash
    git clone https://github.com/VeagleDev/VeagleLauncher.git
    cd VeagleLauncher
    npm install
    npm start
```


Technologies utilisées
----------------------

*   [TypeScript](https://www.typescriptlang.org/)
*   [React](https://reactjs.org/)
*   [TailwindCSS](https://tailwindcss.com/)
*   [Electron](https://electronjs.org/)
*   [Webpack](https://webpack.js.org/)
*   [Electron-Forge](https://www.electronforge.io/)

Système de communication inter-processus (IPC)
----------------------------------------------

Griff Launcher utilise le système de communication inter-processus (IPC) d'Electron pour communiquer entre le processus principal et le processus de rendu. Cela permet d'effectuer des tâches telles que la lecture et l'écriture de fichiers, l'accès aux ressources système et la communication avec des processus externes.


Système serveur, hébergement des jeux
-----------------------------------------------

Le serveur de Griff est écrit en utilisant Node.js et le framework Express, qui permet de construire facilement des applications Web. L'API du serveur est mise à disposition sous forme de JSON, ce qui permet à l'application cliente de communiquer avec le serveur de manière efficace.

La base de données utilisée pour Griff-Launcher est une base de données MySQL/MariaDB, qui est gérée par Sequelize, un ORM (Object-Relational Mapping) pour Node.js. Cela permet à l'application d'interagir avec la base de données de manière plus intuitive, en utilisant des objets JavaScript plutôt que des requêtes SQL brutes. L'utilisation de Sequelize rend également le code plus maintenable et évite les erreurs courantes liées à la gestion des bases de données.

Visitez [VeagleLauncher-API](https://github.com/pierrbt/VeagleLauncher-API) pour pouvoir installer l'API et voir les détails.


Contribuer
----------

Nous encourageons les contributeurs à soumettre des Pull Requests pour ajouter des fonctionnalités ou corriger des bugs. Pour commencer, il est recommandé de lire le fichier `TODO.md` pour voir les tâches à accomplir.

### Contribution au code

Avant de soumettre une Pull Request, assurez-vous que votre code respecte les normes de codage de TypeScript et les directives de style de code définies dans `.eslintrc.json`.

### Signaler des bugs

Si vous rencontrez un bug, veuillez signaler le problème en ouvrant une nouvelle issue sur le repository GitHub.

### Créer des suggestions

Si vous avez une suggestion pour une nouvelle fonctionnalité, vous pouvez créer une nouvelle issue sur le repository GitHub pour en discuter.

Licence
-------

Ce projet est sous licence GPL-3.0.

© 2023 Griff, Veagle. Tous droits réservés.
