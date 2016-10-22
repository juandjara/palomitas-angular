/* global $:false, videojs:false */

$(document).ready(function(){
  var options = {
    html5: {
      hlsjsConfig: {
        debug: true,
        autoStartLoad: true,
        fragLoadingTimeout: 10000,
        manifestLoadingTimeout: 3000
      }
    }
  };
  $(".subsform").on("submit", addSubs);
  $(".videoform").on("submit", play);
  console.debug("Reproductor de Palomitas");

  function play(ev){
    ev.preventDefault();
    console.log("main: Loading video url ...");

    var controls = $(".videoform");
    var playerEl = $("#player");
    var vid_url  = controls.find("input").val();
    var hlscheck = vid_url.indexOf(".m3u8") !== -1;

    if(!vid_url){
      alert("Please enter a video url");
      return;
    }

    controls.slideUp({
      complete: function onSlideUpComplete(){
        if(hlscheck){
          var src = $("<source src='"+vid_url+"'>");
          playerEl.append(src);
        }else{
          playerEl[0].src = vid_url;
        }
        videojs(playerEl[0], options, onVideoReady);
      }
    });

    return false;
  }

  function onVideoReady(){
    console.log("main: videojs is ready");
    var player = this;
    player.hotkeys();

    if($("#subs").val()){
      addSubs();
    }
  }

  function addSubs(ev){
    if(ev) ev.preventDefault();

    var subs = $("#subs");
    var subs_url = subs.val();
    var name = $("#subs-name").val();
    var player = videojs.getPlayers().player;

    if(subs_url && player){
      console.log("main: loading subtitles");
      var trackEl = player.addRemoteTextTrack({
        src: subs_url,
        kind: "subtitles",
        language: name || "es",
        label: name || "Español",
        id: "subs-"+name
      });
      trackEl.track.mode = "showing";
      subs.val("");
    }
  }
});
