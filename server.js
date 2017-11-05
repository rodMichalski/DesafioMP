var http = require('http');
var app = require('./config/express');
var db = require('./config/database');

db('rodrigomichalski:rodrigo1991@cluster0-shard-00-00-mfo1k.mongodb.net:27017,cluster0-shard-00-01-mfo1k.mongodb.net:27017,cluster0-shard-00-02-mfo1k.mongodb.net:27017/mpedidos?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin')

http.createServer(app).listen(3000, function() {
	console.log("Rodando");
});