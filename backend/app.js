const express = require('express');
const mongoose = require('mongoose');

// Dotenv sert à importer un fichier de variables d'environnement.
const dotenv = require("dotenv").config();

const userModel = require('./models/user');

/*
app.post('/api/login', (req, res, next) => {
    delete req.body._id;
    const user = new userModel({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});
*/

const sauceModel = require('./models/sauce');

// Configuration de la base de données mongoDB avec des variables d'environnement
mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));



//on crée une route pour l'application
// La variable d'application stocke le module express
const app = express();

//utilisation des middlewares:l'élément de middleware reçoit les objets request et response. Le middleware Express reçoit également la méthode next, qui permet à chaque middleware de passer l'exécution au middleware suivant.
app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});
// Permet d'analyser le corps de la requête
app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
});

//on exporte cette application/constante
module.exports = app;
