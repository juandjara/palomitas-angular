(function(){
  'use strict';
  
  angular
    .module('palomitasClient2')
    .controller('ShowController', ShowController);
    
  /** @ngInject */
  function ShowController($stateParams, $http, lodash){
    var vm = this;
    var _  = lodash;
    
    vm.id = $stateParams.id;
    vm.show;
    vm.episodes  = [];
    vm.selection = [];
    vm.currentEpisode;
    
    vm.space  = space;
    vm.arrify = arrify;
    
    activate();
    
    // PUBLIC METHODS
    
    function space(obj){
      return angular.toJson(obj, true);
    }
    
    function arrify(obj){
      var arr = [];
      angular.forEach(obj, function iterateObj(val, key){
        arr.push({key: key, val: val});
      });
      return arr;
    }
    
    // PRIVATE METHODS
    
    function activate(){
      var api = "https://api-fetch.website/tv/";
      var url = api+"/show/"+vm.id;
      $http.get(url).then(function(res){
        vm.show = res.data;
        vm.episodes = getEpisodes(res.data);
        vm.selection = vm.episodes[0].episodes;
        vm.currentEpisode = vm.selection[0];
      })
    }
    
    function getEpisodes(show){
      var eps = show.episodes;
      var grouped = _.groupBy(eps, 'season');
      var moreGrouped = Object.keys(grouped).map(function(index){
        var season = grouped[index];
        var sortedSeason = _.sortBy(season, 'episode');
        return { number: sortedSeason[0].season, episodes: sortedSeason };
      });
      return moreGrouped;
    }
    
    
    
  }
  
})();