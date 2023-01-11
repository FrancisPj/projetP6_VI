
// On inclut le module fs (filesystem) de Node js pour la gestion des fichiers. Pour modifier le système de donnée pour la foncion delete
const fs = require('fs');

// On importe le modèle Sauce
const Sauce = require('../models/Sauce');

// Controleur pour la création d'une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObjet,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`});

    //on utilise la méthode save pour enregistrer Sauce dans la base de données, elle renvoie une promise.
    sauce.save()
        // on renvoie une réponse de réussite
        .then((sauce) => {
            res.status(201).json({ message: 'Sauce enregistrée !'})
        })
        // on renvoie la réponse d'erreur générée automatiquement par Mongoose et un code erreur 400
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Controleur pour la modification d'une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete sauceObject._userId;

    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            // On vérifie si l'auteur de la sauce est bien la personne connectée
            // si ce n'est pas le cas, on renvoie un message d'erreur
            if (sauce.userId != req.auth.userId) {
                res.status(403).json({ message : 'Requête non autorisée !'});
            }
            // Sinon
            else {
                // On récupère le contenu du fichier image dans la requête
                const testReqFile = req.file;
                // S'il n'existe pas, on met simplement à jour les modifications
                if (!testReqFile){
                    Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                        .then(() => res.status(200).json({message : 'Sauce modifiée!'}))
                        .catch(error => res.status(401).json({ error }));
                }
                // S'il existe, il faut supprimer l'ancienne image dans le dossier 'images'
                else {
                    // On récupère le nom du fichier de l'image de la sauce dans le dossier images
                    const filenameStock = sauce.imageUrl.split('/images/')[1];
                    // Et, on le supprime avec 'unlink', puis on met à jour les modifications
                    fs.unlink(`images/${filenameStock}`, () => {
                        Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                            .then(() => res.status(200).json({message : 'Sauce modifiée!'}))
                            .catch(error => res.status(401).json({ error }));
                    })
                }
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Controleur pour la suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(403).json({message: 'Requête non autorisée !'});
            } else {
                const filenameStock = sauce.imageUrl.split('/images/')[1];
                // On supprime le fichier image de la sauce
                fs.unlink(`images/${filenameStock}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => res.status(200).json({message: 'Sauce supprimée !'}))
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
};

// Controleur pour l'affichage d'une sauce
exports.getOneSauce = (req, res, next) =>{
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};

// Controleur pour l'affichage de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find() // on utilise la méthode find et on renvoie un tableau contenant les Sauces de la BDD
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};
