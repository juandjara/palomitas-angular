(function () {
  'use strict';

  angular
    .module('palomitasClient2')
    .component('spinner', spinner());

  function spinner() {
    return {
      templateUrl: 'app/components/spinner/spinner.html'
    }
  } 

} ());