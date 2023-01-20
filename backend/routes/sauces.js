const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

//Multer est un package qui nous permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

// Requête POST
router.post('/', auth, multer, sauceCtrl.createSauce);

// Requête PUT | Mise à jour / modification d'une sauce existante
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

// Requête DELETE | Suppression d'une sauce existante
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// Requête GET pour afficher une sauce spécifique
router.get('/:id', auth, sauceCtrl.getOneSauce);

// Requête GET pour afficher toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);

router.post('/:id/like', auth, sauceCtrl.likeSauce);

// On exporte les routers
module.exports = router;
