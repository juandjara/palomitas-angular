(function() {
  'use strict';

  angular
    .module('palomitasClient2')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(toastr, $http) {
    var vm = this;
    var api = "https://api-fetch.website/tv"

    vm.creationDate = 1463518051145;
    vm.showData = null;
    vm.error = null;

    vm.showToastr = showToastr;
    vm.showlist = function(){};

    activate();

    function activate(){
      $http.get(api+"/shows/1?sort=trending")
        .then(function(res){
          vm.showData = res.data;
          vm.error = null;
        })
        .catch(function(err){
          vm.error = err;
        });
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    }

  }
})();
