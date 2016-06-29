(function(){
  'use strict';
  
  angular
    .module('palomitasClient2')
    .controller('ShowController', ShowController);
    
  /** @ngInject */
  function ShowController($stateParams, $http, $httpParamSerializer, lodash, $window, $rootScope){
    var vm = this;
    var _  = lodash;
    
    vm.id = $stateParams.id;
    vm.show     = {};
    vm.episodes = [];
    vm.langs    = [];
    vm.selectedSeason  = [];
    vm.selectedEpisode = {};
    vm.selectedLang    = "";

    vm.space = space;
    vm.setEpisode = setEpisode;    
    vm.scrollBack = scrollBack;
    vm.loadSubtitles = loadSubtitles;

    activate();
    
    // PUBLIC METHODS
    
    function space(obj){
      return angular.toJson(obj, true);
    }
    
    function setEpisode(ep){
      vm.selectedEpisode = ep;
      var el = document.querySelector(".episodes");
      angular.element(el).scrollLeft($window.innerWidth, 400);
    }
    
    function scrollBack(){
      var el = document.querySelector(".episodes");
      angular.element(el).scrollLeft(0, 400);
    }
    
    function loadSubtitles(episode){
      vm.langs = $rootScope.langs;
      var api = "https://sub-down.fuken.xyz";
      var url = api+"/search?"+$httpParamSerializer({
        imdbid: vm.id,
        season: episode.season,
        episode: episode.episode
      });

      $http.get(url).then(function onSubtitles(res) {
        vm.subtitles = res.data;
      })
    }

    // PRIVATE METHODS
    
    function activate(){
      var api = "https://api-fetch.website/tv/";
      var url = api+"/show/"+vm.id;
      $http.get(url).then(function(res){
        vm.show = res.data;
        vm.episodes = getEpisodes(res.data);
        vm.selectedSeason = vm.episodes[0].episodes;
        vm.selectedEpisode = vm.selectedSeason[0];
      });
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