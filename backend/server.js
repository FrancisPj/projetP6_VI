// Les projets Node sont initialisés avec la commande  npm init
// importer le package/module http de node; require() est la commande pour importer le package/module
const http = require('http');
// importe le fichier de l'application
const app = require('./app');

//la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne;
const normalizePort = val => {
    //Exécute parseInt, qui convertit essentiellement la valeur en un entier.
    const port = parseInt(val, 10);
    // si port n'est pas un nombre   isNaN(port)
    if (isNaN(port)) {
        return val;
    }
    //  si port est un nombre sup ou égal à 0
    if (port >= 0) {
        return port;
    }
    // sinon retourne faux
    return false;
};
// constante port qui définit le port
const port = normalizePort(process.env.PORT || '3000');
// dit à l'application express quelle doit tourner sur le 'port' avec la constante port
app.set('port', port);

//La fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur;
const errorHandler = error => {
    // si le server n'entend rien à l'appel
    if (error.syscall !== 'listen') {
        // lance une erreur
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    // au cas d'une erreur code
    switch (error.code) {
        // EACCES refuse l'accès
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            // process.exit(1) signifie mettre fin au processus avec un échec. process.exit(0) signifie mettre fin au processus sans échec
            process.exit(1);
            // fin
            break;

        // EADDRINUSE signifie que l'adresse cherchée est en cour d'utilisation
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            // process.exit(1) signifie mettre fin au processus avec un échec. process.exit(0) signifie mettre fin au processus sans échec
            process.exit(1);
            // fin
            break;
        default:
            //par défaut, lance une erreur
            throw error;
    }
};

//Un écouteur d'évènements est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.
const server = http.createServer(app);
// si le server est en erreur: appelle la fonction errorHandler qui gère les erreurs
server.on('error', errorHandler);
// un écouteur d'évènements est également enregistré.
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);
