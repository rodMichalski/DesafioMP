angular.module('mpedidos')
	.controller('PedidosController', function($scope, $routeParams, buscaPedidos) {

		buscaPedidos.query(function(pedidos) {
			console.log(pedidos);

			$scope.pedidos = pedidos;
			console.log($scope.pedidos);
		}, function(erro) {
			console.log(erro);
		});
	});