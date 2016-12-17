'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'ngSanitize',
    'ui.select',
    'ui.utils.masks',
    'ngMaterial',
    'angular-toasty'

  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

   //  ANGULAR MATERIAL THEME AND DATE CONFIG
    var configTheme = function($mdThemingProvider){
      // Update the theme colors to use themes on font-icons
      $mdThemingProvider.theme('default')
      .primaryPalette("blue")
      .warnPalette('red');
   };

   // TOASTY CONFIG
	angular.module('sbAdminApp').config(['toastyConfigProvider', function(toastyConfigProvider) {
		toastyConfigProvider.setConfig({
			sound: false,
			shake: false,
			clickToClose: true,
			timeout: 10000,
			html: true
		});
	}]);

   var configDateFormat = function($mdDateLocaleProvider) {
      $mdDateLocaleProvider.formatDate = function(date) {
         var m = moment(date);
         return m.isValid() ? m.format('DD/MM/YYYY') : null;
      };
   };

   angular.module('sbAdminApp').config(configTheme);
   angular.module('sbAdminApp').config(configDateFormat);

    $urlRouterProvider.otherwise('/dashboard/ranking');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($$animateJs,$ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.ranking',{
        url:'/ranking',
        controller: 'RankingController',
        templateUrl:'views/ranking/ranking.html',
        resolve: {
          loadMyFiles:function($$animateJs, $ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/main.js',
              'views/ranking/RankingController.js',
              'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.cadastro-jogador',{
        url:'/cadastro-jogador',
        params: {
           idJog: null
        },
        controller: 'CadastroJogadorController',
        templateUrl:'views/jogador/cadastro-jogador.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/main.js',
              'views/jogador/CadastroJogadorController.js',
              ]
            })
          }
        }
    })
      .state('dashboard.cadastro-partida',{
        url:'/cadastro-partida',
        controller: 'CadastroPartidaController',
        templateUrl:'views/partida/cadastro-partida.html',
        resolve: {
          loadMyFiles:function($$animateJs, $ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/main.js',
              'bower_components/angular-toasty/dist/angular-toasty.min.css',
              'bower_components/angular-toasty/dist/angular-toasty.min.js',
              'views/partida/CadastroPartidaController.js'
              ]
           })
           $ocLazyLoad.load(
           {
             name:'ngAnimate',
             files:['bower_components/angular-animate/angular-animate.js']
           })
           $ocLazyLoad.load(
           {
             name:'ngAria',
             files:['bower_components/angular-aria/angular-aria.js']
           })
           $ocLazyLoad.load(
           {
             name:'ngMessages',
             files:['bower_components/angular-messages/angular-messages.js']
           })
           $ocLazyLoad.load(
           {
             name:'ngMaterial',
             files:['bower_components/angular-material/angular-material.js']
           })
           $ocLazyLoad.load(
           {
             name:'angular-toasty',
             files:['bower_components/angular-toasty/dist/angular-toasty.min.js',
                     'bower_components/angular-toasty/dist/angular-toasty.min.css'
               ]
           })
          }
        }
    })
      .state('dashboard.registra-resultado-partida',{
        url:'/registra-resultado-partida',
        params: {
               idPartida: null
        },
        controller: 'RegistraResultadoPartidaController',
        templateUrl:'views/partida/registra-resultado-partida.html',
        resolve: {
          loadMyFiles:function($$animateJs, $ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/main.js',
              'bower_components/angular-toasty/dist/angular-toasty.min.css',
              'bower_components/angular-toasty/dist/angular-toasty.min.js',
              'views/partida/RegistraResultadoPartidaController.js'
              ]
           })
           $ocLazyLoad.load(
           {
             name:'ngAnimate',
             files:['bower_components/angular-animate/angular-animate.js']
           })
           $ocLazyLoad.load(
           {
             name:'ngAria',
             files:['bower_components/angular-aria/angular-aria.js']
           })
           $ocLazyLoad.load(
           {
             name:'ngMessages',
             files:['bower_components/angular-messages/angular-messages.js']
           })
           $ocLazyLoad.load(
           {
             name:'ngMaterial',
             files:['bower_components/angular-material/angular-material.js']
           })
           $ocLazyLoad.load(
           {
             name:'angular-toasty',
             files:['bower_components/angular-toasty/dist/angular-toasty.min.js',
                     'bower_components/angular-toasty/dist/angular-toasty.min.css'
               ]
           })
          }
        }
    })
    .state('dashboard.consulta-partidas',{
     url:'/consulta-partidas',
     controller: 'ConsultaPartidasController',
     templateUrl:'views/partida/consulta-partidas.html',
     resolve: {
        loadMyFiles:function($$animateJs, $ocLazyLoad) {
          return $ocLazyLoad.load({
            name:'sbAdminApp',
            files:[
            'scripts/controllers/main.js',
            'views/partida/ConsultaPartidasController.js',
            ]
          })
        }
     }
    })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:'views/pages/blank.html',
        url:'/blank'
    })
      .state('login',{
        templateUrl:'views/pages/login.html',
        url:'/login'
    })
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/chartContoller.js']
            })
          }
        }
    })
      .state('dashboard.table',{
        templateUrl:'views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:'views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'views/ui-elements/grid.html',
       url:'/grid'
   })
  }]);
