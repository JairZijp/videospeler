var video1 = new Video();

video1.playButton.addEventListener('click',function(){ video1.playPause()  });
video1.video.addEventListener("timeupdate",function(){ video1.timeUpdate() });
video1.timeLine.addEventListener("change", function(){ video1.vidSeek()    });
video1.muteButton.addEventListener("click",function(){ video1.mute()	   });
video1.fullScreen.addEventListener("click",function(){ video1.fullScreenMode()   });