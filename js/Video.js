var Video = function(){
	this.video = document.getElementsByTagName('video')[0];
	this.playButton = document.getElementById("playPauseToggle");
	this.timeLine = document.getElementById("timeLine");
	this.muteButton = document.getElementById('mute');
	this.fullScreen = document.getElementById('fullscreen');
	this.currentTime = document.getElementById('currentTime');
	this.durationTime = document.getElementById('durationTime');
	this.videoList = document.getElementById("videoList");
	this.restartButton = document.getElementById("restartButton");
	this.scroller = document.getElementById("scroller");
	this.ypos = document.getElementById("ypos");
	this.xpos = document.getElementById("xpos")


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
	//this.timeLine.value = this.video.currentTime * (100 / this.video.duration);
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

Video.prototype.changeVideo = function()
{
	this.video.src = 'video/video'+event.target.value+'.mp4';
	this.video.play();
	this.playButton.innerHTML = "<span class='glyphicon glyphicon-pause' aria-hidden='true'>";
}

Video.prototype.restart = function() 
{
	this.video.currentTime = 0;
}

Video.prototype.scrollings = function(e) 
{
	/*time = this.video.duration * (this.scrollings.value / 100);
	this.video.currentTime = time; */

	this.xpos.innerHTML = e.clientX;
	this.ypos.innerHTML = e.clientY;
}

var video1 = new Video();

video1.playButton.addEventListener('click',function(){ video1.playPause()		});
video1.video.addEventListener("timeupdate",function(){ video1.timeUpdate()		});
//video1.timeLine.addEventListener("change", function(){ video1.dragTime()   		});
video1.muteButton.addEventListener("click",function(){ video1.mute()	   		});
video1.fullScreen.addEventListener("click",function(){ video1.fullScreenMode() 	});
video1.videoList.addEventListener("change",function(){ video1.changeVideo()		});
video1.restartButton.addEventListener("click",function(){ video1.restart()      });
video1.scroller.addEventListener("click", function() { video1.scrollings()		});