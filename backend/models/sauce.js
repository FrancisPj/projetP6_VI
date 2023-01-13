//import de mongoose pour le schéma
const mongoose = require('mongoose');
//schema de données qui contient les champs souhaités pour chaque sauce
const sauceSchema = mongoose.Schema({
    // l'identifiant MongoDB unique de l'utilisateur qui a créé la sauce
    userId: {type: String, required: true},
    //nom de la sauce
    name: { type: String, required: true},
    // fabricant de la sauce
    manufacturer: { type: String, required: true},
    description: { type: String, required: true},
    // le principal ingrédient épicé de la sauce
    mainPepper: { type: String, required: true},
    imageUrl: { type: String, required: true},
    //heat: nombre entre 1 et 10 décrivant la sauce
    heat: { type: Number, required: true},
    likes: { type: Number, default: 0},
    dislikes: { type: Number, default: 0},
    //tableau des identifiants des utilisateurs qui ont aimé (= liked) la sauce <userId>
    usersLiked: { type: [String]},
    // tableau des identifiants des utilisateurs qui n'ont pas aimé (= disliked) la sauce <userId>
    usersDisliked: { type: [String]}


});

//nous exportons ce schéma en tant que modèle Mongoose, le rendant par là même disponible pour notre application Express.
module.exports = mongoose.model('sauce', sauceSchema);


//    La méthode "Schema" de Mongoose vous permet de créer un schéma de données pour votre base de données MongoDB.
//     La méthode "model" transforme ce modèle en un modèle utilisable.
