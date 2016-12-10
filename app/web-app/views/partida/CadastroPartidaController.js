
'use strict'

var cadastroPartidaController = function($scope, $position, $http, toasty) {

   var vm = $scope;

   vm.partida = {};

   vm.jogadores = [];

   vm.minDate = new Date();

   toasty.error({
      title: 'ERRO!',
      msg: "FUNCIONOU?"
   });

   vm.salvar = function() {
      vm.partida.idJogador1 = vm.partida.idJogador1._id;
      vm.partida.idJogador2 = vm.partida.idJogador2._id;
      console.log(vm.partida);
      $http.post("http://localhost:3000/partida", vm.partida)
      .success(function(res){
         vm.limparForm();
         toasty.success({
            title: 'OK!',
            msg: "Registro Salvo com sucesso!"
         });
      }).error(function(res){
         console.log(res);
         toasty.error({
            title: 'ERRO!',
            msg: res.requiredMessage
         });
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
