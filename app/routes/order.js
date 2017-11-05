module.exports = function(app){

	var api = app.api.order;

	app.route('/order')
		.get(api.list)
		.post(api.create);

	app.route('/order/:orderId')
		.get(api.searchId)
		.put(api.update);
};