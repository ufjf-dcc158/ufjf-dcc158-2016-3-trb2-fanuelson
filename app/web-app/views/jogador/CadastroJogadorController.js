
'use strict'

var cadastroJogadorController = function($scope,$position, $http) {

   var vm = $scope;

   vm.jogador = {
      "qtdVitorias": 0,
      "qtdDerrotas": 0,
      "qtdEmpates": 0,
      "elo": 1500,
   }

   vm.salvar = function() {

      $http.post("http://localhost:3000/jogador", vm.jogador)
         .success(function(res){
            vm.limparForm();
         }).error( function (res){

         });

   }

   vm.limparForm = function() {
      vm.jogador.nome = null;
   }
}

angular.module('sbAdminApp').controller('CadastroJogadorController', cadastroJogadorController);
