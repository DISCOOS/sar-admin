const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const util = require('util');

module.exports = function(done) {

    let env = {};
    const config = require(path.join(__dirname, 'generate.json'));

    Object.keys(config).map(function(key) {
        key = config[key];
        if(process.env[key])  {
            env[key] = process.env[key];
        }
    });

    // Write config file
    const dst = path.join(__dirname, '..', 'dist', 'assets', 'js');

    const json = 'var env = ' + util.inspect(env, false, null, false) + ';';

    fse.mkdirsSync(dst);

    fs.writeFile(path.join(dst, 'env.js'), json, function() {
        console.log('Configuration');
        console.log(json);
        console.log('Generated to ' + dst);
        if(done) done();
    });
};


