angular.module('mpedidos')
	.controller('PedidoController', function($scope , $routeParams, buscaPedidos, cadastroDePedidos, buscaItens, buscaClientes) {


		$scope.pedido = {};
		$scope.pedido.cliente = {};
		$scope.pedido.itens   = [];
		$scope.mensagem = '';

		$scope.address = {};

		var faixaRent = 0.1;

		buscaItens.query(function(items) {
			$scope.items = items;
		});

		buscaClientes.query(function(customers) {
			$scope.customers = customers;
		});

		if($routeParams.pedidoId) {
			buscaPedidos.get({orderId: $routeParams.pedidoId}, function(pedido) {

				$scope.pedido = pedido;
				
				$scope.pedido.itens.forEach(function(item){
					$scope.validaMargemItem(item);
				})
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

			$scope.pedido.itens.push({_id: idItem, item: {}, valorUnitario: 0, quantidade: 0, valorTotal: 0, rentabilidade: 'rent-clear'});

			$scope.somaPedido();
		}

		$scope.submeter = function() {

			$scope.somaPedido();

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

		    $scope.somaPedido();

		}

		$scope.atualizaValorItem = function(item){
			item.valorTotal = item.valorUnitario * item.quantidade;

			$scope.validaMargemItem(item);

			$scope.somaPedido();
		}				

		$scope.buscaItem = function(itemPed){
			console.log(itemPed);

			itemPed.valorUnitario = itemPed.item.preco;
			itemPed.item.multiplo = itemPed.item.multiplo || 1
			itemPed.quantidade = itemPed.item.multiplo;

			$scope.atualizaValorItem(itemPed);

			$scope.somaPedido();
		}

		$scope.somaPedido = function(){
			var soma = $scope.pedido.itens.reduce(function (somatorio, valor) {
		        return somatorio + parseFloat(valor.valorTotal);
		    },0);

			$scope.pedido.valor = soma;
		}

		$scope.validaMargemItem = function(item){
			if (item.valorUnitario > item.item.preco)
				item.rentabilidade = 'rent-great';
			else {
				if (item.valorUnitario >= (item.item.preco - (item.item.preco * faixaRent)))
					item.rentabilidade = "rent-good";
				else {
					if (item.valorUnitario < (item.item.preco - (item.item.preco * faixaRent)))
						item.rentabilidade = "rent-bad";
				}
			}

			return true;

		}

		function validaPedido(){

			console.log($scope.pedido);

			$scope.mensagem = "";

			if (!$scope.pedido.cliente){
				$scope.mensagem = "Cliente não informado.";
			}		

			if ($scope.formulario.dataPedido.$invalid || !$scope.pedido.dataPedido){
				$scope.mensagem = "Data Inválida.";
			}			

			$scope.pedido.itens.forEach(function(item){

				if (!item){

				}

				if (item.rentabilidade == "rent-bad"){
					$scope.mensagem = $scope.mensagem + "Item " + item.item.nome + " com rentabilidade Ruim.";
				}

				if (item.quantidade <= 0 || item.quantidade == undefined){
					$scope.mensagem = $scope.mensagem + "\nItem " + item.item.nome + " com quantidade inferior a Zero.";
				}

				if (item.quantidade % item.item.multiplo != 0){
					$scope.mensagem = $scope.mensagem + "Quantidade Item " + item.item.nome + " tem que ser multiplo de " + item.item.multiplo + ".";
				}
			});

			if ($scope.mensagem.length == 0)
				return true;
			else
				$scope.mensagem = $scope.mensagem + "Pedido não pode ser finalizado.";

		}

		$scope.adicionaItem();
		
	});