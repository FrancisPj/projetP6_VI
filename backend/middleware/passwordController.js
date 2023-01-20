const passwordValidator = require('password-validator');
// npm i password validator

// Création d'un schéma
const passwordSchema = new passwordValidator();

//  On ajoute les propriétés au schéma
passwordSchema
    .is().min(8)                                    // Minimum 8 caractères
    .is().max(100)                                  // Maximum 100 caractères
    .has().uppercase()                              // Doit contenir des lettres majuscules
    .has().lowercase()                              // Doit contenir des lettres minuscules
    .has().digits(2)                                // Doit avoir au moins 2 chiffres
    .has().not().spaces()                           //  Ne doit pas contenir d'espace
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values. spécifie les valeurs de la liste noir

module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(404).json({error: `Le mot de passe n'est pas assez fort ${passwordSchema.validate("req.body.password", {list: true})}`})
    }
}
