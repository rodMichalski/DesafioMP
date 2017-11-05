module.exports = function(app){

	var api = app.api.item;

	app.route('/item')
		.get(api.list);

	app.route('/item/:itemId')
		.get(api.searchId);

};

