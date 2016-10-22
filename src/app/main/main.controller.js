(function() {
  'use strict';

  angular
    .module('palomitasClient2')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(ShowService) {
    var vm = this;

    vm.creationDate = 1463518051145; // Mayo 2016
    vm.showData = null;
    vm.error = null;

    activate();

    function activate(){
      ShowService.getTvapiList()
      .then(function(shows){
        vm.showData = shows;
        vm.error = null;
      })
      .catch(function(err){
        vm.error = err;
        err.error = true;
      });
      ShowService.getLastWatched()
      .then(function(results){
        vm.lastShows = results;
      });
    }

  }
})();
