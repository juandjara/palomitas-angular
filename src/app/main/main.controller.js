(function() {
  'use strict';

  angular
    .module('palomitasClient2')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(toastr) {
    var vm = this;

    vm.creationDate = 1463518051145;
    vm.showToastr = showToastr;

    activate();

    function activate() {
      
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    }

  }
})();
