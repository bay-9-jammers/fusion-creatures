import express = require('express');
import path = require('path');

const app: express.Application = express();

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/../../assets/index.html'));
});

app.use(express.static(path.join(__dirname+'/../../assets')));
app.use('/dependencies', express.static(path.join(__dirname+'/../../node_modules')));
app.use('/client', express.static(path.join(__dirname + '/../client')));

const port = process.env.PORT || 8000;
app.listen(port, function () {
	console.log('Listening on port ' + port);
});
