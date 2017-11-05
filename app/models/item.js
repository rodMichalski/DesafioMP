var mongoose = require('mongoose');

//var autoIncrement = require('mongoose-auto-increment');

var schema = new mongoose.Schema({

	_id: Number,
	nome: String,
	preco: Number
	
});

//schema.plugin(autoIncrement.plugin,'Item');

module.exports = mongoose.model('Item', schema, 'item');

