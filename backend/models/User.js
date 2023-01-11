const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
    //Pour s'assurer que deux utilisateurs ne puissent pas utiliser la même adresse e-mail, j'utilise le mot clé 'unique'
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
// deux utilisateurs ne peuvent pas partager la même adresse e-mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
