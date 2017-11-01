var http = require('http');
var app = require('./config/express');
var db = require('./config/database');

//db('rodrigomichalski:rodrigo1991@cluster0-shard-00-00-mfo1k.mongodb.net:27017,cluster0-shard-00-01-mfo1k.mongodb.net:27017,cluster0-shard-00-02-mfo1k.mongodb.net:27017/mpedidos?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin')

db('desafiompedidos:kNmNLo5UZwIywdXfmN0KeTvQKuIbCJecEPnTD9D2NZZvjCA27g7cctEcQ11Bja5lPjBrC0SIRK5EydcYZAxVxA==@desafiompedidos.documents.azure.com:10250/mpedidos?ssl=true&sslverifycertificate=false');

http.createServer(app).listen(3000, function() {
	console.log("Rodando");
});