var express = require('express');
var Audiosearch = require('audiosearch-client-node');
var app = express();
var audiosearch = new Audiosearch('6e882135d41f23eb8712aa543af7d9e4e9b960e21c2b97403620b7bbe220a17b', '6e4c677ff0f890d001d2257e72f7c05b0a17b1c9b6b1413a950ef534f7e8868a');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/api/getShowByItunesId', function(request, response) {
    audiosearch.getShowByItunesId(encodeURI(request.query.id)).then(function (results) {
        response.json(results);
    })
})

app.get('/api/getRelated', function(request, response) {
    audiosearch.getRelated(encodeURI(request.query.id)).then(function (results) {
        response.json(results);
    })
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
