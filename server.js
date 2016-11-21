// var http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World\n');
// }).listen(8100, "localhost");
// console.log('Server running at http://localhost:8100/');
var express = require('express');
app = express();
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var Audiosearch = require('audiosearch-client-node');

var audiosearch = new Audiosearch('6e882135d41f23eb8712aa543af7d9e4e9b960e21c2b97403620b7bbe220a17b', '6e4c677ff0f890d001d2257e72f7c05b0a17b1c9b6b1413a950ef534f7e8868a');

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// audiosearch.getTastemakers().then(function (tastemakers) {
//   // do stuff here
// });

app.get('/api/search', function (req, res) {
    console.log(req.params.searchTerm);
    audiosearch.searchEpisodes(req.params.searchTerm).then(function (results) {
        res.json(results);
    });
});

app.get('*', function(req, res) {
    res.sendFile('./www/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(8100);
console.log("App listening on port 8100");