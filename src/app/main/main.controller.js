(function() {
  'use strict';

  angular
    .module('palomitasClient2')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(toastr, $http, lodash) {
    var vm = this;
    var api = "https://tvapi.fuken.xyz"

    vm.creationDate = 1463518051145;
    vm.showData = null;
    vm.error = null;

    activate();

    function activate(){
      $http.get(api+"/shows")
        .then(function(res){
          vm.showData = res.data.map(function(show){
            lodash.keys(show.image).forEach(function(key){
               show.image[key] = show.image[key].replace("http", "https");
            });
            return show;
          });
          vm.error = null;
        })
        .catch(function(err){
          vm.error = err;
        });
    }

  }
})();
