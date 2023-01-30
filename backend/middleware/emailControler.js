// appel de la fonction isEmail de validator que l'on installe npm install validator pour gérer la validation de l'email (comme une regex)
// https://www.npmjs.com/package/validator
const validator = require('validator');


module.exports = (req,res,next) => {
    // on extraire la valeur de l'email de l'objet body de la demande
    const {email} = req.body;
    // La fonction 'validator.isEmail()' pour vérifier si l'email est au bon format.
    if(validator.isEmail(email)){
        //Si c'est le cas, elle passe à l'étape suivante en exécutant next().
        next();
    }else{
        return res.status(400).json({error: `L'email ${email} n'est pas valide`})
    }
}
