
'use strict'

var registraResultadoPartidaController = function($scope, $position, $http, $state, $stateParams, APP_CONFIG) {

   var vm = $scope;

   vm.partida = {};

   vm.numeroVencedor = 0;

   vm.findPartidaById = function(idP) {
      $http.get(APP_CONFIG.REST_BASE_URL + "/partida/"+idP)
      .success(function(res){
         vm.partida = res[0];
         if(vm.partida.finalizada){
            switch (vm.partida.idVencedor) {
               case vm.partida.idJogador1._id:
                  vm.numeroVencedor = 1;
                  break;
               case vm.partida.idJogador2._id:
                  vm.numeroVencedor = 2;
                  break;
               default:
                  vm.numeroVencedor = 0;
            }
         }
      }).error(function(res){

      });
   }

   if($stateParams.idPartida) {
      vm.idPartida = $stateParams.idPartida;
      vm.findPartidaById(vm.idPartida);
      console.log("COM PARAM");
   }else{
      $state.go('dashboard.consulta-partidas');
      console.log("SEM PARAM");
   }

   vm.salvar = function() {
      console.log(vm.numeroVencedor);
      if(vm.numeroVencedor != 0
         && vm.numeroVencedor != 1
         && vm.numeroVencedor != 2) {
            return;
         }

      var requestParam = {
         idPartida: vm.partida._id,
         numeroVencedor: vm.numeroVencedor
      }

      $http.post(APP_CONFIG.REST_BASE_URL + "/partida/registrar/resultado", requestParam)
      .success(function(res){
         $state.go('dashboard.consulta-partidas');
      }).error(function(res){
         vm.requiredMessage = res.requiredMessage
      });

   }
}

angular.module('sbAdminApp').controller('RegistraResultadoPartidaController', registraResultadoPartidaController);
