/* globals io:false */
(function() {
'use strict';

  angular
    .module('palomitasClient2')
    .factory('torrentSocket', torrentSocket);

  /* @ngInject  */
  function torrentSocket(socketFactory) {
    var socketUrl = "https://palomitas-dl.fuken.xyz:443";
    var socket = io.connect(socketUrl);

    return socketFactory({
      ioSocket: socket
    });
  }
})();
