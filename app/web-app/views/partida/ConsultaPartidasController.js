
'use strict'

var consultaPartidasController = function($scope, $position, $http, APP_CONFIG) {

   var vm = $scope;

   vm.partidas = {};

   vm.findPartidas = function() {
      $http.get(APP_CONFIG.REST_BASE_URL + "/partida")
         .success(function (res){
            vm.partidas = res;
         }).error(function(res){

         });
   }

   vm.findPartidas();
}

angular.module('sbAdminApp').controller('ConsultaPartidasController', consultaPartidasController);
