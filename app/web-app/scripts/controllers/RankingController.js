'use strict';

var rankingController = function($scope,$position, $http) {

   var vm = $scope;

   vm.jogadores = {};

   $http.get("http://localhost:3000/jogador/top100")
      .success(function(res){
         vm.jogadores = res;
      }).error(function(res){

      });
}

angular.module('sbAdminApp').controller('RankingController', rankingController);
