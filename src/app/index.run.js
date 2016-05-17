(function() {
  'use strict';

  angular
    .module('palomitasClient2')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
