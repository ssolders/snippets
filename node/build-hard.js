var path = require('path'),
    utils = require(path.resolve(__dirname, "./utils.js")),
    log = utils.log,
    deleteFolderRecursive = utils.deleteFolderRecursive,
    execute = utils.execute;

log("Initializing build:hard.", 'blue');

deleteFolderRecursive('./node_modules').then(function() {
    log("All packages removed!", 'green');
    log("Please wait while installing npm-packages. This could take a while.", "blue");
    execute('npm install').then(function() {
        log("Completed installation npm-packages.", 'green');

        log("Please wait while building plugins (js/css). This could take a while.", "blue");
        execute('npm run build').then(function() {
            log("Completed building plugins.", 'green');
        });
    });
});
