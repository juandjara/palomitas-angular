(function() {
'use strict';

  angular
    .module('palomitasClient2')
    .factory('ShowService', ShowService);

  /* @ngInject */
  function ShowService($http, $httpParamSerializer, $q, $log,
                       torrentSocket, lodash) {
    var playerUrl = "https://palomitas-dl.fuken.xyz";
    var service = {
      getPopcornShow: getPopcornShow,
      getTorrents: getTorrents,
      setLastWatched: setLastWatched,
      getSubtitles: getSubtitles,
      getVideoLink: getVideoLink,
      postMagnet: postMagnet
    };

    return service;

    ////////////////
    function getEpisodes(show){
      var eps = show.episodes.filter(function(elem){
        return elem.torrents[0].url;
      });
      var grouped = lodash.groupBy(eps, 'season');
      var moreGrouped = lodash.keys(grouped).map(function(index){
        var season = grouped[index];
        var sortedSeason = lodash.sortBy(season, 'episode');
        return { number: sortedSeason[0].season, episodes: sortedSeason };
      });
      return moreGrouped;
    }

    function getPopcornShow(imdbId){
      var api = "https://anticorsproxy.herokuapp.com/https://popcorntime.ws/api/eztv/";
      var showUrl = api+"/show/"+imdbId;
      return $http.get(showUrl).then(function(res){
        var show = res.data;
        show.parsedEpisodes = getEpisodes(show);
        return show;
      });
    }

    function getTorrents(){
      var url = playerUrl+"/torrents";
      return $http.get(url).then(function(res){
        return res.data;
      });
    }

    function setLastWatched(imdbId){
      if(typeof Storage !== "undefined"){
        var shows = [];
        if(localStorage.palomitas_lastShows){
          shows = localStorage.palomitas_lastShows.split(",");
        }
        var found_index = shows.indexOf(imdbId);
        if(found_index !== -1){
          shows.splice(found_index, 1);
        }
        shows.unshift(imdbId);
        if(shows.length > 4){
          shows.pop();
        }
        localStorage.palomitas_lastShows = shows;
      }else{
        $log.debug("localStorage not supported :c");
      }
    }

    function getSubtitles(imdbId, episode){
      var api = "https://sub-down.fuken.xyz";
      var url = api+"/search?"+$httpParamSerializer({
        imdbid: imdbId,
        season: episode.season,
        episode: episode.episode
      });
      return $http.get(url).then(function(res) {
        return res.data;
      })
    }

    function _getVideoLink(hash){
      var torrentUrl = playerUrl+"/torrents/"+hash;
      return $http.get(torrentUrl).then(function(res){
        var files = res.data.files;
        var biggestFile = files.reduce(function(prev, next){
          return prev.length > next.length ? prev : next;
        });
        return playerUrl+biggestFile.link;
      });
    }

    function postMagnet(magnet){
      var postUrl  = playerUrl+"/torrents";
      var postData = {link: magnet};

      return $http.post(postUrl, postData).then(function(res){
        return res.data.infoHash;
      });
    }

    function checkTorrentDownloaded(torrents, hash){
      return torrents.filter(function(elem){
        return elem.infoHash === hash;
      }).length > 0;
    }

    function getVideoLink(torrents, magnet){
      var deferred = $q.defer();

      postMagnet(magnet).then(function(hash){
        checkTorrentDownloaded(torrents, hash) ?
          onLinkReady(hash) :
          torrentSocket.once('interested', onLinkReady)
      });

      function onLinkReady(hash){
        $log.debug("ShowService: magnet link enviado al descargador");
        _getVideoLink(hash)
        .catch(function(err){
          deferred.reject(err);
        })
        .then(function(videoUrl){
          deferred.resolve(videoUrl);
        });
      }

      return deferred.promise;
    }

  }
})();
