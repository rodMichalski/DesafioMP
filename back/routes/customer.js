module.exports = function(app){

	var api = app.api.customer;

	app.route('/customer')
		.get(api.lista);

	app.route('/customer/:customerId')
		.get(api.buscaPorId);
};

