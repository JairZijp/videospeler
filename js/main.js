var video1 = new Video();

playButton.addEventListener('click', function(){ video1.playPause()  });
video.addEventListener("timeupdate",function() { video1.timeUpdate() });
timeLine.addEventListener("change", function() { video1.vidSeek()    });