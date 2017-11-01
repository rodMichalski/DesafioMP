angular.module('myServices', ['ngResource'])
	.factory('buscaPedidos', function($resource) {

		return $resource('/order/:orderId', null, {
			'update' : { 
				method: 'PUT'
			}
		});
	})
	.factory("cadastroDePedidos", function(buscaPedidos, $q) {
		var service = {};
		service.cadastrar = function(pedido) {
			return $q(function(resolve, reject) {
				if(pedido._id) {
					buscaPedidos.update({orderId: pedido._id}, pedido, function() {
						resolve({
							mensagem: 'Pedido atualizado com sucesso',
							inclusao: false
						});
					}, function(erro) {
						console.log(erro);
						reject({
							mensagem: 'Não foi possível atualizar o pedidos.'
						});
					});

				} else {
					buscaPedidos.save(pedido, function() {
						resolve({
							mensagem: 'Pedido para o cliente ' + pedido.cliente + ' incluído com sucesso',
							inclusao: true
						});
					}, function(erro) {
						//alert('Não incluido');
						reject({
							mensagem: 'Não foi possível incluir o pedido para o cliente ' + pedido.cliente
						});
					});
				}
			});
		};
		return service;
    })
    .factory('buscaItens', function($resource) {

		return $resource('/item/:itemId', null, {
			'update' : { 
				method: 'PUT'
			}
		});
	})
	.factory('buscaClientes', function($resource) {

		return $resource('/customer/:customerId', null, {
			'update' : { 
				method: 'PUT'
			}
		});
	});