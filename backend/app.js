/*--------ce fichier app.js contiendra l'application------*/

// appel de express / importation de express
const express = require('express');
// La variable d'application stocke le module express
const app = express();

//j'enregistre le routeur dans notre application
const userRoutes = require('./routes/users');
const sauceRoutes = require('./routes/sauces');

// on importe path : donne accès au chemin du système de fichiers
const path = require('path');

//importation connexion base de donnée mongoDB
const mongoose = require('mongoose');

// Sécurités nécessaires
// Helmet sécurise les applications Express en définissant divers en-têtes HTTP
const helmet = require('helmet');

// Express-rate-limit sert à limiter la demande entrante. Empêche la même adresse IP de faire trop de requests
const rateLimiter  = require('express-rate-limit');

const limiter = rateLimiter({
    // max contient le nombre maximum de requêtes et windowMs contient le temps en millisecondes,
    // de sorte que seule la quantité maximale de requêtes peut être effectuée dans le temps windowMS.
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, //  Le client pourra donc faire 100 requêtes toutes les 15 minutes
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers - Désactive les en-têtes
})

// Dotenv sert à importer un fichier de variables d'environnement.
require('dotenv').config();

//express.json donne accès à req.body : le corps de la requête
app.use(express.json());

// Gérer les problème de CORS((Cross-Origin Request Sharing)signifie mécanisme permettant à un site internet de charger une ressource située depuis un autre domaine que celui dans lequel est situé le site.)
// La méthode app.use() permet d'attribuer un middleware à une route spécifique de l'application.
app.use((req, res, next) => {
        //'Access-Control-Allow-Origin' = origine, '*' = tout le monde
        //origine qui a le droit d'accéder à l'API c'est tout le monde
        res.setHeader('Access-Control-Allow-Origin', '*');
        //autorisation d'utiliser certains Headers sur l'objet requête
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        //autorisation d'utiliser certaines méthodes de type "GET" pour récupérer des données(verbes de requête)
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
});

// Configuration de la base de données mongoDB avec des variables d'environnement
mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true,
            useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//app.use() Route générale et la fonction (middleware)
app.use(helmet({
    //Seules les demandes provenant du même site peuvent lire la ressource
    crossOriginResourcePolicy: { policy: "same-site" }
}));
// Ajout de la fonction limiteur au middleware express afin que chaque demande provenant de l'utilisateur passe par ce middleware. La limite de 100 requêtes toutes les 15 minutes sera effective sur toutes les routes.
app.use(limiter);

// Routes attendues par le frontend
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

// Middleware de téléchargement de fichiers (ici, images des sauces)
app.use('/images', express.static(path.join(__dirname, 'images')));

//exportation de app.js pour pouvoir y accéder depuis un autre fichier.rsrs
module.exports = app;

