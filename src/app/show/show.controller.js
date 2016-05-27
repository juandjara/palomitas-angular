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
    vm.space = space;
    
    activate();
    
    function activate(){
      var api = "https://api-fetch.website/tv/";
      var url = api+"/show/"+vm.id;
      $http.get(url).then(function(res){
        vm.show = res.data;
        vm.episodes = getEpisodes(res.data);
        vm.selection = vm.episodes[0];
      })
    }
    
    function getEpisodes(show){
      var eps = show.episodes;
      var grouped = _.groupBy(eps, 'season');
      var moreGrouped = Object.keys(grouped).map(function(index){
        var season        = grouped[index];
        return _.sortBy(season, 'episode');
      });
      return moreGrouped;
    }
    
    function space(obj){
      return angular.toJson(obj, true);
    }
    
  }
  
})();