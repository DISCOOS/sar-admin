const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const util = require('util');

require('env2')('.env');

let env = {};
const config = require('./env.json');

Object.keys(config).map(function(key) {
    key = config[key];
    env[key] = process.env[key];
});

// Write config file
const dst = path.join('dist', 'assets', 'js');
const json = 'var env = ' + util.inspect(env, false, null, false) + ';';

fse.mkdirsSync(dst);

fs.writeFile(path.join(dst, 'env.js'), json, function() {
    console.log(json);
});
