module.exports = function(uri){

	var mongoose = require('mongoose');

	mongoose.Promise = require('bluebird');

	mongoose.connect('mongodb://' + uri);

	mongoose.connection.on('connected', function(){
		console.log('Conectado ao MongoDB');
	});

	process.on('SIGINT', function(){
		mongoose.connection.close(function(){
			console.log("Aplicação Finalizada. Fechando conexão com o MongoDB");
			process.exit(0);
		});
	});

	mongoose.connection.on('error', function(error){
		console.log('Erro na conexão: ' + error);
	});

	mongoose.connection.on('disconnected', function(){
		console.log('Descontando o MongoDB');
	});

};