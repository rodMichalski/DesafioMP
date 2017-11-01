module.exports = function(app){

	var api = app.api.item;

	app.route('/item')
		.get(api.lista);

	app.route('/item/:itemId')
		.get(api.buscaPorId);

};

