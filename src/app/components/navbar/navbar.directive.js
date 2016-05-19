(function() {
  'use strict';

  angular
    .module('palomitasClient2')
    .directive('navbar', navbar);

  /** @ngInject */
  function navbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, $http) {
      var vm = this;
      vm.searchRes;
      vm.search = "";
      vm.searchOmdb = searchOmdb;
      vm.parseOmdb = parseOmdb;
      
      function searchOmdb(query){
        if(!query || query.length < 2){
          return;
        }
        var url = "http://api.tvmaze.com/search/shows?q="+query;
        return $http.get(url).then(function(res){
          vm.searchRes = res.data;
          return res.data;
        })
      }
      
      function parseOmdb(obj){
        console.log("NavbarController: parsing "+angular.toJson(obj));
        if(typeof obj !== 'object'){
          return "void";
        }
        return obj.show.externals.imdb+": "+obj.show.name;
      }
      
      function normalizeArray(obj){
        if(Array.isArray(obj)){
          return obj;
        }else{
          return [obj];
        }
      }
      
    }
  }

})();
