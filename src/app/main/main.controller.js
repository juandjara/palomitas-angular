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
          vm.showData = res.data.map(function(elem){
            elem.show.image = lodash.keys(elem.show.image).map(function(key){
               elem.show.image[key] = elem.show.image[key].replace("http", "https");
            });
            return elem;
          });
          vm.error = null;
        })
        .catch(function(err){
          vm.error = err;
        });
    }

  }
})();
