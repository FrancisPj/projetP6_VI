const express = require('express');
const mongoose = require('mongoose');


// Configuration de la base de données mongoDB avec des variables d'environnement
mongoose.connect('mongodb://localhost/',
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
