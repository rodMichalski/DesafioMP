var mongoose = require('mongoose');

module.exports = function(app){

	var api = {};

	var model = mongoose.model('Customer');

	api.list = function(req, res){

		model.find()
			 .then(function(customer) {
			 	res.json(customer);
			 }, function(error){
			 	console.log(error);
			 	res.sendStatus(500);
			 });
	};

	api.searchId = function(req, res){

		console.log(req.params.customerId);

		model.findById(req.params.customerId)
			 .then(function(customer) {
			 	if (!customer) throw new Error('Cliente não encontrado');
				res.json(customer);
			 }, function(error) {
				console.log(error);
				res.sendStatus(500);
			 });
		
	};

	return api;
};