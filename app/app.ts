import express = require('express');

const app: express.Application = express();

app.get('/', function (req, res) {
	res.send('Hello World!aa');
});

const port = process.env.PORT || 8000;

app.listen(port, function () {
	console.log('Listening on port ' + port);
});