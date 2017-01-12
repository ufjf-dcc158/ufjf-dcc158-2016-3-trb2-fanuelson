
'use strict'

var cadastroJogadorController = function($scope,$position, $http, $stateParams, APP_CONFIG) {

   var vm = $scope;

   if($stateParams.idJog) {
      $http.get(APP_CONFIG.REST_BASE_URL + "/jogador/" + $stateParams.idJog)
         .success(function(res){
            vm.jogador = res;
         }).error( function (res){

         });
   }else{
      vm.jogador = {
         "qtdVitorias": 0,
         "qtdDerrotas": 0,
         "qtdEmpates": 0,
         "elo": 1500,
      }
   }


   vm.salvar = function() {
      var $promiseSalvar ;
      if(vm.jogador._id) {
         $promiseSalvar = $http.put(APP_CONFIG.REST_BASE_URL + "/jogador", vm.jogador);
      }else {
         $promiseSalvar = $http.post(APP_CONFIG.REST_BASE_URL + "/jogador", vm.jogador);
      }

      $promiseSalvar.success(function(res){
         vm.limparForm();
      }).error( function (res){

      });

   }

   vm.limparForm = function() {
      vm.jogador.nome = null;
   }
}

angular.module('sbAdminApp').controller('CadastroJogadorController', cadastroJogadorController);
