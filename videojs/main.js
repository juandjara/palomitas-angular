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
  window.play = play;

  function play(){
    console.info("INFO: play funcion triggered");

    var vid_url  = $("#video").val();
    var playerEl = $("#player");
    var controls = $(".inputs");
    var hlscheck = $("#hlscheck").is(":checked");

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
  }

  function onVideoReady(){
    console.info("INFO: videojs is ready");

    var player = this;
    var subs = $("#subs").val();
    player.hotkeys(); // videojs hotkeys 

    if(subs){    
      var trackEl = player.addRemoteTextTrack({
        src: subs,
        kind: "subtitles",
        language: "es",
        label: "Español",
        id: "subs"
      });
      trackEl.track.mode = "showing";
    }
  }

  console.info("INFO: Reached end of dom loaded event");
});
