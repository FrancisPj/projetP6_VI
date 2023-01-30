const express = require('express');
// Permet de créer des routeurs séparés
const router = express.Router();

// on importe la logique des routes
const userCtrl = require('../controllers/user');

const emailCtrl = require('../middleware/emailControler')
const pwdCtrl = require('../middleware/passwordController')

// CRUD = CREATE ( POST ) / READ ( GET ) / UPDATE ( PUT, PATH ) / DELETE DELETE
    // intercepte les requêtes post d'inscription
router.post('/signup', emailCtrl, pwdCtrl, userCtrl.signup);
    // intercepte les requetes post d'authentification
router.post('/login', userCtrl.login);

module.exports = router;
