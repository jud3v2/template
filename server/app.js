const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
//const fileUpload = require('express-fileupload');

// Utiliser afin de pouvoir lire les data dans les requêtes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Permet de log les requêtes dans la console de dev
app.use(morgan('dev'));

// permet de gérer les CORS afin d'autoriser les requêtes depuis n'importe quelle origine
app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', '*'],
}));

// permet de gérer l'upload des fichiers avec express
//app.use(express.static('public'));
//app.use(fileUpload({
//        createParentPath: true,
//        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file(s) size
//        debug: config.env === 'development', // affiche les logs dans la console
//        abortOnLimit: true, // arrête le processus si la limite de taille est dépassée
//}));


// Déclaration des routes et découverte automatique des routes disponibles avec leur bon controller
require('./routes/index.js')(app, require('./controllers/index.js')(app));

app.listen(config.port, () => {
        console.info(`Server is running on ${config.serverUrl}`);
        console.info('Press CTRL-C to stop\n');
});