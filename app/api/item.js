var mongoose = require('mongoose');

module.exports = function(app){

	var api = {};

	var model = mongoose.model('Item');

	api.list = function(req, res){

		model.find()
			 .then(function(items) {
			 	res.json(items);
			 }, function(error){
			 	console.log(error);
			 	res.sendStatus(500);
			 });
	};

	api.searchId = function(req, res){

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