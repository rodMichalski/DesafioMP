angular.module('mpedidos')
	.config(function($routeProvider, $locationProvider) {

		$locationProvider.hashPrefix('');	

		$routeProvider.when('/pedidos', {
			templateUrl: 'partials/pedidos.html',
			controller: 'PedidosController'
		});

		$routeProvider.when('/pedido/new', {
			templateUrl: 'partials/pedido.html',
			controller: 'PedidoController'
		});

		$routeProvider.when('/pedido/edit/:pedidoId', {
			templateUrl: 'partials/pedido.html',
			controller: 'PedidoController'
		});

		$routeProvider.otherwise({redirectTo: '/pedidos'});

	});