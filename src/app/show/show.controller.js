(function(){
  'use strict';
  
  angular
    .module('palomitasClient2')
    .controller('ShowController', ShowController);
    
  /** @ngInject */
  function ShowController($stateParams, $http, $httpParamSerializer, 
                          $window, $document, $rootScope, $log,
                          lodash, torrentSocket){
    var vm     = this;
    var _      = lodash;
    var socket = torrentSocket;
    var playerUrl = "https://palomitas-player.fuken.xyz";      
    
    vm.id = $stateParams.id;
    vm.show     = {};
    vm.episodes = [];
    vm.langs    = [];
    vm.selectedSeason  = [];
    vm.selectedEpisode = {};
    vm.selectedLang    = "";
    vm.selectedTorrentIndex = 0;
    vm.torrents = [];
    vm.showMagnet = false;
    vm.loading    = false;

    vm.space = space;
    vm.setEpisode = setEpisode;    
    vm.scrollBack = scrollBack;
    vm.loadSubtitles = loadSubtitles;
    vm.getVideoLink = getVideoLink;

    activate();
    
    // PUBLIC METHODS
    
    function space(obj){
      return angular.toJson(obj, true);
    }
    
    function setEpisode(ep){
      vm.selectedEpisode = ep;
      vm.showMagnet = false;
      vm.videoUrl   = "";
      vm.subtitles  = [];

      var el = $document[0].querySelector(".episodes");
      angular.element(el).scrollLeft($window.innerWidth, 400);
    }
    
    function scrollBack(){
      var el = $document[0].querySelector(".episodes");
      angular.element(el).scrollLeft(0, 400);
    }
    
    function checkTorrentDownloaded(hash){
      return vm.torrents.filter(function(elem){
        return elem.infoHash === hash;
      }).length > 0;
    }

    function getVideoLink(){
      vm.loading  = true;
      vm.videoUrl = "";
      
      var link = vm.selectedEpisode.torrents[vm.selectedTorrentIndex].url;
      var postUrl  = playerUrl+"/torrents";
      var postData = {link: link};

      $http.post(postUrl, postData).then(function(res){
        return res.data.infoHash;
      }).then(onLinkPosted);

      function onLinkPosted(hash){
        if(checkTorrentDownloaded(hash)){
          onLinkReady(hash);          
        }else{
          socket.once('interested', onLinkReady);
        }
      }

      function onLinkReady(hash){
        $log.debug("ShowController: torrent link listo");
        var torrentUrl = playerUrl+"/torrents/"+hash+"/";
        $http.get(torrentUrl).then(function(res){
          var files = res.data.files;
          var biggestFile = files.reduce(function(prev, next){
            return prev.length > next.length ? prev : next;
          });
          vm.loading = false;
          vm.videoUrl = playerUrl+biggestFile.link;
        })
      }
    }

    function loadSubtitles(episode){
      vm.langs = $rootScope.langs;
      var api = "https://sub-down.fuken.xyz";
      var url = api+"/search?"+$httpParamSerializer({
        imdbid: vm.id,
        season: episode.season,
        episode: episode.episode
      });

      vm.loading   = true;
      vm.subtitles = [];
      $http.get(url).then(function onSubtitles(res) {
        vm.subtitles = res.data;
        vm.loading = false;
      })
    }

    // PRIVATE METHODS
    
    function activate(){
      var api = "https://api-fetch.website/tv/";
      var showUrl = api+"/show/"+vm.id;
      $http.get(showUrl).then(function(res){
        vm.show = res.data;
        vm.episodes = getEpisodes(res.data);
        vm.selectedSeason = vm.episodes[0].episodes;
        vm.selectedEpisode = vm.selectedSeason[0];
      });
      
      var torrentsUrl = playerUrl+"/torrents";
      $http.get(torrentsUrl).then(function(res){
        vm.torrents = res.data;
      });
      
      socket.once('connect', function(){
        $log.debug("ShowController: conectado a socket.io");
      });

      if(typeof Storage !== "undefined"){
        var shows = [];
        if(localStorage.palomitas_lastShows){
          shows = localStorage.palomitas_lastShows.split(",");
        }
        var found_index = shows.indexOf(vm.id);
        if(found_index !== -1){
          shows.splice(found_index, 1);
        }
        shows.unshift(vm.id);
        if(shows.length > 4){
          shows.pop();
        }
        localStorage.palomitas_lastShows = shows;
      }else{
        $log.debug("localStorage not supported :c");
      }
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
