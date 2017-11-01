angular.module('myDirectives', [])
    .directive('meuPedido', function() {

        var ddo = {};

        ddo.restrict = "AE";
        // ddo.transclude = true;


        ddo.scope = {
            pedidos: '='
        };

        ddo.templateUrl = 'js/directives/meu-pedido.html';

        return ddo;
    })
    .directive('meuBotaoPerigo', function() {
        var ddo = {};
        ddo.restrict = "E";
        ddo.scope = {
            nome: '@',
            acao : '&'
        }
        ddo.template = '<button class="btn btn-danger btn-block" ng-click="acao()">{{nome}}</button>';

        return ddo;
    });