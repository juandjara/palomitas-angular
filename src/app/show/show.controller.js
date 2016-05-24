(function(){
  'use strict';
  
  angular
    .module('palomitasClient2')
    .controller('ShowController', ShowController);
    
  /** @ngInject */
  function ShowController($stateParams, $http){
    var vm = this;
    vm.id = $stateParams.id;
    vm.show;
    
    activate();
    
    function activate(){
      var api = "https://api-fetch.website/tv/";
      var url = api+"/show/"+vm.id;
      $http.get(url).then(function(res){
        vm.show = res.data;
      })
    }
    
  }
  
})();