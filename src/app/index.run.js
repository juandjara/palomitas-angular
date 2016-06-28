(function() {
  'use strict';

  angular
    .module('palomitasClient2')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $http, $rootScope) {
    $log.debug('Palomitas V2');
    var api = "https://sub-down.fuken.xyz";
    var url = api+"/weblangs.json";
    $http.get(url).then(function(res){
      $rootScope.langs = res.data;
    });
  }

})();
