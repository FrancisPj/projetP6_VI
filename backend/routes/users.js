const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user')

// CRUD = CREATE ( POST ) / READ ( GET ) / UPDATE ( PUT, PATH ) / DELETE DELETE
router.get('/signup', userCtrl.signup)

module.exports = router;
