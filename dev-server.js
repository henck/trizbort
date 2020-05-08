
const express = require('express');
const app = express();

app.get('/dist/:name', function (req, res) {
    res.sendFile(req.params.name, { root: __dirname + "/dist/" });
});

app.use('/src', express.static('src'));

app.get('/fonts/:name', function (req, res) {
    res.sendFile(req.params.name, { root: __dirname + "/fonts/" });
});

app.get('/:name', function (req, res) {
    res.sendFile(req.params.name, { root: __dirname });
});

app.get('/', function (req, res) {
    res.sendFile("index.html", { root: __dirname });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})