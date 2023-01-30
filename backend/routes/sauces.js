//J'importe le module Express.js, qui est un framework Web pour Node.js.
const express = require('express');
// Je crée une instance du routeur Express.
// Le routeur est utilisé pour gérer les routes et déterminera comment l'application répond aux différentes requêtes d'URL.
const router = express.Router();

// La constante auth est généralement utilisée dans les applications Web pour authentifier les utilisateurs et accéder aux ressources.
// Dans ce cas particulier, il est utilisé pour exiger une authentification pour le dossier middleware.
// Il vérifie essentiellement si l'utilisateur est autorisé à accéder aux ressources protégées.
const auth = require('../middleware/auth');

//Multer est un package qui nous permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

// Requête POST pour envoyer des objets et fonction middleware
router.post('/', auth, multer, sauceCtrl.createSauce);

// Requête PUT | Mise à jour / modification d'une sauce existante
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

// Requête DELETE | Suppression d'une sauce existante
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// Requête GET pour afficher une sauce spécifique
router.get('/:id', auth, sauceCtrl.getOneSauce);

// Requête GET pour afficher toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);

// Requête POST pour likes & dislikes
router.post('/:id/like', auth, sauceCtrl.likeSauce);

// On exporte les routers
module.exports = router;
