var Video = function()
{
    this.video = document.getElementsByTagName('video')[0];
    this.videoWrapper = document.getElementById('videoWrapper');
    this.playButton = document.getElementById("playPauseToggle");
    this.timeLine = document.getElementById("timeLine");
    this.muteButton = document.getElementById('mute');
    this.fullScreen = document.getElementById('fullscreen');
    this.currentTime = document.getElementById('currentTime');
    this.durationTime = document.getElementById('durationTime');
    this.restartButton = document.getElementById("restartButton");
    this.nextButton = document.getElementById("next");
    this.previousButton = document.getElementById("previous");
    this.scrolLine = document.getElementById("line");
    this.scroller = document.getElementById("scroller");
    this.scrollContainer = document.getElementById('scroll-container');
    
    
    this.videoSource = this.video.getElementsByTagName('source')[0];
    this.videoLinks = document.getElementsByTagName("section")[0];
    this.linksList =[];
    this.currentVideo = 0;
    this.allLinks = document.getElementsByClassName('videoLink');
   
}

Video.prototype.playVideo = function(vidNumber)
{
    this.allLinks[vidNumber].classList.add("currentVideo");
    this.videoSource.src = this.linksList[vidNumber] + ".mp4";
    this.currentVideo = vidNumber;
    this.video.load();
    this.video.play();
}

Video.prototype.playPause = function()
{
    if(this.video.paused){
        this.video.play();
        this.playButton.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    } else {
        this.video.pause();
        this.playButton.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    }
}

Video.prototype.timeUpdate = function(currentMinutes, currentSeconds, durationMinutes, durationSeconds)
{
    this.scrolLine.style.width = this.video.currentTime * (100 / this.video.duration) + '%';
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
        this.muteButton.innerHTML = '<i class="fa fa-volume-up fa-2x"></i>';
    } else {
        this.video.muted = true;
        this.muteButton.innerHTML = '<i class="fa fa-volume-off fa-2x"></i>';
    }
}

Video.prototype.fullScreenMode = function()
{
    if(this.video.requestFullScreen ) {
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

Video.prototype.nextVideo = function()
{
    this.allLinks[this.currentVideo].classList.remove("currentVideo");
    if ((this.currentVideo + 1) >= this.allLinks.length) { 
        nextVid = 0;
    } else { 
        nextVid = this.currentVideo + 1; 
    }
    this.playVideo(nextVid);
}

Video.prototype.previousVideo = function()
{
    this.allLinks[this.currentVideo].classList.remove("currentVideo");
    if ((this.currentVideo) <= 0) { 
        previousVid = this.allLinks.length - 1;
    } else { 
        previousVid = this.currentVideo - 1; 
    }
    console.log(previousVid);
    this.playVideo(previousVid);
}

Video.prototype.changeTime = function(e) 
{
	var mouseX = e.clientX - this.scrolLine.offsetLeft;
    var calcX = mouseX / this.scrollContainer.offsetWidth * 100;
    this.video.currentTime = calcX / 100 * this.video.duration; 
    this.scrolLine.style.width =  this.video.currentTime/this.video.duration*100 + '%';
}

Video.prototype.dragAndDrop = function(e)
{
    document.onmousemove = function() {
        console.log('move');
        return false;
    }
}

var video1 = new Video();

video1.playButton.addEventListener('click',function(){          video1.playPause()          });
video1.video.addEventListener("timeupdate",function(){          video1.timeUpdate()         });
video1.muteButton.addEventListener("click",function(){          video1.mute()               });
video1.fullScreen.addEventListener("click",function(){          video1.fullScreenMode()     });
video1.restartButton.addEventListener("click",function(){       video1.restart()            });
video1.scrollContainer.addEventListener("click", function(e) {  video1.changeTime(e)        });
video1.video.addEventListener('ended', function () {            video1.nextVideo()          });
video1.nextButton.addEventListener('click', function (){        video1.nextVideo()          });
video1.previousButton.addEventListener("click",function(){      video1.previousVideo()      });

video1.scroller.onmousedown = function () {
    console.log('mousedown');
    video1.dragAndDrop();
}
video1.scroller.onmouseup = function() {
    console.log('mouseup');
}
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


