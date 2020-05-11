
const express = require('express');
const app = express();

app.use('/src', express.static('src'));
app.use('/dist', express.static('dist'));

app.get('/:name', function (req, res) {
    res.sendFile(req.params.name, { root: __dirname });
});

app.get('/', function (req, res) {
    res.sendFile("index.html", { root: __dirname });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})