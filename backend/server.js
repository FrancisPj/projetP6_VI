//importe le package http de node pour avoir les outils pour créer le serveur
const http = require('http');
//importe le fichier app.js
const app = require('./app');

//renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaine
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

//constante port qui définit le port
const port = normalizePort(process.env.PORT );
//indique sur quelle port l'application express va tourner
app.set('port', port);

// la fonction errorHandler recherche les erreurs et les gère de manière appropriée
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

    // au cas d'une erreur code
    switch (error.code) {
        // EACCES est autorisation refusée
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            // process.exit(1) signifie mettre fin au processus avec un échec. process.exit(0) signifie mettre fin au processus sans échec
            process.exit(1);
            break;
        // EADDRINUSE veut dire que l'adresse cherchée est en cour d'utilisation
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};
/* création du serveur
createServer est une méthode qui prend 2 arguments : la fonction qui sera appelé par le serveur à chaque requête reçue
cette fonction (createServer) prend comme argument la requête et la réponse
Application créer par express (app.js) c'est une fonction qui va recevoir la requête et la réponse
*/
const server = http.createServer(app);
//écouteur d'évènement consignant le port ou canal nommé sur lequel le serveur s'exécute dans la console
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});
/* le serveur doit écouter ou attendre les requêtes on utilise la méthode listen pour cela
(valeur par défaut en développement) = numéro du port que l'on va écouter
Il y a des cas ou le port 3000 n'est pas disponible et dans ce cas on utilise une variable d'environnement (process.env.PORT)*/
server.listen(port);
