var mongoose = require('mongoose');

module.exports = function(app){

	var api = {};

	var model = mongoose.model('Item');

	api.lista = function(req, res){

		model.find()
			 .then(function(items) {
			 	console.log(items);
			 	res.json(items);
			 }, function(error){
			 	console.log(error);
			 	res.sendStatus(500);
			 });
	};

	api.buscaPorId = function(req, res){

		model.findById(req.params.itemId)
			 .then(function(item) {
			 	if (!item) throw new Error('Item não encontrado');
				res.json(item);
			 }, function(error) {
				console.log(error);
				res.sendStatus(500);
			 });
		
	};

	return api;
};