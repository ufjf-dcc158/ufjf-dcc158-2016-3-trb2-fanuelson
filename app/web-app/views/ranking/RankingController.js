'use strict';

var rankingController = function($scope,$position, $http, APP_CONFIG) {

   var vm = $scope;

   vm.jogadores = {};

   console.log(APP_CONFIG.REST_BASE_URL);

   $http.get(APP_CONFIG.REST_BASE_URL + "/jogador/top100")
      .success(function(res){
         vm.jogadores = res;
      }).error(function(res){

      });
}

angular.module('sbAdminApp').controller('RankingController', rankingController);
