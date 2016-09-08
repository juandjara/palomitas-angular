!function(){"use strict";angular.module("palomitasClient2",["ui.router","ui.bootstrap","toastr","ngLodash","duScroll"])}(),function(){"use strict";function e(){function e(e){function s(s){if(s&&!(s.length<2)){var a="https://tvapi.fuken.xyz";return a+="/search?query="+s,e.get(a).then(function(e){return t.searchRes=e.data,e.data})}}function a(e){return angular.isObject(e)&&e.show&&e.show.externals&&e.show.externals.imdb?e.show.name:null}var t=this;t.searchRes,t.searchText="",t.search=s,t.parseSearch=a}e.$inject=["$http"];var s={templateUrl:"app/components/navbar/navbar.html",controller:e,controllerAs:"vm"};return s}angular.module("palomitasClient2").component("navbar",e())}(),function(){"use strict";function e(){return{templateUrl:"app/components/spinner/spinner.html"}}angular.module("palomitasClient2").component("spinner",e())}(),function(){"use strict";function e(e,s,a,t,n,o){function l(e){return angular.toJson(e,!0)}function i(e){m.selectedEpisode=e;var s=document.querySelector(".episodes");angular.element(s).scrollLeft(n.innerWidth,400)}function r(){var e=document.querySelector(".episodes");angular.element(e).scrollLeft(0,400)}function c(e){m.langs=o.langs;var t="https://sub-down.fuken.xyz",n=t+"/search?"+a({imdbid:m.id,season:e.season,episode:e.episode});m.loading=!0,s.get(n).then(function(e){m.subtitles=e.data,m.loading=!1})}function p(){var e="https://api-fetch.website/tv/",a=e+"/show/"+m.id;s.get(a).then(function(e){m.show=e.data,m.episodes=d(e.data),m.selectedSeason=m.episodes[0].episodes,m.selectedEpisode=m.selectedSeason[0]})}function d(e){var s=e.episodes,a=h.groupBy(s,"season"),t=Object.keys(a).map(function(e){var s=a[e],t=h.sortBy(s,"episode");return{number:t[0].season,episodes:t}});return t}var m=this,h=t;m.id=e.id,m.show={},m.episodes=[],m.langs=[],m.selectedSeason=[],m.selectedEpisode={},m.selectedLang="",m.showMagnet=!1,m.loading=!1,m.space=l,m.setEpisode=i,m.scrollBack=r,m.loadSubtitles=c,p()}e.$inject=["$stateParams","$http","$httpParamSerializer","lodash","$window","$rootScope"],angular.module("palomitasClient2").controller("ShowController",e)}(),function(){"use strict";function e(e,s){function a(){s.get(o+"/shows").then(function(e){n.showData=e.data,n.error=null})["catch"](function(e){n.error=e})}function t(){e.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>')}var n=this,o="https://tvapi.fuken.xyz";n.creationDate=1463518051145,n.showData=null,n.error=null,n.showToastr=t,n.showlist=function(){},a()}e.$inject=["toastr","$http"],angular.module("palomitasClient2").controller("MainController",e)}(),function(){"use strict";function e(e,s,a){e.debug("Palomitas V2");var t="https://sub-down.fuken.xyz",n=t+"/weblangs.json";s.get(n).then(function(e){a.langs=e.data})}e.$inject=["$log","$http","$rootScope"],angular.module("palomitasClient2").run(e)}(),function(){"use strict";function e(e,s){e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"vm"}).state("show_detail",{url:"/show/:id",templateUrl:"app/show/show.detail.html",controller:"ShowController",controllerAs:"vm"}),s.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("palomitasClient2").config(e)}(),function(){"use strict";angular.module("palomitasClient2").constant("moment",moment)}(),function(){"use strict";function e(e,s){e.debugEnabled(!0),s.allowHtml=!0,s.timeOut=3e3,s.positionClass="toast-top-right",s.preventDuplicates=!0,s.progressBar=!0}e.$inject=["$logProvider","toastrConfig"],angular.module("palomitasClient2").config(e)}(),angular.module("palomitasClient2").run(["$templateCache",function(e){e.put("app/main/main.html",'<main style="padding: 1.2em"><h1 class="text-center header-shadow">Proyecto Palomitas</h1><h2 class=text-center>El poder de la red P2P en tu navegador</h2><div class=row><h3 class="col-sm-3 col-xs-6 p1em text-center"><span class="header-icon glyphicon glyphicon-fire"></span><br><span>Las útlimas novedades</span></h3><h3 class="col-sm-3 col-xs-6 p1em text-center"><span class="header-icon glyphicon glyphicon-film"></span><br><span>Todas las series en version original</span></h3><h3 class="col-sm-3 col-xs-6 p1em text-center"><span class="header-icon glyphicon glyphicon-globe"></span><br><span>Subtitulos en todos los idiomas</span></h3><h3 class="col-sm-3 col-xs-6 p1em text-center"><span class="header-icon glyphicon glyphicon-cloud"></span><br>Proyecto de codigo abierto. Haz <a href=http://github.com/juandjara/palomitas-angular>tus propias palomitas</a></h3></div><!-- Solo se muestra mientras se realiza la peticion inicial --><h1 style="color: lightgrey" ng-hide=vm.showData>Loading...</h1><!-- Solo se muestra si la peticion inicial tuvo exito --><div class=row ng-show=vm.showData><h1 class="col-sm-12 header-shadow">Las series más populares:</h1><div class="col-sm-12 shows" ng-show=vm.showData><div class=show-card ng-repeat="show in vm.showData |limitTo: 15"><div class=show-img><img ng-src={{show.image.medium}} alt={{show.name}}></div><div class=overlay><div class="ribbon opensans"><p>{{show.name}}</p><p class=badge style="font-size: smaller">{{show.rating.average}} / 10</p><a ng-href=#/show/{{show.externals.imdb}} class="no-br btn btn-lg btn-success">Detalles</a></div></div></div></div></div><!-- Solo se muestra si la peticion inicial falló --><div style="text-align: left" ng-show=vm.error><p>Error</p><pre>\n      {{vm.error | json}}\n    </pre></div></main>'),e.put("app/show/show.detail.html",'<div class=show-details><div class=show-img><img ng-src={{vm.show.images.banner}} alt={{vm.show.title}}></div><div class=overlay><img class="poster hidden-xs" ng-src={{vm.show.images.poster}} alt={{vm.show.title}}><header class=header><h1>{{vm.show.title}} <span class=badge>{{vm.show.rating.percentage / 10}} / 10</span></h1><h4><p>{{vm.show.year}} - {{vm.show.status}}</p><span ng-repeat="genre in vm.show.genres">{{genre}} <span ng-hide=$last>,</span></span></h4><p style="font-weight: bolder" class=opensans>{{vm.show.synopsis}}</p></header></div></div><div class=opensans style="margin-top: 1em; padding: 0 1em"><h1 style="margin-top: 0; margin-bottom: .5em">Episodios</h1><div class=episodes><div class=episode-selector><div class="season-list btn-group-vertical"><button class="btn btn-primary" ng-repeat="season in vm.episodes" ng-click="vm.selectedSeason = season.episodes">Temporada {{season.number}}</button></div><ul class="episode-list list-group" style="margin-left: 1em"><li class=list-group-item style="color: black" ng-repeat="ep in vm.selectedSeason"><a href ng-click=vm.setEpisode(ep)>{{ep.season}}x{{ep.episode}} - {{ep.title}}</a></li></ul></div><div class=episode><button class="visible-xs btn btn-primary" style="margin-top: 1em" ng-click=vm.scrollBack()><span class="glyphicon glyphicon-chevron-left"></span> Atrás</button><h2 style="margin-top: 0.2em">{{vm.selectedEpisode.title}}</h2><p style="color: grey">Season {{vm.selectedEpisode.season}} Episode {{vm.selectedEpisode.episode}}</p><p>{{vm.selectedEpisode.overview}}</p><br><uib-tabset><uib-tab ng-repeat="(type, torrent) in vm.selectedEpisode.torrents" index=$index heading={{type}} ng-if="type != 0"><div class=tab-inner><p>seeds: {{torrent.seeds}} | peers: {{torrent.peers}}</p><pre ng-show=vm.showMagnet class=pre-wrap>{{torrent.url}}</pre></div></uib-tab></uib-tabset><p></p><h3>Instrucciones</h3><ol><li>Obtener enlace magnet desde esta pagina</li><li>Pegar enlace magnet en el <a target=_blank href=https://palomitas-player.fuken.xyz>descargador</a></li><li>Obtener enlace de video desde el descargador haciendo click derecho y seleccionando copiar direccion de enlace sobre el archivo que pese mas y tenga una extension de video como por ejemplo .mp4, .mkv o .avi</li><li>Obtener subtitulos desde esta pagina. Copiar enlace de subtitulos en formato VTT</li><li>Ir al <a target=_blank href=https://palomitas-player.fuken.xyz/videojs>reproductor</a> y pegar los enlaces del video y los subtitulos para despues darle al boton (solo marcar el checkbox si el video ha sido convertido a la extension .m3u8)</li></ol><p><strong>Bonus: </strong>tambien puede usar el enlace de video para ver el video en un reproductor como <strong>VLC</strong> o <strong>MPV</strong> que soporte abrir enlaces de red</p><p></p><!--\n      <button class="btn btn-success btn-block">\n        <span class="glyphicon glyphicon-play"></span> Reproducir        \n      </button>\n      --> <button class="btn btn-primary btn-block" ng-click=vm.loadSubtitles(vm.selectedEpisode)><span class="glyphicon glyphicon-globe"></span> Buscar subtitulos</button><!--\n      <button class="btn btn-primary btn-block">\n        <span class="glyphicon glyphicon-link"></span> Obtener enlace del video\n      </button>\n      --> <button class="btn btn-primary btn-block" ng-click="vm.showMagnet = true;"><span class="glyphicon glyphicon-magnet"></span> Obtener enlace magnet</button><spinner ng-show=vm.loading></spinner><div class=form-group ng-show=vm.subtitles style="margin-top: 1em; display: flex; align-items: center"><label for=langs style="margin-right: 0.5em">Idioma</label><select ng-model=vm.selectedLang class=form-control name=langs id=langs><option ng-value=lang.isoId ng-repeat="lang in vm.langs">{{lang.name}}</option></select></div><ul class="list-group subs-list" ng-show=vm.selectedLang style="color: black"><li class=list-group-item ng-repeat="sub in vm.subtitles[vm.selectedLang]" style="display: flex; align-items: center"><div style="flex: 0 1 65%"><p class=pre-wrap>{{sub.subFilename}}</p>Descargar en <a class=pre-wrap ng-href={{sub.links.srt}}>srt</a> o <a class=pre-wrap ng-href={{sub.links.vtt}}>vtt</a></div><div style="flex: 1 0 35%; margin-left: 1em"><p><span title=Formato class="glyphicon glyphicon-file"></span> {{sub.encoding}}</p><p><span title=Descargas class="glyphicon glyphicon-download"></span> {{sub.downloads.toLocaleString()}}</p><p><span title="Fecha de subida" class="glyphicon glyphicon-calendar"></span> {{sub.date.toLocaleString()}}</p></div></li></ul></div></div></div>'),e.put("app/components/navbar/navbar.html",'<nav class=nav-bar><section class=nav-logo><a href=#><img class=nav-icon alt="Logo de Palomitas" src=assets/images/popcorn-icon.png> <span class=nav-label>Palomitas</span> </a><small class=nav-links><a target=_blank href=https://palomitas-player.fuken.xyz>Descargador</a> <a target=_blank href=https://palomitas-player.fuken.xyz/videojs>Reproductor</a></small></section><section class=nav-search><input type=text placeholder="¿Que quieres ver?" class=transparent ng-model=vm.searchText ng-model-options="{debounce: 300}" typeahead-no-results="\'No results\'" uib-typeahead="option as vm.parseSearch(option) for option in vm.search($viewValue)" typeahead-template-url=app/components/navbar/searchItem.html typeahead-popup-template-url=app/components/navbar/searchPopup.html> <span class="glyphicon glyphicon-search inside-input"></span></section></nav>'),e.put("app/components/navbar/searchItem.html","<div ng-attr-title={{match.label}} class=search-item ng-cloak><img class=search-img ng-src={{match.model.show.image.medium}}> <a ng-href=#/show/{{match.model.show.externals.imdb}} class=search-label>{{match.model.show.name}}</a></div>"),e.put("app/components/navbar/searchPopup.html",'<ul class="list-unstyled search-results" ng-show="isOpen() && !moveInProgress" ng-style="{top: position().top+\'px\',\n               left: position().left+\'px\'}" role=listbox aria-hidden={{!isOpen()}}><li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter=selectActive($index) ng-click="selectMatch($index, $event)" role=option id={{::match.id}}><div uib-typeahead-match index=$index match=match query=query template-url=templateUrl></div></li></ul>'),e.put("app/components/spinner/spinner.html",'<div class=sk-fading-circle><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-0695c385d8.js.map