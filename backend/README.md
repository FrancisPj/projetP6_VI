##PROJET 6 
**Construisez une API sécurisée pour une application d'avis gastronomiques** : parcours de formation __developpeur web__ chez **O**penclassrooms.

![Piiquante](https://user.oc-static.com/upload/2021/07/29/16275605596354_PiiquanteLogo.png)
***
## Table des matières

- [Le projet](#le-projet)
    - [Installer et executer le projet](#installer-et-executer-le-projet)
    - [contexte](#contexte)
    - [Éléments fournis pour la réalisation du projet](#éléments-fournis-pour-la-réalisation-du-projet)

    - [Outils et technologies utilisés](#outils-et-technologies-utilisés)
***
### Le projet

### Installer et executer le projet
**Pour le frontend:**
1. Cloner le projet : le [frontend de l'application](https://github.com/RomainSire/OC-P6-SoPekocko-frontend), de github et on le met dans le dossier frontend.
   - Dans un terminal, accéder au dossier du frontend.
     - Installer node dans le dossier "frontend" avec la commande "**npm install**" pour installer toutes les dépendances que le logiciel a besoin pour fonctionner.
     - Lancer le serveur du frontend avec la commande "**ng serve**"
     - `npm run start` dans le dossier frontend.
2. Voir le site : `http://localhost:4200/`.
***
**Dans le dossier backend:**
1. On installe les dépendances pour que le backend fonction avec "**npm install**"
2. on initie node en utilisant "**npm init**" puis on lance "**node server**"
3. Installation de **nodemon server** (pour démarrer le backend a chaque modification) dans le dossier backend.
4. pour lancer le serveur on écrit **' npm run start '** dans le terminal dans le dossier backend. 
***
### Contexte

L'objectif du projet est de construire une API pour une application de sauce piquante.
La partie backend de ce projet est développée en Node.js et express. Pour la base de données j’utilise MongoDB.

### Éléments fournis pour la réalisation du projet

- Le frontend a déjà été réalisé avec Angular.

### Outils et technologies utilisés

- [Node.js®](https://nodejs.org/fr/) - Environnement d’exécution JavaScript construit sur le moteur JavaScript V8 de Chrome.
- [Express](https://expressjs.com/) - Framework pour construire des applications web basées sur Node.js.
- [MongoDB Atlas Database](https://www.mongodb.com/) - Système de gestion de base de données orienté documents
- [Mongoose](https://mongoosejs.com/) - Bibliothèque de programmation orientée objet JavaScript qui crée une connexion entre MongoDB et l'environnement d'exécution JavaScript Node.js.
- [Postman](https://www.postman.com/) - Application permettant de tester des API
- [PhpStorm](https://blog.jetbrains.com/phpstorm/2021/10/phpstorm-2021-2-3-is-released/) -Éditeur de codes.

### Compétences évaluées

- Ajuster le développement du backend pour qu’il fonctionne parfaitement avec le frontend.
- Mettre en œuvre des opérations CRUD de manière sécurisée
  - CRUD signifie Create, Read, Update et Delete, qui sont les opérations de base pour gérer les données dans une base de données ou un système de gestion de données.
  
- Assurer la sécurité des données utilisateurs et de l’application (RGPD & OWASP).
  - Dans mon application, le RGPD (Règlement Général sur la Protection des Données) est surtout mis en œuvre avec le stockage sécurisé des données, le contrôle d'accès aux données.
  - OWASP (Open Web Application Security Project) est un projet de sécurité open source pour construire des applications web plus sûres.
