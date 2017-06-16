var path = require('path'),
    utils = require(path.resolve(__dirname, "./utils.js")),
    log = utils.log,
    deleteFolderRecursive = utils.deleteFolderRecursive,
    execute = utils.execute;

log("Initializing pack:hard.", 'blue');
log("Deleting node_modules.", 'blue');
deleteFolderRecursive('./node_modules').then(function() {
    log("All packages removed!", 'green');
    log("Moving on to re-installing, it could take a while...", 'blue');
    execute('npm install').then(function() {
        log("Packages installed!", 'green');
        log("Lets pack it up! Building and packing the plugin into a tarball.", "blue");
        execute('npm pack').then(function() {
            log("Packed and ready - Good to go!", 'green');
        });
    });
});
