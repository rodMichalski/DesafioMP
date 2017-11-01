module.exports = function(app){

	var api = app.api.order;

	app.route('/order')
		.get(api.lista)
		.post(api.adiciona);

	app.route('/order/:orderId')
		.get(api.buscaPorId)
		.put(api.atualiza);
};