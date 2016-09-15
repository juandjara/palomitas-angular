(function() {
  'use strict';

  angular
    .module('palomitasClient2')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(toastr, $http, $q, lodash) {
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
        return vm.showData;
      })
      .catch(function(err){
        vm.error = err;
        err.error = true;
        return err;
      });

      if(typeof Storage !== "undefined" && localStorage.palomitas_lastShows){
        var showIds = localStorage.palomitas_lastShows.split(",");
        var promises = [];

        showIds.forEach(function(id){
          var api = "http://api.tvmaze.com/";
          var showUrl = api+"lookup/shows?imdb="+id;
          var promise = $http.get(showUrl).then(function(res){
            var show = res.data;
            lodash.keys(show.image).forEach(function(key){
              show.image[key] = show.image[key].replace("http", "https");
            });
            return show;
          });
          promises.push(promise);
        });

        $q.all(promises).then(function(results){
          vm.lastShows = results;
        });
      }
    }

  }
})();
