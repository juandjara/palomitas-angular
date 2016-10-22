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
      vm.langs = $rootScope.langs;
      vm.loading   = true;
      vm.subtitles = [];

      ShowService.getSubtitles(vm.id, episode)
      .then(function onSubtitles(subs) {
        vm.subtitles = subs;
        vm.loading = false;
      });
    }

    function activate(){
      vm.show.loading = true;
      ShowService.getPopcornShow(vm.id).then(function(show){
        vm.show = show;
        vm.show.loading = false;
        vm.episodes = show.parsedEpisodes;
        vm.selectedSeason = vm.episodes[0].episodes;
        vm.selectedEpisode = vm.selectedSeason[0];
      });
      ShowService.getTorrents().then(function(torrents){
        vm.torrents = torrents;
      });
      ShowService.setLastWatched(vm.id);

      socket.once('connect', function(){
        $log.debug("ShowController: conectado a socket.io");
      });
    }

  }
})();
