angular.module('mpedidos')
	.controller('PedidoController', function($scope, $routeParams, buscaPedidos, cadastroDePedidos, buscaItens, buscaClientes) {

		$scope.pedido = {};
		$scope.pedido.itens = [];
		$scope.mensagem = '';
		$scope.itens = '';

		var faixaRent = 0.1;

		buscaItens.query(function(items) {
			$scope.items = items;
		});

		buscaClientes.query(function(customers) {
			$scope.customers = customers;
		});

		if($routeParams.pedidoId) {
			buscaPedidos.get({orderId: $routeParams.pedidoId}, function(pedido) {
				
				pedido.itens.forEach(function(item){
					console.log(item);
					validaMargemItem(item);
				})

				$scope.pedido = pedido; 
			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter o pedido'
			});
		}

		$scope.adicionaItem = function (){
			if(!$scope.pedido.itens)
				$scope.pedido.itens = [];

			if ($scope.pedido.itens.length === 0)
				var idItem = 1;
			else
				var idItem = $scope.pedido.itens.slice(-1)[0]._id + 1;

			$scope.pedido.itens.push({_id: idItem, nome: "", valorUnitario: 0, quantidade: 0, valorTotal: 0, rentabilidade: 'rent-branco'});

			somaPedido();
		}

		$scope.submeter = function() {

			somaPedido();

			if (validaPedido()){			
				cadastroDePedidos.cadastrar($scope.pedido)
				.then(function(dados) {
					$scope.mensagem = dados.mensagem;
					if (dados.inclusao) $scope.pedido = {};
				})
				.catch(function(erro) {
					$scope.mensagem = erro.mensagem;
				});
			}
		};

		$scope.removerItem = function(idParam){

			$scope.pedido.itens = $scope.pedido.itens.filter(function(item) {
		        return item._id != idParam;
		    });

		    somaPedido();

		}

		$scope.atualizaValorItem = function(item){

			if ((validaMargemItem(item)) && (item.valorUnitario != undefined)) {
				item.valorTotal = item.valorUnitario * item.quantidade;
			}

			somaPedido();
		}				

		$scope.buscaItem = function(item){
			buscaItens.get({itemId: item.idItem}, function(itemWS) {

				console.log(itemWS);
				item.valorOriginal = itemWS.preco;
				item.valorUnitario = itemWS.preco;
				item.nome = itemWS.nome;

				if (itemWS.multiplo != undefined){
					item.quantidade = itemWS.multiplo;
				}
				else {
					item.quantidade = 1;
				}

				item.multiplo = item.quantidade;

				$scope.atualizaValorItem(item);

				somaPedido();

			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter o Item'
			});
		}


		$scope.buscaCliente = function(pedido){
			buscaClientes.get({customerId: pedido.idCliente}, function(customerWS) {

				console.log(customerWS)
				pedido.cliente = customerWS.nome;
			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter o Cliente'
			});
		}

		function somaPedido(){
			var soma = $scope.pedido.itens.reduce(function (somatorio, valor) {
		        return somatorio + parseFloat(valor.valorTotal);
		    },0);

			$scope.pedido.valor = soma;
		}

		function validaMargemItem(item){
			if (item.valorUnitario > item.valorOriginal)
				item.rentabilidade = 'rent-otimo';
			else {
				if (item.valorUnitario >= (item.valorOriginal - (item.valorOriginal * faixaRent)))
					item.rentabilidade = "rent-boa";
				else {
					if (item.valorUnitario < (item.valorOriginal - (item.valorOriginal * faixaRent)))
						item.rentabilidade = "rent-ruim";
				}
			}

			return true;

		}

		function validaPedido(){

			$scope.mensagem = "";

			if ($scope.pedido.idCliente.length <= 0){
				$scope.mensagem = "Cliente não informado.";
			}			

			$scope.pedido.itens.forEach(function(item){
				console.log(item);
				if (item.rentabilidade == "rent-ruim"){
					$scope.mensagem = $scope.mensagem + "Item " + item.nome + " com rentabilidade Ruim.";
				}

				if (item.quantidade <= 0 || item.quantidade == undefined){
					$scope.mensagem = $scope.mensagem + "\nItem " + item.nome + " com quantidade inferior a Zero.";
				}

				if (item.quantidade % item.multiplo != 0){
					$scope.mensagem = $scope.mensagem + "Quantidade Item " + item.nome + " tem que ser multiplo de " + item.multiplo + ".";
				}
			});

			if ($scope.mensagem.length == 0)
				return true;
			else
				$scope.mensagem = $scope.mensagem + "Pedido não pode ser finalizado.";

		}

		$scope.adicionaItem();
		
	});