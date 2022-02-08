/** Start Require modules  **
 */

/* Express.js
 * is a framework for building web applications based on Node.js.
 * This is the standard framework for server development in Node.js.
 */
//La variable express nous permettra d'utiliser les 
// fonctionnalités du module Express.
// L'application requiert l'utilisation du module Express.
var Express = require('express');
var cors = require('cors');
/**
 * Node.js body parsing middleware.
 * Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
 * Note As req.body's shape is based on user-controlled input, all properties and values in this object are untrusted and should be validated before trusting. For example, req.body.foo.toString() may fail in multiple ways, for example the foo property may not be there or may not be a string, and toString may not be a function and instead a string or other user input.
 * @type {Parsers}
 */
var BodyParser = require('body-parser');

var hostname = 'localhost';
/* Port: is the port you call to use you server in local*/
var port = 3000;
const atelier = require('./router/atelier');
const garage = require('./router/garage');
const emp = require('./router/emp');
//const bodyParser = require('body-parser');
var app = Express();
app.use(cors());
/**
 * store it in a variable named bodyParser. The middleware to handle url encoded data is returned by bodyParser.urlencoded({extended: false}) .
 * extended=false is a configuration option that tells the parser to use the classic encoding. When using it, values can be only strings or arrays.
 */
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

app.use("/", atelier);
app.use("/garage", garage);
app.use("/emp", emp)
    // Démarrer le serveur
    // we say our app to start listen in the port and send back to us the msg with port info
app.listen(port, hostname, function() {
    console.log('nom server fonction sur http://' + hostname + ":" + port + "/n");
});