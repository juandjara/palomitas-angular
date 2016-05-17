(function(){
  'use strict';
  
  angular
    .module('palomitasClient2')
    .controller('ShowController', ShowController);
    
  /** @ngInject */
  function ShowController($stateParams){
    var vm = this;
    vm.id = $stateParams.id;
  }
  
})();