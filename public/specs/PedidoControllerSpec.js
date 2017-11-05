describe("PedidoController", function() {


    var $scope = {};
    var mockPedidos = {
        cliente: {
            _id: 4,
            nome: "Imperador Palpatine"
        },
        dataPedido: Date("01/11/2017"),
        valor: 0,
        itens: [{
                    _id: 1,
                    item: {
                        _id: 3,
                        nome: "Super Star Destroyer",
                        preco: 4570000,
                        multiplo: 1
                    },
                    valorUnitario: 4579000,
                    quantidade: 2,
                    valorTotal: 0,
                    rentabilidade: ""
                },
                {
                    _id: 2,
                    item: {
                        _id: 1,
                        nome: "Millenium Falcon",
                        preco: 550000,
                        multiplo: 1
                    },
                    valorUnitario: 550000,
                    quantidade: 4,
                    valorTotal: 0,
                    rentabilidade: ""
                }
        ]
    };


    beforeEach(function(){
        angular.mock.module("mpedidos");
             
        angular.mock.inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();

            $controller("PedidoController", {
                $scope : $scope
            });

            $scope.pedido = mockPedidos;
        });
    });


    it("Soma o valor do Pedido ", function() {

        $scope.pedido.itens.forEach(function(item){
            $scope.atualizaValorItem(item);
        });

        expect($scope.pedido.valor).toBe(11358000);
    });

    it("Calcula Rentabilidade dos Itens ", function() {

        $scope.pedido.itens.forEach(function(item){
            $scope.validaMargemItem(item);
        });

        expect($scope.pedido.itens[0].rentabilidade).toBe("rent-great");
        expect($scope.pedido.itens[1].rentabilidade).toBe("rent-good");
    });

  
    

});