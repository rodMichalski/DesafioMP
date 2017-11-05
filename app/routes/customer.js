module.exports = function(app){

	var api = app.api.customer;

	app.route('/customer')
		.get(api.list);

	app.route('/customer/:customerId')
		.get(api.searchId);
};

