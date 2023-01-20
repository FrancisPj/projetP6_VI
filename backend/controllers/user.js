// On importe les variables d'environnement.
const dotenv = require("dotenv").config();
// On importe le package de cryptage pour hacher le mot de passe
const bcrypt = require('bcrypt');
// On importe le package Jsonwebtoken
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.signup = (req, res, next) => {
    //On appel la fonction de hachage de bcrypt dans notre mot de passe. // fonction pour hasher/crypter le mot de passe en 10 tours pour le sel
    bcrypt.hash(req.body.password, 10)
        // quand c'est hashé
        .then(hash => {
            // créer un modèle User avec email et mot de passe hashé
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // sauvegarde le user dans la base de donnée
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    // on trouve l'adresse qui est rentrée par un utilisateur (requete)
    User.findOne({ email: req.body.email })
        // pour un utilisateur
        .then(user => {
            // si la requete email ne correspond pas à un utilisateur
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            //La fonction compare de bcrypt compare le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données.
            bcrypt.compare(req.body.password, user.password)
                // à la validation
                .then(valid => {
                    // si ce n'est pas valide
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        // la fonction sign de jsonwebtoken pour chiffrer un nouveau token qui contient l'ID de l'utilisateur
                        token: jwt.sign(
                            { userId: user._id },
                            //une chaîne secrète de développement temporaire
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

};

