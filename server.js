const path = require('path');
const express = require('express');
const app = express();

console.log("Configuring server....");

// If an incoming request uses a protocol other than HTTPS, redirect that request to the same url but with HTTPS
const forceSSL = function () {
    return function (req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(
                ['https://', req.get('Host'), req.url].join('')
            );
        }
        next();
    }
};

// Instruct the app to use the forceSSL middleware for production
if (process.env.NODE_ENV === 'production') {
    app.use(forceSSL());
}

// Run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist'));

// Inject config variables from runtime environment
require(path.join(__dirname, 'scripts', 'generate.js'))(function() {

    console.log("Starting server....");

    // Start the app by listening on the default Heroku port
    app.listen(process.env.PORT || 8080);

    // Use Gzip compression
    const compression = require('compression');
    app.use(compression());

    // For all GET requests, send back index.html so that PathLocationStrategy can be used
    app.get('*', function (req, res) {
        const index = path.join(__dirname, 'dist', 'index.html');
        res.sendFile(index);
    });

    console.log("Server started!");

});


