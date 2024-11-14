const fs = require('fs');

module.exports = function (app) {
        console.log("\nDiscovering all controllers available");
        let controllers = [];

        fs.readdirSync(__dirname).forEach(file => {
                if (file === 'index.js' || !file.endsWith('.js')) return; // Évite de réimporter index.js et les fichiers non-JS
                const name = file.substr(0, file.indexOf('.'));
                const controller = require(`./${name}`)(app);

                // Vérifiez si le contrôleur est un tableau de routes
                if (Array.isArray(controller)) {
                        controller.forEach(route => {
                                if (route && route.method && route.path) {
                                        console.log(`${route.method.toUpperCase()} - ${route.path} | ${name}`);
                                        controllers.push(route);
                                } else {
                                        console.error(`Invalid route in controller: ${name}`);
                                }
                        });
                } else if (controller && controller.method && controller.path) {
                        console.log(`${controller.method.toUpperCase()} - ${controller.path} | ${name}`);
                        controllers.push(controller);
                } else {
                        console.error(`Invalid controller: ${name}`);
                }
        });

        console.log("All controllers loaded successfully\n");
        return controllers;
}