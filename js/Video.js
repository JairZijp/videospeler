var Video = function()
{
    this.video = document.getElementsByTagName('video')[0];
    this.playButton = document.getElementById("playPauseToggle");
    this.timeLine = document.getElementById("timeLine");
    this.muteButton = document.getElementById('mute');
    this.fullScreen = document.getElementById('fullscreen');
    this.currentTime = document.getElementById('currentTime');
    this.durationTime = document.getElementById('durationTime');
    this.restartButton = document.getElementById("restartButton");
    this.scroller = document.getElementById("scroller");
    this.scrollContainer = document.getElementById('scroll-container');
    this.xpos = document.getElementById("xpos");
    
    this.videoSource = this.video.getElementsByTagName('source')[0];
    this.videoLinks = document.getElementsByTagName("section")[0];
    this.linksList =[];
    this.currentVideo = 0;
    this.allLinks = this.videoLinks.children;
   
}

Video.prototype.playVideo = function(index)
{
    this.videoLinks.children[index].classList.add("currentVideo");
    this.videoSource.src = this.linksList[index] + ".mp4";
    this.currentVideo = index;
    console.log(this.currentVideo);
    this.video.load();
    this.video.play();
}

Video.prototype.playPause = function()
{
    if(this.video.paused){
        this.video.play();
        this.playButton.innerHTML = '<span class="glyphicon glyphicon-pause" aria-hidden="true"></span>';
    } else {
        this.video.pause();
        this.playButton.innerHTML = '<span class="glyphicon glyphicon-play" aria-hidden="true"></span>';
    }
}

Video.prototype.dragTime = function()
{
    
}

Video.prototype.timeUpdate = function(currentMinutes, currentSeconds, durationMinutes, durationSeconds)
{
    this.scroller.style.marginLeft = this.video.currentTime * (100 / this.video.duration - 0.4) + '%';
    currentMinutes = Math.floor(this.video.currentTime / 60);
    currentSeconds = Math.floor(this.video.currentTime - currentMinutes * 60);
    durationMinutes = Math.floor(this.video.duration / 60);
    durationSeconds = Math.round(this.video.duration - durationMinutes * 60);
    if(currentSeconds < 10){
        currentSeconds = "0"+currentSeconds;
    }
    if(durationSeconds < 10){
        durationSeconds = "0"+durationSeconds;
    }
    this.currentTime.innerHTML = currentMinutes + ":" + currentSeconds;
    this.durationTime.innerHTML = durationMinutes + ":" + durationSeconds;
}

Video.prototype.mute = function () 
{
    if(this.video.muted){
        this.video.muted = false;
        this.muteButton.innerHTML = '<span class="glyphicon glyphicon-volume-up" aria-hidden="true"></span>';
    } else {
        this.video.muted = true;
        this.muteButton.innerHTML = '<span class="glyphicon glyphicon-volume-off" aria-hidden="true"></span>';
    }
}

Video.prototype.fullScreenMode = function()
{
    if(this.video.requestFullScreen) {
        this.video.requestFullScreen();
    } else if (this.video.webkitRequestFullScreen) {
        this.video.webkitRequestFullScreen();
    } else if (this.video.mozRequestFullScreen) {
        this.video.mozRequestFullScreen();
    }
}

Video.prototype.restart = function() 
{
    this.video.currentTime = 0;
}

Video.prototype.nextVideo = function(){
    this.allLinks[this.currentVideo].classList.remove("currentVideo");
    if ((this.currentVideo + 1) >= this.allLinks.length) { 
        nextVid = 0;
    } else { 
        nextVid = this.currentVideo+1; 
    }
    this.playVideo(nextVid);
}

Video.prototype.scrollings = function(e) 
{
	var lala = e.clientX;
    this.xpos.innerHTML = lala;
   
}

var video1 = new Video();

video1.playButton.addEventListener('click',function(){ video1.playPause()               });
video1.video.addEventListener("timeupdate",function(){ video1.timeUpdate()              });
video1.muteButton.addEventListener("click",function(){ video1.mute()                    });
video1.fullScreen.addEventListener("click",function(){ video1.fullScreenMode()          });
video1.restartButton.addEventListener("click",function(){ video1.restart()              });
video1.scrollContainer.addEventListener("click", function(e) { video1.scrollings(e)     });
video1.video.addEventListener('ended', function () {   video1.nextVideo()               });

for (var i=0; i<video1.allLinks.length; i++) {
    video1.linksList[i] = video1.allLinks[i].href;  
    (function(index){
        video1.allLinks[i].addEventListener("click", function(e){
            e.preventDefault();  
            for (var i=0; i<video1.allLinks.length; i++) {
                video1.allLinks[i].classList.remove("currentVideo");
            }
            video1.playVideo(index);
           });    
    })(i);
}

