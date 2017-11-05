var mongoose = require('mongoose');

module.exports = function(app){

	var api = {};

	var model = mongoose.model('Order');

	api.list = function(req, res){

		model.find()
			 .then(function(order) {
			 	res.json(order);
			 }, function(error){
			 	console.log(error);
			 	res.sendStatus(500);
			 });
			 
	};

	api.searchId = function(req, res){

		model.findById(req.params.orderId)
			 .then(function(order) {
			 	if (!order) throw new Error('Pedido não encontrado');
				res.json(order);
			 }, function(error) {
				console.log(error);
				res.sendStatus(500);
			 });
		
	};

	api.create = function(req, res) {

		model.create(req.body)
			.then(function(order) {
				res.json(order);
			}, function(error) {
				console.log('Não Conseguiu');
				console.log(error);
				res.sendStatus(500);
			});
		
	};

	api.update = function(req, res) {	

		model.findByIdAndUpdate(req.params.orderId, req.body)
			.then(function(order) {
				res.json(order);
			}, function(error) {
				console.log(error);
				res.sendStatus(500);
			});

	};

	return api;
};