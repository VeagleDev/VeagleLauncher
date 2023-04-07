# TODO

## Front

- Page de connexion avec choix du serveur utilisé
- Page principale avec la liste des jeux
- Page de jeu avec le jeu, les boutons de lancement/installation, des stats sur les jeux
- Un header pour les pages connectées
- Une navbar sur le côté avec les informations sur l'utilisateur, les lancements rapide ainsi que les téléchargements en cours

(N'hésitez pas à ajouter d'autres informations)

## Back

- [x] Page de connexion qui envoie à l'API les informations
- [x] L'API de connexion en Node qui enregistre dans la BDD
-  [x] Le chargement des jeux dans la page principale
- [x] Le chargement des détails d'un jeu dans la page de jeu


- Tout un objet qui contient : 
  1. L'ensemble des jeux disponible dans une Array (id, nom, installé, path, lien, version, image, stats, taille)
  2. Une procédure qui permet d'installer un jeu
  3. L'installation est suivie dans un objet dans une liste qui gère le déroulement et qu'on peut observer à partir du renderer (bien galère mais il le faut)
  3. Une procédure qui permet de lancer un jeu
  4. La liste qui contient les jeux lancés avec leur statut


Cette page n'est plus à jour mais elle donne une idée de ce que je veux faire :
il faut finir le lancement des jeux et qq détails sur l'installation puis je pourrais faire la release 1.0
