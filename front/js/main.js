angular.module('mpedidos', ['myDirectives','ngAnimate', 'ngRoute', 'ngResource', 'myServices', 'ui.utils.masks'])
	.config(function($routeProvider, $locationProvider, $httpProvider) {


		//$httpProvider.interceptors.push('tokenInterceptor');
	

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