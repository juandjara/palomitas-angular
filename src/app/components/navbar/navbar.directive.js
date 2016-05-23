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
        var url = "https://tvapi.fuken.xyz"
        url += "/search/shows?q="+query;
        return $http.get(url).then(function(res){
          vm.searchRes = res.data;
          return res.data;
        })
      }
      
      function parseOmdb(obj){
        if(!angular.isObject(obj) ||
           !obj.show || 
           !obj.show.externals || 
           !obj.show.externals.imdb){
          return null;
        }
        return /*obj.show.externals.imdb+": "+*/ obj.show.name;
      }
      
    }
  }

})();
