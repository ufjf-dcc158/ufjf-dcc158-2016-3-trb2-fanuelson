
'use strict'

var cadastroPartidaController = function($scope, $position, $http, toasty) {

   var vm = $scope;

   vm.partida = {
      data: new Date()
   };

   vm.jogadores = [];

   vm.jogadores2 = [];

   vm.minDate = new Date();

   toasty.error({
      title: 'ERRO!',
      msg: "FUNCIONOU?"
   });

   vm.salvar = function() {
      if(!vm.partida.idJogador1){
         vm.requiredMessage = "Informe o jogador 1";
         return;
      }
      if(!vm.partida.idJogador2){
         vm.requiredMessage = "Informe o jogador 2";
         return;
      }
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
         vm.requiredMessage = res.requiredMessage
      });

   }

   vm.onSelectPlayer1 = function (item, model){
      $http.get("http://localhost:3000/jogador")
      .success(function (res){
         vm.jogadores = res;
         vm.jogadores2 = vm.jogadores.slice(0, vm.jogadores.length);
         removeJogador(item, vm.jogadores2);
         if(vm.partida.idJogador2 && vm.partida.idJogador2._id===item._id) {
            vm.partida.idJogador2 = null;
         }
      }).error(function(res){

      });
   };

   vm.onSelectPlayer2 = function (item, model){
      $http.get("http://localhost:3000/jogador")
      .success(function (res){
        vm.jogadores = res;
        vm.jogadores2 = vm.jogadores.slice(0, vm.jogadores.length);
        removeJogador(item, vm.jogadores);
        if(vm.partida.idJogador1 && vm.partida.idJogador1._id===item._id) {
            vm.partida.idJogador1 = null;
        }
      }).error(function(res){

      });
  };

  var removeJogador = function(jog, lista) {
     for (var i = 0; i < lista.length; i++) {
        if(lista[i]._id === jog._id) {
           lista.splice(i, 1);
           i--;
        }
     }
  }

   vm.findJogadores = function() {
      $http.get("http://localhost:3000/jogador")
      .success(function (res){
         vm.jogadores = res;
         vm.jogadores2 = vm.jogadores.slice(0, vm.jogadores.length);
      }).error(function(res){

      });
   }


   vm.limparForm = function() {
      vm.partida = {};
   }

   vm.findJogadores();
}

var deps = [
   '$scope',
   '$position',
   '$http',
   'toasty',
   cadastroPartidaController
]

angular.module('sbAdminApp').controller('CadastroPartidaController', deps);
