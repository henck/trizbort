
const express = require('express');
const app = express();

app.get('/dist/:name', function (req, res) {
    res.sendFile(req.params.name, { root: __dirname + "/dist/" });
});

app.get('/:name', function (req, res) {
    res.sendFile(req.params.name, { root: __dirname });
});



app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})