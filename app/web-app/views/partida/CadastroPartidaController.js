
'use strict'

var cadastroPartidaController = function($scope, $position, $http) {

   var vm = $scope;

   vm.partida = {};

   vm.jogadores = [];

   vm.minDate = new Date();

   vm.dateOpen = false;

   vm.openDate = function() {
      vm.dateOpen = true;
   }

   vm.salvar = function() {
      vm.partida.idJogador1 = vm.partida.idJogador1._id;
      vm.partida.idJogador2 = vm.partida.idJogador2._id;
      console.log(vm.partida);
      $http.post("http://localhost:3000/partida", vm.partida)
         .then(function onSuccess(res){
            vm.limparForm();
         }, function onError(res){

         });

   }

   vm.findJogadores = function() {
      $http.get("http://localhost:3000/jogador")
         .success(function (res){
            vm.jogadores = res;
         }).error(function(res){

         });
   }


   vm.limparForm = function() {
      vm.partida = {};
   }

   vm.findJogadores();
}

angular.module('sbAdminApp').controller('CadastroPartidaController', cadastroPartidaController);
