var mongoose = require('mongoose');

var schema = new mongoose.Schema({

	cliente: {
		_id: Number,
		nome: String
	},
	dataPedido: String,
	valor: Number,
	itens: [{
		_id: Number,
		valorUnitario: Number,
		quantidade: Number,
		valorTotal: Number,
		item: {
			_id: Number,
			nome: String,
			preco: Number,
			multiplo: Number
		}
	}]
	
});

mongoose.model('Order', schema, 'order');

