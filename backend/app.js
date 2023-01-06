const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const mongoose = require('mongoose');
const helmet = require('helmet');

require('dotenv').config();
app.use(express.json());

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

mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true,
            useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(helmet({
    crossOriginResourcePolicy: { policy: "same-site" }
}));



app.use('api/auth', userRoutes)
console.log("Express server listening on port", app.port)

module.exports = app;
