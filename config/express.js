var express = require('express');
var app = express();
var consign = require('consign');
var bodyParser = require('body-parser');

app.use(express.static('./front'));
app.use(bodyParser.json());

consign({cwd: 'back'})
	.include('models')
	.then('api')
	.then('routes')
	.into(app);

module.exports = app;