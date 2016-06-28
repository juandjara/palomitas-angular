(function() {
  'use strict';

  angular
    .module('palomitasClient2')
    .component('navbar', navbar());

  /** @ngInject */
  function navbar() {
    var component = {
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm'
    };

    return component;

    /** @ngInject */
    function NavbarController($http) {
      var vm = this;
      vm.searchRes;
      vm.searchText = "";
      vm.search = search;
      vm.parseSearch = parseSearch;
      
      function search(query){
        if(!query || query.length < 2){
          return;
        }
        var url = "https://tvapi.fuken.xyz"
        url += "/search?query="+query;
        return $http.get(url).then(function(res){
          vm.searchRes = res.data;
          return res.data;
        })
      }
      
      function parseSearch(obj){
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
