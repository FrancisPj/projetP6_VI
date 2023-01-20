// appel de la fonction isEmail de validator que l'on installe npm install validator pour gérer la validation de l'email (comme une regex)
// https://www.npmjs.com/package/validator
const validator = require('validator');


module.exports = (req,res,next) => {
    const {email} = req.body;

    if(validator.isEmail(email)){
        next();
    }else{
        return res.status(400).json({error: `L'email ${email} n'est pas valide`})
    }
}
