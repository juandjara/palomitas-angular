(function(){
  'use strict';

  angular
    .module('palomitasClient2')
    .controller('ShowController', ShowController);

  /** @ngInject */
  function ShowController($stateParams, $window, $document, $rootScope, $log,
                          torrentSocket, ShowService){
    var vm     = this;
    var socket = torrentSocket;

    vm.id = $stateParams.id;
    vm.show      = {};
    vm.episodes  = [];
    vm.langs     = [];
    vm.subtitles = null;
    vm.selectedSeason  = [];
    vm.selectedEpisode = {};
    vm.selectedLang    = "es";
    vm.selectedTorrentIndex = 0;
    vm.torrents = [];
    vm.showMagnet = false;
    vm.loading    = false;

    vm.space = space;
    vm.areSubsLoaded = areSubsLoaded;
    vm.setEpisode = setEpisode;
    vm.scrollBack = scrollBack;
    vm.loadSubtitles = loadSubtitles;
    vm.getVideoLink = getVideoLink;

    activate();

    function space(obj){
      return angular.toJson(obj, true);
    }

    function areSubsLoaded(){
      return angular.isObject(vm.subtitles);
    }

    function setEpisode(ep){
      vm.selectedEpisode = ep;
      vm.showMagnet = false;
      vm.videoUrl   = "";
      loadSubtitles(ep);

      var el = $document[0].querySelector(".episodes");
      angular.element(el).scrollLeft($window.innerWidth, 400);
    }

    function scrollBack(){
      var el = $document[0].querySelector(".episodes");
      angular.element(el).scrollLeft(0, 400);
    }

    function getVideoLink(){
      vm.loading  = true;
      vm.videoUrl = "";

      var link = vm.selectedEpisode.torrents[vm.selectedTorrentIndex].url;
      ShowService.getVideoLink(vm.torrents, link)
      .then(function(videourl){
        vm.loading = false;
        vm.videoUrl = videourl;
      });
    }

    function loadSubtitles(episode){
      vm.loading   = true;
      vm.subtitles = null;

      ShowService.getSubtitles(vm.id, episode)
      .then(function onSubtitles(subs) {
        vm.subtitles = subs;
        vm.loading = false;
      });
    }

    function activate(){
      vm.show.loading = true;
      ShowService.getPopcornShow(vm.id)
      .catch(function(err){
        vm.show.loading = false;
        vm.show.error = err;
        throw new Error(err);
      })
      .then(function(show){
        vm.show = show;
        vm.show.loading = false;
        vm.episodes = show.parsedEpisodes;
        vm.selectedSeason = vm.episodes[0].episodes;
        vm.selectedEpisode = vm.selectedSeason[0];
        loadSubtitles(vm.selectedEpisode);
      });
      ShowService.getTorrents().then(function(torrents){
        vm.torrents = torrents;
      });
      ShowService.setLastWatched(vm.id);
      var off = $rootScope.$on("langsLoaded", function(ev, langs) {
        vm.langs = langs;
      });
      vm.$onDestroy = function() { off(); }
      socket.once('connect', function(){
        $log.debug("ShowController: conectado a socket.io");
      });
    }

  }
})();
