var fs = require('fs'),
    exec = require('child_process').exec,
    node_modules_path = './node_modules';

function log(text, type) {
    switch (type) {
        case 'blue':
            return console.log('\x1b[36m%s\x1b[0m', text);
        case 'green':
            return console.log('\x1b[32m%s\x1b[0m', text);
        case 'red':
            return console.log('\x1b[31m%s\x1b[0m', text);
        default:
            return console.log('\x1b[33m%s\x1b[0m', text);
    }
}

function deleteFolderRecursive(path) {
    return new Promise(function(resolve, reject) {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function(file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) {
                    deleteFolderRecursive(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
            resolve(path);
        } else {
            var errorMessage = "Path does not exist: " + path;
            reject(errorMessage);
            log(errorMessage, 'red');
        }
    });
}

function execute(command) {
    return new Promise(function(resolve, reject) {
        exec(command, function(error, stdout, stderr) {
            log('stdout: ' + stdout);
            log('stderr: ' + stderr, 'red');
            if (error !== null) {
                log('exec error: ' + error, 'red');
                reject(error, stdout, stderr);
            } else {
                resolve(stdout, stderr);
            }
        });
    });
}

module.exports = {
    log: log,
    deleteFolderRecursive: deleteFolderRecursive,
    execute: execute
};
