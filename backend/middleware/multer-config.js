// On importe multer : multer est un package de gestion de fichiers.
const multer = require('multer');

// On définit le format des images reçues
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/bmp': 'bmp',
    'image/webp': 'webp'
};

// diskStorage() configure le chemin et le nom de fichier pour les fichiers entrants.
const storage = multer.diskStorage({
    // On choisit la destination
    destination: (req, file, callback) => {
        // On vérifie qu'il n'y a pas d'erreur (null) et on indique le dossier de destination (images)
        callback(null, 'images');
    },
    // On modifie le nom du fichier
    filename: (req, file, callback) => {
        // La méthode split pour découper le nom original du fichier en deux parties en utilisant le point comme séparateur.
        // On remplace les espaces éventuels par un tiret bas.
        const name = file.originalname.split('.')[0].split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        // On ajoute au nom la date (un timestamp Date.now())pour être sûr d'avoir un nom de fichier unique et un point et son extension.
        callback(null, name + Date.now() + '.' + extension);
    }
});

// single(): signifie fichier unique (pas un groupe de fichiers) crée un middleware qui capture les fichiers d'un certain type (passé en argument),
// et les enregistre au système de fichiers du serveur à l'aide du storage configuré.
module.exports = multer({storage: storage}).single('image');
