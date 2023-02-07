const mongoose = require('mongoose');
//La valeur d'un champ doit être unique dans la collection.
const uniqueValidator = require('mongoose-unique-validator');

//modèle de base de donnée pour le signup . Nouvel utilisateur.
const userSchema = mongoose.Schema({
    //Pour s'assurer que deux utilisateurs ne puissent pas utiliser la même adresse e-mail, j'utilise le mot clé 'unique'
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Deux utilisateurs ne peuvent pas partager la même adresse e-mail.
userSchema.plugin(uniqueValidator);

// Exportation du module.
module.exports = mongoose.model('User', userSchema);
