var mongoose = require('mongoose');

module.exports = function(app){

	var api = {};

	var model = mongoose.model('Order');

	api.lista = function(req, res){
		model.find()
			 .then(function(order) {
			 	res.json(order);
			 }, function(error){
			 	console.log(error);
			 	res.sendStatus(500);
			 });
	};

	api.buscaPorId = function(req, res){

		model.findById(req.params.orderId)
			 .then(function(order) {
			 	if (!order) throw new Error('Pedido não encontrado');
				res.json(order);
			 }, function(error) {
				console.log(error);
				res.sendStatus(500);
			 });
		
	};

	api.adiciona = function(req, res) {

		console.log(req.body);
		model.create(req.body)
		.then(function(order) {

			/*req.body.itens.forEach(function(item){
				console.log(item);

				item._idOrder = order._id;
				modelItem.create(item)
					 	 .then(function(itemOrder) {
					 	 	console.log(itemOrder);
						 }, function(error) {
							console.log('não conseguiu');
							console.log(error);
							res.sendStatus(500);
						 });
			})*/

			console.log(order);
			res.json(order);
		}, function(error) {
			console.log('não conseguiu');
			console.log(error);
			res.sendStatus(500);
		});
		
	};

	api.atualiza = function(req, res) {		

		console.log(req.body);
		
		model.findByIdAndUpdate(req.params.orderId, req.body)
		.then(function(order) {
			res.json(order);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		})
	};

	return api;
};