// On inclut le module fs (filesystem) de Node js pour la gestion des fichiers. Pour modifier le système de donnée pour la fonction delete
const fs = require('fs');

// On importe le modèle Sauce
const Sauce = require('../models/sauce');


// Controleur pour l'affichage d'une sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({error}));

};

// Controleur pour l'affichage de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find() // on utilise la méthode find et on renvoie un tableau contenant la liste complète des Sauces de la BDD
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
};

// Controleur pour la création d'une sauce
exports.createSauce = (req, res, next) => {
    // on extrait le sauce de la requête via le parse
    // dans req.body.sauce le sauce correspond
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject.userId;
    // on crée une nouvelle instance de Sauce
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    //on utilise la méthode save pour enregistrer Sauce dans la base de données, elle renvoie une promise.
    sauce.save()
        // on renvoie une réponse de réussite
        .then((sauce) => {
            res.status(201).json({message: 'Sauce enregistrée !'})
        })
        // on renvoie la réponse d'erreur générée automatiquement par Mongoose et un code erreur 400
        .catch((error) => {
            res.status(400).json({error});
        });
    /* console.log(req.body);*/
};

// Controleur pour la modification d'une sauce
exports.modifySauce = (req, res, next) => {
    // on crée un objet qui regarde si req.file existe ou non.
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),//on récupère l'objet en parsant la chaine de caractères
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // on recrée l'URL de l'image
    } : {...req.body}; // si pas d'objet on le récupère dans le corp de la requête
    //on supprime le userId venant de la requête
    delete sauceObject.userId;

    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            // On vérifie si l'auteur de la sauce est bien la personne connectée
            // si ce n'est pas le cas, on renvoie un message d'erreur
            if (sauce.userId !== req.auth.userId) {
                res.status(401).json({message: 'Requête non autorisée !'});
            }
            // Sinon
            else {
                // On récupère le contenu du fichier image dans la requête
                const testReqFile = req.file;
                // S'il n'existe pas, on met simplement à jour les modifications
                if (!testReqFile) {
                    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
                        .then(() => res.status(200).json({message: 'Sauce modifiée!'}))
                        .catch(error => res.status(401).json({error}));
                }
                // S'il existe, il faut supprimer l'ancienne image dans le dossier 'images'
                else {
                    // On récupère le nom du fichier de l'image de la sauce dans le dossier images
                    const filenameStock = sauce.imageUrl.split('/images/')[1];
                    // Et, on le supprime avec 'unlink', puis on met à jour les modifications
                    fs.unlink(`images/${filenameStock}`, () => {
                        Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
                            .then(() => res.status(200).json({message: 'Sauce modifiée!'}))
                            .catch(error => res.status(401).json({error}));
                    })
                }
            }
        })
        .catch((error) => {
            res.status(400).json({error});
        });
};

// Controleur pour la suppression d'une sauce par l'utilisateur
exports.deleteSauce = (req, res, next) => {
    // on récupère la sauce
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            if (sauce.userId !== req.auth.userId) { // on vérifie que c'est bien l'auteur qui demande la suppression
                res.status(403).json({message: 'Requête non autorisée !'});
            } else {
                // si c'est le bon utilisateur, on récupère le nom de fichier
                const filenameStock = sauce.imageUrl.split('/images/')[1];
                // On supprime le fichier image de la sauce
                fs.unlink(`images/${filenameStock}`, () => {
                    // on supprime la sauce de la BDD
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => res.status(200).json({message: 'Sauce supprimée !'}))
                        .catch(error => res.status(401).json({error}));
                });
            }
        })
        .catch(error => {
            res.status(500).json({error});
        });
};


//  req = toutes les infos que tu reçois
//  res = ce que tu vois envoyer comme info a ton front depuis le back

// like une sauce
exports.likeSauce = (req, res, next) => {
    let like = req.body.like;
    let userId = req.body.userId;
    let sauceId = req.params.id;

    switch (like) {
        case 1:
            Sauce.updateOne({_id: sauceId}, {
                $push: {usersLiked: userId},
                $inc: {likes: +1}
            })
                .then(() => res.status(200).json({message: 'like added'}))
                .catch((error) => res.status(400).json({error}))
            break;

        case 0:
            Sauce.findOne({_id: sauceId})
                .then((sauce) => {
                    if (sauce.usersLiked.includes(userId)) {
                        Sauce.updateOne({_id: sauceId}, {
                            $pull: {usersLiked: userId},
                            $inc: {likes: -1}
                        })
                            .then(() => res.status(200).json({message: 'Like removed'}))
                            .catch((error) => res.status(400).json({error}))
                    }
                    if (sauce.usersDisliked.includes(userId)) {
                        Sauce.updateOne({_id: sauceId}, {
                            $pull: {usersDisliked: userId},
                            $inc: {dislikes: -1}
                        })
                            .then(() => res.status(200).json({message: 'Dislike removed'}))
                            .catch((error) => res.status(400).json({error}))
                    }
                })
                .catch((error) => res.status(404).json({error}))
            break;

        case -1:
            Sauce.updateOne({_id: sauceId}, {
                $push: {usersDisliked: userId},
                $inc: {dislikes: +1}
            })
                .then(() => {
                    res.status(200).json({message: 'Dislike added'})
                })
                .catch((error) => res.status(400).json({error}))
            break;
        default:
            console.log('error');
    }
}
