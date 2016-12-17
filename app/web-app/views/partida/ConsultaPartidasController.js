
'use strict'

var consultaPartidasController = function($scope, $position, $http) {

   var vm = $scope;

   vm.partidas = {};

   vm.findPartidas = function() {
      $http.get("https://labtrab2.herokuapp.com/partida")
         .success(function (res){
            vm.partidas = res;
         }).error(function(res){

         });
   }

   vm.findPartidas();
}

angular.module('sbAdminApp').controller('ConsultaPartidasController', consultaPartidasController);
