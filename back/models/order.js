var mongoose = require('mongoose');

var schema = new mongoose.Schema({

	idCliente: Number,
	cliente: String,
	dataPedido: String,
	valor: Number,
	itens: [{
		_id: Number,
		idItem: Number,
		nome: String,
		valorOriginal: Number,
		valorUnitario: Number,
		quantidade: Number,
		valorTotal: Number,
		items: Object
	}]
});

mongoose.model('Order', schema, 'order');

