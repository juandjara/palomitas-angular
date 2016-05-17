(function() {
  'use strict';

  angular
    .module('palomitasClient2')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('show_detail', {
        url:'/show/:id',
        templateUrl: 'app/show/detail.html',
        controller: 'ShowController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
