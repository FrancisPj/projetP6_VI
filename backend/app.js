const express = require('express');
const app = express();

//j'enregistre le routeur dans notre application
const userRoutes = require('./routes/users');
const sauceRoutes = require('./routes/sauces');

// on importe path : donne accés au chemin du système de fichiers
const path = require('path');

const fs = require('fs');

const mongoose = require('mongoose');

// Sécurités nécessaires
// Helmet sécurise les applications Express en définissant divers en-têtes HTTP
const helmet = require('helmet');

// Express-rate-limit sert à limiter la demande entrante.
require('express-rate-limit');

// Dotenv sert à importer un fichier de variables d'environnement.
require('dotenv').config();

//express.json donne accès à req.body
app.use(express.json());

//La méthode app.use() permet d'attribuer un middleware à une route spécifique de l'application.
app.use((req, res, next) => {
        //'Access-Control-Allow-Origin' = origine, '*' = tout le monde
        //origine qui a le droit d'accéder à l'API c'est tout le monde
        res.setHeader('Access-Control-Allow-Origin', '*');
        //autorisation d'utiliser certains Headers sur l'objet requête
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        //autorisation d'utiliser certaines méthodes (verbes de requête)
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
});

// Configuration de la base de données mongoDB avec des variables d'environnement
mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true,
            useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(helmet({
    crossOriginResourcePolicy: { policy: "same-site" }
}));


// Routes attendues par le frontend
app.use('/api/auth', userRoutes);

app.use('/api/sauces', sauceRoutes);


// Middleware de téléchargement de fichiers (ici, images des sauces)
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;
