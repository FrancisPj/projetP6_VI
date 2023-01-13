const express = require('express');
// Permet de créer des routeurs séparés
const router = express.Router();

const userCtrl = require('../controllers/user');

// CRUD = CREATE ( POST ) / READ ( GET ) / UPDATE ( PUT, PATH ) / DELETE DELETE
router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

module.exports = router;