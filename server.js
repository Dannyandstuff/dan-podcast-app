var express = require('express')
var Audiosearch = require('audiosearch-client-node');

var app = express()
var audiosearch = new Audiosearch('6e882135d41f23eb8712aa543af7d9e4e9b960e21c2b97403620b7bbe220a17b', '6e4c677ff0f890d001d2257e72f7c05b0a17b1c9b6b1413a950ef534f7e8868a');

app.get('/api/search', function(req, res) {
    audiosearch.searchShows('Harmontown').then(function (results) {
        res.json(results);
    })
})

app.listen(3000);