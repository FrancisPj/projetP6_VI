// on appelle jsonwebtoken pour le middleware d'authentification
const jwt = require('jsonwebtoken');

// On importe les variables d'environnement.
const dotenv = require("dotenv").config();

// on exporte la requete. Création du middleware d'authentification.
module.exports = (req, res, next) => {
    try {
        // On récupère le token du header authorization de la requête entrante
        // La fonction split permet de tout récupérer après le mot clé Bearer et l'espace
        const token = req.headers.authorization.split(' ')[1];
        // On décode le token en vérifiant qu'il correspond avec sa clef secrète
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // on récupère le user id décodé par le jwt.vérify
        const userId = decodedToken.userId;
        // on rajoute l'objet userId à l'objet requete
        req.auth = {
            userId: userId
        };
        next();
    } catch(error) {
        res.status(401).json({ error: error | "Requête non autorisée !"  });
    }
};
